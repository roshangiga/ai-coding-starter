// Minimal headless-Chrome driver over CDP (no npm deps; Node global WebSocket).
// Usage: node cdp.mjs <jobs.json>
// jobs: [{url, width, height?, colorScheme?, fullPage?, out?, eval?: "js expr", waitMs?, actions?: "js run before shot"}]
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = 9333 + Math.floor(Math.random() * 500);
const userDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cdp-'));
const chrome = spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${userDir}`,
  '--no-first-run', '--no-default-browser-check', '--hide-scrollbars', '--force-device-scale-factor=1', 'about:blank'
], { stdio: 'ignore' });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function getWs() {
  for (let i = 0; i < 100; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const page = list.find((t) => t.type === 'page');
      if (page) return page.webSocketDebuggerUrl;
    } catch {}
    await sleep(100);
  }
  throw new Error('chrome did not start');
}

const wsUrl = await getWs();
const ws = new WebSocket(wsUrl);
await new Promise((r) => ws.addEventListener('open', r));
let id = 0;
const pending = new Map();
const listeners = [];
ws.addEventListener('message', (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const { res, rej } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? rej(new Error(JSON.stringify(msg.error))) : res(msg.result);
  } else if (msg.method) listeners.forEach((l) => l(msg));
});
const send = (method, params = {}) => new Promise((res, rej) => {
  const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method, params }));
});
const consoleErrors = [];
listeners.push((m) => {
  if (m.method === 'Runtime.exceptionThrown') consoleErrors.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text);
  if (m.method === 'Page.javascriptDialogOpening') send('Page.handleJavaScriptDialog', { accept: true });
});
await send('Page.enable');
await send('Runtime.enable');

async function evaluate(expr) {
  const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
  return r.result.value;
}

const jobs = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const results = [];
for (const job of jobs) {
  const height = job.height || 900;
  await send('Emulation.setDeviceMetricsOverride', { width: job.width, height, deviceScaleFactor: job.dsf || 1, mobile: job.width < 768 });
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: job.colorScheme || 'light' }, { name: 'prefers-reduced-motion', value: 'reduce' }] });
  if (job.clearStorage) { try { await evaluate('localStorage.clear()'); } catch {} }
  consoleErrors.length = 0;
  const loaded = new Promise((r) => { const l = (m) => { if (m.method === 'Page.loadEventFired') { listeners.splice(listeners.indexOf(l), 1); r(); } }; listeners.push(l); });
  await send('Page.navigate', { url: job.url });
  await Promise.race([loaded, sleep(15000)]);
  await sleep(job.waitMs ?? 600);
  const out = { url: job.url, width: job.width };
  if (job.actions) out.actions = await evaluate(job.actions);
  if (job.tabFocus) {
    // Focus the element before the target, then press Tab so :focus-visible applies as for a keyboard user.
    await evaluate(`(function(){var t=document.querySelector(${JSON.stringify(job.tabFocus)});var all=[...document.querySelectorAll('a[href],button,input,select,textarea,[tabindex]')].filter(e=>!e.disabled);var i=all.indexOf(t);if(i>0)all[i-1].focus();else document.activeElement&&document.activeElement.blur();})()`);
    await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
    await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
    await sleep(150);
    await send('Runtime.evaluate', { expression: 'window.scrollTo(0,0)' });
  }
  if (job.tabs) {
    out.tabs = [];
    for (let i = 0; i < job.tabs; i++) {
      await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
      await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
      await sleep(60);
      out.tabs.push(await evaluate(`(function(){var e=document.activeElement;if(!e||e===document.body)return null;var c=getComputedStyle(e);if(e.closest('.rbx'))return 'overlay';return [e.tagName+(e.id?'#'+e.id:'')+'.'+(e.className||'').toString().split(' ')[0], c.outlineStyle+' '+c.outlineWidth, c.boxShadow, c.borderTopStyle+' '+c.borderTopWidth].join(' | ')})()`));
    }
  }
  if (job.eval) out.eval = await evaluate(job.eval);
  if (job.out) {
    let clip;
    if (job.fullPage !== false) {
      const { contentSize } = await send('Page.getLayoutMetrics');
      const h = Math.ceil(job.maxHeight ? Math.min(contentSize.height, job.maxHeight) : contentSize.height);
      clip = { x: 0, y: 0, width: job.width, height: h, scale: 1 };
    }
    const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: !!clip, ...(clip ? { clip } : {}) });
    fs.mkdirSync(path.dirname(job.out), { recursive: true });
    fs.writeFileSync(job.out, Buffer.from(shot.data, 'base64'));
    out.out = job.out;
  }
  out.errors = [...consoleErrors];
  results.push(out);
}
console.log(JSON.stringify(results, null, 1));
ws.close();
chrome.kill();
try { fs.rmSync(userDir, { recursive: true, force: true }); } catch {}
process.exit(0);

/*
 * Presenter overlay for the RoomBook training steps. Not part of the app.
 * Reads window.RBX (changes.data.js): step meta, numbered changes with before/after crops,
 * and summarised Snyk / Impeccable reports. Adds: a header bar, numbered pins with popovers,
 * a "Show changes" toggle, and report sections after the app's footer.
 * Disable for clean screenshots and scans with ?overlay=off.
 */
(function () {
  "use strict";
  var params = new URLSearchParams(window.location.search);
  if (params.get("overlay") === "off") return;
  var D = window.RBX;
  if (!D) return;

  var SHOW_KEY = "rbx-show-changes";
  var root = document.documentElement;

  function readShow() {
    try {
      var v = localStorage.getItem(SHOW_KEY);
      return v === null ? true : v === "1";
    } catch (e) {
      return true;
    }
  }
  function writeShow(v) {
    try {
      localStorage.setItem(SHOW_KEY, v ? "1" : "0");
    } catch (e) {
      /* storage unavailable: the choice lasts for this page view */
    }
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function delta(prev, cur) {
    if (prev == null) return String(cur);
    var d = cur - prev;
    var sign = d > 0 ? "+" : d < 0 ? "−" : "±";
    return prev + " → " + cur + " (" + sign + Math.abs(d) + ")";
  }

  /* ---------- Header bar ---------- */
  function buildBar() {
    var bar = el("div", "rbx rbx-bar");
    bar.setAttribute("role", "region");
    bar.setAttribute("aria-label", "Presenter notes");

    var row = el("div", "rbx-row");
    row.appendChild(el("span", "rbx-tag", "Presenter"));
    row.appendChild(el("strong", "rbx-step", D.label));
    row.appendChild(el("span", "rbx-sum", D.summary));

    var counts = el("span", "rbx-counts");
    var r = D.reports || {};
    if (r.impeccable) counts.appendChild(el("span", null, "Impeccable " + delta(r.impeccable.prevTotal, r.impeccable.total)));
    if (r.snyk) counts.appendChild(el("span", null, "Snyk " + delta(r.snyk.prevTotal, r.snyk.total)));
    row.appendChild(counts);

    var nav = el("nav", "rbx-nav");
    nav.setAttribute("aria-label", "Steps");
    function link(href, text) {
      var a = el("a", null, text);
      a.href = href;
      nav.appendChild(a);
    }
    if (D.prev) link("../" + D.prev.dir + "/index.html", "← " + D.prev.short);
    link("../index.html", "Index");
    if (D.next) link("../" + D.next.dir + "/index.html", D.next.short + " →");
    link("#rbx-reports", "Reports ↓");
    row.appendChild(nav);

    var more = el("button", "rbx-more", "Changes");
    more.type = "button";
    more.setAttribute("aria-expanded", "false");
    more.addEventListener("click", function () {
      var open = bar.classList.toggle("rbx-open");
      more.setAttribute("aria-expanded", open ? "true" : "false");
    });
    row.appendChild(more);
    bar.appendChild(row);

    if (D.changes && D.changes.length) {
      var list = el("ol", "rbx-list");
      D.changes.forEach(function (c) {
        var li = el("li");
        li.appendChild(el("span", "rbx-num", String(c.n)));
        li.appendChild(document.createTextNode(" " + c.text));
        list.appendChild(li);
      });
      bar.appendChild(list);
    }
    document.body.insertBefore(bar, document.body.firstChild);
  }

  /* ---------- Pins and popover ---------- */
  var layer, pop, pins = [], hideTimer = null, activePin = null;

  function stickyAncestor(node) {
    for (var n = node; n && n !== document.body; n = n.parentElement) {
      var p = getComputedStyle(n).position;
      if (p === "sticky" || p === "fixed") return true;
    }
    return false;
  }

  function placePins() {
    var docW = document.documentElement.clientWidth;
    pins.forEach(function (p) {
      var target = document.querySelector(p.change.sel);
      if (!target || !target.getClientRects().length) {
        p.node.hidden = true;
        return;
      }
      p.node.hidden = false;
      var r = target.getBoundingClientRect();
      var fixed = stickyAncestor(target);
      var x = p.change.pos === "tr" ? r.right - 14 : r.left - 8;
      var y = r.top - 8;
      x = Math.max(4, Math.min(docW - 28, x));
      if (fixed) {
        p.node.style.position = "fixed";
        p.node.style.left = x + "px";
        p.node.style.top = Math.max(4, y) + "px";
      } else {
        p.node.style.position = "absolute";
        p.node.style.left = x + window.scrollX + "px";
        p.node.style.top = Math.max(4, y + window.scrollY) + "px";
      }
    });
    if (activePin && !pop.hidden) positionPop(activePin);
  }

  var rafPending = false;
  function schedule() {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(function () {
      rafPending = false;
      placePins();
    });
  }

  function figure(src, caption, alt) {
    var f = el("figure", "rbx-fig");
    f.appendChild(el("figcaption", null, caption));
    var img = el("img");
    img.alt = alt;
    img.title = "Click to enlarge";
    img.addEventListener("load", layoutPop);
    img.addEventListener("click", function (e) {
      e.stopPropagation();
      openLightbox(src, alt);
    });
    img.src = src;
    f.appendChild(img);
    return f;
  }

  function fillPop(c) {
    pop.textContent = "";
    var h = el("p", "rbx-pop-title");
    h.appendChild(el("span", "rbx-num", String(c.n)));
    h.appendChild(document.createTextNode(" " + c.text));
    pop.appendChild(h);
    var pair = el("div", "rbx-pair");
    pair.appendChild(figure(c.before, "Before (" + D.prev.short + ")", "Before: " + c.text));
    pair.appendChild(figure(c.after, "After (" + D.short + ")", "After: " + c.text));
    pop.appendChild(pair);
    pop.appendChild(el("p", "rbx-hint", "Click an image to enlarge. Esc closes."));
  }

  // Both crops share one scale (they are captured at 2x), sized to fill the popover width and
  // most of the viewport height, so the difference reads at normal viewing size.
  function layoutPop() {
    if (!pop || pop.hidden) return;
    var imgs = pop.querySelectorAll(".rbx-fig img");
    var vw = document.documentElement.clientWidth;
    var vh = window.innerHeight;
    var w = Math.min(720, vw - 16);
    pop.style.width = w + "px";
    var inner = w - 28;
    var dims = [];
    for (var i = 0; i < imgs.length; i++) {
      if (!imgs[i].naturalWidth) return;
      dims.push([imgs[i].naturalWidth / 2, imgs[i].naturalHeight / 2]);
    }
    var maxW = Math.max.apply(null, dims.map(function (d) { return d[0]; }));
    var sumH = dims.reduce(function (a, d) { return a + d[1]; }, 0);
    var chrome = 120; // title, two labels, hint, padding
    var s = Math.min(inner / maxW, (vh - 16 - chrome) / sumH, 2.5);
    for (var j = 0; j < imgs.length; j++) {
      imgs[j].style.width = Math.round(dims[j][0] * s) + "px";
      imgs[j].style.height = Math.round(dims[j][1] * s) + "px";
    }
    if (activePin) positionPop(activePin);
  }

  function positionPop(pinNode) {
    var vw = document.documentElement.clientWidth;
    var vh = window.innerHeight;
    var w = pop.offsetWidth;
    var r = pinNode.getBoundingClientRect();
    var ph = pop.offsetHeight;
    var left = Math.max(8, Math.min(vw - w - 8, r.left + r.width / 2 - w / 2));
    var top = r.bottom + 8;
    if (top + ph > vh - 8) top = r.top - ph - 8;
    top = Math.max(8, Math.min(vh - ph - 8, top));
    pop.style.left = left + "px";
    pop.style.top = top + "px";
  }

  var lightbox = null;
  function openLightbox(src, alt) {
    clearTimeout(hideTimer);
    if (!lightbox) {
      lightbox = el("div", "rbx rbx-lightbox");
      lightbox.setAttribute("role", "dialog");
      lightbox.setAttribute("aria-modal", "true");
      lightbox.setAttribute("aria-label", "Enlarged screenshot");
      lightbox.tabIndex = -1;
      lightbox.appendChild(el("img"));
      lightbox.appendChild(el("p", "rbx-hint", "Click or press Esc to close"));
      lightbox.addEventListener("click", closeLightbox);
      document.body.appendChild(lightbox);
    }
    var img = lightbox.querySelector("img");
    img.src = src;
    img.alt = alt;
    lightbox.hidden = false;
    lightbox.focus();
  }
  function closeLightbox() {
    if (!lightbox || lightbox.hidden) return false;
    lightbox.hidden = true;
    if (activePin) activePin.focus();
    return true;
  }

  function showPop(p) {
    clearTimeout(hideTimer);
    if (activePin !== p.node) {
      fillPop(p.change);
      activePin = p.node;
    }
    pop.hidden = false;
    pins.forEach(function (q) {
      q.node.setAttribute("aria-expanded", q === p ? "true" : "false");
    });
    layoutPop();
    positionPop(p.node);
  }

  function hidePop() {
    pop.hidden = true;
    if (activePin) activePin.setAttribute("aria-expanded", "false");
    activePin = null;
  }

  function hideSoon() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hidePop, 180);
  }

  function buildPins() {
    if (!D.changes || !D.changes.length) return;
    layer = el("div", "rbx rbx-layer");
    pop = el("div", "rbx rbx-pop");
    pop.id = "rbx-pop";
    pop.setAttribute("role", "dialog");
    pop.setAttribute("aria-label", "Change details");
    pop.hidden = true;
    pop.addEventListener("mouseenter", function () { clearTimeout(hideTimer); });
    pop.addEventListener("mouseleave", function () { if (!lightbox || lightbox.hidden) hideSoon(); });

    D.changes.forEach(function (c) {
      var b = el("button", "rbx-pin", String(c.n));
      b.type = "button";
      b.setAttribute("aria-label", "Change " + c.n + ": " + c.text);
      b.setAttribute("aria-controls", "rbx-pop");
      b.setAttribute("aria-expanded", "false");
      var p = { node: b, change: c };
      b.addEventListener("mouseenter", function () { showPop(p); });
      b.addEventListener("mouseleave", function () { if (!lightbox || lightbox.hidden) hideSoon(); });
      b.addEventListener("focus", function () { showPop(p); });
      b.addEventListener("blur", function () { if (!lightbox || lightbox.hidden) hideSoon(); });
      b.addEventListener("click", function (e) {
        e.preventDefault();
        if (activePin === b && !pop.hidden) hidePop();
        else showPop(p);
      });
      layer.appendChild(b);
      pins.push(p);
    });
    document.body.appendChild(layer);
    document.body.appendChild(pop);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && closeLightbox()) return;
      if (e.key === "Escape" && !pop.hidden) {
        var back = activePin;
        hidePop();
        if (back) back.focus();
      }
    });
    document.addEventListener("click", function (e) {
      if (pop.hidden) return;
      if (lightbox && !lightbox.hidden) return;
      if (e.target.closest && (e.target.closest(".rbx-pin") || e.target.closest(".rbx-pop") || e.target.closest(".rbx-lightbox"))) return;
      hidePop();
    });

    window.addEventListener("resize", function () { schedule(); layoutPop(); });
    window.addEventListener("scroll", schedule, { passive: true });
    new MutationObserver(function (records) {
      for (var i = 0; i < records.length; i++) {
        var t = records[i].target;
        if (!(t.closest && t.closest(".rbx"))) {
          schedule();
          return;
        }
      }
    }).observe(document.body, { childList: true, subtree: true, characterData: true });
    if (window.ResizeObserver) new ResizeObserver(schedule).observe(document.body);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);
    window.addEventListener("load", schedule);
    placePins();
  }

  /* ---------- Reports after the footer ---------- */
  function table(headers, rows) {
    var wrap = el("div", "rbx-table-wrap");
    var t = el("table", "rbx-table");
    var thead = el("thead");
    var tr = el("tr");
    headers.forEach(function (h) { tr.appendChild(el("th", null, h)); });
    thead.appendChild(tr);
    t.appendChild(thead);
    var tb = el("tbody");
    rows.forEach(function (r) {
      var row = el("tr");
      r.forEach(function (cell, i) {
        var td = el("td", i === 0 ? "rbx-cell-key" : null, cell);
        row.appendChild(td);
      });
      tb.appendChild(row);
    });
    t.appendChild(tb);
    wrap.appendChild(t);
    return wrap;
  }

  function countChips(obj) {
    var ul = el("ul", "rbx-chips");
    Object.keys(obj).forEach(function (k) {
      var li = el("li");
      li.appendChild(el("strong", null, String(obj[k])));
      li.appendChild(document.createTextNode(" " + k));
      ul.appendChild(li);
    });
    return ul;
  }

  function buildReports() {
    var r = D.reports;
    if (!r) return;
    var sec = el("section", "rbx rbx-reports");
    sec.id = "rbx-reports";
    sec.setAttribute("aria-label", "Reports for this version");
    var band = el("div", "rbx-band");
    band.appendChild(el("span", "rbx-tag", "Presenter"));
    band.appendChild(el("h2", null, "Reports for this version: " + D.label));
    sec.appendChild(band);

    if (r.snyk) {
      var s = el("div", "rbx-report");
      s.appendChild(el("h3", null, "Snyk Code"));
      s.appendChild(el("p", "rbx-delta", "Issues: " + delta(r.snyk.prevTotal, r.snyk.total) + (r.snyk.prevTotal != null ? " vs " + D.prev.short : "")));
      if (r.snyk.note) s.appendChild(el("p", "rbx-note", r.snyk.note));
      s.appendChild(countChips(r.snyk.bySeverity));
      s.appendChild(table(["Severity", "Rule", "File:line", "Message"], r.snyk.findings.map(function (f) {
        return [f.severity, f.rule, f.file + ":" + f.line, f.message];
      })));
      s.appendChild(el("p", "rbx-src", r.snyk.command + " · raw: reports/snyk.json"));
      sec.appendChild(s);
    }
    if (r.impeccable) {
      var m = el("div", "rbx-report");
      m.appendChild(el("h3", null, "Impeccable"));
      m.appendChild(el("p", "rbx-delta", "Findings: " + delta(r.impeccable.prevTotal, r.impeccable.total) + (r.impeccable.prevTotal != null ? " vs " + D.prev.short : "") +
        " (" + r.impeccable.failing + " counted, " + r.impeccable.advisory + " advisory)"));
      if (r.impeccable.note) m.appendChild(el("p", "rbx-note", r.impeccable.note));
      if (r.impeccable.total) m.appendChild(countChips(r.impeccable.byRule));
      if (r.impeccable.findings.length) {
        m.appendChild(table(["Rule", "Element", "Message"], r.impeccable.findings.map(function (f) {
          return [f.rule + (f.advisory ? " (advisory)" : ""), f.where, f.message];
        })));
      } else {
        m.appendChild(el("p", null, "No findings."));
      }
      m.appendChild(el("p", "rbx-src", r.impeccable.command + " · raw: reports/impeccable.json"));
      sec.appendChild(m);
    }
    document.body.appendChild(sec);
  }

  /* ---------- Toggle ---------- */
  function buildToggle() {
    var lab = el("label", "rbx rbx-toggle");
    var cb = el("input");
    cb.type = "checkbox";
    cb.checked = readShow();
    lab.appendChild(cb);
    lab.appendChild(document.createTextNode(" Show changes"));
    function apply() {
      root.classList.toggle("rbx-off", !cb.checked);
      if (!cb.checked && pop) hidePop();
      schedule();
    }
    cb.addEventListener("change", function () {
      writeShow(cb.checked);
      apply();
    });
    document.body.appendChild(lab);
    apply();
  }

  function start() {
    buildBar();
    buildPins();
    buildReports();
    buildToggle();
    schedule();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();

#!/usr/bin/env python3
"""Build presenter overlay data, crops, screenshots and reports for roombook-steps.

Usage: BUILD_TMP=/tmp/rb python3 tools/build.py [shots] [reports] [overlay] | [snyk]   (no args = all; "snyk" reruns only Snyk)
       BUILD_TMP=/tmp/rb python3 tools/gen_docs.py
Needs: the static server on 127.0.0.1:5179 serving roombook-steps, Google Chrome, Node, Pillow,
an authenticated Snyk CLI (SNYK_BIN, default "snyk") and the Impeccable CLI (IMPECCABLE_BIN).
Every path written into the reports is relative to its step folder.
"""
import collections
import json
import os
import shutil
import subprocess
import tempfile
import sys

from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)  # roombook-steps/
BASE = "http://127.0.0.1:5179/"
SNYK = os.environ.get("SNYK_BIN", "snyk")
IMP = os.environ.get("IMPECCABLE_BIN", os.path.expanduser("~/.claude/skills/impeccable/scripts/impeccable"))
OVERLAY_FILES = ["changes.css", "changes.js", "changes.data.js"]
EXCLUDE = set(OVERLAY_FILES) | {"changes", "reports"}

VERSIONS = [
    ("00-original", "00", "Original", "The vibe-coded starting point: every slop category is still here."),
    ("01-pills", "01", "Pills", "Removed badges, chips and pills that carry no information; availability stays as plain coloured text."),
    ("02-clutter", "02", "Clutter and copy", "Dropped eyebrows, subtitles, stats, logos, testimonials and the CTA band, and rewrote the marketing copy in plain words."),
    ("03-spacing", "03", "Spacing", "Put every padding, margin and gap on one 4/8px scale, aligned the room grid and gave the sections one rhythm."),
    ("04-design-system", "04", "Design system", "Added design tokens, one font family, one button component and one radius scale; removed gradients, glass, glows and emoji icons."),
    ("05-contrast", "05", "Contrast and accessibility", "Raised contrast to WCAG AA, set minimum text sizes, and added real buttons and links, labels, focus styles and landmarks."),
    ("06-final-mt", "06", "MT design system", "Applied the mytGPT MT (Material) design system: light and dark themes with a remembered toggle, photo room cards with a quiet status line, three per row, and a two-column booking area."),
]

CARD = lambda n: "#rooms-grid .room-card:nth-child(%d)" % n

# Each change: n, text, sel (pin anchor in this version), pos (tl|tr), b (selectors in previous
# version for the before crop), a (selectors in this version for the after crop), optional
# focus (selector focused before the shot, per side), aScheme (colour scheme for the after shot).
CHANGES = {
    "01-pills": [
        dict(text="Removed the 'AI-powered' badge from the logo", sel=".nav-logo", pos="tr", b=[".nav-logo"], a=[".nav-logo"]),
        dict(text="Removed the four hero chips", sel=".hero-actions", b=[".hero-badges", ".hero-actions"], a=[".hero-actions"]),
        dict(text="Removed the NEW and Popular badges from room cards", sel=CARD(1), pos="tr", b=[CARD(1)], a=[CARD(1)]),
        dict(text="Feature pills became a plain text list", sel=CARD(2) + " .room-features", b=[CARD(2)], a=[CARD(2)]),
        dict(text="Availability is plain coloured text, not a pill", sel=CARD(3) + " .room-status", b=[CARD(3)], a=[CARD(3)]),
        dict(text="Removed the 'Confirmed' pill from every booking row", sel="#my-bookings-list .booking-item:nth-child(1)", pos="tr", b=["#my-bookings-list"], a=["#my-bookings-list"]),
    ],
    "02-clutter": [
        dict(text="Eyebrow, buzzword headline and subtitle replaced by a plain title", sel=".hero-title", b=[".hero"], a=[".hero"]),
        dict(text="Removed the stats bar and the 'trusted by' logo row", sel="#rooms", b=[".stats-bar", ".trusted"], a=["#rooms .section-title", ".filter-bar"]),
        dict(text="Section eyebrows and subtitles removed; titles name the section", sel="#rooms .section-title", pos="tr", b=["#rooms .section-eyebrow", "#rooms .section-title", "#rooms .section-subtitle"], a=["#rooms .section-title"]),
        dict(text="Room taglines say what the room is for, not slogans", sel=CARD(1) + " .room-tagline", pos="tr", b=[CARD(1)], a=[CARD(1)]),
        dict(text="Removed the fake 'AI optimizes your booking' tip; plain labels", sel=".submit-booking-btn", b=[".booking-wrapper"], a=[".booking-wrapper"]),
        dict(text="Removed testimonials, the CTA band and the footer link columns", sel=".footer", b=[".testimonials", ".cta-section", ".footer"], a=[".footer"]),
    ],
    "03-spacing": [
        dict(text="Navbar padding and gaps on the 8px scale", sel=".nav-links", b=[".navbar"], a=[".navbar"]),
        dict(text="Room grid aligned: no 17px drop on even cards, equal 24px gaps", sel="#rooms-grid", pos="tr", b=["#rooms-grid"], a=["#rooms-grid"]),
        dict(text="Card padding and inner spacing from one scale (4/8/16)", sel=CARD(1), b=[CARD(1)], a=[CARD(1)]),
        dict(text="Form panel padding and field gaps unified", sel=".booking-wrapper", pos="tr", b=[".booking-wrapper"], a=[".booking-wrapper"]),
        dict(text="Sections share one rhythm: 64px top and bottom, 48px sides", sel="#my-bookings", b=["#my-bookings"], a=["#my-bookings"]),
    ],
    "04-design-system": [
        dict(text="One font family and tokens for colour, type, radius and spacing", sel=".nav-logo", pos="tr", b=[".navbar"], a=[".navbar"]),
        dict(text="Removed the gradient hero, gradient text and pulse animation", sel=".hero-title", b=[".hero"], a=[".hero"]),
        dict(text="One button component (.btn) replaces six button styles", sel=".hero-actions", pos="tr", b=[".hero-actions"], a=[".hero-actions"]),
        dict(text="Emoji icons removed from search, filters and content", sel=".filter-bar", b=[".filter-bar"], a=[".filter-bar"]),
        dict(text="Room card is one surface: nested cards, gradient and hover tilt removed", sel=CARD(1), pos="tr", b=[CARD(1)], a=[CARD(1)]),
        dict(text="Replaced placeholder art with real room photos (16:9, cover, responsive sizes)", sel=CARD(2) + " .room-image", b=[CARD(2) + " .room-image"], a=[CARD(2) + " .room-image"]),
        dict(text="Glass panel and nested form cards flattened", sel=".booking-wrapper", b=[".booking-wrapper"], a=[".booking-wrapper"]),
        dict(text="Booking rows: no side-tab border or inner box", sel="#my-bookings-list .booking-item:nth-child(1)", pos="tr", b=["#my-bookings-list"], a=["#my-bookings-list"]),
    ],
    "05-contrast": [
        dict(text="Nav items are real links and meet 4.5:1 contrast", sel=".nav-links", b=[".navbar"], a=[".navbar"]),
        dict(text="Visible focus ring (was outline: none)", sel=".hero-actions", pos="tr", b=[".hero-actions"], a=[".hero-actions"], focus=".hero-actions .btn-primary"),
        dict(text="Search has a label; filters are real buttons with a pressed state", sel=".filter-bar", b=[".filter-bar"], a=[".filter-bar"]),
        dict(text="Muted text and status colours darkened to WCAG AA", sel=CARD(1) + " .room-tagline", pos="tr", b=[CARD(1)], a=[CARD(1)]),
        dict(text="Every form field has a visible label; submit is a real button", sel=".booking-wrapper", pos="tr", b=[".booking-wrapper"], a=[".booking-wrapper"]),
        dict(text="Small text at least 12px, body 14px", sel="#my-bookings-list .booking-item:nth-child(1) .booking-details", b=["#my-bookings-list"], a=["#my-bookings-list"]),
        dict(text="Footer text readable on its dark band", sel=".footer", b=[".footer"], a=[".footer"]),
    ],
    "06-final-mt": [
        dict(text="56px header, inverted-ink accent button and a theme toggle", sel=".nav-cta", pos="tr", b=[".navbar"], a=[".navbar"]),
        dict(text="Page header in MT headline type, on one content width", sel=".hero-title", b=[".hero"], a=[".hero"]),
        dict(text="Search field with icon and plain placeholder; filters as one pill group on the same 40px line", sel=".search-field", b=[".filter-bar"], a=[".filter-bar"]),
        dict(text="Popular filter removed: nothing in the data backs it", sel=".filter-group", pos="tr", b=[".filter-bar"], a=[".filter-bar"]),
        dict(text="Room card: photo (or placeholder), name with a quiet status line, icon facts, one action at the bottom", sel=CARD(1), pos="tr", b=[CARD(1)], a=[CARD(1)]),
        dict(text="Booking form and My bookings side by side; outlined fields, submit right-aligned", sel=".booking-wrapper", pos="tr", b=[".booking-wrapper"], a=["#book", "#my-bookings"]),
        dict(text="Bookings are flat rows on hairline dividers", sel="#my-bookings-list .booking-item:nth-child(1)", pos="tr", b=["#my-bookings-list"], a=["#my-bookings-list"]),
        dict(text="Dark theme from MT tokens: follows the system, toggle remembers", sel=".theme-toggle", pos="tr", b=[".navbar", ".hero"], a=[".navbar", ".hero"], aScheme="dark"),
    ],
}

SNYK_NOTE = {
    "00-original": "Baseline for the code-level slop (eval, XSS, hardcoded secrets) that the code-review demo fixes.",
    "06-final-mt": "Step 06 changes the design only; the code-level slop stays on purpose for the code-review demo, so Snyk stays about flat.",
}
SNYK_NOTE_DEFAULT = "Steps 01 to 05 leave the code-level slop in place on purpose for the code-review demo, so Snyk stays about flat."
IMP_NOTE = {
    "06-final-mt": "overused-font (Inter) is kept on purpose: the MT design system names Inter as its interface font.",
}

SCRATCH = os.environ.get("BUILD_TMP") or tempfile.mkdtemp(prefix="roombook-build-")  # crop sources, scan copies
CDP = os.path.join(HERE, "cdp.mjs")


def run_cdp(jobs):
    path = os.path.join(SCRATCH, "jobs-build.json")
    with open(path, "w") as f:
        json.dump(jobs, f)
    out = subprocess.run(["node", CDP, path], capture_output=True, text=True, check=True).stdout
    return json.loads(out)


RECT_JS = r"""(function(specs){
  // Tight box: a bounded element (card, panel, field) narrower than the page keeps its own box;
  // a full-width container shrinks to the union of its visible content (text, controls, boxes).
  var vw = document.documentElement.clientWidth;
  function visibleBox(n) {
    if (/^(IMG|INPUT|SELECT|BUTTON|TEXTAREA|SVG)$/i.test(n.tagName)) return true;
    var cs = getComputedStyle(n);
    return cs.backgroundColor !== 'rgba(0, 0, 0, 0)' || cs.backgroundImage !== 'none' ||
      parseFloat(cs.borderTopWidth) > 0 || parseFloat(cs.borderLeftWidth) > 0 || cs.boxShadow !== 'none';
  }
  function add(u, r) {
    if (!r.width || !r.height) return u;
    var b = [r.left + scrollX, r.top + scrollY, r.right + scrollX, r.bottom + scrollY];
    return u ? [Math.min(u[0], b[0]), Math.min(u[1], b[1]), Math.max(u[2], b[2]), Math.max(u[3], b[3])] : b;
  }
  function tight(e) {
    var own = e.getBoundingClientRect();
    if (visibleBox(e) && own.width < vw * 0.9) return add(null, own);
    var u = null, w = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT), n;
    while ((n = w.nextNode())) {
      if (n.nodeType === 3) {
        if (!n.textContent.trim()) continue;
        var g = document.createRange(); g.selectNodeContents(n); u = add(u, g.getBoundingClientRect());
      } else {
        var r = n.getBoundingClientRect();
        if (visibleBox(n) && r.width < vw * 0.9) u = add(u, r);
      }
    }
    return u || add(null, own);
  }
  var out = {};
  specs.forEach(function(list){
    var key = list.join('|'); var u = null;
    list.forEach(function(s){
      var e = document.querySelector(s); if (!e) return;
      var t = tight(e); if (!t) return;
      u = u ? [Math.min(u[0],t[0]), Math.min(u[1],t[1]), Math.max(u[2],t[2]), Math.max(u[3],t[3])] : t;
    });
    out[key] = u;
  });
  return out;
})(%s)"""


def shots_and_crops():
    shots = os.path.join(ROOT, "shots")
    os.makedirs(shots, exist_ok=True)
    # Selectors each version needs as "previous" (b) and "current" (a).
    need = collections.defaultdict(list)
    for i, (d, *_rest) in enumerate(VERSIONS):
        for c in CHANGES.get(d, []):
            need[(d, c.get("aScheme", "light"), c.get("focus"))].append(c["a"])
            prev = VERSIONS[i - 1][0]
            need[(prev, "light", c.get("focus"))].append(c["b"])
    jobs, keys = [], []
    for d, *_rest in VERSIONS:
        schemes = ["light", "dark"] if d == "06-final-mt" else ["light"]
        for sc in schemes:
            for w in (1440, 400):
                jobs.append(dict(url=BASE + d + "/index.html?overlay=off", width=w, colorScheme=sc,
                                 out=os.path.join(shots, "%s-%d%s.png" % (d, w, "-dark" if sc == "dark" else "")),
                                 waitMs=800))
                keys.append(None)
    # Rect jobs (1440 only), one per (version, scheme, focus) with its own full-page shot for cropping.
    for (d, sc, focus), specs in need.items():
        tag = "%s-%s%s" % (d, sc, "-focus" if focus else "")
        job = dict(url=BASE + d + "/index.html?overlay=off", width=1440, colorScheme=sc,
                   out=os.path.join(SCRATCH, "crop-src", tag + ".png"), waitMs=800, dsf=2,
                   eval=RECT_JS % json.dumps(specs))
        if focus:
            job["tabFocus"] = focus
        jobs.append(job)
        keys.append((d, sc, focus))
    res = run_cdp(jobs)
    rects = {}
    for k, r in zip(keys, res):
        if r.get("errors"):
            print("page errors", r["url"], r["errors"][:1])
        if k:
            rects[k] = (r["out"], r["eval"])

    def crop(src_rects, specs, dest):
        src, rmap = src_rects
        u = rmap.get("|".join(specs))
        if not u:
            raise SystemExit("missing rect for %s in %s" % (specs, src))
        img = Image.open(src)
        k = img.width / 1440.0  # device pixels per CSS pixel (crops are captured at 2x)
        pad = 12
        x0, y0 = max(0, int((u[0] - pad) * k)), max(0, int((u[1] - pad) * k))
        x1, y1 = min(img.width, int((u[2] + pad) * k)), min(img.height, int((u[3] + pad) * k))
        y1 = min(y1, y0 + int(900 * k))
        c = img.crop((x0, y0, x1, y1))
        c.save(dest, optimize=True)

    for i, (d, *_rest) in enumerate(VERSIONS):
        if d not in CHANGES:
            continue
        cdir = os.path.join(ROOT, d, "changes")
        shutil.rmtree(cdir, ignore_errors=True)
        os.makedirs(cdir)
        prev = VERSIONS[i - 1][0]
        for n, c in enumerate(CHANGES[d], 1):
            crop(rects[(prev, "light", c.get("focus"))], c["b"], os.path.join(cdir, "%d-before.png" % n))
            crop(rects[(d, c.get("aScheme", "light"), c.get("focus"))], c["a"], os.path.join(cdir, "%d-after.png" % n))
    print("shots and crops done")


def scan_copy(d):
    dst = os.path.join(SCRATCH, "scan", d)
    shutil.rmtree(dst, ignore_errors=True)
    shutil.copytree(os.path.join(ROOT, d), dst, ignore=lambda _dir, names: [x for x in names if x in EXCLUDE])
    return dst


SEV = {"error": "High", "warning": "Medium", "note": "Low"}


def relativize(obj, d, src):
    """Make every path in tool output relative to the step folder (the folder is published)."""
    prefixes = [(src.rstrip("/") + "/", ""), ("file://" + src.rstrip("/") + "/", ""), ("file://" + src.rstrip("/"), "."),
                (src.rstrip("/"), "."), (BASE + d + "/", ""), (BASE, "")]
    if isinstance(obj, dict):
        return {k: relativize(v, d, src) for k, v in obj.items()}
    if isinstance(obj, list):
        return [relativize(v, d, src) for v in obj]
    if isinstance(obj, str):
        for p, r in prefixes:
            obj = obj.replace(p, r)
        return obj
    return obj


def assert_no_home(path):
    text = open(path).read()
    for bad in (os.path.expanduser("~"), "/Users/", "/private/", "/var/folders/", os.environ.get("USER", "\0")):
        if bad and bad in text:
            raise SystemExit("absolute path or user name left in %s: %s" % (path, bad))


def snyk_report(d):
    rdir = os.path.join(ROOT, d, "reports")
    os.makedirs(rdir, exist_ok=True)
    src = scan_copy(d)
    p = subprocess.run([SNYK, "code", "test", src, "--json"], capture_output=True, text=True)
    raw = relativize(json.loads(p.stdout), d, src)
    with open(os.path.join(rdir, "snyk.json"), "w") as f:
        json.dump(raw, f, indent=1)
    assert_no_home(os.path.join(rdir, "snyk.json"))
    run = raw["runs"][0]
    rules = {r["id"]: r for r in run["tool"]["driver"]["rules"]}
    findings = []
    for r in run["results"]:
        loc = r["locations"][0]["physicalLocation"]
        rule = rules.get(r["ruleId"], {})
        findings.append(dict(severity=SEV.get(r["level"], r["level"]),
                             rule=(rule.get("shortDescription") or {}).get("text", r["ruleId"]),
                             file=loc["artifactLocation"]["uri"], line=loc["region"]["startLine"],
                             message=r["message"]["text"]))
    order = {"High": 0, "Medium": 1, "Low": 2}
    findings.sort(key=lambda f: (order.get(f["severity"], 9), f["file"], f["line"]))
    by_sev = collections.OrderedDict((k, sum(1 for f in findings if f["severity"] == k)) for k in ("High", "Medium", "Low"))
    return dict(total=len(findings), bySeverity=by_sev, findings=findings,
                command="snyk code test <step dir without overlay files> --json")


def snyk_only():
    """Rerun only Snyk for every version and refresh the summary and overlay data."""
    summary = json.load(open(os.path.join(SCRATCH, "reports-summary.json")))
    prev = None
    for d, *_rest in VERSIONS:
        s = snyk_report(d)
        s["prevTotal"] = summary[prev]["snyk"]["total"] if prev else None
        s["note"] = SNYK_NOTE.get(d, SNYK_NOTE_DEFAULT)
        summary[d]["snyk"] = s
        print(d, "snyk", s["total"], dict(s["bySeverity"]))
        prev = d
    with open(os.path.join(SCRATCH, "reports-summary.json"), "w") as f:
        json.dump(summary, f, indent=1)
    return summary


def reports():
    summary = {}
    for d, *_rest in VERSIONS:
        rdir = os.path.join(ROOT, d, "reports")
        os.makedirs(rdir, exist_ok=True)
        src = scan_copy(d)
        p = subprocess.run([SNYK, "code", "test", src, "--json"], capture_output=True, text=True)
        raw = relativize(json.loads(p.stdout), d, src)
        with open(os.path.join(rdir, "snyk.json"), "w") as f:
            json.dump(raw, f, indent=1)
        assert_no_home(os.path.join(rdir, "snyk.json"))
        run = raw["runs"][0]
        rules = {r["id"]: r for r in run["tool"]["driver"]["rules"]}
        findings = []
        for r in run["results"]:
            loc = r["locations"][0]["physicalLocation"]
            rule = rules.get(r["ruleId"], {})
            findings.append(dict(severity=SEV.get(r["level"], r["level"]),
                                 rule=(rule.get("shortDescription") or {}).get("text", r["ruleId"]),
                                 file=loc["artifactLocation"]["uri"], line=loc["region"]["startLine"],
                                 message=r["message"]["text"]))
        order = {"High": 0, "Medium": 1, "Low": 2}
        findings.sort(key=lambda f: (order.get(f["severity"], 9), f["file"], f["line"]))
        by_sev = collections.OrderedDict((k, sum(1 for f in findings if f["severity"] == k)) for k in ("High", "Medium", "Low"))

        url = BASE + d + "/index.html?overlay=off"
        p = subprocess.run([IMP, "detect", "--no-config", "--json", "--viewport", "1440x900", url], capture_output=True, text=True)
        imp = relativize(json.loads(p.stdout or "[]"), d, src)
        with open(os.path.join(rdir, "impeccable.json"), "w") as f:
            json.dump(imp, f, indent=1)
        assert_no_home(os.path.join(rdir, "impeccable.json"))
        p2 = subprocess.run([IMP, "detect", "--no-config", "--json", src], capture_output=True, text=True)
        imp_src = relativize(json.loads(p2.stdout or "[]"), d, src)
        with open(os.path.join(rdir, "impeccable-source.json"), "w") as f:
            json.dump(imp_src, f, indent=1)
        assert_no_home(os.path.join(rdir, "impeccable-source.json"))
        ifind = [dict(rule=x["antipattern"], advisory=bool(x.get("advisory")),
                      where=x.get("selector") or ("%s:%s" % (os.path.basename(x.get("file", "")), x.get("line"))),
                      message=x.get("snippet") or x.get("name")) for x in imp]
        ifind.sort(key=lambda f: (f["advisory"], f["rule"]))
        by_rule = collections.Counter(f["rule"] for f in ifind)
        summary[d] = dict(
            snyk=dict(total=len(findings), bySeverity=by_sev, findings=findings,
                      command='snyk code test <step dir without overlay files> --json'),
            impeccable=dict(total=len(ifind), failing=sum(1 for f in ifind if not f["advisory"]),
                            advisory=sum(1 for f in ifind if f["advisory"]),
                            byRule=dict(by_rule.most_common()), findings=ifind,
                            command='impeccable detect --no-config --json --viewport 1440x900 <served page>?overlay=off',
                            sourceTotal=len(imp_src)),
        )
        print(d, "snyk", len(findings), "impeccable", len(ifind), "source", len(imp_src))
    prev = None
    for d, *_rest in VERSIONS:
        s = summary[d]
        s["snyk"]["prevTotal"] = summary[prev]["snyk"]["total"] if prev else None
        s["impeccable"]["prevTotal"] = summary[prev]["impeccable"]["total"] if prev else None
        s["impeccable"]["prevSource"] = summary[prev]["impeccable"]["sourceTotal"] if prev else None
        s["snyk"]["note"] = SNYK_NOTE.get(d, SNYK_NOTE_DEFAULT)
        if d in IMP_NOTE:
            s["impeccable"]["note"] = IMP_NOTE[d]
        prev = d
    with open(os.path.join(SCRATCH, "reports-summary.json"), "w") as f:
        json.dump(summary, f, indent=1)
    return summary


def overlay(summary):
    for i, (d, short, name, sumtext) in enumerate(VERSIONS):
        vdir = os.path.join(ROOT, d)
        prev = VERSIONS[i - 1] if i > 0 else None
        nxt = VERSIONS[i + 1] if i + 1 < len(VERSIONS) else None
        changes = []
        for n, c in enumerate(CHANGES.get(d, []), 1):
            changes.append(dict(n=n, text=c["text"], sel=c["sel"], pos=c.get("pos", "tl"),
                                before="changes/%d-before.png" % n, after="changes/%d-after.png" % n))
        data = dict(dir=d, short=short, label=("Original" if i == 0 else "Step %s · %s" % (short, name)),
                    summary=sumtext,
                    prev=dict(dir=prev[0], short=prev[1]) if prev else None,
                    next=dict(dir=nxt[0], short=nxt[1]) if nxt else None,
                    changes=changes, reports=summary[d])
        with open(os.path.join(vdir, "changes.data.js"), "w") as f:
            f.write("/* Presenter overlay data (generated). Not part of the app. */\nwindow.RBX = ")
            json.dump(data, f, indent=1, ensure_ascii=False)
            f.write(";\n")
        assert_no_home(os.path.join(vdir, "changes.data.js"))
        for fn in ("changes.css", "changes.js"):
            shutil.copy(os.path.join(HERE, "overlay", fn), os.path.join(vdir, fn))
        idx = os.path.join(vdir, "index.html")
        h = open(idx).read()
        if "changes.css" not in h:
            h = h.replace("</head>", '  <link rel="stylesheet" href="changes.css"><!-- presenter overlay -->\n</head>', 1)
            h = h.replace("</body>", '  <!-- presenter overlay, not part of the app -->\n  <script src="changes.data.js"></script>\n  <script src="changes.js"></script>\n</body>', 1)
            open(idx, "w").write(h)
    print("overlay written")


PHOTO_STEPS = ["04-design-system", "05-contrast", "06-final-mt"]


def copy_photos():
    """Optimised copies of ../room-photos/room-*.png for steps 04 to 06: images/room-x.jpg (1200w) and -600.jpg."""
    src = os.path.join(os.path.dirname(ROOT), "room-photos")
    if not os.path.isdir(src):
        return
    for step in PHOTO_STEPS:
        dst = os.path.join(ROOT, step, "images")
        os.makedirs(dst, exist_ok=True)
        for f in sorted(os.listdir(src)):
            if not (f.startswith("room-") and f.endswith(".png")):
                continue
            base = f[:-4]
            srcf = os.path.join(src, f)
            for width, suffix, q in ((1200, "", 72), (600, "-600", 74)):
                out = os.path.join(dst, base + suffix + ".jpg")
                if os.path.exists(out) and os.path.getmtime(out) >= os.path.getmtime(srcf):
                    continue
                im = Image.open(srcf).convert("RGB")
                im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
                im.save(out, "JPEG", quality=q, optimize=True, progressive=True)
                print("photo", step, os.path.basename(out), os.path.getsize(out) // 1024, "KB")


if __name__ == "__main__":
    steps = sys.argv[1:] or ["shots", "reports", "overlay"]
    if steps == ["snyk"]:
        overlay(snyk_only())
        sys.exit(0)
    copy_photos()
    if "shots" in steps:
        shots_and_crops()
    summary = None
    if "reports" in steps:
        summary = reports()
    if "overlay" in steps:
        if summary is None:
            summary = json.load(open(os.path.join(SCRATCH, "reports-summary.json")))
        overlay(summary)

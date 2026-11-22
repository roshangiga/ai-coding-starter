#!/usr/bin/env python3
"""Write roombook-steps/index.html and README.md from the report summary."""
import html
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SUMMARY = os.path.join(os.environ.get("BUILD_TMP", ""), "reports-summary.json")
if not os.environ.get("BUILD_TMP") or not os.path.exists(SUMMARY):
    raise SystemExit("Set BUILD_TMP to the folder build.py used; it writes reports-summary.json there.")
S = json.load(open(SUMMARY))

ROWS = [
    ("00-original", "Original", "The vibe-coded starting point: every slop category is present."),
    ("01-pills", "01 Pills", "Removed badges, chips and pills with no information; availability is plain coloured text."),
    ("02-clutter", "02 Clutter", "Removed eyebrows, subtitles, stats, logos, testimonials and the CTA band; plain copy."),
    ("03-spacing", "03 Spacing", "One 4/8px spacing scale, aligned room grid, one section rhythm."),
    ("04-design-system", "04 Design system", "Tokens, one font, one button component, one radius scale; no gradients, glass or emoji."),
    ("05-contrast", "05 Contrast", "WCAG AA contrast, 14px/12px minimum text, real buttons and links, labels, focus styles."),
    ("06-final-mt", "06 Final MT", "MT (Material) design system from mytGPT: light and dark themes, photo room cards with a quiet status line, two-column booking area."),
]


def counts(d):
    s = S[d]
    imp, sn = s["impeccable"], s["snyk"]
    return imp["total"], imp["failing"], imp["advisory"], imp["sourceTotal"], sn["total"], sn["bySeverity"]


def delta(prev, cur):
    if prev is None:
        return str(cur)
    dd = cur - prev
    return "%d (%s%d)" % (cur, "+" if dd > 0 else "−" if dd < 0 else "±", abs(dd))


items = []
prev = None
for d, name, line in ROWS:
    it, fail, adv, src, sn, sev = counts(d)
    pit = counts(prev)[0] if prev else None
    psn = counts(prev)[4] if prev else None
    items.append((d, name, line, it, fail, adv, src, sn, sev, pit, psn))
    prev = d

li = "\n".join(
    '      <li>\n        <a href="%s/index.html">%s</a>\n        <p>%s</p>\n        <p class="counts">Impeccable %s findings (%d counted, %d advisory) &middot; Snyk %s issues</p>\n      </li>'
    % (d, html.escape(name), html.escape(line), delta(pit, it), fail, adv, delta(psn, sn))
    for d, name, line, it, fail, adv, src, sn, sev, pit, psn in items
)

page = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RoomBook cleanup steps</title>
  <style>
    :root { color-scheme: light dark; --bg: #ffffff; --text: #171c21; --muted: #4b5563; --line: rgba(23, 28, 33, 0.12); --link: #0066a0; }
    @media (prefers-color-scheme: dark) { :root { --bg: #0d0d0d; --text: #f2f4f7; --muted: #b9c0c9; --line: rgba(242, 244, 247, 0.14); --link: #7fcfff; } }
    body { margin: 0; background: var(--bg); color: var(--text); font: 16px/1.5 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }
    main { max-width: 44rem; margin: 0 auto; padding: 48px 16px; }
    h1 { margin: 0 0 8px; font-size: 1.75rem; }
    .lead { margin: 0 0 32px; color: var(--muted); }
    ol { margin: 0; padding: 0; list-style: none; }
    li { padding: 16px 0; border-top: 1px solid var(--line); }
    li a { color: var(--link); font-weight: 600; font-size: 1.125rem; }
    li p { margin: 4px 0 0; }
    .counts { color: var(--muted); font-size: 0.875rem; font-variant-numeric: tabular-nums; }
    a:focus-visible { outline: 2px solid var(--link); outline-offset: 2px; }
    footer { margin-top: 32px; color: var(--muted); font-size: 0.875rem; }
  </style>
</head>
<body>
  <main>
    <h1>RoomBook cleanup steps</h1>
    <p class="lead">The same meeting-room booking app, cleaned up one kind of slop at a time. Each step keeps every earlier fix. Counts are from the served page at 1440px, without the presenter overlay; the change in brackets is against the previous version.</p>
    <ol>
%s
    </ol>
    <footer>Snyk stays about flat on purpose: the code-level slop (eval, XSS, secrets, the overlap bug, fake tests) is left for the code-review demo. Each page has a presenter overlay with numbered change pins and the full reports below its footer; untick "Show changes" to hide it.</footer>
  </main>
</body>
</html>
""" % li
open(os.path.join(ROOT, "index.html"), "w").write(page)

table = "\n".join(
    "| `%s` | %s | %s | %d | %d | %d | %s | %d/%d/%d |" % (
        d, line, delta(pit, it), fail, adv, src, delta(psn, sn), sev["High"], sev["Medium"], sev["Low"])
    for d, name, line, it, fail, adv, src, sn, sev, pit, psn in items
)

readme = """# RoomBook cleanup steps

The RoomBook demo app (`../roombook`, untouched) in seven standalone static copies: the original, then one step per slop category. Each step contains every earlier fix and nothing from later steps. Page structure and features stay the same, so screenshots compare side by side.

## Serve

```bash
python3 -m http.server 5179 --bind 127.0.0.1 --directory roombook-steps
```

Then open http://127.0.0.1:5179/ (the index links every version). The `roombook-steps` entry in `.claude/launch.json` runs the same command. No build step.

## Steps and finding counts

Impeccable: `impeccable detect --no-config --json --viewport 1440x900` on the served page with `?overlay=off`. "Counted" are failures; "advisory" are listed separately by the tool and never counted as failures. "Source" is the same detector on the step's files (regex scan of html/css/js, overlay files excluded); it cannot see the JS-rendered room cards, so it undercounts.
Snyk: `snyk code test <step> --json` on a copy of the step without the overlay files. High/Medium/Low.

| Version | What it fixes | Impeccable total (change) | Counted | Advisory | Impeccable source scan | Snyk (change) | Snyk H/M/L |
|---|---|---|---|---|---|---|---|
%s

Snyk stays about flat on purpose: steps 01 to 06 leave the code-level slop (eval, XSS, swallowed catch, hardcoded secrets, the overlap bug, fake tests) for the live code-review and Snyk demo. Line numbers move as `app.js` changes, so the same findings show at new lines.

Step 06 keeps one Impeccable finding on purpose: `overused-font` (Inter). The MT design system names Inter as the interface font, and the brief wins over the detector's taste.

## Presenter overlay

Every version loads three extra files that are not part of the app: `changes.css`, `changes.js` and `changes.data.js`.

- A header bar before the app: step name, one-line summary, the numbered list of changes, Impeccable and Snyk counts with the change against the previous version, and links to the previous step, the index, the next step and the reports. On narrow screens the list folds behind a "Changes" button.
- Numbered pins on each changed spot. Hover, focus or tap a pin for a popover with a before and after crop (`<step>/changes/<n>-before.png` and `-after.png`, cropped from the 1440px screenshots of the previous and current version).
- Below the app's footer, "Reports for this version": Snyk first, then Impeccable, rendered from the summarised tool output. Raw output is in `<step>/reports/snyk.json`, `impeccable.json` (served page) and `impeccable-source.json` (files).
- A fixed "Show changes" switch (bottom right, on by default, remembered) hides all of it. Add `?overlay=off` to the URL to load a page without the overlay at all; screenshots and scans use that.

## Screenshots

`shots/` has every version at 1440px and 400px wide (full page, overlay off), and step 06 in light and dark.

## Rebuild

`tools/` holds the generator: `build.py` (screenshots, before and after crops, Snyk and Impeccable reports, overlay data), `gen_docs.py` (this README and `index.html`), `cdp.mjs` (a small headless Chrome driver) and `overlay/` (the master copies of `changes.css` and `changes.js`). With the server above running:

```bash
BUILD_TMP=/tmp/roombook-build python3 tools/build.py && BUILD_TMP=/tmp/roombook-build python3 tools/gen_docs.py
```

It needs Node, Google Chrome, Pillow, an authenticated Snyk CLI (`SNYK_BIN`) and the Impeccable CLI (`IMPECCABLE_BIN`). Every path it writes into the reports is relative to the step folder; the build stops if a home path or user name slips through.

## Notes

- `00-original` is a copy of `../roombook` without `.git`, with two additions: the overlay tags in its `index.html`, and the room photos in place of the original's SVG placeholder art.
- Every version shows the real room photos, made by the build from `../room-photos/*.png`. Steps 00 to 03 use them the vibe-coded way: one full-size 1600px JPG per room (`images/room-<letter>.jpg`, about 300 KB each), no `srcset`, no size hints, no alt text, inside each step's own card styles. Step 04 puts them in fixed 16:9 boxes with `object-fit: cover` and serves resized copies (1200px and 600px) through `srcset`. Alt text (room name and purpose) arrives in step 05, the accessibility step. In step 06 a card whose photo is missing shows a neutral placeholder.
- Step 06 drops the "Popular" filter, which no data backs; the `isPopular` flag and its render function stay in `app.js` with the rest of the code-level slop.
- Step 04 uses the system font stack as its one family (an internal tool needs no font download); step 06 switches to Inter because the MT design system uses it.
""" % table
open(os.path.join(ROOT, "README.md"), "w").write(readme)
print("docs written")

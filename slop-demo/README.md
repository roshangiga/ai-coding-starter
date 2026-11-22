# RoomBook cleanup steps

The RoomBook demo app in seven standalone static copies: the original, then one step per slop category. Each step contains every earlier fix and nothing from later steps. Page structure and features stay the same, so screenshots compare side by side.

## Serve

```bash
python3 -m http.server 5179 --bind 127.0.0.1 --directory slop-demo
```

Then open http://127.0.0.1:5179/ (the index links every version). Or just double-click `index.html`: no server or build step needed.

## Steps and finding counts

Impeccable: `impeccable detect --no-config --json --viewport 1440x900` on the served page with `?overlay=off`. "Counted" are failures; "advisory" are listed separately by the tool and never counted as failures. "Source" is the same detector on the step's files (regex scan of html/css/js, overlay files excluded); it cannot see the JS-rendered room cards, so it undercounts.
Snyk: `snyk code test <step> --json` on a copy of the step without the overlay files. High/Medium/Low.

| Version | What it fixes | Impeccable total (change) | Counted | Advisory | Impeccable source scan | Snyk (change) | Snyk H/M/L |
|---|---|---|---|---|---|---|---|
| `00-original` | The vibe-coded starting point: every slop category is present. | 122 | 104 | 18 | 84 | 8 | 7/1/0 |
| `01-pills` | Removed badges, chips and pills with no information; availability is plain coloured text. | 90 (−32) | 72 | 18 | 81 | 8 (±0) | 7/1/0 |
| `02-clutter` | Removed eyebrows, subtitles, stats, logos, testimonials and the CTA band; plain copy. | 39 (−51) | 33 | 6 | 27 | 8 (±0) | 7/1/0 |
| `03-spacing` | One 4/8px spacing scale, aligned room grid, one section rhythm. | 39 (±0) | 33 | 6 | 27 | 8 (±0) | 7/1/0 |
| `04-design-system` | Tokens, one font, one button component, one radius scale; no gradients, glass or emoji. | 10 (−29) | 10 | 0 | 6 | 8 (±0) | 7/1/0 |
| `05-contrast` | WCAG AA contrast, 14px/12px minimum text, real buttons and links, labels, focus styles. | 0 (−10) | 0 | 0 | 0 | 8 (±0) | 7/1/0 |
| `06-final-mt` | MT (Material) design system from mytGPT: light and dark themes, photo room cards with a quiet status line, two-column booking area. | 1 (+1) | 1 | 0 | 1 | 8 (±0) | 7/1/0 |

Snyk stays about flat on purpose: steps 01 to 06 leave the code-level slop (eval, XSS, swallowed catch, hardcoded secrets, the overlap bug, fake tests) for the live code-review and Snyk demo. Line numbers move as `app.js` changes, so the same findings show at new lines.

Step 06 keeps one Impeccable finding on purpose: `overused-font` (Inter). The MT design system names Inter as the interface font, and the brief wins over the detector's taste.

## Presenter overlay

Every version loads three extra files that are not part of the app: `changes.css`, `changes.js` and `changes.data.js`.

- A header bar before the app: step name, one-line summary, the numbered list of changes, Impeccable and Snyk counts with the change against the previous version, and links to the previous step, the index, the next step and the reports. On narrow screens the list folds behind a "Changes" button.
- Numbered pins on each changed spot. Hover, focus or tap a pin for a popover with a before and after crop (`<step>/changes/<n>-before.png` and `-after.png`, cropped from the 1440px screenshots of the previous and current version).
- Below the app's footer, "Reports for this version": Snyk first, then Impeccable, rendered from the summarised tool output. Raw output is in `<step>/reports/snyk.json`, `impeccable.json` (served page) and `impeccable-source.json` (files).
- A fixed "Show changes" switch (bottom right, on by default, remembered) hides all of it. Add `?overlay=off` to the URL to load a page without the overlay at all; screenshots and scans use that.


## Rebuild

`tools/` holds the generator: `build.py` (screenshots, before and after crops, Snyk and Impeccable reports, overlay data), `gen_docs.py` (this README and `index.html`), `cdp.mjs` (a small headless Chrome driver) and `overlay/` (the master copies of `changes.css` and `changes.js`). With the server above running:

```bash
BUILD_TMP=/tmp/roombook-build python3 tools/build.py && BUILD_TMP=/tmp/roombook-build python3 tools/gen_docs.py
```

It needs Node, Google Chrome, Pillow, an authenticated Snyk CLI (`SNYK_BIN`) and the Impeccable CLI (`IMPECCABLE_BIN`). Every path it writes into the reports is relative to the step folder; the build stops if a home path or user name slips through.

## Notes

- `00-original` is the vibe-coded app as generated; only the overlay tags were added to its `index.html`.
- The original's room images never render: the SVG data URI contains unescaped single quotes inside a single-quoted `src`. Steps 01 to 03 keep that as found; step 04 replaces them with the real photos.
- Steps 04 to 06 show the real room photos: `images/room-<letter>.jpg` (1200px) and `-600.jpg`, made from `../room-photos/` by the build and served with `srcset`, in fixed 16:9 boxes with `object-fit: cover`. Steps 00 to 03 keep the original placeholder art. Alt text (room name and purpose) arrives in step 05, the accessibility step. In step 06 a card whose photo is missing shows a neutral placeholder.
- Step 06 drops the "Popular" filter, which no data backs; the `isPopular` flag and its render function stay in `app.js` with the rest of the code-level slop.
- Step 04 uses the system font stack as its one family (an internal tool needs no font download); step 06 switches to Inter because the MT design system uses it.

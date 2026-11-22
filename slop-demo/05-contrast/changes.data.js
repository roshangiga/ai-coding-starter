/* Presenter overlay data (generated). Not part of the app. */
window.RBX = {
 "dir": "05-contrast",
 "short": "05",
 "label": "Step 05 · Contrast and accessibility",
 "summary": "Raised contrast to WCAG AA, set minimum text sizes, and added real buttons and links, labels, focus styles and landmarks.",
 "prev": {
  "dir": "04-design-system",
  "short": "04"
 },
 "next": {
  "dir": "06-final-mt",
  "short": "06"
 },
 "changes": [
  {
   "n": 1,
   "text": "Nav items are real links and meet 4.5:1 contrast",
   "sel": ".nav-links",
   "pos": "tl",
   "before": "changes/1-before.png",
   "after": "changes/1-after.png"
  },
  {
   "n": 2,
   "text": "Visible focus ring (was outline: none)",
   "sel": ".hero-actions",
   "pos": "tr",
   "before": "changes/2-before.png",
   "after": "changes/2-after.png"
  },
  {
   "n": 3,
   "text": "Search has a label; filters are real buttons with a pressed state",
   "sel": ".filter-bar",
   "pos": "tl",
   "before": "changes/3-before.png",
   "after": "changes/3-after.png"
  },
  {
   "n": 4,
   "text": "Muted text and status colours darkened to WCAG AA",
   "sel": "#rooms-grid .room-card:nth-child(1) .room-tagline",
   "pos": "tr",
   "before": "changes/4-before.png",
   "after": "changes/4-after.png"
  },
  {
   "n": 5,
   "text": "Every form field has a visible label; submit is a real button",
   "sel": ".booking-wrapper",
   "pos": "tr",
   "before": "changes/5-before.png",
   "after": "changes/5-after.png"
  },
  {
   "n": 6,
   "text": "Small text at least 12px, body 14px",
   "sel": "#my-bookings-list .booking-item:nth-child(1) .booking-details",
   "pos": "tl",
   "before": "changes/6-before.png",
   "after": "changes/6-after.png"
  },
  {
   "n": 7,
   "text": "Footer text readable on its dark band",
   "sel": ".footer",
   "pos": "tl",
   "before": "changes/7-before.png",
   "after": "changes/7-after.png"
  }
 ],
 "reports": {
  "snyk": {
   "total": 8,
   "bySeverity": {
    "High": 7,
    "Medium": 1,
    "Low": 0
   },
   "findings": [
    {
     "severity": "High",
     "rule": "DOM-based Cross-site Scripting (XSS)",
     "file": "app.js",
     "line": 135,
     "message": "Unsanitized input from the document location flows into innerHTML, where it is used to dynamically construct the HTML page on client side. This may result in a DOM Based Cross-Site Scripting attack (DOMXSS)."
    },
    {
     "severity": "High",
     "rule": "Code Injection",
     "file": "app.js",
     "line": 372,
     "message": "Unsanitized input from the document location flows into eval, where it is executed as JavaScript code. This may result in a Code Injection vulnerability."
    },
    {
     "severity": "High",
     "rule": "DOM-based Cross-site Scripting (XSS)",
     "file": "app.js",
     "line": 399,
     "message": "Unsanitized input from the document location flows into innerHTML, where it is used to dynamically construct the HTML page on client side. This may result in a DOM Based Cross-Site Scripting attack (DOMXSS)."
    },
    {
     "severity": "High",
     "rule": "Hardcoded Non-Cryptographic Secret",
     "file": "config.js",
     "line": 6,
     "message": "Avoid hardcoding values that are meant to be secret. Found a hardcoded string used in here."
    },
    {
     "severity": "High",
     "rule": "Hardcoded Non-Cryptographic Secret",
     "file": "config.js",
     "line": 7,
     "message": "Avoid hardcoding values that are meant to be secret. Found a hardcoded string used in here."
    },
    {
     "severity": "High",
     "rule": "Hardcoded Non-Cryptographic Secret",
     "file": "config.js",
     "line": 8,
     "message": "Avoid hardcoding values that are meant to be secret. Found a hardcoded string used in here."
    },
    {
     "severity": "High",
     "rule": "Hardcoded Non-Cryptographic Secret",
     "file": "config.js",
     "line": 9,
     "message": "Avoid hardcoding values that are meant to be secret. Found a hardcoded string used in here."
    },
    {
     "severity": "Medium",
     "rule": "DOM-based Cross-site Scripting (XSS)",
     "file": "app.js",
     "line": 579,
     "message": "Unsanitized input from browser storage flows into innerHTML, where it is used to dynamically construct the HTML page on client side. This may result in a DOM Based Cross-Site Scripting attack (DOMXSS)."
    }
   ],
   "command": "snyk code test <step dir without overlay files> --json",
   "prevTotal": 8,
   "note": "Steps 01 to 05 leave the code-level slop in place on purpose for the code-review demo, so Snyk stays about flat."
  },
  "impeccable": {
   "total": 0,
   "failing": 0,
   "advisory": 0,
   "byRule": {},
   "findings": [],
   "command": "impeccable detect --no-config --json --viewport 1440x900 <served page>?overlay=off",
   "sourceTotal": 0,
   "prevTotal": 10,
   "prevSource": 6
  }
 }
};

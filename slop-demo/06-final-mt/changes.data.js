/* Presenter overlay data (generated). Not part of the app. */
window.RBX = {
 "dir": "06-final-mt",
 "short": "06",
 "label": "Step 06 · MT design system",
 "summary": "Applied the mytGPT MT (Material) design system: light and dark themes with a remembered toggle, photo room cards with a quiet status line, three per row, and a two-column booking area.",
 "prev": {
  "dir": "05-contrast",
  "short": "05"
 },
 "next": null,
 "changes": [
  {
   "n": 1,
   "text": "56px header, inverted-ink accent button and a theme toggle",
   "sel": ".nav-cta",
   "pos": "tr",
   "before": "changes/1-before.png",
   "after": "changes/1-after.png"
  },
  {
   "n": 2,
   "text": "Page header in MT headline type, on one content width",
   "sel": ".hero-title",
   "pos": "tl",
   "before": "changes/2-before.png",
   "after": "changes/2-after.png"
  },
  {
   "n": 3,
   "text": "Search field with icon and plain placeholder; filters as one pill group on the same 40px line",
   "sel": ".search-field",
   "pos": "tl",
   "before": "changes/3-before.png",
   "after": "changes/3-after.png"
  },
  {
   "n": 4,
   "text": "Popular filter removed: nothing in the data backs it",
   "sel": ".filter-group",
   "pos": "tr",
   "before": "changes/4-before.png",
   "after": "changes/4-after.png"
  },
  {
   "n": 5,
   "text": "Room card: photo (or placeholder), name with a quiet status line, icon facts, one action at the bottom",
   "sel": "#rooms-grid .room-card:nth-child(1)",
   "pos": "tr",
   "before": "changes/5-before.png",
   "after": "changes/5-after.png"
  },
  {
   "n": 6,
   "text": "Booking form and My bookings side by side; outlined fields, submit right-aligned",
   "sel": ".booking-wrapper",
   "pos": "tr",
   "before": "changes/6-before.png",
   "after": "changes/6-after.png"
  },
  {
   "n": 7,
   "text": "Bookings are flat rows on hairline dividers",
   "sel": "#my-bookings-list .booking-item:nth-child(1)",
   "pos": "tr",
   "before": "changes/7-before.png",
   "after": "changes/7-after.png"
  },
  {
   "n": 8,
   "text": "Dark theme from MT tokens: follows the system, toggle remembers",
   "sel": ".theme-toggle",
   "pos": "tr",
   "before": "changes/8-before.png",
   "after": "changes/8-after.png"
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
     "line": 142,
     "message": "Unsanitized input from the document location flows into innerHTML, where it is used to dynamically construct the HTML page on client side. This may result in a DOM Based Cross-Site Scripting attack (DOMXSS)."
    },
    {
     "severity": "High",
     "rule": "Code Injection",
     "file": "app.js",
     "line": 375,
     "message": "Unsanitized input from the document location flows into eval, where it is executed as JavaScript code. This may result in a Code Injection vulnerability."
    },
    {
     "severity": "High",
     "rule": "DOM-based Cross-site Scripting (XSS)",
     "file": "app.js",
     "line": 405,
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
     "line": 585,
     "message": "Unsanitized input from browser storage flows into innerHTML, where it is used to dynamically construct the HTML page on client side. This may result in a DOM Based Cross-Site Scripting attack (DOMXSS)."
    }
   ],
   "command": "snyk code test <step dir without overlay files> --json",
   "prevTotal": 8,
   "note": "Step 06 changes the design only; the code-level slop stays on purpose for the code-review demo, so Snyk stays about flat."
  },
  "impeccable": {
   "total": 1,
   "failing": 1,
   "advisory": 0,
   "byRule": {
    "overused-font": 1
   },
   "findings": [
    {
     "rule": "overused-font",
     "advisory": false,
     "where": "body",
     "message": "Primary font: inter (100% of text)"
    }
   ],
   "command": "impeccable detect --no-config --json --viewport 1440x900 <served page>?overlay=off",
   "sourceTotal": 1,
   "prevTotal": 0,
   "prevSource": 0,
   "note": "overused-font (Inter) is kept on purpose: the MT design system names Inter as its interface font."
  }
 }
};

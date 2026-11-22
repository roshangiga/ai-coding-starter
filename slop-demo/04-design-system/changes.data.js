/* Presenter overlay data (generated). Not part of the app. */
window.RBX = {
 "dir": "04-design-system",
 "short": "04",
 "label": "Step 04 · Design system",
 "summary": "Added design tokens, one font family, one button component and one radius scale; removed gradients, glass, glows and emoji icons.",
 "prev": {
  "dir": "03-spacing",
  "short": "03"
 },
 "next": {
  "dir": "05-contrast",
  "short": "05"
 },
 "changes": [
  {
   "n": 1,
   "text": "One font family and tokens for colour, type, radius and spacing",
   "sel": ".nav-logo",
   "pos": "tr",
   "before": "changes/1-before.png",
   "after": "changes/1-after.png"
  },
  {
   "n": 2,
   "text": "Removed the gradient hero, gradient text and pulse animation",
   "sel": ".hero-title",
   "pos": "tl",
   "before": "changes/2-before.png",
   "after": "changes/2-after.png"
  },
  {
   "n": 3,
   "text": "One button component (.btn) replaces six button styles",
   "sel": ".hero-actions",
   "pos": "tr",
   "before": "changes/3-before.png",
   "after": "changes/3-after.png"
  },
  {
   "n": 4,
   "text": "Emoji icons removed from search, filters and content",
   "sel": ".filter-bar",
   "pos": "tl",
   "before": "changes/4-before.png",
   "after": "changes/4-after.png"
  },
  {
   "n": 5,
   "text": "Room card is one surface: nested cards, gradient and hover tilt removed",
   "sel": "#rooms-grid .room-card:nth-child(1)",
   "pos": "tr",
   "before": "changes/5-before.png",
   "after": "changes/5-after.png"
  },
  {
   "n": 6,
   "text": "Replaced placeholder art with real room photos (16:9, cover, responsive sizes)",
   "sel": "#rooms-grid .room-card:nth-child(2) .room-image",
   "pos": "tl",
   "before": "changes/6-before.png",
   "after": "changes/6-after.png"
  },
  {
   "n": 7,
   "text": "Glass panel and nested form cards flattened",
   "sel": ".booking-wrapper",
   "pos": "tl",
   "before": "changes/7-before.png",
   "after": "changes/7-after.png"
  },
  {
   "n": 8,
   "text": "Booking rows: no side-tab border or inner box",
   "sel": "#my-bookings-list .booking-item:nth-child(1)",
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
     "line": 135,
     "message": "Unsanitized input from the document location flows into innerHTML, where it is used to dynamically construct the HTML page on client side. This may result in a DOM Based Cross-Site Scripting attack (DOMXSS)."
    },
    {
     "severity": "High",
     "rule": "Code Injection",
     "file": "app.js",
     "line": 371,
     "message": "Unsanitized input from the document location flows into eval, where it is executed as JavaScript code. This may result in a Code Injection vulnerability."
    },
    {
     "severity": "High",
     "rule": "DOM-based Cross-site Scripting (XSS)",
     "file": "app.js",
     "line": 398,
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
     "line": 578,
     "message": "Unsanitized input from browser storage flows into innerHTML, where it is used to dynamically construct the HTML page on client side. This may result in a DOM Based Cross-Site Scripting attack (DOMXSS)."
    }
   ],
   "command": "snyk code test <step dir without overlay files> --json",
   "prevTotal": 8,
   "note": "Steps 01 to 05 leave the code-level slop in place on purpose for the code-review demo, so Snyk stays about flat."
  },
  "impeccable": {
   "total": 10,
   "failing": 10,
   "advisory": 0,
   "byRule": {
    "low-contrast": 7,
    "tiny-text": 2,
    "gray-on-color": 1
   },
   "findings": [
    {
     "rule": "gray-on-color",
     "advisory": false,
     "where": "div.footer-bottom",
     "message": "text #4b4b6b on bg #1e1b4b"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "div.nav-link:nth-of-type(1)",
     "message": "2.6:1 (need 4.5:1) — text #a1a1aa on #ffffff (and 16 more)"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "div.room-card:nth-of-type(1) > div.room-card-inner > div.room-tagline",
     "message": "1.7:1 (need 4.5:1) — text #c4c4cc on #ffffff (and 5 more)"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "div.room-card:nth-of-type(1) > div.room-card-inner > span.room-status.status-available",
     "message": "1.7:1 (need 4.5:1) — text #4ade80 on #ffffff (and 5 more)"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "#booking-title",
     "message": "placeholder \"Meeting title\" 1.5:1 (need 4.5:1) — text #d4d4d8 on #ffffff"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "#booking-attendees",
     "message": "placeholder \"Number of attendees\" 1.5:1 (need 4.5:1) — text #d4d4d8 on #ffffff"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "#booking-name",
     "message": "placeholder \"Your name\" 1.5:1 (need 4.5:1) — text #d4d4d8 on #ffffff"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "div.footer-bottom",
     "message": "1.9:1 (need 4.5:1) — text #4b4b6b on #1e1b4b"
    },
    {
     "rule": "tiny-text",
     "advisory": false,
     "where": "div.booking-item:nth-of-type(1) > div.booking-item-inner > div.booking-details",
     "message": "11px body text"
    },
    {
     "rule": "tiny-text",
     "advisory": false,
     "where": "div.booking-item:nth-of-type(2) > div.booking-item-inner > div.booking-details",
     "message": "11px body text"
    }
   ],
   "command": "impeccable detect --no-config --json --viewport 1440x900 <served page>?overlay=off",
   "sourceTotal": 6,
   "prevTotal": 39,
   "prevSource": 27
  }
 }
};

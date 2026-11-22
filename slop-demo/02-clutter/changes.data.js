/* Presenter overlay data (generated). Not part of the app. */
window.RBX = {
 "dir": "02-clutter",
 "short": "02",
 "label": "Step 02 · Clutter and copy",
 "summary": "Dropped eyebrows, subtitles, stats, logos, testimonials and the CTA band, and rewrote the marketing copy in plain words.",
 "prev": {
  "dir": "01-pills",
  "short": "01"
 },
 "next": {
  "dir": "03-spacing",
  "short": "03"
 },
 "changes": [
  {
   "n": 1,
   "text": "Eyebrow, buzzword headline and subtitle replaced by a plain title",
   "sel": ".hero-title",
   "pos": "tl",
   "before": "changes/1-before.png",
   "after": "changes/1-after.png"
  },
  {
   "n": 2,
   "text": "Removed the stats bar and the 'trusted by' logo row",
   "sel": "#rooms",
   "pos": "tl",
   "before": "changes/2-before.png",
   "after": "changes/2-after.png"
  },
  {
   "n": 3,
   "text": "Section eyebrows and subtitles removed; titles name the section",
   "sel": "#rooms .section-title",
   "pos": "tr",
   "before": "changes/3-before.png",
   "after": "changes/3-after.png"
  },
  {
   "n": 4,
   "text": "Room taglines say what the room is for, not slogans",
   "sel": "#rooms-grid .room-card:nth-child(1) .room-tagline",
   "pos": "tr",
   "before": "changes/4-before.png",
   "after": "changes/4-after.png"
  },
  {
   "n": 5,
   "text": "Removed the fake 'AI optimizes your booking' tip; plain labels",
   "sel": ".submit-booking-btn",
   "pos": "tl",
   "before": "changes/5-before.png",
   "after": "changes/5-after.png"
  },
  {
   "n": 6,
   "text": "Removed testimonials, the CTA band and the footer link columns",
   "sel": ".footer",
   "pos": "tl",
   "before": "changes/6-before.png",
   "after": "changes/6-after.png"
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
     "line": 126,
     "message": "Unsanitized input from the document location flows into innerHTML, where it is used to dynamically construct the HTML page on client side. This may result in a DOM Based Cross-Site Scripting attack (DOMXSS)."
    },
    {
     "severity": "High",
     "rule": "Code Injection",
     "file": "app.js",
     "line": 363,
     "message": "Unsanitized input from the document location flows into eval, where it is executed as JavaScript code. This may result in a Code Injection vulnerability."
    },
    {
     "severity": "High",
     "rule": "DOM-based Cross-site Scripting (XSS)",
     "file": "app.js",
     "line": 390,
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
     "line": 570,
     "message": "Unsanitized input from browser storage flows into innerHTML, where it is used to dynamically construct the HTML page on client side. This may result in a DOM Based Cross-Site Scripting attack (DOMXSS)."
    }
   ],
   "command": "snyk code test <step dir without overlay files> --json",
   "prevTotal": 8,
   "note": "Steps 01 to 05 leave the code-level slop in place on purpose for the code-review demo, so Snyk stays about flat."
  },
  "impeccable": {
   "total": 39,
   "failing": 33,
   "advisory": 6,
   "byRule": {
    "low-contrast": 16,
    "nested-cards": 7,
    "gpt-thin-border-wide-shadow": 6,
    "ai-color-palette": 2,
    "gradient-text": 2,
    "side-tab": 2,
    "tiny-text": 2,
    "gray-on-color": 1,
    "overused-font": 1
   },
   "findings": [
    {
     "rule": "ai-color-palette",
     "advisory": false,
     "where": "section.hero",
     "message": "Purple/violet gradient background"
    },
    {
     "rule": "ai-color-palette",
     "advisory": false,
     "where": "div.submit-booking-btn",
     "message": "Purple/violet gradient background"
    },
    {
     "rule": "gradient-text",
     "advisory": false,
     "where": "h1.hero-title.gradient-text",
     "message": "background-clip: text + gradient"
    },
    {
     "rule": "gradient-text",
     "advisory": false,
     "where": "h2.section-title.gradient-text",
     "message": "background-clip: text + gradient"
    },
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
     "message": "2.5:1 (need 4.5:1) — text #a1a1aa on #fcfcff (and 2 more)"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "div.nav-cta",
     "message": "3.8:1 (need 4.5:1) — text #ffffff on #d94cab (gradient on div.nav-cta)"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "button.btn-primary-gradient",
     "message": "3.8:1 (need 4.5:1) — text #ffffff on #da4caa (gradient on button.btn-primary-gradient)"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "div.filter-chip:nth-of-type(1)",
     "message": "3.8:1 (need 4.5:1) — text #8b5cf6 on #f3f0ff (and 3 more)"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "div.room-card:nth-of-type(1) > div.room-card-inner > div.room-tagline",
     "message": "1.8:1 (need 4.5:1) — text #b8b8c0 on #faf5ff (and 5 more)"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "div.room-card:nth-of-type(1) > div.room-card-inner > div.room-meta-card > div.room-meta",
     "message": "2.5:1 (need 4.5:1) — text #9ca3af on #ffffff (and 5 more)"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "div.room-card:nth-of-type(1) > div.room-card-inner > span.room-status.status-available",
     "message": "1.6:1 (need 4.5:1) — text #4ade80 on #faf5ff (and 5 more)"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "div.room-card:nth-of-type(1) > div.room-card-inner > div.room-features",
     "message": "2.5:1 (need 4.5:1) — text #a78bfa on #faf5ff (and 5 more)"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "div.room-card:nth-of-type(1) > div.room-card-inner > span.room-book-link",
     "message": "3.3:1 (need 4.5:1) — text #ec4899 on #faf5ff (and 5 more)"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "#booking-title",
     "message": "placeholder \"Meeting title\" 1.4:1 (need 4.5:1) — text #d4d4d8 on #fcfbff"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "#booking-attendees",
     "message": "placeholder \"Number of attendees\" 1.4:1 (need 4.5:1) — text #d4d4d8 on #fcfbff"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "#booking-name",
     "message": "placeholder \"Your name\" 1.4:1 (need 4.5:1) — text #d4d4d8 on #fcfbff"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "div.booking-item:nth-of-type(1) > div.booking-item-inner > div.booking-details",
     "message": "2.0:1 (need 4.5:1) — text #b0b0b8 on #fdf4ff (and 1 more)"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "div.booking-item:nth-of-type(1) > button.cancel-btn",
     "message": "2.6:1 (need 4.5:1) — text #f472b6 on #ffffff (and 1 more)"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "div.footer-bottom",
     "message": "1.9:1 (need 4.5:1) — text #4b4b6b on #1e1b4b"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "a.hero-link",
     "message": "pixel contrast 1.6:1 median 1.6:1 (need 4.5:1) on gradient background, unread layer \"See all rooms ✨\""
    },
    {
     "rule": "nested-cards",
     "advisory": false,
     "where": "div.room-card:nth-of-type(1) > div.room-card-inner",
     "message": "Card inside card"
    },
    {
     "rule": "nested-cards",
     "advisory": false,
     "where": "div.room-card:nth-of-type(2) > div.room-card-inner",
     "message": "Card inside card"
    },
    {
     "rule": "nested-cards",
     "advisory": false,
     "where": "div.room-card:nth-of-type(3) > div.room-card-inner",
     "message": "Card inside card"
    },
    {
     "rule": "nested-cards",
     "advisory": false,
     "where": "div.room-card:nth-of-type(4) > div.room-card-inner",
     "message": "Card inside card"
    },
    {
     "rule": "nested-cards",
     "advisory": false,
     "where": "div.room-card:nth-of-type(5) > div.room-card-inner",
     "message": "Card inside card"
    },
    {
     "rule": "nested-cards",
     "advisory": false,
     "where": "div.room-card:nth-of-type(6) > div.room-card-inner",
     "message": "Card inside card"
    },
    {
     "rule": "nested-cards",
     "advisory": false,
     "where": "div.form-card-inner",
     "message": "Card inside card"
    },
    {
     "rule": "overused-font",
     "advisory": false,
     "where": "body",
     "message": "Primary font: inter (65% of text)"
    },
    {
     "rule": "side-tab",
     "advisory": false,
     "where": "div.booking-item:nth-of-type(1)",
     "message": "border-left: 4px + border-radius: 16px"
    },
    {
     "rule": "side-tab",
     "advisory": false,
     "where": "div.booking-item:nth-of-type(2)",
     "message": "border-left: 4px + border-radius: 16px"
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
    },
    {
     "rule": "gpt-thin-border-wide-shadow",
     "advisory": true,
     "where": "div.room-card:nth-of-type(1)",
     "message": "1px border + 40px shadow blur, repeated across the row"
    },
    {
     "rule": "gpt-thin-border-wide-shadow",
     "advisory": true,
     "where": "div.room-card:nth-of-type(2)",
     "message": "1px border + 40px shadow blur, repeated across the row"
    },
    {
     "rule": "gpt-thin-border-wide-shadow",
     "advisory": true,
     "where": "div.room-card:nth-of-type(3)",
     "message": "1px border + 40px shadow blur, repeated across the row"
    },
    {
     "rule": "gpt-thin-border-wide-shadow",
     "advisory": true,
     "where": "div.room-card:nth-of-type(4)",
     "message": "1px border + 40px shadow blur, repeated across the row"
    },
    {
     "rule": "gpt-thin-border-wide-shadow",
     "advisory": true,
     "where": "div.room-card:nth-of-type(5)",
     "message": "1px border + 40px shadow blur, repeated across the row"
    },
    {
     "rule": "gpt-thin-border-wide-shadow",
     "advisory": true,
     "where": "div.room-card:nth-of-type(6)",
     "message": "1px border + 40px shadow blur, repeated across the row"
    }
   ],
   "command": "impeccable detect --no-config --json --viewport 1440x900 <served page>?overlay=off",
   "sourceTotal": 27,
   "prevTotal": 90,
   "prevSource": 81
  }
 }
};

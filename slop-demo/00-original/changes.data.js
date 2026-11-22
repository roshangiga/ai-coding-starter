/* Presenter overlay data (generated). Not part of the app. */
window.RBX = {
 "dir": "00-original",
 "short": "00",
 "label": "Original",
 "summary": "The vibe-coded starting point: every slop category is still here.",
 "prev": null,
 "next": {
  "dir": "01-pills",
  "short": "01"
 },
 "changes": [],
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
     "line": 391,
     "message": "Unsanitized input from the document location flows into eval, where it is executed as JavaScript code. This may result in a Code Injection vulnerability."
    },
    {
     "severity": "High",
     "rule": "DOM-based Cross-site Scripting (XSS)",
     "file": "app.js",
     "line": 418,
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
     "line": 598,
     "message": "Unsanitized input from browser storage flows into innerHTML, where it is used to dynamically construct the HTML page on client side. This may result in a DOM Based Cross-Site Scripting attack (DOMXSS)."
    }
   ],
   "command": "snyk code test <step dir without overlay files> --json",
   "prevTotal": null,
   "note": "Baseline for the code-level slop (eval, XSS, hardcoded secrets) that the code-review demo fixes."
  },
  "impeccable": {
   "total": 122,
   "failing": 104,
   "advisory": 18,
   "byRule": {
    "low-contrast": 41,
    "undersized-ui-text": 31,
    "gray-on-color": 10,
    "gpt-thin-border-wide-shadow": 9,
    "gradient-text": 7,
    "nested-cards": 7,
    "kicker-above-heading": 4,
    "tiny-text": 4,
    "ai-color-palette": 3,
    "side-tab": 2,
    "hero-eyebrow-chip": 1,
    "overused-font": 1,
    "em-dash-overuse": 1,
    "straggler": 1
   },
   "findings": [
    {
     "rule": "ai-color-palette",
     "advisory": false,
     "where": "span.badge.badge-ai",
     "message": "Cyan gradient background"
    },
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
     "where": "div.stat-card.glass:nth-of-type(1) > div.stat-number",
     "message": "background-clip: text + gradient"
    },
    {
     "rule": "gradient-text",
     "advisory": false,
     "where": "div.stat-card.glass:nth-of-type(2) > div.stat-number",
     "message": "background-clip: text + gradient"
    },
    {
     "rule": "gradient-text",
     "advisory": false,
     "where": "div.stat-card.glass:nth-of-type(3) > div.stat-number",
     "message": "background-clip: text + gradient"
    },
    {
     "rule": "gradient-text",
     "advisory": false,
     "where": "div.stat-card.glass:nth-of-type(4) > div.stat-number",
     "message": "background-clip: text + gradient"
    },
    {
     "rule": "gradient-text",
     "advisory": false,
     "where": "div.booking-wrapper.glass > h2.section-title.gradient-text",
     "message": "background-clip: text + gradient"
    },
    {
     "rule": "gradient-text",
     "advisory": false,
     "where": "section.testimonials > h2.section-title.gradient-text",
     "message": "background-clip: text + gradient"
    },
    {
     "rule": "gray-on-color",
     "advisory": false,
     "where": "p.footer-tagline",
     "message": "text #4b4b6b on bg #1e1b4b"
    },
    {
     "rule": "gray-on-color",
     "advisory": false,
     "where": "div:nth-of-type(2) > div.footer-heading",
     "message": "text #a5a5c0 on bg #1e1b4b"
    },
    {
     "rule": "gray-on-color",
     "advisory": false,
     "where": "div:nth-of-type(2) > div.footer-link:nth-of-type(2)",
     "message": "text #6b6b8a on bg #1e1b4b"
    },
    {
     "rule": "gray-on-color",
     "advisory": false,
     "where": "div:nth-of-type(2) > div.footer-link:nth-of-type(3)",
     "message": "text #6b6b8a on bg #1e1b4b"
    },
    {
     "rule": "gray-on-color",
     "advisory": false,
     "where": "div:nth-of-type(2) > div.footer-link:nth-of-type(4)",
     "message": "text #6b6b8a on bg #1e1b4b"
    },
    {
     "rule": "gray-on-color",
     "advisory": false,
     "where": "div:nth-of-type(3) > div.footer-heading",
     "message": "text #a5a5c0 on bg #1e1b4b"
    },
    {
     "rule": "gray-on-color",
     "advisory": false,
     "where": "div:nth-of-type(3) > div.footer-link:nth-of-type(2)",
     "message": "text #6b6b8a on bg #1e1b4b"
    },
    {
     "rule": "gray-on-color",
     "advisory": false,
     "where": "div:nth-of-type(3) > div.footer-link:nth-of-type(3)",
     "message": "text #6b6b8a on bg #1e1b4b"
    },
    {
     "rule": "gray-on-color",
     "advisory": false,
     "where": "div:nth-of-type(3) > div.footer-link:nth-of-type(4)",
     "message": "text #6b6b8a on bg #1e1b4b"
    },
    {
     "rule": "gray-on-color",
     "advisory": false,
     "where": "div.footer-bottom",
     "message": "text #4b4b6b on bg #1e1b4b"
    },
    {
     "rule": "hero-eyebrow-chip",
     "advisory": false,
     "where": "div.hero-eyebrow",
     "message": "eyebrow chip (tracked-caps) \"✨ The future of meetings is here ✨\" above h1 \"Elevate Your Meeting Experience\""
    },
    {
     "rule": "kicker-above-heading",
     "advisory": false,
     "where": "#rooms > div.section-eyebrow",
     "message": "kicker \"🏢 OUR SPACES\" above h2 \"Discover Your Perfect Space\""
    },
    {
     "rule": "kicker-above-heading",
     "advisory": false,
     "where": "div.booking-wrapper.glass > div.section-eyebrow",
     "message": "kicker \"📅 RESERVE IN SECONDS\" above h2 \"Book Your Space\""
    },
    {
     "rule": "kicker-above-heading",
     "advisory": false,
     "where": "#my-bookings > div.section-eyebrow",
     "message": "kicker \"🗓️ YOUR SCHEDULE\" above h2 \"My Bookings\""
    },
    {
     "rule": "kicker-above-heading",
     "advisory": false,
     "where": "section.testimonials > div.section-eyebrow",
     "message": "kicker \"💬 WHAT PEOPLE SAY\" above h2 \"Loved by Teams Everywhere\""
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "span.badge.badge-ai",
     "message": "2.6:1 (need 4.5:1) — text #ffffff on #13add7 (gradient on span.badge)"
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
     "message": "3.8:1 (need 4.5:1) — text #ffffff on #d84cac (gradient on div.nav-cta)"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "button.btn-primary-gradient",
     "message": "3.7:1 (need 4.5:1) — text #ffffff on #dd4ba7 (gradient on button.btn-primary-gradient)"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "div.stat-card.glass:nth-of-type(1) > div.stat-label",
     "message": "2.0:1 (need 4.5:1) — text #b4b4bc on #faf9ff (and 3 more)"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "section.trusted > div.section-eyebrow",
     "message": "1.7:1 (need 4.5:1) — text #c4b5fd on #f8f7ff (and 2 more)"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "p.trusted-sub",
     "message": "1.7:1 (need 4.5:1) — text #c0c0c8 on #f8f7ff"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "#rooms > p.section-subtitle",
     "message": "2.2:1 (need 4.5:1) — text #a8a8b3 on #f8f7ff (and 1 more)"
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
     "where": "div.room-card:nth-of-type(1) > span.badge.badge-popular",
     "message": "2.2:1 (need 4.5:1) — text #fb7185 on #ffe4e6 (and 2 more)"
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
     "where": "div.room-card:nth-of-type(1) > div.room-card-inner > span.status-badge.status-available",
     "message": "1.6:1 (need 4.5:1) — text #4ade80 on #dcfce7 (and 7 more)"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "div.room-card:nth-of-type(1) > div.room-card-inner > div.room-features > span.feature-pill:nth-of-type(1)",
     "message": "2.3:1 (need 4.5:1) — text #a78bfa on #ede9fe (and 19 more)"
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
     "where": "div.room-card:nth-of-type(2) > span.badge.badge-new",
     "message": "1.9:1 (need 4.5:1) — text #f59e0b on #fef3c7 (and 1 more)"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "div.booking-wrapper.glass > div.section-eyebrow",
     "message": "1.8:1 (need 4.5:1) — text #c4b5fd on #fbf8fe (gradient on section#book)"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "div.booking-wrapper.glass > p.section-subtitle",
     "message": "2.2:1 (need 4.5:1) — text #a8a8b3 on #fbf8fe (gradient on section#book)"
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
     "where": "div.form-hint",
     "message": "1.8:1 (need 4.5:1) — text #c4b5fd on #ffffff"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "div.submit-booking-btn",
     "message": "4.1:1 (need 4.5:1) — text #ffffff on #a265c2 (gradient on div.submit-booking-btn)"
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
     "where": "section.testimonials > div.section-eyebrow",
     "message": "1.6:1 (need 4.5:1) — text #c4b5fd on #f2e8fa (gradient on section.testimonials)"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "section.testimonials > p.section-subtitle",
     "message": "2.0:1 (need 4.5:1) — text #a8a8b3 on #f2e8fa (gradient on section.testimonials)"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "div.testimonial-card.glass:nth-of-type(1) > div.testimonial-author > div > div.author-role",
     "message": "1.8:1 (need 4.5:1) — text #b4b4bc on #f5eefb (gradient on section.testimonials)"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "div.testimonial-card.glass:nth-of-type(2) > div.testimonial-author > div > div.author-role",
     "message": "1.8:1 (need 4.5:1) — text #b4b4bc on #f8eefa (gradient on section.testimonials)"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "div.testimonial-card.glass:nth-of-type(3) > div.testimonial-author > div > div.author-role",
     "message": "1.8:1 (need 4.5:1) — text #b4b4bc on #faedf8 (gradient on section.testimonials)"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "p.cta-sub",
     "message": "3.1:1 (need 4.5:1) — text #e1b6eb on #aa2fc6 (gradient on section.cta-section)"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "p.footer-tagline",
     "message": "1.9:1 (need 4.5:1) — text #4b4b6b on #1e1b4b (and 1 more)"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "div:nth-of-type(2) > div.footer-link:nth-of-type(2)",
     "message": "3.1:1 (need 4.5:1) — text #6b6b8a on #1e1b4b (and 5 more)"
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "div.hero-eyebrow",
     "message": "pixel contrast 2.6:1 median 2.6:1 (need 4.5:1) on gradient background \"✨ The future of meetings is here ✨\""
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "p.hero-subtitle",
     "message": "pixel contrast 3.2:1 median 3.2:1 (need 4.5:1) on gradient background \"Seamlessly book rooms, unlock productivity, and supercharge collaboration — all \""
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "span.chip.chip-glow:nth-of-type(1)",
     "message": "pixel contrast 2.6:1 median 2.6:1 (need 4.5:1) on gradient background, unread layer \"⚡ Lightning Fast\""
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "a.hero-link",
     "message": "pixel contrast 1.4:1 median 1.4:1 (need 4.5:1) on gradient background, unread layer \"Explore Spaces ✨\""
    },
    {
     "rule": "low-contrast",
     "advisory": false,
     "where": "span.chip.chip-glow:nth-of-type(2)",
     "message": "pixel contrast 2.3:1 median 2.3:1 (need 4.5:1) on gradient background, unread layer \"🔒 Enterprise Secure\""
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
     "message": "Primary font: inter (83% of text)"
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
     "where": "div.form-hint",
     "message": "11px body text"
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
     "rule": "tiny-text",
     "advisory": false,
     "where": "div.testimonial-card.glass:nth-of-type(3) > div.testimonial-author > div > div.author-role",
     "message": "11px body text"
    },
    {
     "rule": "undersized-ui-text",
     "advisory": false,
     "where": "span.badge.badge-ai",
     "message": "9px functional text \"AI-powered\" (below 11px floor)"
    },
    {
     "rule": "undersized-ui-text",
     "advisory": false,
     "where": "section.trusted > div.section-eyebrow",
     "message": "10px functional text \"TRUSTED BY INDUSTRY LEADERS\" (below 11px floor)"
    },
    {
     "rule": "undersized-ui-text",
     "advisory": false,
     "where": "div.room-card:nth-of-type(1) > span.badge.badge-popular",
     "message": "10px functional text \"🔥 Popular\" (below 11px floor)"
    },
    {
     "rule": "undersized-ui-text",
     "advisory": false,
     "where": "div.room-card:nth-of-type(1) > div.room-card-inner > div.room-features > span.feature-pill:nth-of-type(1)",
     "message": "10px functional text \"📺 TV Screen\" (below 11px floor)"
    },
    {
     "rule": "undersized-ui-text",
     "advisory": false,
     "where": "div.room-card:nth-of-type(1) > div.room-card-inner > div.room-features > span.feature-pill:nth-of-type(2)",
     "message": "10px functional text \"🎤 Mic\" (below 11px floor)"
    },
    {
     "rule": "undersized-ui-text",
     "advisory": false,
     "where": "div.room-card:nth-of-type(1) > div.room-card-inner > div.room-features > span.feature-pill:nth-of-type(3)",
     "message": "10px functional text \"☕ Coffee\" (below 11px floor)"
    },
    {
     "rule": "undersized-ui-text",
     "advisory": false,
     "where": "div.room-card:nth-of-type(2) > span.badge.badge-new",
     "message": "10px functional text \"NEW\" (below 11px floor)"
    },
    {
     "rule": "undersized-ui-text",
     "advisory": false,
     "where": "div.room-card:nth-of-type(2) > div.room-card-inner > div.room-features > span.feature-pill:nth-of-type(1)",
     "message": "10px functional text \"📺 TV Screen\" (below 11px floor)"
    },
    {
     "rule": "undersized-ui-text",
     "advisory": false,
     "where": "div.room-card:nth-of-type(2) > div.room-card-inner > div.room-features > span.feature-pill:nth-of-type(2)",
     "message": "10px functional text \"📹 Video Call\" (below 11px floor)"
    },
    {
     "rule": "undersized-ui-text",
     "advisory": false,
     "where": "div.room-card:nth-of-type(2) > div.room-card-inner > div.room-features > span.feature-pill:nth-of-type(3)",
     "message": "10px functional text \"🖊️ Whiteboard\" (below 11px floor)"
    },
    {
     "rule": "undersized-ui-text",
     "advisory": false,
     "where": "div.room-card:nth-of-type(2) > div.room-card-inner > div.room-features > span.feature-pill:nth-of-type(4)",
     "message": "10px functional text \"❄️ AC\" (below 11px floor)"
    },
    {
     "rule": "undersized-ui-text",
     "advisory": false,
     "where": "div.room-card:nth-of-type(3) > div.room-card-inner > div.room-features > span.feature-pill:nth-of-type(1)",
     "message": "10px functional text \"🔇 Quiet\" (below 11px floor)"
    },
    {
     "rule": "undersized-ui-text",
     "advisory": false,
     "where": "div.room-card:nth-of-type(3) > div.room-card-inner > div.room-features > span.feature-pill:nth-of-type(2)",
     "message": "10px functional text \"🪴 Plants\" (below 11px floor)"
    },
    {
     "rule": "undersized-ui-text",
     "advisory": false,
     "where": "div.room-card:nth-of-type(4) > span.badge.badge-popular",
     "message": "10px functional text \"🔥 Popular\" (below 11px floor)"
    },
    {
     "rule": "undersized-ui-text",
     "advisory": false,
     "where": "div.room-card:nth-of-type(4) > div.room-card-inner > div.room-features > span.feature-pill:nth-of-type(1)",
     "message": "10px functional text \"📽️ Projector\" (below 11px floor)"
    },
    {
     "rule": "undersized-ui-text",
     "advisory": false,
     "where": "div.room-card:nth-of-type(4) > div.room-card-inner > div.room-features > span.feature-pill:nth-of-type(2)",
     "message": "10px functional text \"📹 Video Call\" (below 11px floor)"
    },
    {
     "rule": "undersized-ui-text",
     "advisory": false,
     "where": "div.room-card:nth-of-type(4) > div.room-card-inner > div.room-features > span.feature-pill:nth-of-type(3)",
     "message": "10px functional text \"🖊️ Whiteboard\" (below 11px floor)"
    },
    {
     "rule": "undersized-ui-text",
     "advisory": false,
     "where": "div.room-card:nth-of-type(4) > div.room-card-inner > div.room-features > span.feature-pill:nth-of-type(4)",
     "message": "10px functional text \"🎤 Mic\" (below 11px floor)"
    },
    {
     "rule": "undersized-ui-text",
     "advisory": false,
     "where": "span.feature-pill:nth-of-type(5)",
     "message": "10px functional text \"☕ Coffee\" (below 11px floor)"
    },
    {
     "rule": "undersized-ui-text",
     "advisory": false,
     "where": "div.room-card:nth-of-type(5) > span.badge.badge-new",
     "message": "10px functional text \"NEW\" (below 11px floor)"
    },
    {
     "rule": "undersized-ui-text",
     "advisory": false,
     "where": "div.room-card:nth-of-type(5) > div.room-card-inner > div.room-features > span.feature-pill:nth-of-type(1)",
     "message": "10px functional text \"📺 TV Screen\" (below 11px floor)"
    },
    {
     "rule": "undersized-ui-text",
     "advisory": false,
     "where": "div.room-card:nth-of-type(5) > div.room-card-inner > div.room-features > span.feature-pill:nth-of-type(2)",
     "message": "10px functional text \"🖊️ Whiteboard\" (below 11px floor)"
    },
    {
     "rule": "undersized-ui-text",
     "advisory": false,
     "where": "div.room-card:nth-of-type(6) > span.badge.badge-popular",
     "message": "10px functional text \"🔥 Popular\" (below 11px floor)"
    },
    {
     "rule": "undersized-ui-text",
     "advisory": false,
     "where": "div.room-card:nth-of-type(6) > div.room-card-inner > div.room-features > span.feature-pill:nth-of-type(1)",
     "message": "10px functional text \"📽️ Projector\" (below 11px floor)"
    },
    {
     "rule": "undersized-ui-text",
     "advisory": false,
     "where": "div.room-card:nth-of-type(6) > div.room-card-inner > div.room-features > span.feature-pill:nth-of-type(2)",
     "message": "10px functional text \"🎤 Mic\" (below 11px floor)"
    },
    {
     "rule": "undersized-ui-text",
     "advisory": false,
     "where": "div.room-card:nth-of-type(6) > div.room-card-inner > div.room-features > span.feature-pill:nth-of-type(3)",
     "message": "10px functional text \"📹 Video Call\" (below 11px floor)"
    },
    {
     "rule": "undersized-ui-text",
     "advisory": false,
     "where": "div.room-card:nth-of-type(6) > div.room-card-inner > div.room-features > span.feature-pill:nth-of-type(4)",
     "message": "10px functional text \"🍕 Catering\" (below 11px floor)"
    },
    {
     "rule": "em-dash-overuse",
     "advisory": true,
     "where": "body",
     "message": "9 em-dashes in body text"
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
    },
    {
     "rule": "gpt-thin-border-wide-shadow",
     "advisory": true,
     "where": "div.testimonial-card.glass:nth-of-type(1)",
     "message": "1px border + 32px shadow blur, repeated across the row"
    },
    {
     "rule": "gpt-thin-border-wide-shadow",
     "advisory": true,
     "where": "div.testimonial-card.glass:nth-of-type(2)",
     "message": "1px border + 32px shadow blur, repeated across the row"
    },
    {
     "rule": "gpt-thin-border-wide-shadow",
     "advisory": true,
     "where": "div.testimonial-card.glass:nth-of-type(3)",
     "message": "1px border + 32px shadow blur, repeated across the row"
    },
    {
     "rule": "low-contrast",
     "advisory": true,
     "where": "div.testimonial-card.glass:nth-of-type(1) > p.testimonial-text",
     "message": "4.3:1 (need 4.5:1) — text #6b7280 on #f5eefb (gradient on section.testimonials)"
    },
    {
     "rule": "low-contrast",
     "advisory": true,
     "where": "div.testimonial-card.glass:nth-of-type(2) > p.testimonial-text",
     "message": "4.3:1 (need 4.5:1) — text #6b7280 on #f7eefb (gradient on section.testimonials)"
    },
    {
     "rule": "low-contrast",
     "advisory": true,
     "where": "div.testimonial-card.glass:nth-of-type(3) > p.testimonial-text",
     "message": "4.3:1 (need 4.5:1) — text #6b7280 on #faedf8 (gradient on section.testimonials)"
    },
    {
     "rule": "straggler",
     "advisory": true,
     "where": "p.hero-subtitle",
     "message": "\"revolution.\" alone on the last of 3 lines (17% of the measure)"
    },
    {
     "rule": "undersized-ui-text",
     "advisory": true,
     "where": "#rooms > div.section-eyebrow",
     "message": "10px functional text \"🏢 OUR SPACES\" (below 11px floor)"
    },
    {
     "rule": "undersized-ui-text",
     "advisory": true,
     "where": "div.booking-wrapper.glass > div.section-eyebrow",
     "message": "10px functional text \"📅 RESERVE IN SECONDS\" (below 11px floor)"
    },
    {
     "rule": "undersized-ui-text",
     "advisory": true,
     "where": "#my-bookings > div.section-eyebrow",
     "message": "10px functional text \"🗓️ YOUR SCHEDULE\" (below 11px floor)"
    },
    {
     "rule": "undersized-ui-text",
     "advisory": true,
     "where": "section.testimonials > div.section-eyebrow",
     "message": "10px functional text \"💬 WHAT PEOPLE SAY\" (below 11px floor)"
    }
   ],
   "command": "impeccable detect --no-config --json --viewport 1440x900 <served page>?overlay=off",
   "sourceTotal": 84,
   "prevTotal": null,
   "prevSource": null
  }
 }
};

---
name: mytGPT Portal
description: Calm, compact, neutral tools for secure daily knowledge work, from chat to Spaces.
colors:
  canvas-dark: "#0d0d0d"
  surface-dark: "#1d1d1f"
  canvas-light: "#ffffff"
  surface-light: "#f5f5f7"
  material-surface-dark: "#1a1a1a"
  material-surface-light: "#fbfcff"
  container-low-dark: "#181816"
  container-dark: "#1f1f1d"
  container-high-dark: "#262625"
  container-lowest-dark: "#111111"
  container-low-light: "#f5f7fb"
  container-light: "#edf2f8"
  container-high-light: "#e7ecf2"
  menu-surface-dark: "#1f1f1f"
  menu-surface-light: "#ffffff"
  menu-hover-dark: "#303030"
  menu-text-dark: "#e6e6e6"
  menu-icon-dark: "#e3e3e3"
  ink-light: "#1f1f1f"
  text-dark: "#f2f4f7"
  text-secondary-dark: "#e4e7eb"
  text-tertiary-dark: "#d2d6dc"
  text-muted-dark: "#b9c0c9"
  text-dimmed-dark: "#9ca5b1"
  text-light: "#171c21"
  text-secondary-light: "#252b31"
  text-tertiary-light: "#333b44"
  text-muted-light: "#4b5563"
  text-dimmed-light: "#667085"
  warm-ink-dark: "#f3efe5"
  inverse-surface-light: "#2b3137"
  inverse-on-surface-light: "#edf1f7"
  inverse-on-surface-dark: "#2a2824"
  composer-dark: "#1e1f20"
  welcome-composer-dark: "#242526"
  user-message-light: "#f2f0f0"
  user-message-dark: "#282a2c"
  sidebar-active-dark: "#343434"
  focus-blue-light: "#0066a0"
  focus-blue-dark: "#7fcfff"
  focus-blue-container-light: "#d1ecff"
  focus-blue-container-dark: "#0c4564"
  focus-blue-on-container-light: "#001d33"
  sheet-selection: "#2f80ed"
  secondary-violet-light: "#5e5290"
  secondary-violet-dark: "#c7c0ff"
  tertiary-rose-light: "#96506e"
  tertiary-rose-dark: "#ffbfd3"
  error-light: "#b3261e"
  error-dark: "#ffb4ab"
  success: "#22c55e"
  warning: "#f59e0b"
  danger: "#ef4444"
  danger-deep: "#dc2626"
  kind-doc: "#2b579a"
  kind-sheet: "#217346"
  kind-slides: "#c43e1c"
  kind-draw: "#5e5290"
  kind-draw-dark: "#6c5fa8"
  kind-image: "#9d174d"
  tint-teal: "#0d9488"
  tint-green: "#15803d"
  tint-orange: "#c2410c"
  tint-amber: "#b45309"
  tint-rose: "#be123c"
  tint-teal-dark: "#2dd4bf"
  tint-green-dark: "#22c55e"
  tint-orange-dark: "#fb923c"
  tint-amber-dark: "#fbbf24"
  tint-rose-dark: "#fb7185"
  selection-purple: "#8b3dff"
  guide-magenta: "#f0328c"
  myt-blue: "#153ed9"
  not-found-ground: "#0c0e10"
  brand-gradient-gold: "#ffc637"
  brand-gradient-coral: "#fc9975"
  brand-gradient-pink: "#fa7aa1"
  brand-gradient-magenta: "#fa6fb2"
  brand-gradient-violet: "#9c5bfd"
  brand-gradient-sky: "#62caff"
typography:
  display:
    fontFamily: "Poppins, sans-serif"
    fontSize: "clamp(2.25rem, 4vw, 2.75rem)"
    fontWeight: 400
    lineHeight: 1.15
  headline:
    fontFamily: "Inter, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.15
  title:
    fontFamily: "Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.3
  title-small:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.3
  conversation:
    fontFamily: "Open Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  body-small:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
  ui:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.3
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.33
  caption:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.2
  micro:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 600
    lineHeight: 1
  code:
    fontFamily: "Fira Code, Monaco, Consolas, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  hairline: "2px"
  tiny: "4px"
  snug: "6px"
  extra-small: "0.5rem"
  soft: "10px"
  small: "0.75rem"
  tile: "14px"
  medium: "1rem"
  menu: "20px"
  large: "1.5rem"
  extra-large: "1.75rem"
  full: "9999px"
spacing:
  "0.5": "2px"
  "1": "0.25rem"
  "1.5": "0.375rem"
  "2": "0.5rem"
  "2.5": "0.625rem"
  "3": "0.75rem"
  "4": "1rem"
  "6": "1.5rem"
components:
  button:
    textColor: "{colors.text-secondary-light}"
    typography: "{typography.ui}"
    rounded: "{rounded.full}"
    padding: "0 0.75rem"
    height: "2rem"
  button-small:
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "0 0.625rem"
    height: "1.75rem"
  button-accent-light:
    backgroundColor: "{colors.inverse-surface-light}"
    textColor: "{colors.inverse-on-surface-light}"
    typography: "{typography.ui}"
    rounded: "{rounded.full}"
    padding: "0 0.75rem"
    height: "2rem"
  button-accent-dark:
    backgroundColor: "{colors.warm-ink-dark}"
    textColor: "{colors.inverse-on-surface-dark}"
    typography: "{typography.ui}"
    rounded: "{rounded.full}"
    padding: "0 0.75rem"
    height: "2rem"
  login-button-light:
    backgroundColor: "{colors.text-light}"
    textColor: "{colors.canvas-light}"
    typography: "{typography.title}"
    rounded: "{rounded.full}"
    padding: "0.8125rem 1.625rem"
  login-button-dark:
    backgroundColor: "{colors.warm-ink-dark}"
    textColor: "{colors.canvas-dark}"
    typography: "{typography.title}"
    rounded: "{rounded.full}"
    padding: "0.8125rem 1.625rem"
  icon-button:
    rounded: "{rounded.full}"
    size: "2rem"
  toolbar-tool:
    typography: "{typography.ui}"
    rounded: "{rounded.small}"
    padding: "0 5px"
    height: "28px"
  menu-light:
    backgroundColor: "{colors.menu-surface-light}"
    textColor: "{colors.ink-light}"
    rounded: "{rounded.menu}"
    padding: "8px"
  menu-dark:
    backgroundColor: "{colors.menu-surface-dark}"
    textColor: "{colors.menu-text-dark}"
    rounded: "{rounded.menu}"
    padding: "8px"
  menu-row:
    typography: "{typography.ui}"
    rounded: "{rounded.small}"
    padding: "0.25rem 0.625rem"
    height: "1.875rem"
  popover-dark:
    backgroundColor: "{colors.menu-surface-dark}"
    textColor: "{colors.menu-text-dark}"
    rounded: "{rounded.large}"
    padding: "0.5rem"
    width: "min(20rem, 100vw - 16px)"
  dialog-dark:
    backgroundColor: "{colors.menu-surface-dark}"
    textColor: "{colors.menu-text-dark}"
    rounded: "{rounded.menu}"
    padding: "0.75rem 1rem 1rem"
    width: "28rem"
  tooltip:
    typography: "{typography.label}"
    padding: "0.25rem 0.625rem"
    height: "1.5rem"
  context-chip:
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "0 0.125rem 0 0.5rem"
    height: "1.5rem"
  space-composer-dark:
    backgroundColor: "{colors.welcome-composer-dark}"
    textColor: "{colors.text-dark}"
    typography: "{typography.body-small}"
    rounded: "{rounded.large}"
    padding: "8px"
    height: "48px"
    width: "min(48rem, 100% - 2rem)"
  chat-composer-dark:
    backgroundColor: "{colors.composer-dark}"
    textColor: "{colors.text-dark}"
    typography: "{typography.conversation}"
    rounded: "{rounded.full}"
    height: "3.5rem"
    width: "min(48rem, 100% - 3rem)"
  ai-card-dark:
    backgroundColor: "{colors.welcome-composer-dark}"
    textColor: "{colors.text-dark}"
    typography: "{typography.body-small}"
    rounded: "{rounded.menu}"
    padding: "0.625rem 1rem 0.625rem 1.125rem"
  toast-light:
    backgroundColor: "{colors.inverse-surface-light}"
    textColor: "{colors.inverse-on-surface-light}"
    typography: "{typography.ui}"
    rounded: "{rounded.full}"
    padding: "0.625rem 1rem"
  sidebar-item:
    typography: "{typography.ui}"
    rounded: "{rounded.medium}"
    padding: "0.3125rem 0.5rem"
  user-message-light:
    backgroundColor: "{colors.user-message-light}"
    textColor: "{colors.text-light}"
    typography: "{typography.conversation}"
  user-message-dark:
    backgroundColor: "{colors.user-message-dark}"
    textColor: "{colors.text-dark}"
    typography: "{typography.conversation}"
---

# Design System: mytGPT Portal

## Overview

**Creative North Star: "The Calm Operations Desk"**

mytGPT feels like a well-run operations desk: calm under load, clear about state, and organised around the work rather than the interface. One neutral system covers the chat and Spaces (the artifacts list and the Docs, Sheets, Slides and Draw editors). Surfaces are near-black or white with grey steps between them, text is high-contrast, controls are small and dense, and the only filled accent is the ink of the page itself, inverted. Dark mode is the default expression; light mode is an equally complete counterpart, never a washed-out inversion.

Spaces is the same desk with more tools on it. Its editors behave like the Google editors people already know (menus, shortcuts, selection, clicks), drawn in the portal's own tokens: compact menus, 28px tools, a 48px composer pill floating or docked at the conversation's width, and an AI card that always says what it is doing. Colour is functional: each artifact kind keeps its file-type colour, a selected object tints its own contextual menu and tool pill, and selection, guides and drawing tools keep the colours of the products they copy.

The interface is content-first and deliberately low on decoration. No subtitles under titles, no confirmation toasts, no invented items: every element reuses an existing portal component, label and size, and every control explains itself with a tooltip.

**Key Characteristics:**

- Calm, compact, precise; neutral grey on near-black or white.
- One filled accent: the page's ink inverted (the login button's pair).
- One layer style for every menu, popover and dialog: the portal menu surface.
- Compact rhythm: 13px labels, 30px menu rows, 28px tools, 16px icons, 32px buttons.
- Inter for operating; Open Sans for reading conversation answers.
- Flat tonal layers; shadows only where something floats.
- Google-parity behaviour in the editors, owner rules first.

## Colors

A neutral palette in two themes, with colour reserved for meaning: kind, context, selection, status.

### Primary

- **Inverted Ink** (light: inverse-surface-light on inverse-on-surface-light; dark: warm-ink-dark on inverse-on-surface-dark): the only filled accent. Primary buttons, Send while it can send, badges, the dismiss dot on the AI card, toasts. It is the login page's "Sign in with Microsoft" pair: light on dark, dark on light.

### Secondary

- **Functional Blue** (focus-blue-light / focus-blue-dark, with its containers): a functional indicator. It marks a text selection's highlight, the spreadsheet's cell selection (sheet-selection, the grid's own), chart and range picking, a document link, the open AI thread's edge, and Draw's selected and active tools (Excalidraw's own blue, kept at the owner's request). The selected sheet headers and the active sheet tab use the neutral selected tint (owner, ABUG-131: Sheets chrome stays neutral). The toolbar's cell formatting pill is always shown, so it is neutral too (owner, ABUG-246); only the chart and picture contextual pills carry a tint.
- **Kind Colours** (kind-doc, kind-sheet, kind-slides, kind-draw, kind-image): one set; each artifact kind keeps its file-type colour on its badge, its icon and its "make something new" tile. On a dark ground an icon or a tile uses a 55% mix of its colour with white. Draw is violet. The tiles' drawn illustrations and the cards' previews carry their own content colours; they are pictures, not interface tokens.

### Tertiary

- **Contextual Tints** (tint-teal, tint-green, tint-orange, tint-amber, tint-rose, lighter in dark): a selected object's contextual menu sits on a 12% tint of its colour with its label a shade toward it and a 2px underline while open; its tool pill in the toolbar is a 7% fill with a 40% edge (9% and 24% in dark).
- **Selection Purple** (selection-purple): a picked element on a slide, held a little off the element and edged in white so it reads on any slide. Purple is allowed wherever it is functional.
- **Guide Magenta** (guide-magenta): the deck's smart guides, so they never read as selection.

### Neutral

- **Canvas** (canvas-dark / canvas-light): the conversation, Spaces list and editor ground.
- **Surface** (surface-dark / surface-light): sidebar and raised surfaces; Material surfaces and containers (container-*) step up from it for cards, toolbars and hovers.
- **Menu Surface** (menu-surface-dark / menu-surface-light) with menu-hover-dark or an 8% ink layer in light: every menu, popover and dialog.
- **Text Steps** (text-*, then muted, then dimmed): primary text, secondary for controls at rest, muted for metadata and counts, dimmed for placeholders (at least 4.5:1).
- **Hairline**: the one divider is the text colour at 7%, for rows, sections and table lines.
- **Message Surfaces** (user-message-*): a small tonal lift for the user's message, never an accent bubble.
- **Status** (success, warning, danger, error-*): states only. Destructive rows share one red hover.
- **Brand Gradient** (brand-gradient-*) and **myt Blue**: approved brand media only (the login media frame, section cards in answers, the brand mark), never application chrome.

### Named Rules

**The Plain Accent Rule.** A filled accent is the inverted ink pair; functional indicators (selection, ranges, guides) keep their colour.

**The Colour Means Something Rule.** Colour appears only for a kind, a context, a selection or a status. A surface, a header or a menu is never tinted for decoration.

**The Two Themes Rule.** Every colour has a light and a dark value; dark values are lighter tints of the same hue so they read on the dark canvas.

## Typography

**Display Font:** Poppins (with sans-serif fallback) on the login page; Inter everywhere inside the app
**Body Font:** Open Sans for conversation answers; Inter for everything operated
**Label/Mono Font:** Inter for labels; Fira Code, Monaco or Consolas for code

**Character:** Interface text is small, neutral and structurally clear. Conversation answers are a little more open for long reading. Document, sheet and slide content keeps its own file fonts (with metric-compatible stand-ins for faces the file names), and Draw writes in Poppins Medium; the chrome around them never takes those faces.

### Hierarchy

- **Display** (Poppins 400, `clamp(2.25rem, 4vw, 2.75rem)`, 1.15): login headings only; the whole login page is set in Poppins.
- **Headline** (700, 1.875rem, 1.15): major page headings.
- **Title** (600, 1rem, 1.3): dialog and panel titles.
- **Title Small** (600, 0.9375rem): section titles in panels.
- **Conversation** (400 dark / 500 light, 1rem, 1.6): chat answers.
- **Body Small** (400, 0.875rem): dialog body, composer input, card titles, breadcrumbs.
- **UI** (400–500, 0.8125rem): menu rows, buttons, toolbar labels, sidebar items, effort control. The workhorse.
- **Label** (500, 0.75rem): tooltips, context chips, keyboard hints, small buttons.
- **Caption** (500, 0.6875rem): menu group labels.
- **Micro** (600, 0.625rem): count badges and kind badges only.
- **Code** (400, 0.875rem, 1.5): inline and block code.

### Named Rules

**The 13px Rule.** Menus, toolbars, buttons and the sidebar read at 13px. A menu next to another menu never uses a different size.

**The Two Reading Speeds Rule.** Inter for scanning and operating; Open Sans for reading answers.

**The Local Type Fix Rule.** Fix type in the component that owns it; never change the root size to repair one control.

## Layout

A task-oriented shell: a collapsible sidebar (18rem open), then the work. The conversation and every composer share one width: the content width (48rem), within the column width (content plus 4rem) less 3rem from 640px, the container less 2rem below it. Spaces' Docs page and toolbar take the same width, so text, toolbar and composer line up.

Spacing is a compact 4px-derived rhythm, mostly 2, 4, 6, 8, 12 and 16px, with 24px for page sections. Headers are 56px (48px on phones). Editors fill the rest: Sheets docks the composer between the grid and the sheet tabs; Docs and Draw float it 16px above the bottom; Slides sits on one flat ground with the slide page the only framed thing.

Breakpoints: 640px (composer inset and small screens), 768px (mobile and desktop shell), 1024px (sidebar overlay and list top bar), plus each editor's own (Excalidraw's 600px phone layout, the deck's 800px and 1080px rails). A phone wraps toolbars and the composer's controls rather than scrolling them sideways.

**The Same Width Rule.** Every composer is exactly the conversation composer's width, in every artifact, mode and state; never a separate number.

**The One Shell Rule.** Sidebar header, history, actions and profile footer read as one continuous surface.

## Elevation & Depth

Flat by default. Adjacent tones carry hierarchy; a hairline separates only where tone is not enough. Shadows are functional and local: the floating composer and AI card, menus, popovers and dialogs, a tablet sidebar while it overlays content. On dark, the sidebar is a translucent surface over a blur; content surfaces are always opaque.

### Shadow Vocabulary

- **Level 1** (`0 1px 2px rgba(0,0,0,.08), 0 1px 3px rgba(0,0,0,.06)`): tiny floating controls such as the AI card's dismiss dot.
- **Composer Lift** (light `0 1px 3px rgba(60,64,67,.3), 0 4px 12px rgba(60,64,67,.16)`; dark `0 1px 3px rgba(0,0,0,.22), 0 4px 12px rgba(0,0,0,.16)`): every composer, AI card and AI thread window.
- **Menu Lift** (light `0 1px 3px rgba(60,64,67,.1), 0 4px 16px 2px rgba(60,64,67,.08)`; dark: the 1px edge alone): menus, popovers, dialogs.
- **Level 3** (`0 14px 34px rgba(15,23,42,.14), 0 4px 12px rgba(15,23,42,.08)`): overlays and toasts.

### Named Rules

**The Functional Elevation Rule.** A shadow explains overlap or availability; if it does neither, remove it.

**The No Card In Card Rule.** A list or menu inside a layer is part of that layer: flat rows, no second surface.

## Shapes

Rounded, functional forms. Full pills for buttons, icon buttons, chips, the composer, toasts and toolbar bands; 12px for menu rows and toolbar tools; 20px for menus, dialogs and the AI card; 24px for popovers and the composer pill; 14px for kind tiles; 4px for shimmer blocks and checkboxes; 2px for selection frames. Fields inside Spaces are flat: no box, no border, no corner. Tabs are flat: radius 0, active state a 2px bar.

Borders are hairlines of the text colour (7% for dividers, 16% for field edges, 32% when active). The focus ring is the text colour at 45%.

**The Shape Has a Job Rule.** Rounding marks a control, chip, composer or bounded layer; it never turns a content block into a floating card.

## Components

### Buttons

- **Shape:** full pill (9999px); 32px tall, 28px small.
- **Default:** transparent, secondary text, 13px 500; hover is a 6% ink tint and full text colour.
- **Accent:** the inverted ink pair; hover darkens slightly. One per layer, last in the footer.
- **Line:** a 1px inset field-colour edge.
- **Icon button:** a 32px circle; hover a 10% ink tint; pressed or expanded the selected-pill tint.
- **Disabled:** 45% opacity. Every button has a tooltip.

### Chips

- **Context chip:** a 24px pill on the selected-pill tint, 12px label, kind icon, a round remove button; selected, a 1.5px inset ink ring.
- **Filter and scope pills:** selected is a 7% ink tint (10% dark) with full text; hover 6%.

### Cards / Containers

- **Spaces cards:** a preview area over a name row; flat, no nested boxes; loading shows the card's own shape in the shimmer.
- **Make something new:** one equal row of tiles (never a bento), each a drawn illustration on a 20% tint of its kind colour with a faint edge.
- **AI card:** 20px corners on the composer surface with the composer lift, at least 64px tall, above the composer pill and never flush with it. While working it always shows a status line ("Working on …", "Thinking…" or the current step) until the answer replaces it; elapsed seconds use the secondary text colour. Review actions are a small pill of ghost buttons.

### Inputs / Fields

- **Spaces fields:** flat, no box, border or fill, growing with their text. The sheet formula bar and name box keep their layout edge.
- **Portal outlined fields:** a 16% ink edge, 32% while active.
- **Search in a layer:** a muted icon, no box, aligned with the rows below, "Clear" while there is text, focused the moment the layer opens.
- **Placeholders:** the dimmed text colour.
- **Composer:** a 48px pill in Spaces (56px in chat): "+", context chip, input (14px), model, effort and send on one centre line; send is the inverted ink pair only while it can send.

### Navigation

- **Sidebar:** 13px 500 items, 16px corners, compact rhythm; hover a soft grey, active a stronger neutral; shortcuts appear on hover or focus. Full-height overlay on mobile.
- **Headers:** a 56px bar with breadcrumb, editable name and right-hand actions; a saved state shows nothing, only an icon while saving.
- **Menu bar:** 32px under the header; the fixed menus, then the selection's contextual menus on their tints.

### Menus, Popovers and Dialogs

The one layer style, everywhere: the menu surface, 1px edge, menu lift, 8px padding, no entrance animation for menus (popovers rise 2px over 140ms). Menus are 20px rounded; rows are 30px with 12px corners, 13px labels, 16px icons, a muted shortcut at the end. Group labels are 11px muted; separators only between groups. Destructive rows share one red hover. Disabled rows are 40–45% with no hover. Dialogs are 20px rounded, 28rem wide, a 16px title, small right-aligned footer buttons with the primary last. Every layer closes on an outside click and Esc, returns focus, stays on screen and never covers the composer.

### Toolbar

A full-pill band on the tertiary surface, 4px by 8px padding, 28px tools 2px apart, 12px corners, 20px hairline separators. Hover a 10% ink tint; pressed the selected-pill tint. A selection's tool group is a 32px pill on its contextual tint whose 28px circles sit concentric with its ends. The toolbar never scrolls; overflow folds behind "⋮".

### Tooltip

A 24px label in 12px text on the portal tooltip surface with a hairline ring, in the top layer above every menu, popover, dialog and composer, with the shortcut as small keys. Every interactive element has one; none repeats a visible label.

### Toast

The inverted ink pair on a full pill, 13px, rising above the composer. Only for errors (with Retry where useful) and Undo after a destructive action; never a confirmation.

### Loading Placeholder

Each editor loads as its own shape at the real editor's places (the sheet grid and tabs, the document page, the slide rail and slide, the drawing canvas and tool bar) in one shimmer: the text colour from 10% to 18%, swept over 1.1s, parts glinting in turn; still under reduced motion.

### Conversation and Tool Content

Answers use Open Sans, generous line height, minimal table rules, quiet inline code and theme links. Tool timelines, reasoning, sources and work status use subdued text without losing contrast. Section cards in answers take a low-chroma tint of a brand-gradient colour and stay flat.

### Login

The Microsoft sign-in is a content-width pill in the page's ink (on-background fill, background text) in both themes. The login media frame's gradient is approved brand media and stays as it is.

## Do's and Don'ts

### Do:

- **Do** use the inverted ink pair for every filled accent, as the login button.
- **Do** keep menus at 13px labels, 30px rows, 16px icons and 8px padding, and compare every menu on a screen with its neighbours.
- **Do** give every interactive element a tooltip with its name and shortcut, in the top layer.
- **Do** focus a layer's search or filter field the moment it opens.
- **Do** make every composer exactly the conversation composer's width and 48px tall in Spaces.
- **Do** show a status line in the AI card from the moment work starts until the answer replaces it.
- **Do** copy the Google editors' behaviour in Docs, Sheets and Slides, unless an owner rule says otherwise; the owner's rule wins.
- **Do** keep each kind's file-type colour, and allow purple wherever it is functional.
- **Do** reuse the portal's components, labels, items and tokens exactly.
- **Do** keep light and dark equally complete.

### Don't:

- **Don't** show a confirmation toast; toasts are for errors and Undo after a destructive action.
- **Don't** show anything once saved; only an icon while saving.
- **Don't** add subtitle or description lines under titles or rows; counts are a small muted number on the same line.
- **Don't** cut a label with "…"; wrap or shorten it.
- **Don't** put a divider under a search field or header, above a footer, or around pills.
- **Don't** nest a card in a card or a surface inside a layer.
- **Don't** use full-size buttons inside a layer.
- **Don't** let a menu or popover cover the composer or leave the screen.
- **Don't** decorate application chrome with gradients, glows or glass; brand media and loading shimmer only.
- **Don't** use Office product names, AI branding or disclaimers in the interface.
- **Don't** use mixed-size bento grids.

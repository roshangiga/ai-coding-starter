# RoomBook: build spec

An internal web page for booking the office meeting rooms. One page, no login. Bookings live in the browser for this version. The coordinator builds it from this file; the Issue tracker turns it into tickets.

## Users
- **Employee**: sees which rooms are free, books a slot, sees and cancels their own bookings.
- No admin role in this version. Rooms are a fixed list in code.

## Screens (one page, top to bottom)
1. **Header**: app name, a link to each section, and a light/dark theme switch. No marketing copy.
2. **Rooms**: one card per room with its photo, name, capacity, floor, equipment, and whether it is free right now. A search field that filters by room name, and filters for "free now" and "8+ people". At most three cards per row on a wide screen.
3. **Book a room**: a form with labelled fields: room, title, date, start, end, attendees, your name. One "Book room" button. Errors appear next to the field that caused them.
4. **My bookings**: my upcoming bookings sorted by date and start time, each with a Cancel button that asks for confirmation.
5. **Footer**: who to contact for room problems. Nothing else.

## Data
**Room**: `id`, `name`, `capacity` (int), `floor` (int), `equipment` (list of strings), `photo` (file in `room-photos/`), `description` (one short line).

**Booking**: `id`, `roomId`, `title` (1–80 chars), `date` (YYYY-MM-DD), `start` and `end` (minutes since midnight), `attendees` (int), `bookedBy` (name).

The six rooms and their photos are in `room-photos/` (`room-a.jpg` … `room-f.jpg`, 1600×900). Capacities: A 4, B 8, C 2, D 12, E 6, F 20. Floors: A and B 1, C and D 2, E and F 3.

## Rules
1. Bookable hours are 08:00 to 18:00, in 30-minute steps.
2. `end` must be later than `start`. The maximum length is 4 hours, kept in one named constant.
3. Two bookings for the same room and date overlap when `newStart < existingEnd` and `newEnd > existingStart`. An overlapping booking is refused. Back-to-back bookings are allowed.
4. `attendees` must be between 1 and the room's capacity.
5. Every field is required except `attendees` (default 1).
6. Text a user typed is always shown as text, never as HTML.
7. If saving fails, the booking is not shown as confirmed and the user sees an error.
8. Cancelling removes the booking and frees the slot at once.

## Design
- The finished look is in `mockup/index.html` (light and dark). Match it; it is a picture of the result, not code to copy.
- Apply the MT design system in `design/` (`DESIGN.md` for the rules and tokens, `material3.css` for the Material 3 surfaces and states). Use only the parts that apply to a simple page: colour tokens for both themes, type scale, spacing, radii, buttons, outlined fields, cards, chips, focus. Ignore the sections about the portal's editors.
- Light and dark themes. Follow the system setting by default; the switch overrides it and is remembered.
- One focus indicator per control, visible on keyboard focus.
- No pills or badges that carry no information, no subtitles under headings, no gradients, no emoji icons, no invented stats or testimonials.
- Photos sit in fixed 16:9 boxes so the page doesn't move while they load; serve resized copies, not the 1600px originals.
- Works at 1440, 800 and 400 wide with no sideways scroll.

## Tech
- A static site with no build step: `index.html`, CSS, and JavaScript modules. Runs from a plain local web server.
- Booking rules (validation, overlap, sorting) live in their own module with no DOM code, so they can be unit tested.
- Unit tests run with Node's built-in test runner (`node --test`); no test framework to install.
- No secrets, API keys, `eval`, `innerHTML` with user text, or leftover `console.log`.

## Out of scope
- Login, user accounts, roles, admin screens
- A server or shared database (single browser only)
- Calendar, chat or email integrations
- Recurring bookings
- AI suggestions, analytics, stats, testimonials
- A mobile app (the page must still work at phone width)

## Acceptance criteria
- [ ] All six rooms are listed with photo, name, capacity, floor, equipment and a correct "free now" status.
- [ ] Typing in the search shows only rooms whose name contains the text (case-insensitive); the filters work alone and together with the search.
- [ ] A valid booking appears in My bookings at once and the room shows busy for that slot.
- [ ] Booking the same room for the exact same slot twice is refused.
- [ ] A booking that partly overlaps, or fully contains, an existing one is refused.
- [ ] A booking that starts exactly when another ends is accepted.
- [ ] A booking whose end is not after its start is refused with a message next to the end field.
- [ ] A booking longer than 4 hours is refused.
- [ ] More attendees than the room's capacity is refused.
- [ ] A title containing HTML or a script tag is displayed as literal text and no script runs.
- [ ] My bookings are sorted by date, then start time.
- [ ] Cancel asks for confirmation, then removes the booking.
- [ ] Bookings survive a page reload.
- [ ] Every input has a visible label; everything works with the keyboard alone, with one visible focus ring per control.
- [ ] Body text has a contrast ratio of at least 4.5:1 in both themes; no text below 12px.
- [ ] The theme switch works, follows the system setting by default and is remembered after a reload.
- [ ] No sideways scroll at 400 wide.
- [ ] Unit tests cover rules 2–4 and fail if the overlap check is broken.
- [ ] Snyk reports no issues in the app's code; Impeccable reports nothing that the design system does not require.

## Work packages

The Issue tracker makes one ticket per package, in this order. A package starts only when the packages it depends on are merged into `develop`. Each package is done when every acceptance criterion listed for it passes in QA.

| # | Package | Depends on | Scope | Done when (acceptance criteria) |
|---|---|---|---|---|
| 1 | Skeleton and design tokens | none | Page structure (header, sections, footer), the design tokens for both themes, base type, spacing and focus styles, the theme switch | Theme switch; one focus ring per control; no sideways scroll at 400 wide; contrast in both themes |
| 2 | Booking rules module and tests | none | The rules module (hours, length, overlap, attendees, required fields, sorting) and its unit tests; no DOM code | Same slot refused; partial and full overlap refused; back-to-back accepted; end not after start refused; over 4 hours refused; over capacity refused; unit tests fail if the overlap check is broken |
| 3 | Storage | 2 | Saving and loading bookings in the browser, and the error path when saving fails | Bookings survive a reload; a failed save is not shown as confirmed |
| 4 | Rooms list | 1 | Room cards with photo, facts and "free now" status, the search and the two filters, resized photos | All rooms listed correctly; search and filters work alone and together |
| 5 | Booking form | 1, 2, 3 | The labelled form, field errors next to their field, the Book button | A valid booking appears at once and the room shows busy; every rule's error appears next to its field; HTML in a title shows as text |
| 6 | My bookings | 2, 3 | The sorted list, cancel with confirmation | Sorted by date then start time; cancel asks, then removes and frees the slot |
| 7 | Final pass | 4, 5, 6 | Keyboard walk-through, both themes at 1440, 800 and 400 wide, Impeccable and Snyk on the whole app, fixes | Keyboard-only use works; no text below 12px; Snyk clean; Impeccable reports nothing the design system doesn't require |

Packages 1 and 2 can run at the same time, then 3 and 4, then 5 and 6.

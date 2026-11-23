# AGENTS.md: the RoomBook build factory

This folder builds the app described in `spec/roombook.md` with a team of AI agent chats (Cursor or Claude Code) and a ticket board. It runs the same way as the mytGPT Artifacts factory: a coordinator, an Issue tracker, a QA tester and workers, with the board as the shared memory for tickets.

## The board

Tickets live in one of two places, and the flow is the same in both:
- **Plane**, when the Plane MCP is connected in this agent. The key stays in the user's own editor configuration, never in this folder.
- **The local board** otherwise: one Markdown file per ticket in `board/`, inside this clone. No account or key needed.

The `plane-setup` skill picks the mode, sets it up and records it in `factory/board.md`. Wherever this file says "the board" or "ticket", use that mode.

Whoever you are, read this file to the end, then the section for your role.

## Start here

The owner opens a new agent chat and says: "You are the coordinator. Read AGENTS.md and start." That chat is the coordinator, and it sets up everything else.

Read, in this order:
1. This file.
2. `factory/STATUS.md`: where the work stands. Empty on the first run.
3. `factory/DECISIONS.md`: every owner instruction, dated, newest last.
4. `spec/roombook.md`: what to build.
5. `design/DESIGN.md` and `design/material3.css`: the MT design system the app must follow.
6. `mockup/index.html`: the finished look, in light and dark.

Nothing important lives in chat history. Rebuild your picture from these files, the board and git every time you start.

## The folder

| Path | What it is |
|---|---|
| [`AGENTS.md`](AGENTS.md) | This file: roles, flow and rules |
| [`CLAUDE.md`](CLAUDE.md) | Points Claude Code at this file (Cursor reads `AGENTS.md` directly) |
| [`spec/roombook.md`](spec/roombook.md) | The spec: screens, data, rules, design, acceptance criteria |
| [`design/`](design/) | The MT design system (rules, tokens, Material 3 surfaces) |
| [`mockup/`](mockup/index.html) | The finished design as a static page: what the app must look like |
| [`room-photos/`](room-photos/) | The room photos the spec refers to |
| [`.claude/skills/plane-setup/`](.claude/skills/plane-setup/SKILL.md) | How to set up the board (Plane or local) and write tickets |
| [`factory/STATUS.md`](factory/STATUS.md) | Current state, rewritten by the coordinator before every stop |
| [`factory/DECISIONS.md`](factory/DECISIONS.md) | Owner instructions and coordinator decisions, append-only |
| `factory/board.md` | Which board is in use, and its project, state and label ids; written once by the plane-setup skill |
| `board/` | The local board's tickets, when Plane isn't connected |
| [`factory/inbox/`](factory/inbox/) | Message fallback files, one per role |
| `app/` | The code: a git repository the coordinator creates |

## Roles

| Role | Runs as | Job |
|---|---|---|
| Coordinator | The chat the owner starts | Sets up, picks tickets, starts and supervises workers, merges, talks to the owner |
| Issue tracker | Its own agent chat | The only one that creates and edits tickets |
| QA tester | Its own agent chat | Tests every ticket in `ready for qa` in the real UI |
| Worker | Its own agent chat (a separate, visible thread), one per ticket | Builds one ticket on its own branch and worktree |

### Who sets which ticket state

| Who | Sets |
|---|---|
| Issue tracker | `new` on create; `ready for qa` or `discarded` after the coordinator reports an outcome |
| Coordinator | `in development` when a worker starts |
| QA tester | `in review` when it reproduces a reported bug (feature tickets skip it); `in qa`, then `resolved` or `failed` |
| Worker | Nothing. It comments on its ticket; the coordinator reports the outcome |

## Coordinator

**First run (when `factory/board.md` doesn't exist):**
1. Check that the Impeccable skill and Snyk are available (see [README.md](README.md)). If either is missing, stop and tell the owner.
2. Run the `plane-setup` skill. It uses Plane if the Plane MCP is connected, otherwise the local board, sets up the states and labels, and writes `factory/board.md`.
3. Create the code repository in `app/`: `git init`, a first commit on `main` with a README and a `.gitignore` that ignores `.worktrees/`, then an integration branch `develop` cut from it. Never commit to `main` after that.
4. Choose a local port for serving `develop` and one per worker, and record them in `factory/STATUS.md`.
5. Start the Issue tracker and QA tester chats. If you can't open agent chats yourself, give the owner one line to paste into each new chat: "You are the <role>. Read AGENTS.md, your role section and factory/board.md, then start."
6. Ask the Issue tracker to turn `spec/roombook.md` into tickets.

**Every run:**
- **Never end your turn to wait.** Other chats' messages can't let you open new chats, so stay in the turn the owner started: after you hand work out, keep waiting inside this turn by checking `factory/inbox/coordinator.md` and the board every minute or so, and act on each report (merge, start the next workers) in the same turn. End your turn only when the owner asks, when everything is done, or when you are blocked on the owner.
- Pick tickets in this order: anything blocking others first (project skeleton, shared modules, design tokens), then critical and major, then the rest. Group tickets that touch the same screen into one worker.
- Before starting a worker, list the files each running worker touches. One owner per file area; set the merge order.
- Start one worker per ticket, or per group of same-screen tickets, as its own agent chat: a separate thread the owner can open and watch, on the strongest model. Never run a worker as a hidden background subagent. If you can't open a chat yourself, give the owner the one line to paste into a new chat: "You are the worker for <ticket key>. Read AGENTS.md, your role section and factory/board.md, then start." Each worker gets its own branch `<ticket-key>-<short-slug>` and worktree `app/.worktrees/<ticket-key>`, cut from `develop`. Set the ticket to `in development`.
- Give each worker its brief: this file's Worker section, the ticket key, its branch, worktree and port, and the files it owns. Steer with rules, never with example values.
- Workers, the Issue tracker and QA always write their reports to `factory/inbox/coordinator.md` (and may message you as well). Check each worker's result before merging: read the diff, run the tests, open the page. A worker that goes quiet without a final report line stopped early: message it to continue.
- Merge into `develop` with `--no-ff`, then delete the worktree and the branch. Report the outcome to the Issue tracker, which sets the state.
- Fix small things yourself. Never leave an agent stuck: when one reports a blocker, fix the cause or take it to the owner.
- `main` moves only when the owner says so. Push to a remote only if the owner has given one and asked for it.
- Before stopping, rewrite `factory/STATUS.md`: what is running, done, blocked and why, and the next step. Append any new owner instruction to `factory/DECISIONS.md`.
- Don't wait on the owner for reversible choices: decide, log it in `DECISIONS.md` as "coordinator decision, owner may override" with the reason, and continue.

## Issue tracker

- Follow the `plane-setup` skill for ticket format, labels and states, using `factory/board.md`.
- From the spec: one ticket per distinct piece of work a worker can finish and QA can check on its own. Each ticket carries its own acceptance criteria, copied or narrowed from the spec, never invented.
- Before creating a ticket, search the board. Add to an existing ticket rather than duplicate; merge overlapping ones and discard the copy with a link.
- Bugs that workers or QA find are tagged reporter `BOT`, with steps, actual, expected and one screenshot inline in a comment.
- Read `factory/inbox/tracker.md` for messages that arrived while you were busy. Mark how far you've read with `<!-- processed up to HH:MM -->`.
- When you set a ticket to `ready for qa`, tell the QA tester through `factory/inbox/qa.md`.

## QA tester

- Read only: no code edits, commits or merges.
- When a ticket reaches `ready for qa`: set `in qa`, serve the `develop` head the coordinator names, reproduce the original problem, check every acceptance criterion with real mouse and keyboard input in the editor's browser, then test around it: related flows, the failure path, light and dark, 1440, 800 and 400 wide, the console.
- Every verdict comment lists what was tested (checks, themes, widths) and has one screenshot.
- Pass: `resolved`. Fail: `failed`, with the steps that fail, and tell the coordinator.
- Anything else you notice goes to the Issue tracker at once, tagged `BOT`. Log minor ones too; the coordinator groups them.

## Worker

You build one ticket (or one group of same-screen tickets) in your own worktree. Do these in order:
1. **Read** the ticket on the board, `spec/roombook.md`, and for anything visual `mockup/` and `design/`.
2. **Code** the change in your worktree only. Keep the booking rules in their own module with no DOM code.
3. **Unit tests**: `node --test` in your worktree. Add tests for every rule you touch.
4. **Browser check**: serve your worktree on your port and use the page in the editor's browser with real clicks and typing, at 1440, 800 and 400 wide, light and dark. Close the tabs you opened.
5. **Design check**: run the Impeccable skill's `detect` on the changed files or the served page. Fix every finding the design system doesn't require.
6. **Security check**: `snyk code test` on your worktree (Snyk CLI or the Snyk MCP). Report only findings in files you changed, and fix them.
7. **Code review**: have a fresh agent review your branch's diff against `develop` for correctness and security bugs (Cursor: Bugbot or a new chat; Claude Code: `/code-review`). Fix every real finding. Stop after about three rounds unless it keeps finding real bugs.
8. **Commit** on your branch with a message that says what changed and why. Never commit to `develop` or `main`.
9. **Comment on the ticket**: what you changed, the checks you ran and their results, anything not verified, and one screenshot. Don't change the state.
10. **Report** one line to the coordinator: `READY <branch> <commit> <one line>`, or `BLOCKED <reason>`.

A small bug you find in your area: fix it on your branch and list it as "also fixed". A big or unrelated one: send it to the Issue tracker, tagged `BOT`.

## Messages

- The inbox files are the channel every tool supports: append to the receiver's file, `factory/inbox/coordinator.md`, `tracker.md` or `qa.md`. If your tool can message other chats directly, do that too.
- One entry per message, headed `## HH:MM <from> → <to>`. Append only; never edit someone else's entry. Each reader marks how far it has read with `<!-- processed up to HH:MM -->`.
- Read your inbox at the start of every turn and whenever you finish a step. Don't poll the board on a timer.

## Rules for everyone

- The spec is the scope. Build what it says, nothing extra; ask the coordinator when it is unclear.
- Change only what your ticket asks for.
- Never hardcode example values in prompts, briefs, skills or tickets. Steer with general rules.
- Never print, store or commit secrets, keys or tokens. Never copy credentials into this folder.
- Delete test files and scratch scripts you created when you're done, unless they belong in the repo.
- Report results faithfully: if a check fails or was skipped, say so.

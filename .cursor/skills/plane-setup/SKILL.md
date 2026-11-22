---
name: plane-setup
description: Use when setting up the ticket board (Plane, or the local board when Plane isn't connected) for this folder's spec → mockup → build demo, turning the spec into tickets, or briefing the issue tracker, QA tester and workers with the board's details.
---

# Board setup for this folder

Sets up one ticket board for the app built in this folder, fills it from the spec, and records the details in `factory/board.md` so every session can use them without looking them up. The board is Plane when the Plane MCP is connected, and a folder of Markdown files otherwise. States, labels, ticket format and who sets what are the same in both.

## 0. Pick the mode

- Check whether the Plane MCP tools are available to you (a `plane` MCP server is connected and listing Plane projects works).
  - Yes: **Plane mode**, steps 1P–3P.
  - No: **local mode**, step 1L. Don't ask for a key and never put one in this folder.
- If `factory/board.md` already exists, reuse what it records and skip to step 4.

## The states and labels (both modes)

| State | Plane group | Colour | Plane: how |
|---|---|---|---|
| new | backlog | #87909E | rename Backlog |
| in review | unstarted | #0091FF | rename Todo |
| in development | started | #5F55EE | rename In Progress |
| ready for qa | started | #00A35C | create |
| in qa | started | #E16B16 | create |
| failed | started | #D92D20 | create |
| discarded | cancelled | #A07E0A | rename Cancelled |
| resolved | completed | #008844 | rename Done |

Labels:
- `type: feature`, `type: bug`
- `severity: critical | major | minor | low`
- `reporter: <initials>`, `reporter: BOT` (found by an agent)
- `area: <area>`: one per screen or area in the spec, plus `area: others`

Priority: `urgent`, `high`, `medium`, `low`.

## 1P. Plane: project

The calls below use the Plane MCP's tools (`project`, `state`, `label`, `workitem`); `plane: <tool>` means that tool with those arguments.

```
plane: project action=create name="<App name>" identifier="<PREFIX>" description="<one line from the spec>"
```

Keep the returned `id` as `project_id`. Never change other projects. Never print or store the API key.

## 2P. Plane: states

A new project has five states. Rename those and create the rest, so the board reads left to right as in the table.

```
plane: state action=list   project_id=<id>
plane: state action=update project_id=<id> state_id=<id> name=… color=…
plane: state action=create project_id=<id> name=… color=… group=started
```

## 3P. Plane: labels

This Plane server has no custom fields, so type, severity, reporter and area are labels.

```
plane: label action=create project_id=<id> name="<label>" color="<hex>"
```

## 1L. Local board

- Create `board/` with a `README.md` that lists the states in order, the labels, and the ticket file format below.
- One file per ticket: `board/<PREFIX>-<NNN>-<short-slug>.md`. The prefix is a short identifier for the app.
- Each ticket file starts with these lines, then the description, then a `## Comments` section that only grows:
  ```
  # [<REPORTER>] <NNN> - <Area>: <summary>
  state: <state>
  priority: <priority>
  labels: <label>, <label>, …
  depends on: <ticket ids or none>
  ```
- Changing a state means editing the `state:` line and adding a comment that says who changed it and why.
- Screenshots go in `board/assets/` and are linked from the comment.

## 4. Record the board

Write `factory/board.md`: the mode (Plane or local), and either the Plane project id and identifier with every state id and label id, or the local board's folder and ticket prefix. Every other session reads this file instead of looking things up.

## 5. Spec → tickets

Read the spec (`spec/roombook.md`). If it has work packages, make one ticket per package, in their order, with their dependencies; otherwise one ticket per distinct piece of work a worker can finish and QA can check on its own.

- **Name:** `[<REPORTER>] <NNN> - <Area>: <summary>`
- **Description:** what and why (from the spec), acceptance criteria as a checklist QA can tick (the package's "done when" criteria, copied from the spec), out of scope, dependencies, and a link to the mockup.
- **Priority** and **labels:** type, severity, reporter, area. **State:** `new`.
- Search before creating. Fold overlapping work into one ticket instead of adding another.

```
plane: workitem action=create project_id=<id> name="…" state=<new id> priority=<p> labels=[…] description_html="…"
```

Bugs found later use the same format with `type: bug`, steps to reproduce, actual and expected, and one screenshot in a comment.

## 6. Who sets what

| Session | Does |
|---|---|
| Issue tracker | The only one that creates tickets. Sets `new`, then `ready for qa` or `discarded` after the coordinator's report. |
| Coordinator | Picks tickets whose dependencies are merged (critical and major first), starts one worker per ticket on its own branch and worktree, sets `in development`, merges, reports outcomes to the tracker. |
| Worker | Builds, checks in the browser, runs the security scan, tests, code review and UI pass, comments on its ticket. Never changes the state. |
| QA tester | Sets `in review` when it reproduces a reported bug (feature tickets skip it). Sets `in qa`, tests against the acceptance criteria, then `resolved` or `failed`. Logs anything else it finds through the tracker, tagged BOT. Never edits code. |

Give each session `factory/board.md` and its row of this table when you start it.

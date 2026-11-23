# AI coding starter: RoomBook

Everything you need for the hands-on part of the "Coding with AI: from spec to shipped" session. You set up a ticket board, read the spec and the mockup, then let a team of AI agents in Cursor build the app ticket by ticket.

## What's in here

| Path | What it is |
|---|---|
| [`AGENTS.md`](AGENTS.md) | The factory's rules: roles, flow, checks. Every agent chat reads it; Cursor loads it automatically |
| [`CLAUDE.md`](CLAUDE.md) | Only for Claude Code users: makes it load `AGENTS.md` |
| [`spec/roombook.md`](spec/roombook.md) | What to build: screens, data, rules, design, acceptance criteria, work packages |
| [`mockup/`](mockup/index.html) | The finished design as a static page, light and dark |
| [`design/`](design/) | The MT design system: rules and tokens ([`DESIGN.md`](design/DESIGN.md)), Material 3 surfaces ([`material3.css`](design/material3.css)) |
| [`room-photos/`](room-photos/) | The six room photos the spec uses |
| [`.cursor/skills/plane-setup/`](.cursor/skills/plane-setup/SKILL.md) | The skill that sets up the board (Plane, or local Markdown files) and writes tickets. Same file in `.claude/skills/` for Claude Code |
| [`factory/`](factory/) | Status, decisions and the inbox files the agents use to talk to each other |
| [`slop-demo/`](slop-demo/) | The demo from the session: a vibe-coded page cleaned up in seven steps |

## Before you start

- **Cursor**, signed in, with Agent mode. Claude Code works too.
- **Git** and **Python 3.10+** (for `uvx` and a local web server). **Node.js 20+** for the unit tests.
- **Plane** is optional: the local board works without it.
- **Snyk**: `npm install -g snyk`, then `snyk auth`.
- **Impeccable**: install the skill from [impeccable.style](https://impeccable.style/docs/).

New to the factory? Read [`AGENTS.md`](AGENTS.md) first: it's the rulebook every agent follows.

## Hands-on

Two things to do: clone, then one prompt.

### 1. Set up the folder
Clone this repository and open the folder in Cursor (File → Open Folder):
```bash
git clone https://github.com/roshangiga/ai-coding-starter.git
```
Short link to this page: [tinyurl.com/mt-ai-starter](https://tinyurl.com/mt-ai-starter)

Done when: the folder is open and [`AGENTS.md`](AGENTS.md) is there.

### 2. Read the spec
Open [`spec/roombook.md`](spec/roombook.md). Find the work packages and the acceptance criteria. Pick one criterion and say how QA would check it.

### 3. Look at the mockup
Open [`mockup/index.html`](mockup/index.html) in a browser. Switch between light and dark, and compare it with the spec's Design section.

### 4. Start the factory
Open a new Agent chat in this folder and type:

> You are the coordinator. Read AGENTS.md and start.

1. It sets up the board, and the Issue tracker files the tickets from the spec.
2. Open a new Agent chat for each role it names, and paste the line it gives you.
3. Watch the first ticket reach "ready for qa". The agents leave each other notes in `factory/inbox/`.

Done when: QA resolves one ticket on your board and it is merged into `develop`.

**The board:** without Plane, it's the `board/` folder in your clone: one Markdown file per ticket, with the same states and flow. No account or key needed.

**Have your own Plane?** Add the Plane MCP to your own Cursor settings, never to this folder: Cursor Settings → MCP → Add new global MCP server, which opens `~/.cursor/mcp.json`. Add:
```json
{
  "mcpServers": {
    "plane": {
      "command": "uvx",
      "args": ["plane-mcp-server", "stdio"],
      "env": {
        "PLANE_API_KEY": "<your API key>",
        "PLANE_WORKSPACE_SLUG": "<your workspace>"
      }
    }
  }
}
```
For a self-hosted Plane, add `"PLANE_BASE_URL": "<your Plane address>"` to `env`. The coordinator then uses Plane instead. Use a project of your own, so you don't clash with anyone else's.

## The slop demo

Open [`slop-demo/index.html`](slop-demo/index.html) (double-click works, no server needed). It links seven versions of the same page, each fixing one kind of slop. On each page:
- the **top bar** says what this step changed
- the numbered **pins** show before and after when you hover them
- the **reports** below the page show Snyk and Impeccable results for that version
- **Show changes** hides all of it

The code-level slop (fake keys in `config.js`, `eval`, unescaped HTML, a swallowed error, a broken overlap check, empty tests) is left in on purpose for the code review part. The keys are fake.

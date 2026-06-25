By submitting a pull request to this project, you agree to license your contribution under the terms of the MIT License.

Please read our [Contributor License Agreement and other Contributing Guidelines](CONTRIBUTING.md).

## Goal

Replace the default create-next-app homepage with a polished demo gallery that surfaces the best animations first, and fix the Biome config deprecation that was failing CI on `version: latest`.

## Screenshots

<!-- Add a screen recording or still of:
- Homepage hero + Highlights grid (light mode)
- All demos grid
- Optional: dark mode + prefers-reduced-motion (no stagger)
-->

## What I changed and why

- **Homepage layout** — Rebuilt `src/app/page.tsx` as a data-driven gallery with a **Highlights** section (13, 12, 10, 11) and an **All demos** grid for the rest. Makes the strongest work visible without scrolling a flat list.
- **Card surfaces** — Swapped border-hover cards for layered `box-shadow` + subtle `outline` on neutral backgrounds. Shadows adapt better across light/dark than hard borders.
- **Typography** — Dropped decorative Jersey/Jacquard fonts for Inter hierarchy with `text-balance` on headings and `text-pretty` on descriptions. Added `tabular-nums` on demo IDs.
- **Entrance motion** — Staggered `opacity` + `translateY` on cards (~45ms apart, ~320ms ease-out). Occasional page-load motion only; skipped entirely when `prefers-reduced-motion` is on.
- **Pointer-gated hovers** — Card lift, shadow deepen, and arrow nudge only under `@media (hover: hover) and (pointer: fine)` so touch users don't get stuck hover states.
- **Press feedback** — `active:scale-[0.98]` on demo cards, `0.96` on the GitHub pill.
- **Root polish** — `antialiased` on `<body>`, flat `#fafafa` / `#0a0a0a` background in `globals.css`, updated site metadata description.
- **Biome v2** — Upgraded `@biomejs/biome` to `2.5.1` and migrated `linter.rules.recommended` → `"preset": "recommended"` so CI no longer errors on the deprecated field.

## How I convinced myself this is right

- [ ] `pnpm dev` — homepage loads, highlights + grid render, links navigate
- [ ] Hover on desktop — cards lift and arrow shifts; no hover stuck on touch
- [ ] `prefers-reduced-motion: reduce` — stagger skipped, press scale disabled
- [ ] Dark mode — cards and text remain readable
- [ ] `pnpm biome check biome.json` — config deserializes cleanly (no `recommended` deprecation)
- [ ] `pnpm biome check ./src/app/page.tsx` — passes

**Note:** `pnpm build` still fails on a pre-existing corrupt image in `/03` (`karsten-winegeart-...jpg`), unrelated to this PR.

## What I'm not doing here

- Not changing any individual demo pages (`/01`–`/12`) — homepage and global shell only.
- Not adding demo `/13` — that lands in [#feat/x-stacked-toasts](https://github.com/glamboyosa/animations/compare/feat/x-stacked-toasts). **Merge toast PR first** (or rebase this branch after) so the Highlights link to `/13` resolves.
- Not fixing the ~50 pre-existing Biome lint issues in older demo files (suppression placeholders, etc.).
- Not fixing the corrupt `/03` image or the stashed `/12` middleware preload work.

## LLM use disclosure

Claude (Cursor) drafted the homepage structure, card styling, and motion values against Emil Kowalski / animations.dev and interface-polish guidelines. Manual review and iteration on spacing, copy, and Biome class sorting.

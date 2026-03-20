# HANDOFF.md — Qwi Count

## Last Updated
2026-03-20 by Claude

## Current State
- **Working version**: v0.1 — Core game loop complete (Phase 1 + Phase 2 partial)
- **Runs locally**: yes
- **Deployed to Vercel**: no
- **Known broken things**: none — builds and runs cleanly

## Completed Features
- [x] Project scaffolding (Next.js 16 + Tailwind v4 + TypeScript)
- [x] Home screen with New Game / Resume Game buttons
- [x] Player setup (2-4 players, names, color picker)
- [x] Active game screen with score buttons (+1 to +6 and custom)
- [x] Turn indicator with player name/color + round number
- [x] Scoreboard with animated score updates and bonus star counts
- [x] Undo (full history stack, not just one level)
- [x] Skip turn button
- [x] End game flow with +6 bonus selection modal
- [x] Game Over summary with rankings and per-player stats
- [x] PERFECT LINE! button with canvas-confetti celebration
- [x] Framer Motion animations throughout (button press, score roll-up, page transitions)
- [x] Bottom navigation bar
- [x] Rules reference page
- [x] Settings page (sound, haptics, theme toggles — UI only, no sound files yet)
- [x] Game state persists to localStorage via Zustand persist middleware
- [x] Rebranded: no trademarked game names used anywhere in code or UI

## In Progress
- [ ] Sound effects — need to add audio files to public/sounds/
- [ ] PWA manifest + service worker

## Not Started
- [ ] Dexie.js IndexedDB for game history persistence
- [ ] Game history list view (/history)
- [ ] Aggregate statistics dashboard
- [ ] Dark mode CSS implementation (toggle exists, CSS not wired)
- [ ] Haptics integration (Capacitor)
- [ ] Capacitor native builds
- [ ] Vercel deployment

## Architecture Decisions Log
| Decision | Choice | Why | Date | Agent |
|----------|--------|-----|------|-------|
| State management | Zustand with persist | Simple, built-in persist middleware, tiny bundle | 2026-03-20 | Claude |
| Animations | Framer Motion | Declarative, gesture support, layout animations | 2026-03-20 | Claude |
| Confetti | canvas-confetti (direct) | Lightweight, no React wrapper needed | 2026-03-20 | Claude |
| Font | Nunito (Google Fonts) | Rounded, playful, matches "premium board game" aesthetic | 2026-03-20 | Claude |
| Styling | Tailwind v4 with CSS theme vars | Utility-first, CSS custom properties for theming | 2026-03-20 | Claude |
| Branding | "Qwi Count" / "Perfect Line" | Avoids any trademarked game names | 2026-03-20 | Claude |

## File Map (key files only)
| File | Purpose |
|------|---------|
| src/app/layout.tsx | Root layout, Nunito font, Navigation |
| src/app/page.tsx | Home: new game / resume / player setup |
| src/app/game/page.tsx | Active game screen (main UI) |
| src/app/rules/page.tsx | Rules reference |
| src/app/settings/page.tsx | Settings toggles |
| src/components/PlayerSetup.tsx | Name + color picker (2-4 players) |
| src/components/ScoreBoard.tsx | Player scores display with animations |
| src/components/ScoreInput.tsx | Tap buttons (+1 to +6, custom) |
| src/components/BonusButton.tsx | Big celebration button with confetti |
| src/components/TurnIndicator.tsx | Current player display |
| src/components/GameOverSummary.tsx | Final scores, stats, winner |
| src/components/Navigation.tsx | Bottom nav bar |
| src/stores/gameStore.ts | Zustand game state with undo stack |
| src/stores/settingsStore.ts | User preferences (sound, haptics, theme) |
| src/types/index.ts | Shared TypeScript interfaces |
| src/lib/constants.ts | Colors, player limits, scoring constants |

## Environment & Setup
- Node version: 24.x
- Package manager: npm
- Key env vars: none required
- How to run: `npm run dev` (localhost:3000)
- How to build: `npm run build`

## Style & Convention Notes
- Components are in `src/components/` as PascalCase `.tsx` files
- Stores are in `src/stores/` with `use` prefix convention
- All components use `'use client'` directive (client-side interactivity)
- Tailwind v4 uses `@theme inline` for CSS custom properties
- Motion: all buttons use `whileTap={{ scale: 0.9-0.95 }}`
- Colors: player colors from `PLAYER_COLORS` constant, app accent is `--primary` (#FF6B6B)

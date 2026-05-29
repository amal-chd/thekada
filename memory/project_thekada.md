---
name: project-thekada-website
description: Corporate website for The Kada Digital Ventures Pvt Ltd — React + Vite + Tailwind + Framer Motion
metadata:
  type: project
---

Full corporate website for The Kada Digital Ventures Pvt Ltd — a Kerala-based hyperlocal commerce ecosystem company.

**Why:** User wanted an investor-grade, premium corporate website positioning The Kada as a serious IT infrastructure company, not a delivery app.

**How to apply:** When continuing work on this project, refer to this architecture and avoid regressions.

## Stack
- React 19 + Vite 8 + TypeScript
- Tailwind CSS v4 (@tailwindcss/vite plugin)
- Framer Motion (animations, whileInView, AnimatePresence)
- @studio-freight/lenis (smooth scrolling)
- React Router DOM v6
- Lucide React (icons)
- react-intersection-observer

## Pages Built
- `/` — Home (Hero + 10 sections)
- `/about` — Company story, timeline, values
- `/ecosystem` — Platform architecture overview
- `/products/kada-dine` — Food commerce product page
- `/products/kada-stay` — Hospitality product page
- `/products/kada-ledger` — Business finance product page
- `/technology` — AI/ML capabilities + infrastructure
- `/insights` — Blog/editorial
- `/careers` — Open roles + perks
- `/contact` — Multi-intent contact form
- `/investor-relations` — Traction + investment thesis

## Design System
- Background: #0D0D0F (primary), #0A0A0C (alternate)
- Brand orange: #FF6B2B
- Purple accent: #7C6AF7 (Stay)
- Green accent: #22C997 (Ledger)
- Text: #F0EFE9
- Muted: rgba(240,239,233,0.5)
- Cards: #141416 with rgba(255,255,255,0.06) borders
- Global CSS classes: .btn-primary, .btn-secondary, .btn-ghost, .glass, .tag, .tag-white, .gradient-text, .grid-bg

## Products
- **Kada Dine** (#FF6B2B) — food delivery & restaurant platform
- **Kada Stay** (#7C6AF7) — hospitality & booking infrastructure  
- **Kada Ledger** (#22C997) — business intelligence & accounting

## Key Files
- `src/index.css` — all global styles, Tailwind, custom classes
- `src/App.tsx` — router, Lenis setup, ScrollRestorer
- `src/data/content.ts` — all brand copy and content
- `src/components/layout/Header.tsx` — fixed nav with dropdown
- `src/components/layout/Footer.tsx` — full corporate footer
- `src/components/home/` — all homepage section components
- `src/components/shared/ScrollToTop.tsx` — scroll restorer + FAB

## Dev Server
Running on localhost:5173 (or next available port)
Launch config at `.claude/launch.json`

# Graduation Invitation Template

A single–page graduation invitation that focuses on cinematic typography, fluid motion, and clear event details. The layout is responsive from day one and feels tactile thanks to custom textures and smooth scrolling.

![Graduation invitation preview](public/og.png)

## Core Stack

- [Next.js 16](https://nextjs.org/) + React 19 (`app/` directory, metadata API).
- [Bun 1.3](https://bun.sh/) for dependency management and scripts.
- [GSAP](https://gsap.com/) & [Lenis](https://lenis.peoplejustdo.swiss/) for animation and scroll feel.
- Tailwind CSS v4 (preset) with PostCSS helpers for utilities.
- Biome for lint/format plus strict TypeScript types.

## Getting Started

Requirement: Bun ≥ `1.3.2`.

```bash
bun install
```

### Development

```bash
bun run dev
```

- Use `bun run dev:https` to spin up HTTPS locally (Next.js experimental HTTPS flag).

### Production Build

```bash
bun run build
bun run start
```

> `bun run build` automatically calls `bun run setup:styles` to ensure style tokens are ready before `next build`.

### Quality Checks

```bash
bun run lint       # Biome lint
bun run lint:fix   # Auto-fix when possible
bun run typecheck  # TypeScript strict mode
```

## Project Structure

```
app/           # App Router pages, layout, metadata
components/    # UI pieces (Preloader, Wrapper, RotateRevealText, ...)
hooks/         # Custom hooks (use-rotate-reveal, use-transform, ...)
styles/        # Color tokens, fonts, Tailwind/PostCSS setup scripts
public/        # Invitation imagery, og.png, manifest assets
```

## Customization

- Update the event copy in `app/page.tsx`.
- Change shared metadata in `app/layout.tsx`; values pull from `package.json`.
- Set `process.env.NEXT_PUBLIC_BASE_URL` (optional) to emit correct canonical and OG URLs in production.

May the ceremony be unforgettable—thanks for being part of the story! 🎓

# IWRC Website

Static-export Next.js website for the International Weed Recognition Consortium, built with App Router, TypeScript, Tailwind CSS, reusable components, and local structured content.

## Stack

- Next.js 15 with App Router
- TypeScript
- Tailwind CSS
- Static export compatible
- Local TypeScript content files under `content/`, with publication entries loaded from `publications.bib`
- Placeholder assets under `public/images/`

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Typecheck

```bash
npm run typecheck
```

## Build

```bash
npm run build
```

The project uses `output: "export"` in `next.config.ts`, so `next build` creates a static export in `out/`.

## Content Editing

Structured content is stored in local TypeScript files:

- `content/site.ts`
- `content/project.ts`
- `content/researchHighlights.ts`
- `content/activities.ts`
- `content/team.ts`
- `publications.bib` for publication records. Use `url` for an original publication link, or `doi` to generate a DOI link.
- `content/news.ts`
- `content/events.ts`

These files are intentionally simple so the site can later migrate to MDX, a CMS, or an API-backed workflow without redesigning page components.

## Future Backend Integration

This draft has no backend, database, authentication, CMS, or API dependency. TODO comments mark likely future integration points for FastAPI-backed project metrics, contact workflows, publication search, dashboards, and data portals.

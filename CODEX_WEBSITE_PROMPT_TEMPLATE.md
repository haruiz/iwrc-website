# Codex Website Prompt Template

Use this template when you want Codex to create or adapt a website from a provided reference link while following the same structure and stack as this repository.

```text
You are working in a Next.js website repo modeled after the SmartCotton site.

Source/reference URL:
[PASTE_URL_HERE]

Target website details:
Extract all of the following from the source/reference URL. Do not ask me to fill these in unless the URL is inaccessible or the detail is genuinely not present in the source.
- Site name
- Organization/person/product the site represents
- Primary audience
- Desired tone, inferred from the source site's language, visual style, and institutional context
- Required pages, inferred from the source site's navigation, sitemap, linked sections, and visible content
- Deployment target/base path, inferred from the current repo configuration when adapting this repo; otherwise use none unless the source or deployment request states one

Goal:
Create a complete static-export-compatible website using the same technology choices, file organization, and content-driven approach as this repo. Use the reference URL as the source for public-facing structure, content themes, page hierarchy, imagery direction, and metadata. Do not copy copyrighted text verbatim beyond short labels or factual names; rewrite content into original, polished web copy. If the URL cannot be accessed, ask me to provide the source text, screenshots, or page list before inventing details.

Required stack and architecture:
- Next.js 15 App Router with TypeScript.
- Tailwind CSS for styling.
- Reusable components in `components/`.
- App routes in `app/`.
- Structured local content in `content/` using TypeScript or JSON.
- Static export compatibility through `next.config.ts` with `output: "export"`.
- Unoptimized images for export compatibility.
- No backend, database, authentication, CMS, or runtime API dependency unless I explicitly ask for one.

Follow this repository's structure:
- `app/layout.tsx`: global metadata, shared `Navbar`, shared `Footer`, and global CSS import.
- `app/page.tsx`: homepage assembled from reusable sections and content files.
- `app/[route]/page.tsx`: one route per main page.
- `content/site.ts`: navigation, contact details, site-wide constants, and a flattened nav export for consumers like footer and sitemap.
- `content/project.ts`, `content/news.ts`, `content/events.ts`, `content/researchHighlights.ts`, or equivalent files: editable page data.
- `content/team.json` or similar JSON for people/team entries when applicable.
- `components/SectionHeader.tsx`, `components/Card.tsx`, `components/Hero.tsx`, `components/Navbar.tsx`, `components/Footer.tsx`: keep or adapt the component pattern instead of hardcoding everything into pages.
- `public/images/`: local images only. Use stable filenames and update image references through shared path utilities if present.
- `app/sitemap.ts` and `app/robots.ts`: keep static-export-safe metadata routes. If needed, add `export const dynamic = "force-static";`.

Design requirements:
- Preserve the existing design system style: restrained, professional, content-forward, responsive, and accessible.
- Use Tailwind tokens and project colors from `tailwind.config.ts`; adapt names/colors only if the target brand requires it.
- Keep the `container-page` and `focus-ring` utilities from `app/globals.css`.
- Use semantic sections, clear headings, and keyboard-accessible navigation.
- Use `lucide-react` icons for common UI actions where appropriate.
- Avoid generic landing-page filler. The first screen should identify the target site clearly and expose the main value or mission.
- Use real/public/local assets when available. If assets are missing, use tasteful local placeholders and mark where approved images should be added.

Content extraction and modeling:
1. Inspect the source URL and identify:
   - brand/site name
   - mission or value proposition
   - primary navigation
   - important pages and calls to action
   - people/team entries
   - news/events/resources/publications
   - contact details
   - visual identity cues
2. Convert this into editable local content files under `content/`.
3. Keep UI behavior out of content files. For example, store flat lists and let components handle pagination, slicing, grouping, or carousel pages.
4. Make route metadata and visible page copy consistent.
5. Distinguish implemented content from future placeholders. Do not imply a feature exists if it is only planned.

Implementation tasks:
- Create or update content files first.
- Create or update reusable components only when repeated UI exists.
- Create all requested routes under `app/`.
- Update navigation in `content/site.ts` and make sure `flatNavItems` remains correct.
- Update `Footer`, `sitemap`, `robots`, and metadata as needed.
- Add or update local images in `public/images/` only when necessary.
- Keep edits scoped; do not rewrite unrelated files.

Validation:
- Run type checking: `npm run typecheck`.
- Run the static export build: `npm run build`.
- Because this repo uses static export with `distDir: "docs"`, preview the built site by serving `docs/` statically, not with a traditional Next production server.
- If previewing locally, use a static server such as:
  `python3 -m http.server 3000 --directory docs`
- Verify key routes render, links use the configured base path correctly, and responsive navigation works.

Deliverables:
- Briefly summarize the changed files and content model.
- List the exact validation commands run and their results.
- Mention any source URL content that could not be accessed or any placeholders that still need approved assets/copy.
```

## Optional Short Version

```text
Build a static-export Next.js 15 App Router website from this source URL: [URL].

Extract the site name, represented organization/person/product, primary audience, tone, required pages, and any deployment/base-path requirement from the URL and current repo configuration. Follow the same structure as this repo: `app/` routes, reusable `components/`, editable local `content/` files, `content/site.ts` navigation with `flatNavItems`, Tailwind styling, local assets in `public/images/`, and static-export-safe sitemap/robots. Rewrite source material into original polished copy, keep content data separate from UI behavior, update metadata and visible text together, and validate with `npm run typecheck` plus `npm run build`. Preview by serving `docs/` statically because this repo uses `output: "export"` and `distDir: "docs"`.
```

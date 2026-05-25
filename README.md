# Theme Documentation

Standalone static site for WordPress theme guides. Deploy this folder independently — GitHub Pages, Netlify, Cloudflare Pages, or any static host. No build step required.

## Structure

```
theme-docs/
├── index.html              # Theme catalog
├── hub.html?theme=…        # Per-theme documentation hub
├── doc.html?theme=…&doc=…  # Markdown viewer
├── themes.json             # Registry of published themes
├── assets/
│   ├── css/docs.css
│   └── js/
│       ├── site.js         # Light/dark mode
│       └── docs-app.js     # Hub + viewer logic
└── themes/
    └── {theme-slug}/
        ├── manifest.json   # Doc list, sections, link map
        ├── USER-GUIDE.md
        └── …
```

## Local preview

```bash
cd theme-docs
python3 -m http.server 8000
```

Open `http://localhost:8000/`

## Add a new theme

1. **Create a folder** — `themes/my-new-theme/`

2. **Add markdown files** — copy guides from the theme repo (`USER-GUIDE.md`, `HOOKS.md`, etc.). Include `THEME-README.md` (theme install checklist).

3. **Add `manifest.json`** — copy from `themes/foundry-gallery/manifest.json` and adjust:
   - `id`, `name`, `version`, `description`, `requirements`
   - `sections` — groups of doc IDs for the hub page
   - `docs` — each guide: `id`, `file`, `title`, `label`, `description`
   - `linkMap` — rewrite internal `.md` links to `doc.html?theme=…&doc=…`

4. **Register in `themes.json`**:

```json
{
  "id": "my-new-theme",
  "name": "My New Theme",
  "version": "1.0.0",
  "tagline": "Short tagline",
  "description": "One paragraph for the catalog card.",
  "requirements": "WordPress 6.4+, PHP 8.0+"
}
```

5. **Preview** — `hub.html?theme=my-new-theme`

## Deploy

Upload the entire `theme-docs/` directory to your host. Set the site root to this folder.

| Host | Notes |
|------|--------|
| **GitHub Pages** | Push to `main`; Settings → Pages → deploy from `main` / **root** (not `/docs`). Live at `https://wholmes.github.io/theme-docs/` |
| **Netlify** | Drag-and-drop or connect repo; publish directory = `theme-docs` |
| **Cloudflare Pages** | Build command: none; output directory: `theme-docs` |

## Syncing content from theme repos

Markdown in `themes/{slug}/` is the **published** copy. When you update guides in a theme repo (`docs/*.md`), copy changed files into the matching theme folder here before deploying.

Foundry Gallery source files live in the sibling repo at `../docs/` and `../foundry-gallery/README.md` → `themes/foundry-gallery/THEME-README.md`.

## URLs

| Page | Example |
|------|---------|
| Catalog | `/index.html` |
| Theme hub | `/hub.html?theme=foundry-gallery` |
| Guide | `/doc.html?theme=foundry-gallery&doc=user-guide` |

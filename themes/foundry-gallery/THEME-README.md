# Foundry Gallery — WordPress Theme

Classic PHP theme for self-hosted WordPress (Namecheap, WP Engine, Flywheel, etc.). **Foundry Gallery** demo (fictional Milltown, PA). Uses **ACF (free)** with Local JSON. Newsletter is **native** (stored as `newsletter_sub` posts + optional admin email).

Theme folder slug remains `foundry-gallery` for existing installs; appearance name is **Foundry Gallery**.

**Repo overview, content model, and dev notes:** [`../README.md`](../README.md)

**Product positioning:** [`../docs/POSITIONING.md`](../docs/POSITIONING.md)

**Full editor & admin guide:** [`../docs/USER-GUIDE.md`](../docs/USER-GUIDE.md)

**Distributing or white-labeling:** [`../docs/DISTRIBUTION.md`](../docs/DISTRIBUTION.md)

## Requirements

- WordPress 6.4+
- PHP 8.0+
- [Advanced Custom Fields](https://wordpress.org/plugins/advanced-custom-fields/) (free)

## Deploy on Namecheap — cPanel shared (root install)

**Target path:** `public_html/wp-content/themes/foundry-gallery/`

WordPress core lives in `public_html/`; the theme must end up here:

```
public_html/
  wp-content/
    themes/
      foundry-gallery/
        style.css
        functions.php
        acf-json/
        ...
```

### Upload the theme

**Option A — cPanel File Manager (simplest)**

1. On your Mac, zip the `foundry-gallery` folder (the zip should contain one folder named `foundry-gallery`, not loose files).
2. cPanel → **File Manager** → open `public_html/wp-content/themes/`.
3. **Upload** the zip → select it → **Extract**.
4. Confirm `public_html/wp-content/themes/foundry-gallery/style.css` and `screenshot.png` exist.

**Option B — SFTP (better for later updates)**

1. Namecheap → hosting → **FTP Accounts** or **FTP Details** (hostname, username, password, port 21 or 22).
2. In FileZilla (or similar), remote path: `/public_html/wp-content/themes/`.
3. Drag the local `foundry-gallery` folder into that directory.

### After upload (wp-admin)

1. **Plugins → Add New** → install **Advanced Custom Fields** → Activate.
2. **Appearance → Themes** → activate **Foundry Gallery**.
3. **ACF → Field Groups** → **Sync** any groups that show “Sync available”.
4. **Settings → Permalinks** → **Save Changes** (required on Namecheap so `/artists/` etc. work).
5. **Settings → Reading** → “A static page” → choose your Home page.
6. Create **Foundry Settings** page (slug `site-settings`), **About** (template **About**), menus under **Appearance → Menus**.

### Namecheap checks if something breaks

| Issue | Fix |
|-------|-----|
| 404 on `/artists/` or `/exhibitions/` | Settings → Permalinks → Save again; ensure `.htaccess` in WordPress root is writable (cPanel usually handles this). |
| ACF “Sync” missing | Confirm `acf-json/*.json` uploaded; folder should be readable (755). **Sync only appears when the JSON `modified` timestamp is newer than the database copy** — bump `modified` in the changed JSON file(s) when shipping field updates without renaming the group. |
| White screen | cPanel → **Select PHP Version** → **PHP 8.1+**; check `wp-content/debug.log` if `WP_DEBUG_LOG` is on. |
| Newsletter AJAX fails | Site must use HTTPS for production; test form on the live front page URL (not only Customizer preview). |
| Slow first load | Normal on shared hosting; enable Namecheap **cPanel cache** or a lightweight cache plugin later. |

### Optional: deploy from your machine

```bash
# Example: rsync over SSH if Namecheap gave you SSH access (not all plans)
rsync -avz --delete foundry-gallery/ USER@HOST:~/public_html/wp-content/themes/foundry-gallery/
```

Zip + cPanel upload is fine on shared hosting (SSH is often not enabled).

### cPanel checklist (copy/paste order)

1. File Manager → `public_html/wp-content/themes/` → upload & extract theme zip  
2. `yoursite.com/wp-admin` → Plugins → install **Advanced Custom Fields**  
3. Appearance → Themes → **Foundry Gallery** → Activate  
4. ACF → Field Groups → **Sync** (all Foundry groups)  
5. Settings → Permalinks → **Save Changes**  
6. Pages: create **Home**, **About** (template About), **Foundry Settings** (slug `site-settings`)  
7. Settings → Reading → static front page = **Home**  
8. **Tools → Foundry Demo Content** → **Import demo content** (fictional artists, exhibitions, etc. — see `docs/SEED-CONTENT.md`)  
9. Add 2–3 **Hero Slides** with featured images → view homepage  
10. Optional: edit **Foundry Settings** for social URLs, footer copy, **Archive heroes**, appearance (breadcrumbs, smooth scroll, auto-hide header), and SEO defaults  
11. Assign **About** page template **About**; create **Contact** page with template **Contact**  
12. Optional: per-page **Animate hero title** (sidebar on Pages) or **Foundry Settings → Archive heroes**

### Theme version

Track releases via `FOUNDRY_THEME_VERSION` in `functions.php`. Keep **`style.css` `Version`** in sync. Brand defaults: `inc/brand.php` (`foundry_brand_config()`). **Color palettes:** edit **Foundry Settings** → **Color palette** (Foundry / Warm / Minimal). Visitors still use the header **light/dark** toggle; palette is admin-only. Bump when changing `assets/css/main.css`, `assets/css/palettes.css`, or `assets/js/*` so browsers pick up updates.

### Distributing this theme

- **Theme product** (your name in admin): edit the **`style.css` header** — `Theme Name`, `Author`, `Theme URI`, `Version`
- **Site brand** (what visitors see): **Foundry Settings** + content, or edit `inc/brand.php` before demo import
- **Do not rename** the folder slug or text domain (`foundry-gallery`) unless forking the codebase
- Full checklist: [`../docs/DISTRIBUTION.md`](../docs/DISTRIBUTION.md)

### Content pages (block editor)

General inner pages use the **Content Page** template or the **default** page template — same layout:

| Piece | Source |
|-------|--------|
| Header / footer | Automatic on every page |
| Breadcrumb | **Foundry Settings → Show breadcrumbs** |
| Hero title + intro | Page **title** + **Excerpt** |
| Body | **Block editor** (Gutenberg) |
| Column width | Sidebar **Page display → Content width** |
| Hero animation | Sidebar **Page display → Animate hero title** |

**Block editor is off** for **Home** (section builder + ACF) and **Foundry Settings** only. About, Contact, Artwork, and new Content Pages use blocks.

| Content width | Front-end column |
|---------------|------------------|
| Standard (default) | 900px, left-aligned with hero |
| Wide | 1200px |
| Full | Site max width (1800px) |

Individual blocks can also use toolbar **Wide** or **Full width** alignment.

Files: `page-content.php`, `page.php`, `template-parts/page/standard.php`, `assets/css/editor.css`.

Full editor guide: [`../docs/USER-GUIDE.md`](../docs/USER-GUIDE.md) §16.

### Homepage sections & hooks

- **Section builder** meta box on **Pages → Home** — add, remove, and **drag to reorder** blocks (ACF Free; no Flexible Content required)
- **Section visibility** and **Section content** ACF tabs on the same page — hide blocks or edit copy without touching theme files
- **Custom HTML** blocks support shortcodes and embeds
- **Tools → Foundry Demo Content → Rebuild homepage sections** resets the default six-block stack and copy
- When the saved stack is empty on the front end, the theme renders the **default order** (statement → featured works → editorial → video → newsletter → services)
- **Theme hooks** for developers: see [`../docs/HOOKS.md`](../docs/HOOKS.md) (`foundry_home_after_section_video`, `foundry_before_footer`, etc.)
- Hero slider stays tied to the **Hero Slides** CPT (above main content)

### Theme features (latest)

- **Journal:** CPT at `/journal/` with categories, deck/byline/related exhibition (ACF), archive + single templates
- **SEO:** meta description, Open Graph, Twitter cards, Schema.org JSON-LD — **defers to Rank Math** when that plugin is active (see `../docs/RANK-MATH.md`)
- **Homepage:** hero slider, section builder + visibility toggles + hooks; **Featured works** grid supports up to **20** flagged artworks (4 per row, centered)
- **Content pages:** default + **Content Page** template — Gutenberg block editor, hero + breadcrumbs, per-page **Content width**, styled blocks (`editor.css`)
- **Hero titles:** animated fade-in on archive and page heroes — **on by default**; toggle per **Page** (sidebar) or per **archive** in Foundry Settings; per **Viewing Room** entry
- **Artist tabs:** Collection, Biography, Videos, Press, Exhibitions (click-to-play video embeds)
- **Art fair** exhibitions use showcase layout automatically
- **Artwork browse:** dedicated **Artwork** page template + CPT archive fallback; grid separate from homepage featured layout
- **Dark mode** with persistent toggle; optional **smooth scroll** and **auto-hide header on scroll** (Foundry Settings → Appearance)
- **Foundry Settings** page is **Private** (admin-only data container; public `/site-settings/` blocked)
- **Message bar**, maintenance banner, and gallery-closed mode (Foundry Settings)
- **404** and **search** with editable copy and CTAs (Foundry Settings → Content & errors)
- **Skip link** for accessibility
- **Production migration:** `../docs/MIGRATION.md` + `../scripts/migrate-export.sh` / `migrate-import.sh`

### Updating the theme on Namecheap

Upload only changed files under `public_html/wp-content/themes/foundry-gallery/`, or re-zip and extract over the existing folder. Then:

- **ACF → Field Groups → Sync** (if new JSON files were added)
- **Settings → Permalinks → Save**
- Hard-refresh the browser (Cmd+Shift+R)

---

## Install on any WordPress site

1. Copy the `foundry-gallery` folder to `wp-content/themes/`.
2. Activate **Foundry Gallery** under Appearance → Themes.
3. Install and activate **ACF**.
4. In ACF → Field Groups, click **Sync** on any groups showing “Sync available” (loads from `acf-json/`).
5. **Settings → Permalinks** → Save (flush rewrite rules).
6. Create pages:
   - **Home** — set as static front page (Settings → Reading).
   - **About** — assign template **About**.
   - **Foundry Settings** — slug must be `site-settings`, visibility **Private** (footer/header fields).
7. Run **Tools → Foundry Demo Content** to assign menus and seed footer fields, or assign menus manually under Appearance → Menus.
8. Add content:
   - **Hero Slides** CPT (order via Page Attributes → Order).
   - Artists, Exhibitions, Artworks, Staff, Locations.
   - Mark artworks **Featured on homepage** for the works grid (up to 20; use **Page Attributes → Order** on each artwork to sort).

## Hero title animation

Large archive and page headings (Artists, Exhibitions, Artwork, Viewing Room) use a fade-in animation **by default**.

| Where to edit | Field |
|---------------|--------|
| Any **Page** (e.g. Artwork) | Sidebar → **Page display** → **Animate hero title** |
| CPT **archives** (not WordPress Pages) | **Foundry Settings** → **Archive heroes** tab |
| **Viewing Room** single entries | **Animate hero title** on the entry |

Set **Off** to show the title immediately with no animation.

## Testing on an existing site

Safe to activate alongside another theme:

- CPT slugs: `artists`, `exhibitions`, `viewing-room`, `artwork`, etc. — avoid conflicts with plugins that register the same slugs.
- Deactivating the theme does **not** delete CPT content (posts remain in DB).
- Switch back to the old theme anytime; Foundry content stays in admin.

## ACF Free vs Pro

This theme avoids Pro-only field types:

| Need | ACF Free approach |
|------|-------------------|
| Hero slides | `hero_slide` CPT |
| Staff / locations | `staff` + `location` CPTs |
| Site-wide settings | Page `site-settings` |
| Page display | Sidebar on **Pages** — hero animation, content width |
| Content pages | Block editor + `page-content.php` / default `page.php` |
| Artist ↔ exhibition | `post_object` (single) |
| Featured works | `true_false` on artwork + `menu_order` (up to 20 on homepage) |
| Journal / blog | `journal` CPT + `journal_category` taxonomy |
| Newsletter | Native AJAX → `newsletter_sub` CPT |

Upgrading to **ACF Pro** later: you can add Options Page, Repeaters, and Gallery without changing templates much.

## Development

Static HTML prototypes remain in the repo root for reference. Theme assets:

- `assets/css/main.css`, `assets/css/editor.css` — front end + block editor canvas
- `assets/js/theme.js`, `smooth-scroll.js`, `header-auto-hide.js`, `hero-slider.js`, `forms.js`, `video-embed.js`, archive scripts
- `inc/hero.php` — hero title animation toggle helpers
- `template-parts/page/standard.php` — shared Content Page / default page layout

Use `@wp-theme-dev` in Cursor for WordPress standards.

# Distributing & white-labeling this theme

How to brand the theme as **your product** while letting each site use **its own gallery name** on the front end.

---

## Two layers of branding

| Layer | Purpose | Where to edit | Who sees it |
|-------|---------|---------------|-------------|
| **Theme product** | Credits, updates, support | `style.css` header, README, zip name, `screenshot.png` | WordPress admin → **Appearance → Themes** |
| **Site / demo brand** | Logo, footer, addresses, demo copy | **Foundry Settings** page (Private, slug `site-settings`), `inc/brand.php`, seed content | Public website visitors |

**Customary practice:** put **your studio or product name** in the theme header (`Author`, `Theme URI`). Use **Site Settings + content** (or `inc/brand.php` before first import) for the gallery’s public identity.

This repo ships with a **fictional demo brand** (“Foundry Gallery”, Milltown, PA). That is demo content, not a requirement for the theme product name.

---

## Theme product header (`style.css`)

WordPress reads the comment block at the top of `style.css` for the Themes screen.

```css
/*
Theme Name: Foundry Gallery          ← Display name in admin (rename for your product)
Theme URI: https://example.com/   ← Your docs / product page
Author: Your Studio Name          ← You or your agency
Author URI: https://example.com/
Description: …                    ← Feature summary (CPTs, ACF, etc.)
Version: 1.0.42                   ← Keep in sync with FOUNDRY_THEME_VERSION in functions.php
Requires at least: 6.4
Tested up to: 6.8
Requires PHP: 8.0
License: GNU General Public License v2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: foundry-gallery  ← Must match theme folder slug — do not change lightly
*/
```

### Checklist before you ship a zip

- [ ] Update **Theme Name**, **Author**, **Author URI**, **Theme URI**, **Description**
- [ ] Match **Version** in `style.css` and `FOUNDRY_THEME_VERSION` in `functions.php`
- [ ] Add **`screenshot.png`** (1200×900 px) — included in `foundry-gallery/screenshot.png`; regenerate from repo-root `foundry-gallery.png` if the demo changes
- [ ] Include **`README.md`** and **`docs/USER-GUIDE.md`** with your support contact
- [ ] Confirm **GPL v2+** license text if distributing publicly
- [ ] Zip the folder as **`foundry-gallery.zip`** (folder name = install slug)

---

## Technical identifiers (keep stable)

These are **internal** IDs. Renaming them is a large refactor and breaks updates for existing installs.

| Identifier | Current value | Notes |
|------------|---------------|--------|
| Theme folder | `foundry-gallery` | Path under `wp-content/themes/` |
| Text domain | `foundry-gallery` | All `__()` / `_e()` strings |
| Function prefix | `foundry_` | PHP functions |
| Constants | `FOUNDRY_*` | e.g. `FOUNDRY_THEME_VERSION` |
| `@package` | `Foundry_Gallery` | PHPDoc |

**WordPress convention:** `Text Domain` should equal the **directory slug**, not necessarily the marketing name shown in `Theme Name`.

---

## Site / demo brand (front end)

### Option A — Admin only (recommended for clients)

After install, editors change branding without code:

1. **Pages → Site Settings** — logo lines, footer, social, palette, SEO defaults  
2. Replace demo **artists**, **exhibitions**, **artworks**, page copy  
3. Optional: skip demo import and enter content from scratch  

Demo import (`Tools → Foundry Demo Content`) applies defaults from `inc/brand.php` once.

### Option B — Edit defaults before first import

Edit **`foundry-gallery/inc/brand.php`** → `foundry_brand_config()`:

```php
return apply_filters(
    'foundry_brand_config',
    array(
        'display_name'   => 'Your Gallery Name',
        'logo_line_one'  => 'Your',
        'logo_line_two'  => 'Gallery',
        'email'          => 'info@yourgallery.com',
        // …
    )
);
```

Then run **Import demo content** so seed + Site Settings pick up the new defaults.

### Option C — Child theme filter (no parent edits)

In a child theme `functions.php`:

```php
add_filter(
    'foundry_brand_config',
    function ( $config ) {
        $config['display_name']  = 'North River Gallery';
        $config['logo_line_one'] = 'North River';
        $config['logo_line_two'] = 'Gallery';
        $config['email']         = 'hello@northriver.gallery';
        return $config;
    }
);
```

Re-run demo import with **force** brand overwrite if Site Settings already has old values (`foundry_apply_brand_to_site_settings( true )` runs on full demo import).

### Option D — Neutral demo for marketplace

For ThemeForest / agency kits, replace fictional names in:

- `inc/brand.php` — defaults  
- `inc/seed-data.php` — artist/exhibition titles (see `docs/SEED-CONTENT.md`)  
- `docs/USER-GUIDE.md` — examples  

Keep one coherent fictional city/venue set so the demo feels intentional.

---

## Distribution channels

### Agency / direct client delivery (typical for this theme)

- Same theme zip for all clients; different **content + Site Settings** per site  
- **Author** in `style.css` = your studio  
- Optional **child theme** only when a client needs custom templates/CSS  
- Deliver **`docs/USER-GUIDE.md`** as the editor manual  

### WordPress.org theme directory

- Requires theme review, GPL-compatible assets, no required paid plugins  
- **ACF as hard dependency** usually disqualifies or limits distribution on .org unless all fields have fallbacks (this theme has partial fallbacks but still expects ACF)  
- Most ACF-first themes are sold or delivered directly, not via .org  

### Commercial marketplaces

- Product title = marketplace listing name  
- Live demo URL with neutral branding  
- Document ACF Free requirement prominently  
- Changelog per `FOUNDRY_THEME_VERSION`  

---

## What not to bundle

- Client-specific API keys, `.env`, or production URLs  
- Non-GPL stock photos without license  
- ACF Pro or other paid plugins inside the zip  
- Real Foundry Gallery trademarks or addresses if shipping a generic product (this repo uses **fictional** Milltown copy intentionally)  

---

## Versioning

| File | Field |
|------|--------|
| `functions.php` | `FOUNDRY_THEME_VERSION` — used for asset cache-busting |
| `style.css` | `Version` — shown in **Appearance → Themes** |

Keep both in sync on every release.

### ACF Local JSON sync

ACF does **not** use the theme version to detect updates. Each file in `acf-json/` has a `"modified"` Unix timestamp. **Sync available** only appears when that value is **newer** than the field group stored in the database.

When you ship field JSON changes:

1. Bump `"modified"` in every changed `acf-json/*.json` file (use current Unix time).
2. Upload the updated JSON to the server.
3. **ACF → Field Groups → Sync** on groups that show “Sync available”.

If Sync still does not appear, the database copy may already match or be newer — edit and re-save the group once in wp-admin, or import manually via **Tools → Import** (ACF export) as a fallback.

---

## Related docs

| Document | Contents |
|----------|----------|
| `docs/POSITIONING.md` | Product positioning, ICP, messaging, competitive frame |
| `foundry-gallery/README.md` | Install & deploy |
| `docs/USER-GUIDE.md` | Editor / admin workflows |
| `docs/SEED-CONTENT.md` | Demo catalog reference |
| `docs/MIGRATION.md` | Staging → production |

# Foundry Gallery — Getting Started

Welcome. This guide walks you through the first-time setup for your gallery website. If you are day-to-day staff managing artists, exhibitions, or the homepage, continue to the **Site Guide** after setup.

**Requires:** WordPress 6.4+, PHP 8.0+, and the free [Advanced Custom Fields](https://wordpress.org/plugins/advanced-custom-fields/) plugin.

---

## Install the theme

Your web host or agency should upload the theme to:

```
wp-content/themes/foundry-gallery/
```

If you are installing yourself:

1. Zip the `foundry-gallery` folder (the zip should contain one folder named `foundry-gallery`).
2. In WordPress admin go to **Appearance → Themes → Add New → Upload Theme**.
3. Choose the zip file and click **Install Now**, then **Activate**.

### Namecheap / cPanel shared hosting

1. cPanel → **File Manager** → open `public_html/wp-content/themes/`.
2. Upload the theme zip → **Extract**.
3. Confirm `style.css` and `screenshot.png` exist inside `foundry-gallery/`.

---

## First-time checklist

Complete these steps in order after the theme is activated:

| Step | Action |
|------|--------|
| 1 | **Plugins → Add New** → install and activate **Advanced Custom Fields** |
| 2 | **ACF → Field Groups** → **Sync** any groups showing “Sync available” |
| 3 | **Settings → Permalinks** → **Save Changes** (required for artist and exhibition URLs) |
| 4 | Create pages: **Home**, **About** (template **About**), **Contact** (template **Contact**), **Foundry Settings** (slug must be `site-settings`) |
| 5 | **Settings → Reading** → “A static page” → choose **Home** as the front page |
| 6 | **Tools → Foundry Demo Content → Import demo content** (optional — fictional sample content you can replace) |
| 7 | Add **Hero Slides** with featured images for the homepage carousel |
| 8 | **Appearance → Menus** — assign primary and footer menus |
| 9 | **Foundry Settings** — logo, footer copy, social links, color palette |
| 10 | Replace demo artists, artworks, and exhibitions with your gallery’s content |

---

## Common setup issues

| Issue | Fix |
|-------|-----|
| 404 on `/artists/` or `/exhibitions/` | **Settings → Permalinks → Save Changes** again |
| ACF fields missing | **ACF → Field Groups → Sync** |
| White screen | Ask your host to use **PHP 8.1+**; check error logs |
| Homepage is blank | Confirm **Settings → Reading** uses a static front page; add Hero Slides |
| Newsletter form fails | Test on your live HTTPS URL, not only in the Customizer preview |

---

## What to read next

| Guide | When to use it |
|-------|----------------|
| **Site Guide** | Daily editing — artists, exhibitions, homepage sections, forms, troubleshooting |
| **Rank Math** | If your site uses the Rank Math SEO plugin |

---

*Demo content uses fictional artists and venues. Replace with real gallery content before launch.*

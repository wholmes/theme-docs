# Rank Math compatibility

The Foundry Gallery theme includes built-in SEO (meta description, Open Graph, Twitter cards, Schema.org JSON-LD). When **Rank Math SEO** is installed and active, the theme **turns off** its own meta and JSON-LD output so tags are not duplicated.

## Install on Namecheap / production

1. **Plugins → Add New** → install **Rank Math SEO** → Activate.
2. Run Rank Math setup wizard (sitemap, analytics optional).
3. Confirm page source has **one** set of `og:` tags (from Rank Math, not the theme).

## What the theme still provides

| Feature | With Rank Math active |
|---------|------------------------|
| Theme `<meta name="description">` | Off (Rank Math handles) |
| Theme Open Graph / Twitter | Off |
| Theme JSON-LD (`ArtGallery`, etc.) | Off — configure in Rank Math Schema |
| ACF fields (`default_meta_description`, `default_og_image` on Site Settings) | Used as **fallbacks** via filters when Rank Math fields are empty |
| `foundry_get_meta_description()` | Still used internally and for Rank Math fallback |

## Recommended Rank Math settings

- **Titles & Meta → Local SEO / Organization** — gallery name, logo, address (match Site Settings page).
- **Sitemap** — enable; include post types: `artist`, `exhibition`, `journal`, `viewing_room` (exclude `inquiry`, `newsletter_sub`, `hero_slide` if desired).
- **Schema** — enable **ArtGallery** or **Organization** for homepage; **Article** for `journal`; custom types for exhibitions/artists as needed.

## Force theme SEO (advanced)

If you need theme meta while debugging Rank Math:

```php
add_filter( 'foundry_use_theme_seo', '__return_true' );
```

Add to a child theme `functions.php` or a small mu-plugin. You will get duplicate tags unless Rank Math output is disabled in plugin settings.

## Switching off Rank Math

Deactivate or uninstall Rank Math — theme SEO hooks run again automatically on the next page load.

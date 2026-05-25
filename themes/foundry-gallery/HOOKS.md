# Foundry Gallery — theme hooks

**Color palettes:** register or reorder presets with the `foundry_color_palettes` filter (see `inc/palettes.php`). Admin selects the active palette on the Site Settings page; visitors use the header light/dark toggle only.

Action hooks let you inject markup from a **child theme**, **mu-plugin**, or small custom plugin without editing core templates.

Reference implementation: `foundry-gallery/inc/hooks.php` and `inc/home-sections.php`.

## Homepage sections (CMS)

On the **Home** page (static front page):

1. **Section builder** meta box — add, remove, and **drag to reorder** blocks (stored in post meta; **ACF Free**, no Flexible Content required).
2. **Section visibility** tab (ACF) — Show/Hide toggles per block type without removing builder rows.
3. **Section content** tab (ACF) — copy for standard blocks (statement, editorial, video, newsletter, services).

Layouts: `statement`, `featured_works`, `editorial`, `video`, `newsletter`, `services`, `custom_html`.

**Custom HTML** rows support shortcodes, oEmbed, and sanitized HTML (`foundry_render_home_custom_html()`).

Hero slider is always rendered from the **Hero Slides** CPT (above `<main>`), not from the builder.

### Seed / rebuild the same prebuilt stack

- **Tools → Foundry Demo Content → Import demo content** — seeds legacy fields and the section builder stack.
- **Tools → Foundry Demo Content → Rebuild homepage sections** — only rebuilds the builder + legacy fields (safe on a live site).
- Default order after seed: Statement → Featured works → Editorial → Video → Newsletter → Services (same copy as before).

### Reorder in wp-admin

Open **Pages → Home** → **Section builder**. The default six blocks appear pre-populated so you can drag to reorder and click **Update** — no need to add rows manually.

To **insert a new block**: click **Add block** (e.g. Custom HTML) and drag rows as needed.

To **hide without removing**: use **Section visibility** toggles on the Homepage Sections tab.

To **insert via code** without the builder: leave the saved stack empty and use hooks such as `foundry_home_after_section_editorial` (see below), or filter `foundry_home_default_sections`.

### Reorder default stack (code)

```php
add_filter( 'foundry_home_default_sections', function ( $sections ) {
    array_splice( $sections, 2, 0, array( 'newsletter' ) ); // example
    return $sections;
} );
```

## Global hooks

| Hook | Location |
|------|----------|
| `foundry_before_header` | Before `<header class="site-header">` |
| `foundry_after_header` | After `</header>` |
| `foundry_before_footer` | Before `<footer class="site-footer">` |
| `foundry_after_footer` | After `</footer>` |

## Homepage hooks

| Hook | Location |
|------|----------|
| `foundry_home_before_hero` | Before hero slider |
| `foundry_home_after_hero` | After hero slider |
| `foundry_before_main` | Start of `<main id="main-content">` |
| `foundry_after_main` | End of `</main>` |
| `foundry_home_before_section` | Before each section (arg: layout slug) |
| `foundry_home_after_section` | After each section (arg: layout slug) |
| `foundry_home_before_section_{layout}` | Before a specific layout, e.g. `foundry_home_before_section_video` |
| `foundry_home_after_section_{layout}` | After a specific layout |

## Archive hooks

| Hook | Location |
|------|----------|
| `foundry_archive_artists_before_hero` | Artists archive, before hero |
| `foundry_archive_artists_after_hero` | Artists archive, after hero |
| `foundry_archive_exhibitions_before_header` | Exhibitions archive, before header |
| `foundry_archive_exhibitions_after_header` | Exhibitions archive, after header |
| `foundry_archive_before_loop` | Before grid (arg: post type slug) |
| `foundry_archive_after_loop` | After grid (arg: post type slug) |

## Single hooks

| Hook | Location |
|------|----------|
| `foundry_single_artist_before` | Artist single, start of loop |
| `foundry_single_artist_after_header` | After artist title block |
| `foundry_single_artist_before_tabs` | Before tab panels |
| `foundry_single_artist_after_tabs` | After tab panels / modal |
| `foundry_single_exhibition_before` | Exhibition single, before layout |
| `foundry_single_exhibition_after` | Exhibition single, after layout |

## Page hooks

| Hook | Location |
|------|----------|
| `foundry_page_before_content` | About / Contact templates (arg: post ID) |
| `foundry_page_after_content` | About / Contact templates (arg: post ID) |

## Example: banner after homepage video

```php
// wp-content/mu-plugins/foundry-custom.php
add_action( 'foundry_home_after_section_video', function () {
    echo '<section class="home-custom-section"><p>Now on view — visit the gallery.</p></section>';
} );
```

## Example: custom section template

1. Add `template-parts/home/sections/press-logos.php` in a child theme.
2. Register the slug:

```php
add_filter( 'foundry_home_section_layouts', function ( $layouts ) {
    $layouts[] = 'press_logos';
    return $layouts;
} );
```

3. Register the layout in the section builder labels filter and add admin UI if needed, or call `get_template_part` from a hook.

## Filters

| Filter | Purpose |
|--------|---------|
| `foundry_home_default_sections` | Default section order when saved stack is empty on the front end |
| `foundry_home_section_layouts` | Allowed layout slugs for template parts |
| `foundry_home_section_layout_labels` | Admin labels in the Section builder meta box |

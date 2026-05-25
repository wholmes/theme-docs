# Foundry Gallery — Site Guide

A complete guide for gallery staff, site administrators, and editors. Learn how to manage content, configure the homepage, update Foundry Settings, and troubleshoot common issues.

**Theme name:** Foundry Gallery  
**Current version:** 1.3.25

---

## Table of contents

1. [What this theme does](#1-what-this-theme-does)
2. [Requirements](#2-requirements)
3. [First-time setup checklist](#3-first-time-setup-checklist)
4. [Installation and deployment](#4-installation-and-deployment)
5. [Site structure: pages, menus, and URLs](#5-site-structure-pages-menus-and-urls)
6. [Content model overview](#6-content-model-overview)
7. [Foundry Settings page](#7-foundry-settings-page)
8. [Homepage: hero slider and sections](#8-homepage-hero-slider-and-sections)
9. [Managing artists](#9-managing-artists)
10. [Managing artworks](#10-managing-artworks)
11. [Managing exhibitions](#11-managing-exhibitions)
12. [Viewing rooms](#12-viewing-rooms)
13. [Journal](#13-journal)
14. [Hero slides](#14-hero-slides)
15. [Staff and locations](#15-staff-and-locations)
16. [About, Contact, and Content pages](#16-about-contact-and-content-pages)
17. [Forms: newsletter and inquiries](#17-forms-newsletter-and-inquiries)
18. [Demo content importer](#18-demo-content-importer)
19. [Appearance, color, and motion](#19-appearance-color-and-motion)
20. [Hero title animation](#20-hero-title-animation)
21. [SEO and Rank Math](#21-seo-and-rank-math)
22. [Images and featured media](#22-images-and-featured-media)
23. [Navigation menus](#23-navigation-menus)
24. [Archives, filters, and search](#24-archives-filters-and-search)
25. [Updating the theme](#25-updating-the-theme)
26. [Troubleshooting](#26-troubleshooting)

---

## 1. What this theme does

Foundry Gallery is a **classic PHP WordPress theme** built for a contemporary art gallery. It provides:

- Custom content types for **artists**, **artworks**, **exhibitions**, **viewing rooms**, and **journal** entries
- A **homepage hero slider** plus a **section builder** on the Home page (statement, featured works, editorial, video, newsletter, services, custom HTML) — reorder blocks, show/hide sections, and edit copy in separate admin tabs
- **Artist profile pages** with tabs: Collection, Biography, Videos, Press, Exhibitions
- **Exhibition detail** pages with image gallery; **art fair** exhibitions use a dedicated showcase layout
- **Native forms** for newsletter signup and contact (stored in WordPress, optional admin email)
- **Site-wide branding and behavior** via **Foundry Settings** (page slug `site-settings`): logo, footer, color palette, message bar, 404 copy, SEO defaults
- **Content pages** with the **block editor** (Gutenberg): **Content Page** or default template — hero, breadcrumbs, styled blocks, per-page content width
- **Light/dark mode** toggle for visitors; **admin color palettes** (Foundry, Warm, Minimal); optional **smooth scroll** and **auto-hide header on scroll**
- **Animated hero titles** on key archive and page headers (toggle per page or archive; on by default)
- **Built-in SEO** (meta, Open Graph, Schema.org) with optional **Rank Math** integration
- **Top-of-site notices**: message bar, maintenance banner, gallery-closed mode

The theme is designed to work with **ACF Free** (no ACF Pro required). Repeatable content uses custom post types instead of ACF repeaters.

> **Note:** Demo seed content uses **fictional** artists, venues, and copy (Milltown, PA). Replace with real gallery content before launch.

---

## 2. Requirements

| Requirement | Version / notes |
|-------------|-----------------|
| WordPress | 6.4 or newer |
| PHP | 8.0+ (8.1+ recommended on shared hosting) |
| Plugin | [Advanced Custom Fields](https://wordpress.org/plugins/advanced-custom-fields/) (free) |
| Optional | Rank Math SEO |
| Optional | Cache plugin on production |

The theme does **not** require WooCommerce, Elementor, or ACF Pro.

---

## 3. First-time setup checklist

Complete these steps in order on a new install:

| Step | Where | Action |
|------|--------|--------|
| 1 | `wp-content/themes/` | Upload and extract the `foundry-gallery` folder |
| 2 | Plugins | Install and activate **Advanced Custom Fields** |
| 3 | Appearance → Themes | Activate **Foundry Gallery** |
| 4 | ACF → Field Groups | Click **Sync** on any group showing “Sync available” (includes **Page display**, **Foundry Settings**) |
| 5 | Settings → Permalinks | Click **Save Changes** (required for `/artists/`, etc.) |
| 6 | Pages | Create **Home**, **About**, **Contact**, **Artwork**, **Foundry Settings** (slug `site-settings`, visibility **Private**) |
| 7 | Settings → Reading | “A static page” → Homepage = **Home** |
| 8 | Page templates | Assign **About** and **Contact** templates to those pages |
| 9 | Tools → Foundry Demo Content | **Import demo content** (optional, for a full starter site) |
| 10 | Hero Slides | Add or verify slides; set **Order** under Page Attributes |
| 11 | Foundry Settings page | Review logo, footer, palette, message bar, SEO defaults |
| 12 | Appearance → Menus | Confirm Primary and footer menus (demo import creates them) |

After setup, visit the public homepage while logged out to confirm it loads (not a 404).

---

## 4. Installation and deployment

### Standard install

1. Copy the `foundry-gallery` folder into `wp-content/themes/`.
2. Activate **Foundry Gallery** under **Appearance → Themes**.
3. Install **ACF** and sync field groups from `acf-json/`.

### Namecheap / cPanel (shared hosting)

**Target path:** `public_html/wp-content/themes/foundry-gallery/`

1. Zip the `foundry-gallery` folder (the zip should contain one folder named `foundry-gallery`).
2. Upload to `public_html/wp-content/themes/` and extract.
3. Complete the [first-time checklist](#3-first-time-setup-checklist).

See the **Getting Started** guide for cPanel-specific troubleshooting.

### Staging → production

If your agency moves the site from staging to live hosting, ask them to re-save permalinks and sync ACF field groups after go-live. Then hard-refresh your browser (Cmd+Shift+R / Ctrl+Shift+R).

---

## 5. Site structure: pages, menus, and URLs

### Required and recommended pages

| Page title | Slug | Template | Purpose |
|------------|------|----------|---------|
| Home | any (set as front page) | Default | Homepage; holds **Homepage Sections** ACF |
| Foundry Settings | `site-settings` | Default | **Must** use this slug — footer, logo, palette, notices, SEO. Set visibility to **Private** (admin-only; not a public URL) |
| About | `about` (recommended) | **About** | Mission, staff, locations |
| Contact | `contact` (recommended) | **Contact** | Contact form + sidebar |
| Artwork | `artwork` (recommended) | **Artwork** | Browse grid of all artworks; hero title + **Animate hero title** in sidebar |
| Press, Visit, FAQ, etc. | any | **Content Page** or Default | Block editor pages with hero, breadcrumbs, styled content area |

**Content Page** and the **default page template** share the same layout. Use the page **Excerpt** for the intro line under the hero title.

**Critical:** The Foundry Settings field groups attach to a page whose slug is exactly `site-settings`. The page title in admin may read **Foundry Settings**; do not change the slug. Keep the page **Private** — the theme blocks public visits to `/site-settings/` for visitors who are not editors. Open it from **Foundry Settings** in the admin sidebar or **Pages → Foundry Settings**.

**Critical:** **Homepage Sections** (ACF tabs) and the **Section builder** meta box only apply to the page set as **Settings → Reading → Homepage**. Editing sections on a different page has no effect on the live homepage.

### Public URL map (default permalinks)

| URL | Content |
|-----|---------|
| `/` | Static front page (Home) |
| `/artists/` | Artists archive |
| `/artists/{slug}/` | Single artist |
| `/artwork/` | Artwork browse page (template) |
| `/artwork/{slug}/` | Single artwork (if linked directly) |
| `/exhibitions/` | Exhibitions archive |
| `/exhibitions/{slug}/` | Single exhibition |
| `/viewing-room/` | Viewing rooms archive |
| `/viewing-room/{slug}/` | Single viewing room |
| `/journal/` | Journal archive |
| `/journal/{slug}/` | Single journal entry |
| `/about/` | About page |
| `/contact/` | Contact page |

Admin-only content (no public URLs): Hero Slides, Staff, Locations, Artist Videos, Press Items, Inquiries, Newsletter Subscribers.

### Menu locations

| Location | Typical items |
|----------|----------------|
| **Primary Navigation** | Artists, Artwork, Exhibitions, Viewing Room, About |
| **Footer: Explore** | Artists, Exhibitions, Viewing Room |
| **Footer: About** | Our Story, Team (`#staff`), Locations (`#locations`) |
| **Footer: Resources** | Journal, Videos, Contact |

Demo import creates and assigns these menus automatically. Edit under **Appearance → Menus**.

---

## 6. Content model overview

### Custom post types (public)

| Post type | Admin menu | Archive URL | Featured image |
|-----------|------------|-------------|----------------|
| Artist | Artists | `/artists/` | Yes |
| Artwork | Artworks | CPT archive slug `artwork` | Yes |
| Exhibition | Exhibitions | `/exhibitions/` | Yes |
| Viewing Room | Viewing Rooms | `/viewing-room/` | Yes |
| Journal | Journal | `/journal/` | Yes |

### Custom post types (admin only)

| Post type | Purpose |
|-----------|---------|
| Hero Slide | Homepage carousel slides |
| Staff | Team listed on About (`#staff`) |
| Location | Gallery spaces on About (`#locations`) |
| Artist Video | Linked from artist **Videos** tab |
| Press Item | Linked from artist **Press** tab |
| Inquiry | Contact form submissions (read-only create) |
| Newsletter Subscriber | Newsletter signups (read-only create) |

### Taxonomies

| Taxonomy | Used on | Notes |
|----------|---------|-------|
| Artist Tags | Artist | Non-hierarchical filter on archive |
| Artwork Series | Artwork | Hierarchical; used for collection grouping |
| Exhibition Status | Exhibition | `current`, `upcoming`, `past` (seeded on theme activation) |
| Exhibition Type | Exhibition | `exhibition`, `art-fair` — **art-fair** triggers showcase layout |
| Journal Category | Journal | e.g. News, Essay, Behind the Scenes |

---

## 7. Foundry Settings page

Edit: **Foundry Settings** in the admin sidebar, or **Pages → Foundry Settings** (slug `site-settings`, visibility **Private**)

This single page drives most site-wide options. It is an **admin data container** — not public content. After theme upgrades, **ACF → Sync** the **Foundry Settings** field group if tabs or toggles are missing.

### Brand tab

| Field | What it controls |
|-------|------------------|
| Logo image | Optional image logo (falls back to text lines) |
| Logo line 1 / Logo line 2 | Header logo text (e.g. “Foundry” / “Gallery”) |
| Favicon | Browser tab icon |
| Show header button | Contact (or custom) CTA in the header |
| Header button label / URL | Label and destination for that button |

### Appearance tab

| Field | What it controls |
|-------|------------------|
| Color palette | Site-wide accent preset (see [§19](#19-appearance-color-and-motion)) |
| Default color mode | Visitor default before they use the toggle: Light, Dark, or System |
| Show light/dark toggle | Header theme switch (on by default) |
| Show breadcrumbs | Trail navigation on inner pages, archives, and singles |
| Smooth scroll | Eased page scrolling with light inertia on desktop; anchor links scroll smoothly. **Off by default.** Respects the visitor’s reduced-motion preference. |
| Auto-hide header on scroll | Hides the navigation bar when scrolling down and reveals it when scrolling back up. Works with or without the message bar. **Off by default.** Respects reduced-motion preferences. |

### Typography tab

Google Fonts for body, headings, and display/logo text. Changes apply site-wide after you update the page.

### Footer & contact / Social tabs

| Field | What it controls |
|-------|------------------|
| Footer logo text | Footer wordmark |
| Footer description | Short gallery blurb |
| Footer address / Gallery hours | Address and hours in footer and contact sidebar |
| Footer phone / Footer email | Contact lines |
| Copyright line | Optional override |
| Privacy policy URL / Terms URL | Footer legal links |
| Instagram, X/Twitter, Facebook, LinkedIn, YouTube, Vimeo, Artsy, Pinterest, WhatsApp | Social icons in footer |

Empty fields fall back to defaults in `inc/brand.php` (Foundry Gallery / Milltown copy).

### Forms tab

| Field | What it controls |
|-------|------------------|
| Inquiry notification email | Override for contact form admin email |
| Email on new newsletter signup | Notify admin on new subscriber |
| Contact / Newsletter success messages | Front-end confirmation copy after submit |

### Homepage / Artwork / Exhibitions tabs

Homepage featured works limit, hero autoplay, inquire button, artwork prices, exhibition default layout, archive grid/filter defaults, and per-page archive hero titles (see [§20](#20-hero-title-animation)).

### Integrations tab

GA4, GTM, Facebook Pixel IDs; custom CSS; public site name override; head/footer script slots for trusted admins only.

When **Rank Math** is active, theme meta tags are disabled; SEO-related ACF values still feed fallbacks. See [§21](#21-seo-and-rank-math).

### Content & errors tab

Copy for system pages and the Viewing Room archive statement.

| Field | What it controls |
|-------|------------------|
| 404 heading / message | Text on the 404 page |
| 404 breadcrumb label | Last segment in the 404 breadcrumb trail |
| 404 primary / secondary button labels and URLs | CTAs (empty URLs default to home and exhibitions archive) |
| Search empty message / CTA | Shown when site search returns no results |
| Contact / About / Search page title and intro | Optional overrides for those templates |
| Viewing Room statement / section title | Archive intro block |
| Cookie notice | Optional cookie banner text and accept label |

### Message bar tab

Top-of-site bar on every public page, above the navigation. When **Show message bar on front end** is on, a **live preview** appears below the page title in wp-admin.

| Field | What it controls |
|-------|------------------|
| Show message bar on front end | Master toggle (off by default) |
| Message text | Bar copy |
| Message link URL | Optional — makes the whole bar clickable |
| Message bar background | Color picker; empty = site accent |
| Allow visitors to dismiss | Optional dismiss button (stored in session for the visit) |
| Dismiss button label | Label for dismiss control |

**Tip:** Purge any page cache after enabling or editing the message bar so logged-out visitors see changes immediately.

### Maintenance tab

| Field | What it controls |
|-------|------------------|
| Show maintenance banner | Status banner for visitors (**logged-in administrators do not see it**) |
| Maintenance message / link | Copy and optional status or contact URL |
| Closed gallery mode | Hides inquire buttons and forms site-wide |
| Closed gallery message | Optional banner when closed mode is on |

### SEO defaults (Footer & contact tab or dedicated SEO fields)

| Field | What it controls |
|-------|------------------|
| Default meta description | Fallback description when a page has none |
| Default share image | Fallback Open Graph image |

### Archive hero titles

On the **Archive heroes** tab (under Exhibitions / archive settings), control titles, intros, and fade-in animation for CPT archive pages (these are not editable as WordPress Pages):

| Field | Archive URL |
|-------|-------------|
| Artists archive | `/artists/` |
| Exhibitions archive | `/exhibitions/` |
| Viewing Room archive | `/viewing-room/` |
| Artwork archive | CPT archive slug `artwork` (if used instead of the Artwork page) |
| Journal archive | `/journal/` |

All animate toggles default to **On**. Set **Off** to show the heading and intro text immediately with no animation.

---

## 8. Homepage: hero slider and sections

The homepage has **two independent layers**:

1. **Hero slider** — always from the **Hero Slides** CPT (above main content)
2. **Main sections** — order and block list from the **Section builder** meta box, copy from **Section content**, visibility from **Section visibility**

Homepage section editing lives on **Pages → Home** (the static front page). You will see:

| Admin area | Type | Purpose |
|------------|------|---------|
| **Homepage Sections → Section visibility** | ACF tab | Show/Hide toggles per block type |
| **Homepage Sections → Section content** | ACF tab | Copy for standard blocks (statement, editorial, video, etc.) |
| **Section builder** | WordPress meta box | Add, remove, and **drag to reorder** blocks on the homepage |

The section builder uses **ACF Free** (post meta storage) — it does **not** require ACF Pro Flexible Content.

### Hero slider

- Manage under **Hero Slides** in the admin menu
- Each slide needs a **featured image**, **title**, **Meta line**, and **CTA link**
- **Order:** set via **Page Attributes → Order** (lower numbers appear first)
- Slides are not public URLs; they only feed the homepage carousel

### Section visibility

Edit: **Pages → Home** → **Homepage Sections** → **Section visibility** tab

Each homepage block has a **Show / Hide** toggle. Turn a section off without deleting its content or removing rows from the section builder — useful for seasonal promos or temporarily hiding the statement quote, featured works grid, newsletter, and so on.

| Toggle | Controls |
|--------|----------|
| **Statement (quote)** | Pull quote below the hero |
| **Featured works** | Homepage artwork grid |
| **Editorial** | Long-form promo block |
| **Video** | Embedded video section |
| **Newsletter** | Email signup block |
| **Services / CTA** | Closing call-to-action |
| **Custom HTML blocks** | All Custom HTML rows in the builder |

The hero slider is separate and is always managed under **Hero Slides**, not these toggles.

**Featured works** can also be hidden from **Foundry Settings → Homepage** (legacy fallback when the Home page toggle is unset).

### Section builder (order and blocks)

Edit: **Pages → Home** → **Section builder** meta box (below the editor)

This meta box appears **only on the Home page** (the static front page). It does not appear on Foundry Settings or other pages.

When you first open Home, the builder lists the **default six blocks** in order so you can reorder immediately — you do not need to add rows manually to change order.

| Action | Result |
|--------|--------|
| **Drag rows** | Reorder blocks on the front end |
| **Remove** | Drop that block from the homepage (content stays in Section content) |
| **Add block** | Insert statement, featured works, editorial, video, newsletter, services, or custom HTML |
| **Update / Publish** | Saves order to post meta (`foundry_home_section_stack`) |

Standard blocks pull copy from **Section content** — the builder controls **which blocks appear and in what order**, not the text inside them (except Custom HTML).

| Layout | Purpose |
|--------|---------|
| **Statement** | Pull quote (content on Section content tab) |
| **Featured works** | Artwork grid (artworks flagged Featured on homepage) |
| **Editorial** | Long-form promo block (Section content tab) |
| **Video** | Embedded video section (Section content tab) |
| **Newsletter** | Email signup (Section content tab) |
| **Services / CTA** | Closing call-to-action (Section content tab) |
| **Custom HTML** | Freeform block — content is stored in each builder row |

**Default order** (when the saved stack is empty on the front end): statement → featured works → editorial → video → newsletter → services.

**To reorder the default stack:** drag rows in the Section builder and click **Update**. You do not need to add or remove blocks unless you want to change which sections appear.

**To restore the demo stack:** **Tools → Foundry Demo Content → Rebuild homepage sections** (see below).

### Section content

Edit: **Pages → Home** → **Homepage Sections** → **Section content** tab

All copy for the standard blocks lives here (statement quote, editorial body, video URL, newsletter text, services CTA, etc.). Changes apply on the next page load — whether or not the section builder has saved rows.

Fields are grouped in **accordions** (Statement, Editorial, Video, etc.) for easier scanning.

### Custom HTML blocks

Each **Custom HTML** row in the Section builder has its own textarea. Content supports:

- Raw HTML (sanitized on save)
- **Shortcodes** (`do_shortcode`)
- oEmbed / auto-embed URLs (YouTube, Vimeo, etc.)

Use Custom HTML for one-off promos, embeds, or plugin shortcodes without editing theme files.

### Featured works on the homepage

The **Featured works** section displays up to **20** published artworks where **Featured on homepage** is checked. The grid shows **four works per row** (centered; additional rows wrap below).

**To change featured works:**

1. Go to **Artworks** → edit each work  
2. Toggle **Featured on homepage**  
3. Set **Page Attributes → Order** on each artwork (lower numbers appear first in the grid)  
4. Update / publish — the homepage query picks up changes on the next page load  

Demo import flags four sample works as featured and sets their order. Art fair booth works (e.g. **Expo Study I–III**) are linked to artists in the seed catalog but are not featured on the homepage by default.

If no artworks are flagged, the theme may supplement from demo catalog titles after import.

### Rebuild homepage sections without full re-import

**Tools → Foundry Demo Content → Rebuild homepage sections**

This resets the section builder stack and legacy ACF fields on the current static front page to the default six-block order and demo copy. It does **not** delete artists, exhibitions, or artworks.

### Reorder homepage blocks (typical workflow)

1. **Pages → Home**
2. In **Section builder**, drag rows into the order you want
3. Optional: **Section visibility** → Hide blocks you do not want (without removing builder rows)
4. **Section content** → Edit copy for standard blocks
5. Click **Update**
6. Hard-refresh the front end while logged out

---

## 9. Managing artists

**Add:** Artists → Add New

### Core fields

| Source | Field | Notes |
|--------|-------|-------|
| Title | Artist name | Required |
| Content | Long bio | Optional; can supplement Biography tab |
| Excerpt | Short teaser | Optional |
| Featured image | Card / header image | Strongly recommended |
| Artist Details (ACF) | Specialty | Shown under name on artist page |
| Artist Details | Biography intro | Short intro on Biography tab |
| Artist Details | Biography image | Separate image for bio layout |
| Taxonomy | Artist Tags | Used for archive filtering |

### Artist page tabs (front end)

| Tab | Content source |
|-----|----------------|
| **Collection** | All **Artworks** linked to this artist |
| **Biography** | Bio intro, biography image, post content |
| **Videos** | **Artist Video** posts linked via **Artist** field |
| **Press** | **Press Item** posts linked via **Artist** field |
| **Exhibitions** | **Exhibitions** where **Primary artist** = this artist |

### Adding a video

1. **Artist Videos → Add New**
2. Set **Artist** to the artist post
3. Paste **Video URL** (YouTube or Vimeo)
4. Publish

The first published video also powers the footer **Videos** menu link (deep-links to that artist).

### Adding press coverage

1. **Press Items → Add New**
2. Set **Artist**, **Article URL**, **Publication**, **Date (display)**
3. Add body copy in the editor if needed
4. Publish

### Collection sorting

On the artist page, visitors can sort the collection (theme JavaScript). Works are tied to the artist via **Artwork → Artist** field.

---

## 10. Managing artworks

**Add:** Artworks → Add New

### Artwork Details (ACF)

| Field | Purpose |
|-------|---------|
| **Artist** | Required for linking card to artist profile and showing name on browse grid |
| **Featured on homepage** | Includes work in homepage Featured works section (up to 20 total) |
| **Showcase exhibition (art fair)** | Optional; ties work to fair booth context (e.g. Milltown Arts Exchange) |
| **Year** | Shown under title (e.g. `2024`) |
| **Dimensions** | e.g. `40 × 50 in` |
| **Medium** | e.g. `Archival pigment print` |
| **Edition** | e.g. `Edition of 5` |
| **Description (modal)** | Longer text in lightbox/modal on artist collection |

### Featured image

Set the **Featured image** for grid thumbnails. If sideload fails on your host, the theme stores a fallback URL (demo import handles this).

### Artwork Series taxonomy

Assign **Artwork Series** terms (e.g. `Furnace Row`, `River Signal`) for grouping on the artist collection. Create terms under **Artworks → Artwork Series**.

### Artwork browse page

The **Artwork** page (template **Artwork**) lists all published artworks in a responsive grid (separate layout from the homepage featured works block). Cards link to the **artist profile**, not a standalone artwork URL.

The page uses the same **hero heading** pattern as Artists and Exhibitions (large animated title + intro line). Toggle animation under **Page display → Animate hero title** in the page sidebar.

**Page Attributes → Order** on each artwork controls sort order within featured works on the homepage, not the browse grid (browse grid is alphabetical by title).

---

## 11. Managing exhibitions

**Add:** Exhibitions → Add New

### Exhibition Details (ACF)

| Field | Purpose |
|-------|---------|
| **Primary artist** | Links exhibition to artist; drives artist tab list |
| **Dates (display)** | Free text, e.g. `January 15 – March 14, 2026` |
| **Venue** | Location name |
| **Artist label** | Use when there is no single artist post (group shows, fairs) |
| **Book a visit URL** | Optional CTA |
| **Press kit URL** | Optional download/link |
| **Booth** | Art fair booth, e.g. `4C` |

### Taxonomies

| Taxonomy | Values | Effect |
|----------|--------|--------|
| **Exhibition Status** | current, upcoming, past | Archive filtering |
| **Exhibition Type** | exhibition, **art-fair** | **art-fair** uses showcase layout template |

### Layouts

- **Standard exhibition** — default detail template with gallery slider
- **Art fair** — assign **Exhibition Type → Art Fair** for showcase layout (booth works, fair-specific styling)

### Gallery images

Upload multiple images to the exhibition post (Media). The theme uses attachments for the exhibition slider when several exist; otherwise demo/fallback image keys apply.

### Linking artworks to a fair

On each **Artwork**, set **Showcase exhibition (art fair)** to the fair exhibition post for booth context.

---

## 12. Viewing rooms

**Add:** Viewing Rooms → Add New

| Field | Purpose |
|-------|---------|
| Title | Room name |
| Content | Description |
| Featured image | Card image |
| **Subtitle** | Secondary line on card |
| **Card overlay text** | Text overlay on archive card |
| **Related artist or exhibition** | Links card to artist or exhibition permalink |
| **Animate hero title** | Fade-in on this entry’s single-page hero (default **On**) |

Archive: `/viewing-room/` — uses an animated hero heading; toggle on **Foundry Settings → Archive heroes**.

---

## 13. Journal

**Add:** Journal → Add New

| Field | Purpose |
|-------|---------|
| Title / Content | Standard post body |
| Featured image | Card and single header |
| Excerpt | Optional teaser |
| **Deck / subtitle** | Subtitle on single and cards |
| **Byline (override)** | Leave empty to use WordPress post author |
| **Related exhibition** | Optional link to exhibition post |
| **Journal Categories** | News, Essay, Behind the Scenes, etc. |

Archive: `/journal/`

---

## 14. Hero slides

**Add:** Hero Slides → Add New

| Field | Purpose |
|-------|---------|
| Title | Slide headline |
| Featured image | Full-bleed background |
| **Meta line** | e.g. `EXHIBITION \| Artist Name \| Dates` |
| **CTA link** | ACF Link field — label and URL for button |

**Ordering:** **Page Attributes → Order** (ascending). Slide `0` or `1` appears first depending on sort; keep order consistent (e.g. 10, 20, 30).

**Tip:** Point CTAs to exhibitions, artwork page, viewing room archive, or contact as needed.

---

## 15. Staff and locations

### Staff

**Staff → Add New**

| Field | Purpose |
|-------|---------|
| Title | Person’s name |
| **Role** | Job title |
| **Email** | Contact email |
| Order | **Page Attributes → Order** controls list order on About |

Displayed on **About** page section `#staff`.

### Locations

**Locations → Add New**

| Field | Purpose |
|-------|---------|
| Title | Space name |
| Content | Address, hours (HTML allowed in editor) |
| **Map link** | Google Maps or similar URL |

Displayed on **About** page section `#locations`. Demo seed creates three Milltown spaces.

---

## 16. About, Contact, and Content pages

### Which pages use the block editor?

| Page | Template | Editor |
|------|----------|--------|
| **Home** (front page) | Default | **No** — section builder + Homepage Sections ACF tabs |
| **Foundry Settings** | Default | **No** — ACF settings tabs only |
| **About** | About | Block editor (plus ACF mission fields) |
| **Contact** | Contact | Block editor (optional intro) + contact form |
| **Artwork** | Artwork | Block editor (optional intro) + artwork grid |
| **Press, Visit, FAQ, etc.** | **Content Page** or Default | **Block editor** |

The theme disables Gutenberg only on **Home** and **Foundry Settings**. If you still see the Classic Editor (Visual/Code tabs), check for an active **Classic Editor** plugin, or confirm the theme is **1.3.24+**.

### Content Page (general inner pages)

Use this for any new page that needs flexible layout without a custom PHP template.

**Create a page:**

1. **Pages → Add New**
2. Enter the **title** (becomes the large hero heading)
3. Optional: **Excerpt** — one-line intro beneath the title (leave empty for title only)
4. Build the body in the **block editor** (paragraphs, headings, columns, images, buttons, quotes, embeds)
5. **Page Attributes → Template:** **Content Page** or leave **Default** (identical layout)
6. Publish and add to a menu if needed

**What visitors see:**

- Site header and footer (automatic)
- Breadcrumb trail (if **Foundry Settings → Show breadcrumbs** is on)
- Hero block — animated title + excerpt intro
- Block content in a column aligned with the hero (not a floating narrow box)

### Page display sidebar (all Pages)

Edit any page → sidebar **Page display**:

| Field | Purpose |
|-------|---------|
| **Animate hero title** | Fade-in on hero title + intro (Content Page, Default, Artwork). **On** by default. |
| **Content width** | Default column for block content on Content Page / Default templates |

**Content width** options:

| Setting | Front-end column | Best for |
|---------|------------------|----------|
| **Standard** (default) | 900px, left-aligned with hero | Prose, policies, press copy |
| **Wide** | 1200px | Mixed text + images |
| **Full** | Site max width (1800px) | Landing-style pages |

After upgrading, **ACF → Sync** the **Page display** group if **Content width** is missing.

### Per-block width (block toolbar)

Inside the block editor, select any block and use the toolbar **alignment** controls:

| Alignment | Effect |
|-----------|--------|
| **Default** | Stays within the page **Content width** setting |
| **Wide** | Breaks out to ~1200px (wider on **Wide** page setting) |
| **Full width** | Edge-to-edge across the viewport — good for hero images, galleries, dividers |

Combine page-level **Content width** with per-block **Wide/Full** for flexible layouts without code.

### Block types that work well

- **Heading**, **Paragraph**, **List** — body copy (use H2+ in content; H1 is the page hero)
- **Quote** — accent left border matches theme style
- **Image**, **Gallery**, **Cover** — artwork and installation photography
- **Columns** — side-by-side text and image
- **Buttons** — CTAs to exhibitions, contact, external links
- **Embed** / **Video** — YouTube, Vimeo, etc.
- **Separator** — section breaks

Editor styles (`assets/css/editor.css`) mirror the front end so the canvas preview matches the live page.

### About

- **Template:** About (`page-about.php`)
- **ACF:** Intro lead, Mission quote
- **Content:** Main page editor for additional copy
- **Staff** and **Locations** CPTs render automatically below

### Contact

- **Template:** Contact (`page-contact.php`)
- **Sidebar:** Hours and address from brand defaults / Foundry Settings patterns
- **Form:** AJAX contact form (see [§17](#17-forms-newsletter-and-inquiries))

Create the page, assign template **Contact**, and add to menus as needed.

---

## 17. Forms: newsletter and inquiries

### Newsletter (homepage section)

- Visitors submit email on the homepage **Newsletter** section
- Submissions create **Newsletter Subscriber** posts (title = email)
- Duplicate emails receive “already subscribed”
- Optional admin email on new signup (filterable in code)

**View subscribers:** Newsletter Subscribers in admin (list shows emails as titles).

### Contact form

- On **Contact** page (and inline variant if used in templates)
- Creates **Inquiry** posts with name, email, message, context
- Sends email to **Settings → General → Administration Email** with Reply-To set to the visitor

**View inquiries:** Inquiries in admin.

### Production notes

- Test forms on the **live site URL** (HTTPS), not only Customizer preview
- Ensure hosting allows `wp-admin/admin-ajax.php` for AJAX
- For Mailchimp/HubSpot, you would need a custom integration (theme v1 is native storage only)

---

## 18. Demo content importer

**Tools → Foundry Demo Content**

### Import demo content

Creates or updates fictional sample content:

- Artists, exhibitions, artworks, journal entries  
- Hero slides, viewing rooms, staff, locations  
- Pages (Home, About, Contact, Foundry Settings, Artwork)  
- Navigation menus and Foundry Settings defaults  
- Homepage section builder + featured artwork flags  

**Safe to run multiple times** for the same titles — existing posts are updated/skipped by title matching. Trashed posts with the same title may be restored.

**Before re-importing after title changes:** empty **Trash** for affected post types to avoid duplicates.

**After import:**

1. **Settings → Permalinks → Save**  
2. View homepage and `/artwork/`  
3. Confirm hero slides have images  

### Rebuild homepage sections only

Use when you upgraded the theme and need the default six sections back **without** touching CPT content.

---

## 19. Appearance, color, and motion

### Admin: color palette

**Pages → Foundry Settings → Appearance → Color palette**

| Palette | Character |
|---------|-----------|
| **Foundry** | Industrial red and stone (default) |
| **Warm** | Bronze and parchment |
| **Minimal** | Monochrome gallery |

Palette applies site-wide via CSS variables (`assets/css/palettes.css`). Visitors do **not** choose the palette.

### Default color mode and theme toggle

On the same **Appearance** tab:

| Field | Behavior |
|-------|----------|
| **Default color mode** | Light, Dark, or System — used until the visitor picks a preference |
| **Show light/dark toggle** | Hide the header switch if you want a fixed mode |

### Breadcrumbs

**Show breadcrumbs** (Appearance tab) adds trail navigation on inner pages, archives, and singles. Off by default on new installs only if you disable it; demo seed leaves breadcrumbs **on**.

### Smooth scroll

**Smooth scroll** (Appearance tab, **off by default**):

| When on | Behavior |
|---------|----------|
| Anchor links | CSS `scroll-behavior: smooth` with offset for the fixed header and top notices |
| Desktop wheel | Light eased inertia via `assets/js/smooth-scroll.js` |
| Reduced motion | Disabled automatically when the visitor prefers reduced motion |
| Touch / trackpad on mobile | Native scrolling only (no wheel script) |

Turn **Off** to restore standard browser scrolling. The script and styles are not loaded when the setting is off.

### Auto-hide header on scroll

**Auto-hide header on scroll** (Appearance tab, **off by default**):

| When on | Behavior |
|---------|----------|
| Scroll down | Navigation bar slides up and hides |
| Scroll up | Navigation bar returns smoothly |
| Near top of page | Header always visible |
| Message bar on/off | Header position accounts for message bar height automatically |
| Reduced motion | Instant show/hide (no animation) |

The **message bar** (if enabled) stays fixed at the top; only the main navigation hides. Works alongside **Smooth scroll** when both are enabled.

### Visitor: light / dark toggle

When enabled, the header toggle sets `data-theme="light"` or `data-theme="dark"` and persists in `localStorage`. Works with all admin palettes.

---

## 20. Hero title animation

Several templates use a large **hero heading** (title + optional intro paragraph) with a fade-in animation. Animation is **on by default**.

### Where it applies

| Screen | Toggle location |
|--------|-----------------|
| **Content Page** / default pages | Edit page → sidebar **Page display** → **Animate hero title** |
| **Artwork** page (and other Pages with a hero) | Edit the page → sidebar **Page display** → **Animate hero title** |
| **Artists** archive | **Foundry Settings** → **Archive heroes** → Artists archive |
| **Exhibitions** archive | Foundry Settings → Exhibitions archive |
| **Viewing Room** archive | Foundry Settings → Viewing Room archive |
| **Artwork** CPT archive (fallback URL) | Foundry Settings → Artwork archive |
| **Viewing Room** single entry | Field on the viewing room post → **Animate hero title** |

### Behavior

| Setting | Front end |
|---------|-----------|
| **On** (default) | Title and description fade in (staggered) |
| **Off** | Title and description appear immediately |

Pages without a hero block (e.g. **About**, **Contact** using `page-title` layout) ignore this setting.

After upgrading the theme, **ACF → Sync** the **Page display** and **Foundry Settings** field groups if the toggles do not appear.

---

## 21. SEO and Rank Math

### Without Rank Math

The theme outputs:

- Meta description  
- Open Graph and Twitter Card tags  
- JSON-LD structured data (e.g. gallery, articles)

Per-page content and excerpts feed descriptions; **Foundry Settings** provides defaults.

### With Rank Math active

Theme SEO output is **turned off** to avoid duplicate tags. Configure titles, sitemaps, and schema in Rank Math.

**Recommended Rank Math settings:** see the [Rank Math guide](RANK-MATH.md).

- Include CPTs: `artist`, `exhibition`, `journal`, `viewing_room` in sitemap  
- Exclude: `inquiry`, `newsletter_sub`, `hero_slide`  
- Set organization/local SEO to match Foundry Settings  

---

## 22. Images and featured media

### Best practice

1. Upload **Featured image** on each public post  
2. Use large, high-quality JPEG/WebP (theme registers `foundry-hero`, `foundry-artist-card`, `foundry-work-thumb`, etc.)

### Demo / fallback images

On demo import, images may load from Unsplash URLs in `inc/images.php` when WordPress sideload is blocked. Fallback URLs are stored in post meta `_foundry_fallback_image_url`.

### If images break after deploy

1. Confirm featured images are set in admin  
2. Re-run **Import demo content** to refresh fallback URLs  
3. Update theme to latest version (catalog URLs are maintained in code)

### Exhibition gallery

Upload multiple images as **Media** attached to the exhibition. The slider prefers real attachments over fallbacks.

---

## 23. Navigation menus

**Appearance → Menus**

| Theme location | Purpose |
|----------------|---------|
| Primary Navigation | Main header |
| Footer: Explore | Column 1 |
| Footer: About | Column 2 |
| Footer: Resources | Column 3 |

If no menu is assigned, the theme shows a **fallback** primary menu (Artists, Artwork, Exhibitions, Viewing Room, About).

**Footer “Videos” link:** auto-targets the first **Artist Video**’s linked artist, or the artists archive.

---

## 24. Archives, filters, and search

### Artists archive (`/artists/`)

- Animated **hero heading** + intro text (toggle: [§20](#20-hero-title-animation))  
- Filter bar by **Artist Tags** (client-side)  
- Artist cards link to single artist  

### Exhibitions archive (`/exhibitions/`)

- Animated **hero heading** + intro text  
- Filter by **Exhibition Status** and type  
- Masonry-style grid  

### Artwork browse (`/artwork/`)

- **Artwork** page template with hero heading (per-page animation toggle)  
- Responsive grid of all published artworks; cards link to artist profiles  

### Search

Site search includes: pages, posts, artists, exhibitions, artworks, viewing rooms, journal.

### 404

Custom 404 template with breadcrumb, editable heading and message, and two CTAs. Configure under **Foundry Settings → Content & errors**. Empty button URLs default to the homepage and exhibitions archive.

### Search empty state

When search returns no results, copy and an optional CTA come from **Foundry Settings → Content & errors** (Search empty message / CTA).

---

## 25. Updating the theme

1. Backup the site (database + `uploads` + theme folder).  
2. Upload changed files or replace `foundry-gallery` folder.  
3. **ACF → Field Groups → Sync** if new JSON shipped (e.g. **Page display**, **Foundry Settings**).  
4. **Settings → Permalinks → Save**.  
5. Hard-refresh browser cache.  
6. Check `FOUNDRY_THEME_VERSION` in `functions.php` (or HTML comment on homepage for admins).

Bump version when changing CSS/JS so browsers load new assets.

---

## 26. Troubleshooting

| Problem | Likely cause | Fix |
|---------|--------------|-----|
| Homepage 404 for visitors | Static front page not set or Home not published | **Settings → Reading** → static page = Home; publish Home |
| Homepage sections don’t change | Editing wrong page | Edit the page set as **Homepage** in Reading settings |
| Section visibility toggle ignored | ACF not synced or wrong field read | **ACF → Sync** Homepage Sections group; hard-refresh front end |
| Section builder missing | Wrong page or not front page | Builder only appears on **Home** (static front page), not Foundry Settings |
| `/site-settings/` visible to public | Page set to Public | Set Foundry Settings page to **Private**; theme 1.3.21+ blocks public URL |
| `/artists/` 404 | Permalinks not flushed | **Settings → Permalinks → Save** |
| ACF fields missing | ACF inactive or JSON not synced | Install ACF; **Sync** field groups |
| Site Settings / Foundry Settings fields missing | Wrong page slug | Page slug must be `site-settings` (title may be Foundry Settings) |
| Message bar not visible (logged out) | Cache or setting off | Enable **Message bar** tab; purge page cache; confirm page is published |
| Foundry Settings save / ACF nonce error | Large form or host limits | Save again; theme bypasses validation on this page — ensure ACF is synced to latest JSON |
| Smooth scroll not working | Setting off or reduced motion | **Appearance → Smooth scroll**; test on desktop with motion enabled |
| Auto-hide header not working | Setting off | **Appearance → Auto-hide header on scroll** → On; hard-refresh |
| Block editor missing on new page | Old theme or Classic Editor plugin | Theme **1.3.24+**; deactivate **Classic Editor** plugin if installed |
| Content column narrow or misaligned | Old CSS cached | Hard-refresh; theme **1.3.25+** aligns content with hero grid |
| Content width field missing | ACF not synced | **ACF → Sync** **Page display** group |
| Featured works empty | No artworks flagged | Enable **Featured on homepage** on artworks; set **Order**; or re-import demo |
| Hero title animation toggle missing | ACF not synced | **ACF → Sync** **Page display** and **Foundry Settings** groups |
| Artwork page grid looks broken | Old CSS cached | Hard-refresh; confirm theme **1.0.37+** (separate grid from homepage featured works) |
| Hero slider empty | No slides or no images | Add **Hero Slides** with featured images and order |
| Broken artwork images | Dead remote URLs or stale meta | Update theme; re-import demo; set featured images manually |
| Newsletter/contact fails | AJAX blocked or HTTP mixed content | Test on live HTTPS URL; check host blocks `admin-ajax.php` |
| Duplicate OG/meta tags | Rank Math + theme | Normal — theme disables its SEO when Rank Math runs |
| Old demo names after import | Old posts not trashed | Trash old posts; re-import |
| White screen | PHP version / fatal error | PHP 8.1+; enable `WP_DEBUG_LOG` temporarily |

### Admin notices

The theme shows dashboard warnings when:

- Reading settings are not configured for a static homepage  
- Homepage sections exist on a page that is not the front page  

Logged-in admins may see HTML comments in page source with homepage debug counts.

---

## Quick reference: daily editor workflows

### Publish a new exhibition

1. Exhibitions → Add New  
2. Fill title, content, featured image  
3. Set **Primary artist**, dates, venue  
4. Set **Exhibition Status** (current / upcoming / past)  
5. Set **Exhibition Type** (exhibition or art-fair)  
6. Upload gallery images  
7. Publish → verify at `/exhibitions/{slug}/`  

### Add an artist and works

1. Artists → Add New → specialty, bio, featured image  
2. Artworks → Add New → link **Artist**, image, year, dimensions  
3. Assign **Artwork Series** if needed  
4. Optional: Artist Videos / Press Items linked to artist  
5. Exhibitions → link **Primary artist** for shows  

### Create a block content page

1. **Pages → Add New**  
2. Title + optional **Excerpt** (hero intro line)  
3. Build body in the **block editor**  
4. Template: **Content Page** or **Default**  
5. Sidebar **Page display** → set **Content width** if needed  
6. Publish → add to **Appearance → Menus** if public  

### Change homepage promo

1. Edit **Hero Slides** for top carousel  
2. **Pages → Home** → **Section builder** — drag to reorder or add/remove blocks  
3. **Section visibility** — hide blocks without deleting content  
4. **Section content** — edit copy for standard blocks  
5. Toggle **Featured on homepage** on artworks (up to 20); set **Order** to control grid sequence  

### Reorder homepage sections

1. **Pages → Home** → **Section builder** meta box  
2. Drag rows into the desired order  
3. Click **Update** and hard-refresh the front end  

### Disable hero title animation on a page

1. Edit the page (e.g. **Artwork**)  
2. Sidebar → **Page display** → **Animate hero title** → **Off**  
3. For archives, use **Foundry Settings → Archive heroes**  

### Change site-wide branding

1. **Foundry Settings** (admin sidebar) — logo, footer, palette, social, message bar, SEO defaults  
2. Clear browser cache and preview light/dark modes  

### Enable smooth scroll

1. **Foundry Settings → Appearance**  
2. **Smooth scroll** → **On**  
3. Hard-refresh the front end; test anchor links and desktop wheel scrolling  

### Enable auto-hide navigation

1. **Foundry Settings → Appearance**  
2. **Auto-hide header on scroll** → **On**  
3. Test scroll down/up on the live site (works with message bar on or off)  

### Show a site-wide message

1. **Foundry Settings → Message bar**  
2. **Show message bar on front end** → **On**  
3. Enter message text; optional link URL and background color  
4. Update the page; purge cache; preview while logged out  

---

*Foundry Gallery theme — fictional Milltown gallery brand. Replace demo content before production launch.*

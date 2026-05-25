# Foundry Gallery — Product positioning

Internal positioning document for sales, marketplace listings, agency pitches, and product decisions. Use this before writing landing copy, ThemeForest descriptions, or client proposals.

**Product:** Foundry Gallery WordPress theme (`foundry-gallery/`)  
**Category:** Vertical gallery CMS theme (classic PHP + ACF Free)  
**Current version:** 1.3.25  
**Demo brand:** Fictional Milltown, PA (white-label via Foundry Settings + seed content)

---

## One-line positioning

**Foundry Gallery is a purpose-built WordPress theme that ships a complete gallery content system — so agencies and galleries launch faster than rebuilding the same architecture in Elementor every time.**

---

## Category definition

Foundry is **not** a multipurpose page-builder theme and **not** a hosting/agency landing-page kit.

| Foundry is | Foundry is not |
|------------|----------------|
| A **gallery CMS starter** on self-hosted WordPress | A drag-and-drop site builder |
| **Structured content** (artists, works, shows, journal) | A collection of generic inner pages |
| **Editor-first** — staff fill fields, not rearrange widgets | A designer sandbox for unlimited one-off layouts |
| **ACF Free + Local JSON** — no Pro required | An Elementor widget pack |
| **Agency-deliverable** with demo import, docs, migration notes | A $29 impulse-buy multipurpose theme |

**Market frame:** compete on **time-to-live and fit**, not widget count or page quantity.

---

## Target customers

### Primary (best fit)

1. **Web agencies and freelancers** who build 1–10 gallery or art-adjacent sites per year and want a repeatable starter instead of custom Elementor architecture each time.
2. **Contemporary / commercial galleries** that need artist rosters, exhibition history, viewing room, journal, and inquiry flows on WordPress they control.
3. **Developer-led studios** comfortable with classic themes, ACF, and handing editors a field-based admin — not selling “no-code everything.”

### Secondary

- Artist-run spaces, nonprofits, editions publishers, art fairs with a small permanent web presence
- Agencies white-labeling the theme under their own `style.css` author credit (see `DISTRIBUTION.md`)

### Poor fit (say no early)

- Client **requires Elementor** for all future edits
- **Five-page brochure** with no catalog, no exhibitions, no ongoing editorial
- **Full ecommerce / checkout** as core requirement (inquiries yes; WooCommerce-first no — unless extended)
- Buyer shopping purely on **“24+ inner pages”** or widget quantity
- Teams that want **unlimited visual layout freedom** on every template

---

## Core problem

Gallery websites look simple but need a **repeatable content system**:

- Artists linked to works, press, video, and exhibitions
- Exhibition archives with status and layout variants (including art fair)
- Homepage that combines slider, editorial blocks, and featured works
- Viewing room and journal for ongoing programming
- Forms, SEO, and site-wide notices without plugin sprawl

**Elementor (and similar) solves “pages.”** Galleries need **relationships, archives, and editorial workflow.** Building that inside a page builder means reinventing the same CPT/ACF/template stack on every project — slow, expensive, and hard to maintain.

---

## Value proposition

### For agencies

> **Ship a credible gallery site in days, not weeks — without Elementor Pro, template debt, or a bespoke CMS build.**

- Pre-built content model, templates, and Foundry Settings
- Demo import + fictional catalog for instant preview
- Editor guide (`USER-GUIDE.md`) included for handoff
- Lower client TCO: WordPress + ACF Free + optional Rank Math

### For galleries

> **A site that matches how a gallery actually works — artists, exhibitions, works, viewing room, journal — with an admin your staff can learn without breaking the layout.**

- Content lives in fields and post types, not scattered across page builder sections
- Consistent design system (palettes, dark mode, typography from Foundry Settings)
- Native contact and newsletter capture

### For developers

> **Opinionated gallery domain model with hooks, Local JSON, and migration docs — extend without fighting a page builder.**

- Classic PHP templates + `foundry_*` hooks (`HOOKS.md`)
- No page-builder JSON in the database for core templates
- Predictable upgrades compared to Elementor + third-party widget stacks

---

## Primary differentiators

1. **Gallery-native content model** — Artists, Artworks, Exhibitions, Viewing Rooms, Journal, Hero Slides, Staff, Locations — wired together (not bolted on).
2. **Speed to first live site** — Demo import, menus, homepage section builder with drag reorder + visibility toggles, seed content (`SEED-CONTENT.md`).
3. **ACF Free only** — Repeatable structures use CPTs; no ACF Pro hard dependency.
4. **Foundry Settings** — One admin surface for brand, appearance, forms, archives, message bar, 404/search copy, integrations.
5. **Documentation as product** — User guide, deploy README, migration, Rank Math, distribution/white-label.
6. **Maintainability** — Structured templates age better than per-client Elementor Theme Builder setups.

---

## Competitive landscape

### vs. Elementor (or Divi) from scratch

| | Elementor gallery build | Foundry |
|--|-------------------------|---------|
| Content architecture | Plan + build CPTs, fields, relationships | Included |
| Singles & archives | Theme Builder per template | Included |
| Homepage | Widget assembly + responsive QA | Section builder (reorder, visibility, custom HTML) + hero CPT |
| Demo / starter | Manual | One-click import |
| Typical agency timeline | ~2–4 weeks (proper system) | ~2–4 days to credible launch |
| Year-two maintenance | Layout drift, plugin/widget updates | Field-based content, theme updates |

**Message:** Elementor is fast for **pages**; Foundry is fast for **gallery systems**.

### vs. Generic multipurpose themes (ThemeForest-style)

Multipurpose themes win on **page count and visual demos**. Foundry wins on **domain fit** and **delivery speed for one vertical**.

Do not compete on “20+ widgets / 24+ pages.” Compete on: *“Everything a working gallery needs is already modeled.”*

### vs. Custom build

Custom is right for unique product requirements or heavy commerce. Foundry fits when the need is **standard contemporary gallery IA** with budget and timeline constraints.

**Message:** 80% of gallery sites share the same structure; Foundry productizes that 80%.

### vs. Squarespace / hosted builders

Hosted builders win on **simplicity and hosting bundle**. Foundry wins on **ownership, self-hosting, SEO control, and agency extensibility**.

**Message:** For clients who need WordPress (or already have it), Foundry is faster than rebuilding gallery logic in a generic theme.

---

## Proof points (use in copy)

Use only claims the repo actually supports:

- Custom post types for artists, artworks, exhibitions, viewing rooms, journal
- Artist profiles: Collection, Biography, Videos, Press, Exhibitions
- Exhibition layouts including art-fair showcase
- Homepage hero slider + section builder with drag reorder, per-section visibility, and custom HTML/shortcodes (up to 20 featured works)
- **Content pages** with Gutenberg block editor, hero + breadcrumbs, per-page content width, wide/full block alignment
- Native newsletter + contact forms (stored in WordPress)
- Foundry Settings: palettes, dark mode, breadcrumbs, smooth scroll, auto-hide header, message bar, maintenance/closed modes, editable 404/search
- Built-in SEO; defers to Rank Math when active
- Demo content importer + rebuild homepage sections tool
- GPL theme; ACF Free requirement documented
- Fictional demo brand for safe marketplace demos

**Avoid claiming:** WooCommerce-ready, Elementor compatible, unlimited layouts, page-builder ease for every template, enterprise support SLA (unless you add one).

---

## Messaging framework

### Headline options

- **Launch gallery websites faster — without rebuilding them in Elementor.**
- **The WordPress theme built for contemporary galleries, not generic landing pages.**
- **Artists, exhibitions, viewing room, journal — already wired.**

### Subhead options

- Purpose-built content types, demo import, and editor documentation — so you spend time on brand and content, not CPT architecture.
- Classic WordPress + ACF Free. No page-builder lock-in on core templates.

### Elevator pitch (30 seconds)

Foundry Gallery is a WordPress theme for contemporary art galleries. Instead of stacking Elementor templates and custom fields on every project, you get a complete content system — artists, works, exhibitions, viewing room, journal, forms, and SEO — plus demo import and a full editor guide. Agencies ship in days; galleries get a site that matches how they actually work.

### Objection handling

| Objection | Response |
|-----------|----------|
| “Why not Elementor?” | Elementor is great for arbitrary pages. Galleries need linked content types and archives. Foundry includes that system; Elementor projects rebuild it each time. |
| “Only a few page templates?” | Pages aren’t the product — **CPT archives and singles** are. Count artists, exhibitions, artwork browse, journal, viewing room, about, contact, search, 404. |
| “Client wants to edit everything visually” | Core templates are stable by design. Marketing homepage sections are flexible via the section builder (reorder, hide, custom HTML). Position as **content safety + speed**, not infinite layout freedom. |
| “We need a shop” | Foundry is catalog + inquiry first. Commerce can be added via WooCommerce or external sales channels; don’t oversell out of the box. |
| “Is it ThemeForest-ready?” | Viable as a **niche** listing; primary channel may be **direct/agency** for margin and fit. |

---

## Commercial viability (internal)

**Verdict:** Commercially viable as a **vertical product for a small market**, not as a high-volume multipurpose theme.

| Channel | Fit | Notes |
|---------|-----|--------|
| Agency / direct client kit | **Strongest** | Bundle theme + setup + USER-GUIDE; price on time saved |
| Own product site | **Strong** | Control positioning; avoid race to $29 |
| White-label for studios | **Strong** | Same zip, different Foundry Settings + content |
| ThemeForest / marketplace | **Possible** | Niche TAM; invest in demo, screenshots, support policy |
| WordPress.org | **Weak** | ACF hard dependency limits directory fit |

**Pricing philosophy:** Price on **delivery value** (days saved vs Elementor/custom), not feature count. A single prevented custom-build week justifies a premium license or setup fee.

**Illustrative ranges (your call):**

- Theme license only: $49–149 one-time (niche vertical)
- Agency “site in a box”: $1,500–4,000+ including setup, content migration, training
- Do not anchor against $29 hosting themes — different buyer

---

## Ideal customer outcomes

After install + demo import + brand pass, the customer should have:

- Working homepage with slider and sections
- Artist and exhibition archives with filters
- Artwork browse and artist profile tabs
- Contact and newsletter capturing leads
- Editor documentation for staff handoff
- SEO baseline without plugin conflicts

**Success metric:** Time from theme upload to **client-reviewable demo** (not pixel-perfect custom design).

---

## Brand voice (external)

- **Confident, not hype** — specialist tool, not “ultimate mega bundle”
- **Editor-friendly** — emphasize stable layouts and clear admin
- **Agency-respectful** — white-label, hooks, migration, no lock-in on core templates
- **Honest scope** — gallery CMS + lead gen; not all-in-one commerce

---

## What to build next (positioning-aligned)

Highest leverage for commercial story (in order):

1. **Live demo URL** — production-quality Milltown or neutral brand
2. **Before/after timeline** — “Elementor build vs Foundry” one-pager for sales
3. **Screenshot set** — artist page, exhibition, archive filters, Foundry Settings, mobile
4. **License + support page** — scope, updates, what’s included
5. **Optional:** inquiry → CRM doc or WooCommerce compatibility note (expands TAM)

---

## Related documents

| Document | Use |
|----------|-----|
| `docs/USER-GUIDE.md` | Editor/admin manual — deliver to clients |
| `docs/DISTRIBUTION.md` | White-label and zip checklist |
| `docs/SEED-CONTENT.md` | Demo catalog reference |
| `docs/MIGRATION.md` | Staging → production |
| `foundry-gallery/README.md` | Install and deploy |
| `README.md` | Repository overview |

---

## Document maintenance

Update this file when:

- Major features change the buyer story (e.g. commerce, new CPTs)
- Primary channel decision shifts (e.g. ThemeForest launch)
- Pricing or support policy is finalized
- Competitive claims need refresh

*Last aligned with theme version 1.3.25.*

# Production migration — Namecheap staging → live

Use this runbook when moving from a **Namecheap cPanel staging** install to **production** (WP Engine, Flywheel, another host, or a new domain on Namecheap).

## Before you start

| Item | Staging | Production |
|------|---------|------------|
| WordPress version | Match or newer on prod | 6.4+ |
| PHP | 8.1+ | 8.1+ |
| Theme | `foundry-gallery` uploaded | Same version |
| Plugins | ACF (free); Rank Math optional | Same |
| URL | e.g. `staging.foundrygallery.com` | e.g. `www.foundrygallery.com` |

**Do not** copy `wp-config.php` secrets from staging to production without rotating database passwords.

## Phase 1 — Freeze staging

1. Stop editing content on staging (or note the cutover time).
2. Export database (cPanel → **phpMyAdmin** → database → **Export** → Quick → SQL).
3. Zip `wp-content/uploads/` from staging (cPanel File Manager or SFTP).
4. Zip `wp-content/themes/foundry-gallery/` (or deploy from git).

## Phase 2 — Prepare production

1. Install WordPress on production (one-click or manual).
2. Upload theme to `wp-content/themes/foundry-gallery/`.
3. Install **Advanced Custom Fields** (+ **Rank Math** if used on staging).
4. Activate **Foundry Gallery**.
5. **ACF → Field Groups → Sync** all Foundry groups.
6. **Settings → Permalinks → Save** (flush rewrites).

## Phase 3 — Import database

### Option A — WP-CLI (SSH on host)

```bash
# On production server, in WordPress root:
wp db import ~/foundry-staging.sql
wp search-replace 'https://staging.example.com' 'https://www.example.com' --all-tables --precise
wp search-replace 'staging.example.com' 'www.example.com' --all-tables --precise
wp cache flush
wp rewrite flush
```

### Option B — phpMyAdmin only

1. Create empty database on production; import staging `.sql`.
2. Edit `wp_options`: set `siteurl` and `home` to production URL.
3. Use a **Better Search Replace** plugin (or WP-CLI above) for serialized URL replacements in post content and meta.

**Warning:** Plain SQL find/replace can break serialized PHP strings. Prefer WP-CLI or Better Search Replace.

## Phase 4 — Uploads & media

1. Extract staging `uploads/` into production `wp-content/uploads/`.
2. In wp-admin: **Settings → Media** — confirm uploads path is default.
3. Spot-check artist/exhibition images and journal featured images.

## Phase 5 — Post-import checklist

- [ ] Log in to wp-admin on production URL
- [ ] **Settings → Reading** — static front page = Home
- [ ] Pages exist: Home, About (template About), Site Settings (`site-settings`), Contact (template Contact)
- [ ] **Appearance → Menus** — reassign Primary + footer menus (menu IDs change on import)
- [ ] Visit `/journal/`, `/artists/`, `/exhibitions/` — no 404
- [ ] Submit test **Contact** form and **Newsletter** (check `inquiry` / `newsletter_sub` in admin)
- [ ] If Rank Math: reconnect Google Search Console, resubmit sitemap
- [ ] SSL certificate active (HTTPS)
- [ ] Disable staging site or password-protect it to avoid duplicate SEO

## Phase 6 — DNS cutover

1. Lower TTL on DNS 24–48h before cutover if possible.
2. Point A/CNAME records to production host.
3. After DNS propagates, run search-replace again if any mixed URLs remain.
4. Set up redirects: old staging URL → production (301) if staging was public.

## Helper scripts

From the repo root (requires [WP-CLI](https://wp-cli.org/) on the machine that can reach the server):

```bash
# Export staging (run in WordPress root on staging)
./scripts/migrate-export.sh https://staging.example.com

# Import on production (after copying SQL + uploads)
./scripts/migrate-import.sh https://www.example.com ./exports/foundry-export-YYYYMMDD.sql
```

## Re-running demo content on production

**Tools → Foundry Demo Content** is for empty installs. On production with real content, **do not** run the seeder unless you intend to add/refresh demo posts (skips duplicate titles).

## Rollback

Keep staging DB export and `uploads` zip until production is verified for 48–72 hours. Restore by re-importing staging SQL and reversing DNS if needed.

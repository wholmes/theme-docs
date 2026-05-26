/**
 * Theme Docs — multi-theme documentation hub and markdown viewer
 */
(function () {
    'use strict';

    /** Site root path (e.g. / or /theme-docs/) for GitHub Pages project sites. */
    var SITE_ROOT = (function () {
        var scripts = document.getElementsByTagName('script');
        var i;
        for (i = scripts.length - 1; i >= 0; i--) {
            var src = scripts[i].getAttribute('src');
            if (src && /docs-app\.js/.test(src)) {
                return new URL(src, window.location.href).pathname.replace(/assets\/js\/docs-app\.js.*$/, '');
            }
        }
        var path = window.location.pathname;
        if (/\.html$/i.test(path)) {
            return path.replace(/[^/]+$/, '');
        }
        return path.endsWith('/') ? path : path + '/';
    })();

    function resolveUrl(relative) {
        return SITE_ROOT + String(relative).replace(/^\//, '');
    }

    function gfmSlug(text) {
        return String(text)
            .toLowerCase()
            .trim()
            .replace(/[\s]+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    function assignHeadingIds(container) {
        var seen = Object.create(null);
        var headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach(function (heading) {
            var base = gfmSlug(heading.textContent || 'heading');
            if (!base) {
                return;
            }
            var id = base;
            if (seen[base] !== undefined) {
                seen[base] += 1;
                id = base + '-' + seen[base];
            } else {
                seen[base] = 0;
            }
            heading.id = id;
        });
    }

    function inPageHashUrl(id) {
        return window.location.pathname + window.location.search + '#' + id;
    }

    function fixInPageHashLinks(container) {
        if (!container) {
            return;
        }
        var links = container.querySelectorAll('a[href^="#"]');
        links.forEach(function (link) {
            var href = link.getAttribute('href');
            if (href && href.length > 1) {
                link.setAttribute('href', inPageHashUrl(href.slice(1)));
            }
        });
    }

    function getParam(name) {
        return new URLSearchParams(window.location.search).get(name);
    }

    function getAudience() {
        return getParam('audience') === 'developer' ? 'developer' : 'consumer';
    }

    function audienceQuery() {
        return getAudience() === 'developer' ? '&audience=developer' : '';
    }

    function docHasAudience(doc, audience) {
        return !!(doc && doc.audiences && doc.audiences.indexOf(audience) > -1);
    }

    function filterManifest(manifest, audience) {
        var docIds = Object.create(null);
        var docs = [];
        var i;

        for (i = 0; i < manifest.docs.length; i++) {
            if (docHasAudience(manifest.docs[i], audience)) {
                docIds[manifest.docs[i].id] = true;
                docs.push(manifest.docs[i]);
            }
        }

        var sections = [];
        for (i = 0; i < manifest.sections.length; i++) {
            var section = manifest.sections[i];
            if (section.audiences && section.audiences.indexOf(audience) === -1) {
                continue;
            }
            var sectionDocs = section.docs.filter(function (docId) {
                return docIds[docId];
            });
            if (!sectionDocs.length) {
                continue;
            }
            sections.push({
                id: section.id,
                title: section.title,
                description: section.description,
                docs: sectionDocs
            });
        }

        var audienceMeta = manifest.audiences && manifest.audiences[audience];

        return {
            id: manifest.id,
            name: manifest.name,
            version: manifest.version,
            description: audienceMeta ? audienceMeta.description : manifest.description,
            requirements: manifest.requirements,
            sections: sections,
            docs: docs,
            linkMap: manifest.linkMap,
            defaultDoc: audienceMeta ? audienceMeta.defaultDoc : null
        };
    }

    function themeBase(themeId) {
        return resolveUrl('themes/' + themeId + '/');
    }

    function docUrl(themeId, docId) {
        return resolveUrl(
            'doc.html?theme=' + encodeURIComponent(themeId) +
            '&doc=' + encodeURIComponent(docId) +
            audienceQuery()
        );
    }

    function hubUrl(themeId) {
        return resolveUrl('hub.html?theme=' + encodeURIComponent(themeId) + audienceQuery());
    }

    function indexUrl() {
        var query = audienceQuery();
        return resolveUrl('index.html' + (query ? '?' + query.slice(1) : ''));
    }

    function otherAudienceUrl(kind, themeId) {
        var nextAudience = getAudience() === 'developer' ? 'consumer' : 'developer';
        if (kind === 'index') {
            return resolveUrl('index.html?audience=' + nextAudience);
        }
        return resolveUrl(
            'hub.html?theme=' + encodeURIComponent(themeId) + '&audience=' + nextAudience
        );
    }

    function fetchJson(url) {
        return fetch(url).then(function (response) {
            if (!response.ok) {
                throw new Error('Could not load ' + url);
            }
            return response.json();
        });
    }

    function loadRegistry() {
        return fetchJson(resolveUrl('themes.json'));
    }

    function loadManifest(themeId) {
        return fetchJson(themeBase(themeId) + 'manifest.json');
    }

    function findTheme(registry, themeId) {
        if (!registry || !registry.themes) {
            return null;
        }
        for (var i = 0; i < registry.themes.length; i++) {
            if (registry.themes[i].id === themeId) {
                return registry.themes[i];
            }
        }
        return null;
    }

    function findDoc(manifest, docId) {
        if (!manifest || !manifest.docs) {
            return null;
        }
        for (var i = 0; i < manifest.docs.length; i++) {
            if (manifest.docs[i].id === docId) {
                return manifest.docs[i];
            }
        }
        return null;
    }

    function defaultDocId(manifest) {
        if (manifest.defaultDoc && findDoc(manifest, manifest.defaultDoc)) {
            return manifest.defaultDoc;
        }
        if (!manifest || !manifest.docs) {
            return null;
        }
        for (var i = 0; i < manifest.docs.length; i++) {
            if (manifest.docs[i].default) {
                return manifest.docs[i].id;
            }
        }
        return manifest.docs[0] ? manifest.docs[0].id : null;
    }

    function renderAudienceSwitcher(themeId) {
        var footer = document.querySelector('.site-footer');
        if (!footer) {
            return;
        }

        var existing = document.getElementById('audience-switcher');
        if (existing) {
            existing.remove();
        }

        var audience = getAudience();
        var p = document.createElement('p');
        p.id = 'audience-switcher';
        p.className = 'audience-switcher';

        if (audience === 'developer') {
            p.innerHTML = themeId
                ? '<a href="' + otherAudienceUrl('hub', themeId) + '">← Gallery staff guides</a>'
                : '<a href="' + otherAudienceUrl('index') + '">← Gallery staff guides</a>';
        } else if (themeId) {
            p.innerHTML = '<a href="' + otherAudienceUrl('hub', themeId) + '">Developer documentation →</a>';
        } else {
            p.innerHTML = '<a href="' + otherAudienceUrl('index') + '">Developer documentation →</a>';
        }

        footer.appendChild(p);
    }

    function setText(id, text) {
        var el = document.getElementById(id);
        if (el) {
            el.textContent = text;
        }
    }

    function setHtml(id, html) {
        var el = document.getElementById(id);
        if (el) {
            el.innerHTML = html;
        }
    }

    function renderThemeCatalog(registry) {
        var grid = document.getElementById('theme-grid');
        var status = document.getElementById('catalog-status');
        if (!grid || !registry.themes.length) {
            return;
        }

        if (status) {
            status.hidden = true;
        }
        grid.hidden = false;

        var html = '';
        registry.themes.forEach(function (theme) {
            var description = theme.description;
            html += '<li class="theme-card">';
            html += '<a class="theme-card-link" href="' + hubUrl(theme.id) + '">';
            html += '<span class="theme-card-label">WordPress theme</span>';
            html += '<h2 class="theme-card-title">' + theme.name + '</h2>';
            html += '<p class="theme-card-desc">' + description + '</p>';
            html += '<p class="theme-card-meta">v' + theme.version + ' · ' + theme.requirements + '</p>';
            html += '<span class="theme-card-arrow" aria-hidden="true">View guides →</span>';
            html += '</a></li>';
        });
        grid.innerHTML = html;
        renderAudienceSwitcher(null);
    }

    function renderHub(manifest, themeMeta) {
        var main = document.getElementById('hub-sections');
        if (!main) {
            return;
        }

        document.title = manifest.name + ' — Documentation';
        setText('hub-title', manifest.name);
        setText('hub-lead', manifest.description);
        setText('hub-meta', 'Theme version ' + manifest.version + ' · Requires ' + manifest.requirements);
        setText('breadcrumb-theme', manifest.name);

        var themeLink = document.getElementById('nav-current-theme');
        if (themeLink) {
            themeLink.textContent = manifest.name;
            themeLink.setAttribute('href', hubUrl(manifest.id));
            themeLink.hidden = false;
        }

        var docById = {};
        manifest.docs.forEach(function (doc) {
            docById[doc.id] = doc;
        });

        var html = '';
        manifest.sections.forEach(function (section) {
            html += '<section class="docs-section" aria-labelledby="section-' + section.id + '">';
            html += '<h2 id="section-' + section.id + '" class="docs-section-title">' + section.title + '</h2>';
            html += '<p class="docs-section-desc">' + section.description + '</p>';
            html += '<ul class="docs-grid">';

            section.docs.forEach(function (docId) {
                var doc = docById[docId];
                if (!doc) {
                    return;
                }
                html += '<li class="doc-card">';
                html += '<a class="doc-card-link" href="' + docUrl(manifest.id, doc.id) + '">';
                html += '<span class="doc-card-label">' + doc.label + '</span>';
                html += '<h3 class="doc-card-title">' + doc.title + '</h3>';
                html += '<p class="doc-card-desc">' + doc.description + '</p>';
                html += '<span class="doc-card-arrow" aria-hidden="true">Read guide →</span>';
                html += '</a></li>';
            });

            html += '</ul></section>';
        });

        main.innerHTML = html;
        renderAudienceSwitcher(manifest.id);
    }

    function buildSidebar(manifest, themeId, activeId) {
        var nav = document.getElementById('docs-nav');
        if (!nav) {
            return;
        }

        var docById = {};
        manifest.docs.forEach(function (doc) {
            docById[doc.id] = doc;
        });

        var html = '';
        manifest.sections.forEach(function (section) {
            html += '<li class="docs-nav-group">';
            html += '<span class="docs-nav-group-label">' + section.title + '</span>';
            html += '<ul class="docs-nav">';

            section.docs.forEach(function (docId) {
                var doc = docById[docId];
                if (!doc) {
                    return;
                }
                var current = doc.id === activeId ? ' aria-current="page"' : '';
                html += '<li><a href="' + docUrl(themeId, doc.id) + '"' + current + '>' + doc.title + '</a></li>';
            });

            html += '</ul></li>';
        });

        nav.innerHTML = html;
    }

    function buildToc(container) {
        var toc = document.getElementById('docs-toc-list');
        var tocWrap = document.getElementById('docs-toc');
        if (!toc || !container || !tocWrap) {
            return;
        }

        var headings = container.querySelectorAll('h2, h3');
        if (!headings.length) {
            tocWrap.hidden = true;
            return;
        }

        tocWrap.hidden = false;
        var items = '';
        headings.forEach(function (heading) {
            if (!heading.id) {
                return;
            }
            var cls = heading.tagName === 'H3' ? ' class="toc-h3"' : '';
            items += '<li' + cls + '><a href="' + inPageHashUrl(heading.id) + '">' + heading.textContent + '</a></li>';
        });
        toc.innerHTML = items;
        fixInPageHashLinks(tocWrap);
    }

    function rewriteMarkdownLinks(html, themeId, linkMap) {
        var div = document.createElement('div');
        div.innerHTML = html;
        var links = div.querySelectorAll('a[href]');
        links.forEach(function (link) {
            var href = link.getAttribute('href');
            if (!href || href.indexOf('http') === 0 || href.indexOf('mailto:') === 0) {
                return;
            }
            if (href.indexOf('#') === 0) {
                if (href.length > 1) {
                    link.setAttribute('href', inPageHashUrl(href.slice(1)));
                }
                return;
            }
            var clean = href.split('#')[0];
            var hash = href.indexOf('#') > -1 ? href.slice(href.indexOf('#')) : '';
            var mapped = linkMap && linkMap[clean];
            if (mapped) {
                link.setAttribute('href', docUrl(themeId, mapped) + hash);
            } else if (/\.md$/i.test(clean)) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener');
            }
        });
        return div.innerHTML;
    }

    function renderMarkdown(md, themeId, linkMap) {
        if (typeof marked === 'undefined') {
            return '<p class="docs-status-error">Markdown renderer failed to load.</p>';
        }

        marked.setOptions({
            gfm: true,
            breaks: false,
        });

        return rewriteMarkdownLinks(marked.parse(md), themeId, linkMap);
    }

    function scrollToHash() {
        var hash = window.location.hash;
        if (!hash || hash.length < 2) {
            return;
        }
        var target = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (target) {
            target.scrollIntoView();
        }
    }

    function loadDocPage(themeId, docId) {
        var content = document.getElementById('doc-content');
        var status = document.getElementById('docs-status');
        if (!content) {
            return;
        }

        Promise.all([loadManifest(themeId), loadRegistry()])
            .then(function (results) {
                var manifest = filterManifest(results[0], getAudience());
                var registry = results[1];
                var doc = findDoc(manifest, docId) || findDoc(manifest, defaultDocId(manifest));

                if (!doc) {
                    throw new Error('Document not found.');
                }

                document.title = doc.title + ' — ' + manifest.name;
                setText('doc-breadcrumb', doc.title);
                setText('breadcrumb-theme', manifest.name);

                var themeLink = document.getElementById('nav-current-theme');
                if (themeLink) {
                    themeLink.textContent = manifest.name;
                    themeLink.setAttribute('href', hubUrl(themeId));
                    themeLink.hidden = false;
                }

                var hubLink = document.getElementById('sidebar-hub-link');
                if (hubLink) {
                    hubLink.setAttribute('href', hubUrl(themeId));
                }

                var breadcrumbThemeLink = document.getElementById('breadcrumb-theme-link');
                if (breadcrumbThemeLink) {
                    breadcrumbThemeLink.setAttribute('href', hubUrl(themeId));
                }

                if (status) {
                    status.textContent = 'Loading…';
                    status.hidden = false;
                    status.className = 'docs-status';
                }
                content.innerHTML = '';
                content.hidden = true;

                buildSidebar(manifest, themeId, doc.id);

                return fetch(themeBase(themeId) + doc.file).then(function (response) {
                    if (!response.ok) {
                        throw new Error('Could not load ' + doc.file);
                    }
                    return response.text();
                }).then(function (md) {
                    if (status) {
                        status.hidden = true;
                    }
                    content.hidden = false;
                    content.innerHTML = renderMarkdown(md, themeId, manifest.linkMap || {});
                    assignHeadingIds(content);
                    fixInPageHashLinks(content);
                    buildToc(content);
                    scrollToHash();
                    renderAudienceSwitcher(themeId);
                });
            })
            .catch(function (err) {
                if (status) {
                    status.textContent = err.message || 'Failed to load document.';
                    status.className = 'docs-status docs-status-error';
                }
            });
    }

    function initIndex() {
        if (getAudience() === 'developer') {
            var lead = document.querySelector('.catalog-lead');
            if (lead) {
                lead.textContent =
                    'Technical documentation for agencies and developers — deployment, hooks, migration, and product notes.';
            }
        }

        loadRegistry()
            .then(function (registry) {
                if (getAudience() === 'developer' && registry.themes) {
                    registry.themes.forEach(function (theme) {
                        if (theme.descriptionDeveloper) {
                            theme.description = theme.descriptionDeveloper;
                        }
                    });
                }
                renderThemeCatalog(registry);
            })
            .catch(function (err) {
                setText('catalog-status', err.message || 'Failed to load themes.');
            });
    }

    function initHub() {
        var themeId = getParam('theme');
        if (!themeId) {
            window.location.replace(indexUrl());
            return;
        }

        Promise.all([loadManifest(themeId), loadRegistry()])
            .then(function (results) {
                renderHub(filterManifest(results[0], getAudience()), results[1]);
            })
            .catch(function () {
                window.location.replace(indexUrl());
            });
    }

    function initDoc() {
        var themeId = getParam('theme');
        var docId = getParam('doc');

        if (!themeId) {
            window.location.replace(indexUrl());
            return;
        }

        loadDocPage(themeId, docId);

        window.addEventListener('popstate', function () {
            loadDocPage(getParam('theme'), getParam('doc'));
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        if (document.getElementById('theme-grid')) {
            initIndex();
        } else if (document.getElementById('hub-sections')) {
            initHub();
        } else if (document.getElementById('doc-content')) {
            initDoc();
        }
    });
})();

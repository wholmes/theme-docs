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

    function slugify(text) {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    }

    function getParam(name) {
        return new URLSearchParams(window.location.search).get(name);
    }

    function themeBase(themeId) {
        return resolveUrl('themes/' + themeId + '/');
    }

    function docUrl(themeId, docId) {
        return resolveUrl('doc.html?theme=' + encodeURIComponent(themeId) + '&doc=' + encodeURIComponent(docId));
    }

    function hubUrl(themeId) {
        return resolveUrl('hub.html?theme=' + encodeURIComponent(themeId));
    }

    function indexUrl() {
        return resolveUrl('index.html');
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
            html += '<li class="theme-card">';
            html += '<a class="theme-card-link" href="' + hubUrl(theme.id) + '">';
            html += '<span class="theme-card-label">WordPress theme</span>';
            html += '<h2 class="theme-card-title">' + theme.name + '</h2>';
            html += '<p class="theme-card-desc">' + theme.description + '</p>';
            html += '<p class="theme-card-meta">v' + theme.version + ' · ' + theme.requirements + '</p>';
            html += '<span class="theme-card-arrow" aria-hidden="true">View documentation →</span>';
            html += '</a></li>';
        });
        grid.innerHTML = html;
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
        headings.forEach(function (heading, index) {
            if (!heading.id) {
                heading.id = 'section-' + index + '-' + slugify(heading.textContent || 'heading');
            }
            var cls = heading.tagName === 'H3' ? ' class="toc-h3"' : '';
            items += '<li' + cls + '><a href="#' + heading.id + '">' + heading.textContent + '</a></li>';
        });
        toc.innerHTML = items;
    }

    function rewriteMarkdownLinks(html, themeId, linkMap) {
        var div = document.createElement('div');
        div.innerHTML = html;
        var links = div.querySelectorAll('a[href]');
        links.forEach(function (link) {
            var href = link.getAttribute('href');
            if (!href || href.indexOf('http') === 0 || href.indexOf('#') === 0 || href.indexOf('mailto:') === 0) {
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
            headerIds: true,
            mangle: false,
        });

        return rewriteMarkdownLinks(marked.parse(md), themeId, linkMap);
    }

    function loadDocPage(themeId, docId) {
        var content = document.getElementById('doc-content');
        var status = document.getElementById('docs-status');
        if (!content) {
            return;
        }

        Promise.all([loadManifest(themeId), loadRegistry()])
            .then(function (results) {
                var manifest = results[0];
                var registry = results[1];
                var themeMeta = findTheme(registry, themeId);
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
                    buildToc(content);
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
        loadRegistry()
            .then(renderThemeCatalog)
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
                renderHub(results[0], results[1]);
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

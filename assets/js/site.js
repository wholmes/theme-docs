/**
 * Theme Docs — site chrome (color mode)
 */
(function () {
    'use strict';

    var STORAGE_KEY = 'theme-docs-color-mode';

    function getPreferred() {
        var stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'light' || stored === 'dark') {
            return stored;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function apply(mode) {
        document.documentElement.setAttribute('data-theme', mode);
        localStorage.setItem(STORAGE_KEY, mode);
    }

    apply(getPreferred());

    document.addEventListener('DOMContentLoaded', function () {
        var toggle = document.getElementById('themeToggle');
        if (!toggle) {
            return;
        }
        toggle.addEventListener('click', function () {
            var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            apply(next);
        });
    });
})();

/**
 * nav.js — Shared navigation renderer for Lobo VC Cup landing page.
 *
 * Usage: include this script on any page that has a <div id="nav-root"></div>.
 *
 *   data-page="home"   : current page name (used to highlight active link)
 *   data-hero="true"   : adds hero-mode class (white text, scroll style on scroll)
 *   data-base=""       : path prefix to reach root from current page (e.g. "../")
 */

(function () {
  function getBase() {
    const root = document.getElementById('nav-root');
    return root ? (root.dataset.base || '') : '';
  }

  function isHeroPage() {
    const root = document.getElementById('nav-root');
    return root && root.dataset.hero === 'true';
  }

  function currentPage() {
    const root = document.getElementById('nav-root');
    return root ? (root.dataset.page || '') : '';
  }

  function buildNav() {
    const base = getBase();
    const page = currentPage();
    const heroClass = isHeroPage() ? '' : ' scrolled';

    const links = [
      { href: `${base}index.html#about`,    label: 'About'    },
      { href: `${base}index.html#schedule`, label: 'Schedule' },
    ];

    const linksHtml = links.map(l => `
      <li><a href="${l.href}"${page === 'home' ? '' : ''}>${l.label}</a></li>
    `).join('');

    return `
      <nav class="nav${heroClass}" id="nav">
        <div class="container">
          <div class="nav__inner">
            <a href="${base}index.html" class="nav__logo">LOBO <span>VC</span> CUP</a>
            <ul class="nav__links" id="nav-links">
              ${linksHtml}
            </ul>
            <button class="nav__mobile-toggle" id="mobile-toggle" aria-label="Toggle menu">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </nav>
    `;
  }

  function inject() {
    const root = document.getElementById('nav-root');
    if (!root) return;
    root.outerHTML = buildNav();

    const nav = document.getElementById('nav');

    // Scroll behaviour for hero pages
    if (isHeroPage() && nav) {
      function handleScroll() {
        nav.classList.toggle('scrolled', window.scrollY > 60);
      }
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    }

    // Mobile toggle
    const toggleBtn = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    if (toggleBtn && navLinks) {
      toggleBtn.addEventListener('click', () => {
        toggleBtn.classList.toggle('open');
        navLinks.classList.toggle('mobile-open');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();

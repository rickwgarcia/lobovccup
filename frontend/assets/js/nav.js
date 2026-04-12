/**
 * nav.js — Shared navigation renderer for all Lobo VC Cup pages.
 *
 * Usage: include this script on any page that has a <div id="nav-root"></div>.
 * The script reads the data-* attributes on that element for page-specific config:
 *
 *   data-page="home"        : current page name (used to highlight active link)
 *   data-hero="true"        : adds hero-mode class (white text, no scroll style by default)
 *   data-base=""            : path prefix to reach root from current page (e.g. "../")
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

  function buildNav(user) {
    const base = getBase();
    const page = currentPage();
    const heroClass = isHeroPage() ? '' : ' scrolled';

    const links = [
      { href: `${base}index.html#about`,    label: 'About',    id: 'home' },
      { href: `${base}index.html#tracks`,   label: 'Tracks',   id: 'home' },
      { href: `${base}index.html#schedule`, label: 'Schedule', id: 'home' },
      { href: `${base}index.html#mentors`,  label: 'Mentors',  id: 'home' },
      { href: `${base}pages/register.html#faq`, label: 'FAQ',  id: 'faq' },
    ];

    const linksHtml = links.map(l => `
      <li><a href="${l.href}"${page === l.id ? ' class="active"' : ''}>${l.label}</a></li>
    `).join('');

    let actionsHtml;
    if (user) {
      const initial = user.email ? user.email[0].toUpperCase() : '?';
      actionsHtml = `
        <div class="nav__user-menu" id="nav-user-menu">
          <button class="nav__user-btn" id="nav-user-btn" aria-haspopup="true" aria-expanded="false">
            <span class="nav__avatar">${initial}</span>
            <span class="nav__user-email">${escHtml(user.email)}</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div class="nav__dropdown" id="nav-dropdown" role="menu">
            <a href="${base}pages/dashboard.html" class="nav__dropdown-item" role="menuitem">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.3"/><rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.3"/><rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.3"/><rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.3"/></svg>
              Dashboard
            </a>
            ${user.role === 'admin' ? `
            <a href="${base}pages/admin.html" class="nav__dropdown-item" role="menuitem">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="5" r="3" stroke="currentColor" stroke-width="1.3"/><path d="M1 13c0-2.76 2.69-5 6-5s6 2.24 6 5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
              Admin Panel
            </a>` : ''}
            <div class="nav__dropdown-divider"></div>
            <button class="nav__dropdown-item nav__dropdown-item--danger" role="menuitem" onclick="window.__navLogout()">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 1h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9M6 10l4-4-4-4M10 7H1" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
              Log Out
            </button>
          </div>
        </div>
      `;
    } else {
      actionsHtml = `
        <a href="${base}pages/login.html" class="btn btn--primary btn--sm">Log In</a>
      `;
    }

    return `
      <nav class="nav${heroClass}" id="nav">
        <div class="container">
          <div class="nav__inner">
            <a href="${base}index.html" class="nav__logo">LOBO <span>VC</span> CUP</a>
            <ul class="nav__links" id="nav-links">
              ${linksHtml}
            </ul>
            <div class="nav__actions" id="nav-actions">
              ${actionsHtml}
            </div>
            <button class="nav__mobile-toggle" id="mobile-toggle" aria-label="Toggle menu">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </nav>
    `;
  }

  function escHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function inject(user) {
    const root = document.getElementById('nav-root');
    if (!root) return;
    root.outerHTML = buildNav(user);

    // Re-query after injection
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

    // User menu dropdown
    const userBtn = document.getElementById('nav-user-btn');
    const dropdown = document.getElementById('nav-dropdown');
    if (userBtn && dropdown) {
      userBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const open = dropdown.classList.toggle('open');
        userBtn.setAttribute('aria-expanded', String(open));
      });
      document.addEventListener('click', () => {
        dropdown.classList.remove('open');
        userBtn.setAttribute('aria-expanded', 'false');
      });
      dropdown.addEventListener('click', e => e.stopPropagation());
    }
  }

  // Auth disabled — always render as logged-out
  function init() {
    inject(null);
    window.__navUser = null;
    window.__navToken = null;
    document.dispatchEvent(new CustomEvent('nav:ready', { detail: { user: null, token: null } }));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/**
 * Glitch Grid - Theme Scripts
 * Progress Bar, Mobile Menu, Code Copy & Table Utilities
 */

(function () {
  'use strict';

  // ----------------------------------------------------
  // 1. Reading Progress Indicator
  // ----------------------------------------------------
  const readingBar = document.getElementById('cyber-reading-bar');
  if (readingBar) {
    let ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (docHeight > 0) {
            const scrolled = (window.scrollY / docHeight) * 100;
            readingBar.style.width = Math.min(100, Math.max(0, scrolled)) + '%';
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ----------------------------------------------------
  // 2. Mobile Menu Navigation
  // ----------------------------------------------------
  const burgerBtn = document.getElementById('burger-btn');
  const cyberMenu = document.getElementById('cyber-menu');

  if (burgerBtn && cyberMenu) {
    burgerBtn.addEventListener('click', function () {
      const isExpanded = burgerBtn.getAttribute('aria-expanded') === 'true';
      burgerBtn.setAttribute('aria-expanded', !isExpanded);
      burgerBtn.classList.toggle('is-active');
      cyberMenu.classList.toggle('is-open');
    });

    // Close when clicking outside
    document.addEventListener('click', function (e) {
      if (!cyberMenu.contains(e.target) && !burgerBtn.contains(e.target) && cyberMenu.classList.contains('is-open')) {
        burgerBtn.setAttribute('aria-expanded', 'false');
        burgerBtn.classList.remove('is-active');
        cyberMenu.classList.remove('is-open');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && cyberMenu.classList.contains('is-open')) {
        burgerBtn.setAttribute('aria-expanded', 'false');
        burgerBtn.classList.remove('is-active');
        cyberMenu.classList.remove('is-open');
        burgerBtn.focus();
      }
    });
  }

  // ----------------------------------------------------
  // 3. Code Block Copy Button
  // ----------------------------------------------------
  const codeBlocks = document.querySelectorAll('.gh-content pre');
  codeBlocks.forEach(function (pre) {
    const wrapper = document.createElement('div');
    wrapper.className = 'cyber-code-wrap';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const header = document.createElement('div');
    header.className = 'cyber-code-header';

    const copyBtn = document.createElement('button');
    copyBtn.className = 'cyber-code-copy-btn';
    copyBtn.type = 'button';
    copyBtn.innerHTML = '<span class="copy-text">Copy</span>';
    copyBtn.setAttribute('aria-label', 'Copy code to clipboard');

    copyBtn.addEventListener('click', function () {
      const code = pre.querySelector('code');
      const text = code ? code.innerText : pre.innerText;

      navigator.clipboard.writeText(text).then(function () {
        copyBtn.innerHTML = '<span class="copy-text highlight-green">Copied!</span>';
        setTimeout(function () {
          copyBtn.innerHTML = '<span class="copy-text">Copy</span>';
        }, 2000);
      }).catch(function () {
        copyBtn.innerHTML = '<span class="copy-text highlight-magenta">Failed</span>';
      });
    });

    header.appendChild(copyBtn);
    wrapper.insertBefore(header, pre);
  });

  // ----------------------------------------------------
  // 4. Ensure data-text attributes for Glitch Elements
  // ----------------------------------------------------
  document.querySelectorAll('.glitch-hover, .glitch-hover-sm, .glitch-text').forEach(function (el) {
    if (!el.getAttribute('data-text')) {
      el.setAttribute('data-text', el.textContent.trim());
    }
  });

  // ----------------------------------------------------
  // 5. Responsive Tables in Content
  // ----------------------------------------------------
  document.querySelectorAll('.gh-content table').forEach(function (table) {
    const tableWrap = document.createElement('div');
    tableWrap.className = 'cyber-table-wrap';
    table.parentNode.insertBefore(tableWrap, table);
    tableWrap.appendChild(table);
  });

})();

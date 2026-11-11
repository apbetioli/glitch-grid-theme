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

  // ----------------------------------------------------
  // 6. Comments iFrame & Ghost Accent Color Sync
  // ----------------------------------------------------
  function applyCyberCommentsTheme() {
    // Force --ghost-accent-color globally
    document.documentElement.style.setProperty('--ghost-accent-color', '#ffb000');

    // Force data-accent-color on comments script tag
    const cScript = document.querySelector('script[data-ghost-comments]');
    if (cScript && cScript.getAttribute('data-accent-color') !== '#ffb000') {
      cScript.setAttribute('data-accent-color', '#ffb000');
      if (cScript.dataset) cScript.dataset.accentColor = '#ffb000';
    }

    // Direct style injection into comments-ui srcdoc iframe
    const iframes = document.querySelectorAll('#ghost-comments-root iframe, .comments-container iframe, iframe[title="comments-frame"]');
    iframes.forEach(function (iframe) {
      try {
        const doc = iframe.contentDocument || (iframe.contentWindow && iframe.contentWindow.document);
        if (!doc || !doc.head) return;

        // Ensure Cyberpunk Google Fonts link is in the iframe head
        let fontLink = doc.getElementById('cyber-comments-fonts');
        if (!fontLink) {
          fontLink = doc.createElement('link');
          fontLink.id = 'cyber-comments-fonts';
          fontLink.rel = 'stylesheet';
          fontLink.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Orbitron:wght@600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap';
          doc.head.appendChild(fontLink);
        }

        let styleTag = doc.getElementById('cyber-comments-custom-styles');
        if (!styleTag) {
          styleTag = doc.createElement('style');
          styleTag.id = 'cyber-comments-custom-styles';
          doc.head.appendChild(styleTag);
        }

        const customCSS = `
          @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Orbitron:wght@600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap');

          :root {
            --ghost-accent-color: #ffb000 !important;
          }

          body, div, p, span {
            font-family: 'Space Grotesk', system-ui, -apple-system, sans-serif !important;
          }

          /* Section Heading: "Member discussion" */
          [data-testid="title"],
          h2[data-testid="title"],
          h2 {
            font-family: 'Orbitron', system-ui, -apple-system, sans-serif !important;
            font-size: 1.65rem !important;
            font-weight: 800 !important;
            letter-spacing: 0.08em !important;
            text-transform: uppercase !important;
            color: #ffffff !important;
            text-shadow: 0 0 10px rgba(255, 176, 0, 0.35) !important;
          }

          /* Comment count badge: "0 comments" */
          [data-testid="count"] {
            font-family: 'JetBrains Mono', Courier, monospace !important;
            font-size: 0.95rem !important;
            font-weight: 700 !important;
            letter-spacing: 0.06em !important;
            color: #ffb000 !important;
            background: rgba(255, 176, 0, 0.08) !important;
            border: 1px solid rgba(255, 176, 0, 0.3) !important;
            padding: 4px 12px !important;
            border-radius: 2px !important;
            display: inline-flex !important;
            align-items: center !important;
          }

          /* "Start the conversation" and CTA headers */
          div[class*="text-center"] h2,
          div[class*="text-center"] h3,
          div[class*="text-center"] > p:first-of-type,
          h3 {
            font-family: 'Orbitron', system-ui, -apple-system, sans-serif !important;
            font-size: 1.45rem !important;
            letter-spacing: 0.06em !important;
            color: #ffffff !important;
          }

          /* Descriptions */
          div[class*="text-center"] p,
          .text-sm {
            font-family: 'Space Grotesk', system-ui, sans-serif !important;
            font-size: 1.05rem !important;
            color: #8b9bb4 !important;
          }

          /* Signup button */
          [data-testid="signup-button"] {
            font-family: 'JetBrains Mono', Courier, monospace !important;
            font-size: 1.05rem !important;
            font-weight: 800 !important;
            background-color: #ffb000 !important;
            color: #000000 !important;
            -webkit-text-fill-color: #000000 !important;
            border-radius: 2px !important;
            box-shadow: 0 0 14px rgba(255, 176, 0, 0.45) !important;
            text-transform: uppercase !important;
            letter-spacing: 0.08em !important;
            transition: all 0.2s ease !important;
            padding: 14px 28px !important;
            cursor: pointer !important;
          }

          [data-testid="signup-button"]:hover {
            box-shadow: 0 0 25px rgba(255, 176, 0, 0.8) !important;
            transform: translateY(-1px) !important;
            color: #000000 !important;
            -webkit-text-fill-color: #000000 !important;
          }

          [data-testid="signup-button"] * {
            color: #000000 !important;
            -webkit-text-fill-color: #000000 !important;
          }

          /* Signin link */
          [data-testid="signin-button"] {
            font-family: 'JetBrains Mono', Courier, monospace !important;
            font-size: 1rem !important;
            color: #ffb000 !important;
            -webkit-text-fill-color: #ffb000 !important;
            background: transparent !important;
            font-weight: 700 !important;
            transition: color 0.15s ease !important;
            text-decoration: underline !important;
            cursor: pointer !important;
          }

          [data-testid="signin-button"]:hover {
            color: #ffd066 !important;
            -webkit-text-fill-color: #ffd066 !important;
            text-shadow: 0 0 8px rgba(255, 176, 0, 0.6) !important;
          }

          /* Textareas & Inputs */
          textarea, input[type="text"] {
            font-family: 'Space Grotesk', system-ui, sans-serif !important;
            background-color: #10121d !important;
            border: 1px solid rgba(255, 176, 0, 0.2) !important;
            color: #ffffff !important;
          }

          textarea:focus, input[type="text"]:focus {
            border-color: #ffb000 !important;
            box-shadow: 0 0 10px rgba(255, 176, 0, 0.3) !important;
          }

          /* Author names & metadata */
          [data-testid="author"] {
            font-family: 'Orbitron', system-ui, sans-serif !important;
            font-weight: 700 !important;
          }

          time, [data-testid="date"] {
            font-family: 'JetBrains Mono', Courier, monospace !important;
            font-size: 0.75rem !important;
            color: #8b9bb4 !important;
          }

          button[type="submit"] {
            font-family: 'JetBrains Mono', Courier, monospace !important;
            background-color: #ffb000 !important;
            color: #000000 !important;
            font-weight: 700 !important;
          }
        `;

        if (styleTag.textContent !== customCSS) {
          styleTag.textContent = customCSS;
        }
      } catch (err) {
        // Fallback if cross-origin
      }
    });
  }

  const commentsRoot = document.getElementById('ghost-comments-root') || document.querySelector('.comments-container');
  if (commentsRoot) {
    const observer = new MutationObserver(function () {
      applyCyberCommentsTheme();
    });
    observer.observe(commentsRoot, { childList: true, subtree: true });
  }

  applyCyberCommentsTheme();
  document.addEventListener('DOMContentLoaded', applyCyberCommentsTheme);
  window.addEventListener('load', applyCyberCommentsTheme);
  const intervalId = setInterval(applyCyberCommentsTheme, 1000);
  setTimeout(function () { clearInterval(intervalId); }, 20000);

})();

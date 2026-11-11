/**
 * Glitch Grid - Cyberpunk Theme for Ghost CMS
 * Interactive HUD, Sound Engine, Scanline Toggle & UX Enhancements
 */

(function () {
  'use strict';

  // ----------------------------------------------------
  // 1. Cyber Audio Synthesizer (Web Audio API)
  // ----------------------------------------------------
  let audioCtx = null;
  let sfxEnabled = localStorage.getItem('glitch-sfx') !== 'false'; // Default ON

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playCyberBeep(freq = 880, type = 'sine', duration = 0.05, gainValue = 0.03) {
    if (!sfxEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + duration);

      gain.gain.setValueAtTime(gainValue, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy or unavailable
    }
  }

  // Audio Toggle UI
  const sfxToggleBtn = document.getElementById('sfx-toggle');
  const sfxStateEl = document.getElementById('sfx-state');

  function updateSfxUI() {
    if (sfxStateEl) {
      sfxStateEl.textContent = sfxEnabled ? 'ON' : 'OFF';
      if (sfxToggleBtn) {
        sfxToggleBtn.setAttribute('aria-pressed', sfxEnabled ? 'true' : 'false');
      }
    }
  }

  if (sfxToggleBtn) {
    updateSfxUI();
    sfxToggleBtn.addEventListener('click', function () {
      sfxEnabled = !sfxEnabled;
      localStorage.setItem('glitch-sfx', sfxEnabled ? 'true' : 'false');
      updateSfxUI();
      if (sfxEnabled) {
        playCyberBeep(1200, 'triangle', 0.08, 0.05);
      }
    });
  }

  // Attach subtle cyber click sound to buttons and links
  document.addEventListener('click', function (e) {
    const target = e.target.closest('a, button, .cyber-card');
    if (target) {
      playCyberBeep(640, 'triangle', 0.04, 0.02);
    }
  });

  // ----------------------------------------------------
  // 2. Scanline & CRT Vignette Toggle
  // ----------------------------------------------------
  const scanlineToggleBtn = document.getElementById('scanline-toggle');
  const scanlineStateEl = document.getElementById('scanline-state');
  let scanlineEnabled = localStorage.getItem('glitch-scanlines') !== 'false';

  function applyScanlineState() {
    if (scanlineEnabled) {
      document.body.classList.remove('scanlines-disabled');
    } else {
      document.body.classList.add('scanlines-disabled');
    }
    if (scanlineStateEl) {
      scanlineStateEl.textContent = scanlineEnabled ? 'ON' : 'OFF';
    }
    if (scanlineToggleBtn) {
      scanlineToggleBtn.setAttribute('aria-pressed', scanlineEnabled ? 'true' : 'false');
    }
  }

  if (scanlineToggleBtn) {
    applyScanlineState();
    scanlineToggleBtn.addEventListener('click', function () {
      scanlineEnabled = !scanlineEnabled;
      localStorage.setItem('glitch-scanlines', scanlineEnabled ? 'true' : 'false');
      applyScanlineState();
      playCyberBeep(980, 'sine', 0.06, 0.04);
    });
  } else {
    applyScanlineState();
  }

  // ----------------------------------------------------
  // 3. Reading Progress Indicator
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
  // 4. Mobile Menu Navigation
  // ----------------------------------------------------
  const burgerBtn = document.getElementById('burger-btn');
  const cyberMenu = document.getElementById('cyber-menu');

  if (burgerBtn && cyberMenu) {
    burgerBtn.addEventListener('click', function () {
      const isExpanded = burgerBtn.getAttribute('aria-expanded') === 'true';
      burgerBtn.setAttribute('aria-expanded', !isExpanded);
      burgerBtn.classList.toggle('is-active');
      cyberMenu.classList.toggle('is-open');
      playCyberBeep(520, 'square', 0.05, 0.03);
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
  // 5. Code Block Cyber Copy Button
  // ----------------------------------------------------
  const codeBlocks = document.querySelectorAll('.gh-content pre');
  codeBlocks.forEach(function (pre) {
    const wrapper = document.createElement('div');
    wrapper.className = 'cyber-code-wrap';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const header = document.createElement('div');
    header.className = 'cyber-code-header';

    const title = document.createElement('span');
    title.className = 'code-header-title';
    title.textContent = '// TERMINAL_BUFFER';

    const copyBtn = document.createElement('button');
    copyBtn.className = 'cyber-code-copy-btn';
    copyBtn.type = 'button';
    copyBtn.innerHTML = '<span class="copy-text">[ COPY ]</span>';
    copyBtn.setAttribute('aria-label', 'Copy code to clipboard');

    copyBtn.addEventListener('click', function () {
      const code = pre.querySelector('code');
      const text = code ? code.innerText : pre.innerText;

      navigator.clipboard.writeText(text).then(function () {
        copyBtn.innerHTML = '<span class="copy-text highlight-green">[ COPIED! ]</span>';
        playCyberBeep(1400, 'sine', 0.07, 0.04);
        setTimeout(function () {
          copyBtn.innerHTML = '<span class="copy-text">[ COPY ]</span>';
        }, 2000);
      }).catch(function () {
        copyBtn.innerHTML = '<span class="copy-text highlight-magenta">[ FAILED ]</span>';
      });
    });

    header.appendChild(title);
    header.appendChild(copyBtn);
    wrapper.insertBefore(header, pre);
  });

  // ----------------------------------------------------
  // 6. Ensure data-text attributes for Glitch Elements
  // ----------------------------------------------------
  document.querySelectorAll('.glitch-hover, .glitch-hover-sm, .glitch-text').forEach(function (el) {
    if (!el.getAttribute('data-text')) {
      el.setAttribute('data-text', el.textContent.trim());
    }
  });

  // ----------------------------------------------------
  // 7. Responsive Tables in Content
  // ----------------------------------------------------
  document.querySelectorAll('.gh-content table').forEach(function (table) {
    const tableWrap = document.createElement('div');
    tableWrap.className = 'cyber-table-wrap';
    table.parentNode.insertBefore(tableWrap, table);
    tableWrap.appendChild(table);
  });

})();

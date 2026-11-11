# GLITCH GRID // Cyberpunk Dark-Mode Theme for Ghost CMS

![Ghost Version](https://img.shields.io/badge/Ghost-5.x%20%7C%206.x-00f0ff?style=flat-square)
![Validation](https://img.shields.io/badge/gscan-100%25%20Passed-00ff66?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-ff0055?style=flat-square)

**Glitch Grid** is a high-octane, unapologetic Cyberpunk dark-mode theme built specifically for modern Ghost CMS (5.x and 6.x). Designed for technology blogs, subterranean hackers, sci-fi creators, and indie publishers who want a distinctive, immersive aesthetic without sacrificing reading comfort or performance.

---

## ⚡ Key Features

- **Cyberpunk Dark Aesthetic**:
  - Deep carbon void palette (`#090a10` and `#10121d`) with high-contrast electric neon accents (Cyan `#00f0ff`, Magenta `#ff0055`, Toxic Green `#00ff66`, Cyber Yellow `#ffe600`).
  - Chromatic aberration & RGB-split **CSS glitch animations** on titles and cards.
  - Perspective **cyber background grid** and subtle CRT scanlines overlay (with user toggle + state memory).
  - High-tech **HUD interface brackets**, chamfered 45° card corners, and pulsing status indicators.
- **Audio Synthesizer Engine (Web Audio API)**:
  - Zero audio file downloads. Generates lightweight retro-futuristic audio clicks and feedback entirely in real-time.
  - Header audio toggle (`🔊 SFX: ON/OFF`) with automatic local persistence.
- **Full Ghost 5.x & 6.x Integration**:
  - **Ghost Native Search**: One-click instant search modal (`data-ghost-search`).
  - **Portal & Memberships**: Integrated subscription boxes, header auth buttons, and a themed paywall lockdown gate for members-only content.
  - **Native Ghost Comments**: Styled discussion channels embedded inside posts.
  - **Ghost Card Assets**: Full styling for wide/full-bleed images, bookmarks, callouts, galleries, and audio/video cards.
- **Performance & Zero Dependencies**:
  - Pure vanilla JavaScript and modern modular CSS.
  - Zero heavy libraries, zero jQuery, lightning fast PageSpeed and Core Web Vitals.
  - Automatic reading progress bar glowing at the top of long-form articles.
  - Terminal code blocks with instant **One-Click Copy** buttons.

---

## 📦 Theme Structure

```
glitch-grid-theme/
├── assets/
│   ├── css/
│   │   └── screen.css          # Cyberpunk design system & tokens
│   └── js/
│       └── main.js             # HUD interactions, Web Audio SFX, progress bar
├── partials/
│   ├── icons/                  # High-performance inline SVGs
│   ├── footer.hbs              # Footer with secondary navigation & newsletter
│   ├── header.hbs              # Sticky HUD header & status ticker
│   ├── navigation.hbs          # Ghost dynamic navigation
│   ├── pagination.hbs          # Sector navigation
│   └── post-card.hbs           # Responsive post card with cyber frame
├── author.hbs                  # Operative agent dossier / author archive
├── default.hbs                 # Master HTML wrapper
├── error.hbs                   # System fault template
├── error-404.hbs               # Corrupted memory / 404 template
├── index.hbs                   # Neural feed homepage & hero HUD
├── package.json                # Ghost theme specifications & custom settings
├── page.hbs                    # Static page template
├── post.hbs                    # Article reading experience & comments
├── tag.hbs                     # Frequency / Tag archive
└── glitch-grid.zip             # Upload-ready production theme zip
```

---

## 🚀 Installation

### Option A: Upload ZIP to Ghost Admin
1. Download `glitch-grid.zip` from this repository.
2. Log into your Ghost Admin (`yourdomain.com/ghost`).
3. Navigate to **Settings** (`⚙`) → **Design & branding** → **Change theme**.
4. Click **Upload theme** and select `glitch-grid.zip`.
5. Click **Activate**.

### Option B: Local / Self-Hosted Ghost
Clone or copy this folder directly into your Ghost content themes directory:
```bash
cd /var/www/ghost/content/themes/
git clone <repo-url> glitch-grid
ghost restart
```

---

## 💻 Local Development & Live Reload with Tailwind CSS

This theme features a full **Tailwind CSS** pipeline and **live reload** engine powered by BrowserSync:

```bash
# 1. Install dependencies
npm install

# 2. Start Tailwind compiler in watch mode + Live Reload
npm run dev
```

### How Live Reload Works:
- Proxies your local Ghost instance at `http://localhost:2368` (or custom `GHOST_URL`) to `http://localhost:3000`.
- **Instant CSS Injection**: Any change to `assets/css/src/screen.css` or Tailwind classes automatically recompiles and injects stylesheets into your open browser tabs with **zero page refresh** (retaining scroll position and form inputs).
- **Auto-Reload on Template Edits**: Changing any Handlebars file (`*.hbs`, `partials/**/*.hbs`) or `assets/js/**/*.js` triggers an instant full page reload.

### Available Scripts:
| Command | Action |
| :--- | :--- |
| `npm run dev` | Runs Tailwind CSS in watch mode + BrowserSync live reload proxy simultaneously |
| `npm run build` | Compiles production-minified CSS & runs compatibility check (`gscan`) |
| `npm run build:css` | Compiles minified CSS once via Tailwind CLI & PostCSS |
| `npm run zip` | Compiles production assets and packages an upload-ready `glitch-grid.zip` |
| `npm test` | Runs Ghost theme compatibility checks (`gscan`) |

---

## ⚙️ Custom Settings (Ghost Admin)

Glitch Grid provides custom theme settings accessible in **Ghost Admin → Settings → Design & branding → Site-wide**:

| Setting | Type | Description |
| :--- | :--- | :--- |
| **Cyber Accent Color** | Color | Change primary neon glow & links (default: `#00f0ff` neon cyan) |
| **Enable Scanlines** | Boolean | Toggle ambient CRT scanlines on by default |
| **Header Style** | Select | Switch between `Glitch Hero` (full HUD banner) and `Minimal` |

---

## 🧪 Testing & Validation

This theme is tested against Ghost's official validation tool **Gscan**:

```bash
# Test theme compatibility
npm test

# Create updated upload zip
npm run zip
```

Result: **✓ Your theme is compatible with Ghost 5.x & 6.x (0 errors, 0 warnings).**

---

## 📄 License

MIT © Glitch Grid Team

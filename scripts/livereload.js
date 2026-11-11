/**
 * Live Reload Script for Ghost CMS Theme Development
 * Uses BrowserSync to proxy Ghost CMS and provide instant CSS injection and template reloading.
 */

const browserSync = require('browser-sync').create();
const http = require('http');

const DEV_PORT = parseInt(process.env.PORT, 10) || 3000;

function checkPort(port) {
  return new Promise((resolve) => {
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port: port,
        path: '/',
        method: 'GET',
        timeout: 1000,
      },
      (res) => {
        resolve(res.statusCode >= 200 && res.statusCode < 400);
      }
    );
    req.on('error', () => resolve(false));
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
    req.end();
  });
}

async function findGhostTarget() {
  if (process.env.GHOST_URL) {
    return process.env.GHOST_URL;
  }
  // Try port 2369 first (often used if 2368 was busy), then 2368
  if (await checkPort(2369)) {
    return 'http://127.0.0.1:2369';
  }
  if (await checkPort(2368)) {
    return 'http://127.0.0.1:2368';
  }
  // Default fallback
  return 'http://127.0.0.1:2369';
}

async function start() {
  const GHOST_TARGET = await findGhostTarget();

  console.log('\x1b[36m%s\x1b[0m', '==================================================');
  console.log('\x1b[36m%s\x1b[0m', '   ⚡ GLITCH GRID — CYBERPUNK LIVE RELOAD ENGINE  ');
  console.log('\x1b[36m%s\x1b[0m', '==================================================');
  console.log(`[SYS] Proxying Ghost instance at: \x1b[33m${GHOST_TARGET}\x1b[0m`);
  console.log(`[SYS] Live-reload server running at: \x1b[32mhttp://localhost:${DEV_PORT}\x1b[0m`);

  browserSync.init({
    proxy: {
      target: GHOST_TARGET,
      ws: true,
    },
    port: DEV_PORT,
    open: false,
    notify: {
      styles: {
        top: 'auto',
        bottom: '10px',
        right: '10px',
        left: 'auto',
        margin: '0px',
        padding: '8px 14px',
        position: 'fixed',
        fontSize: '12px',
        zIndex: '99999',
        borderRadius: '2px',
        color: '#00f0ff',
        backgroundColor: '#090a10',
        border: '1px solid #00f0ff',
        boxShadow: '0 0 15px rgba(0, 240, 255, 0.4)',
        fontFamily: 'monospace',
      },
    },
    files: [
      {
        match: ['assets/css/screen.css'],
        fn: function (event, file) {
          if (event === 'change') {
            console.log('\x1b[36m[CSS] Injecting updated styles...\x1b[0m');
            browserSync.reload('*.css');
          }
        },
      },
      {
        match: ['./*.hbs', './partials/**/*.hbs', './assets/js/**/*.js'],
        fn: function (event, file) {
          console.log(`\x1b[35m[PAGE] ${file} changed -> reloading browser...\x1b[0m`);
          browserSync.reload();
        },
      },
    ],
    ui: false,
    ghostMode: false,
  });
}

start();

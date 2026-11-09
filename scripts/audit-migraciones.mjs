import puppeteer from 'puppeteer-core';
const BASE = 'http://localhost:4330';
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--no-sandbox','--disable-gpu'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
const errors = [];
page.on('pageerror', e => errors.push('pageerror: ' + e.message));
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });

const state = () => page.evaluate(() => ({
  banner: (() => { const b = document.getElementById('migCookieBanner'); return b ? !b.hidden : null; })(),
  panel: (() => { const b = document.getElementById('migCbPanel'); return b ? !b.hidden : null; })(),
  consent: (() => { try { return JSON.parse(localStorage.getItem('fh-cookie-consent')); } catch(e){ return null; } })(),
  ga: { flag: !!window.__fhGA, script: !!document.querySelector('script[src*="googletagmanager.com/gtag/js"]') },
  bp: { flag: !!window.__fhBP, scripts: document.querySelectorAll('script[src*="botpress.cloud"], script[src*="bpcontent.cloud"]').length, fab: !!document.getElementById('fab-root') }
}));

// 1) Primera visita: sin consentimiento
await page.goto(BASE + '/migraciones.html', { waitUntil: 'domcontentloaded', timeout: 120000 });
await page.evaluate(() => localStorage.removeItem('fh-cookie-consent'));
await page.reload({ waitUntil: 'domcontentloaded' });
await new Promise(r => setTimeout(r, 1200));
const firstVisit = await state();

// 2) Aceptar todo
await page.click('#migCbAll');
await new Promise(r => setTimeout(r, 700));
const afterAccept = await state();
await page.evaluate(() => { window.dispatchEvent(new Event('pointerdown')); window.dispatchEvent(new Event('scroll')); });
let bpLoaded = null;
for (let i = 0; i < 20; i++) {
  await new Promise(r => setTimeout(r, 500));
  bpLoaded = await page.evaluate(() => ({ flag: !!window.__fhBP, scripts: document.querySelectorAll('script[src*="botpress.cloud"], script[src*="bpcontent.cloud"]').length, fab: !!document.getElementById('fab-root'), visible: (() => { const f = document.getElementById('fab-root'); if(!f) return false; const s = getComputedStyle(f); return s.display !== 'none' && s.visibility !== 'hidden'; })() }));
  if (bpLoaded.scripts >= 2 && bpLoaded.fab) break;
}

// 3) Reabrir preferencias
await page.evaluate(() => document.getElementById('migCookiePrefs').click());
await new Promise(r => setTimeout(r, 300));
const prefs = await page.evaluate(() => ({
  banner: !document.getElementById('migCookieBanner').hidden,
  panel: !document.getElementById('migCbPanel').hidden,
  analytics: document.getElementById('migCbAnalytics').checked,
  marketing: document.getElementById('migCbMarketing').checked,
  expanded: document.getElementById('migCbCfg').getAttribute('aria-expanded')
}));

// 4) Solo funcionales en visita limpia
await page.evaluate(() => localStorage.removeItem('fh-cookie-consent'));
await page.reload({ waitUntil: 'domcontentloaded' });
await new Promise(r => setTimeout(r, 900));
await page.evaluate(() => document.getElementById('migCbOnly').click());
await new Promise(r => setTimeout(r, 600));
const onlyFunctional = await state();

// 5) 404 con consentimiento
await page.evaluate(() => localStorage.setItem('fh-cookie-consent', JSON.stringify({ functional: true, analytics: true, marketing: true })));
await page.goto(BASE + '/404.html', { waitUntil: 'domcontentloaded', timeout: 120000 });
await new Promise(r => setTimeout(r, 800));
const notFound = await page.evaluate(() => ({
  title: document.title,
  banner: !!document.getElementById('cookieBanner'),
  ga: !!window.__fhGA,
  gtag: typeof window.gtag === 'function',
  gaScript: !!document.querySelector('script[src*="googletagmanager.com/gtag/js"]')
}));

console.log(JSON.stringify({ firstVisit, afterAccept, bpLoaded, prefs, onlyFunctional, notFound, errors: errors.slice(0, 12) }, null, 2));
await browser.close();

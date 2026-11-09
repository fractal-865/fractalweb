import puppeteer from 'puppeteer-core';
const BASE = 'http://localhost:4330';
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--no-sandbox','--disable-gpu'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
const consoleErrors = [];
page.on('pageerror', e => consoleErrors.push('pageerror: ' + e.message));
page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });

const paths = ['/', '/servicios/', '/hosting-global/', '/hosting-cono-sur/', '/correo-corporativo/', '/mantencion-web/', '/seguridad-informatica/', '/ley-21719/', '/migracion/', '/sitios-web/', '/sitios-web/micrositio/', '/sitios-web/tienda-online/', '/noticias/', '/noticias/que-es-un-hosting/', '/cotizador/', '/preview/'];
await page.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 120000 });
await page.evaluate(() => localStorage.setItem('fh-cookie-consent', JSON.stringify({ functional: true, analytics: true, marketing: true })));
const results = [];
for (const p of paths) {
  await page.goto(BASE + p, { waitUntil: 'domcontentloaded', timeout: 120000 });
  await new Promise(r => setTimeout(r, 700));
  const consent = await page.evaluate(() => {
    try { return JSON.parse(localStorage.getItem('fh-cookie-consent')); } catch { return null; }
  });
  const ga = await page.evaluate(() => ({
    flag: !!window.__fhGA,
    dataLayer: Array.isArray(window.dataLayer),
    gtag: typeof window.gtag === 'function',
    script: !!document.querySelector('script[src*="googletagmanager.com/gtag/js"]'),
    banner: !!document.getElementById('cookieBanner')
  }));
  // Despierta Botpress con el mismo gesto que usa el sitio.
  await page.evaluate(() => {
    window.dispatchEvent(new Event('pointerdown'));
    window.dispatchEvent(new Event('scroll'));
  });
  let bp = { flag: false, scripts: 0, fab: false, fabVisible: false };
  const started = Date.now();
  for (let i = 0; i < 24; i++) {
    await new Promise(r => setTimeout(r, 500));
    bp = await page.evaluate(() => {
      const fab = document.getElementById('fab-root');
      const style = fab ? getComputedStyle(fab) : null;
      return {
        flag: !!window.__fhBP,
        scripts: document.querySelectorAll('script[src*="botpress.cloud"], script[src*="bpcontent.cloud"]').length,
        fab: !!fab,
        fabVisible: !!(style && style.visibility !== 'hidden' && style.display !== 'none' && parseFloat(style.opacity || '1') > 0)
      };
    });
    if (bp.scripts >= 2 && bp.fab) break;
    if (Date.now() - started > 11000) break;
  }
  results.push({ path: p, consent, ga, bp });
}
console.log(JSON.stringify({ results, consoleErrors: consoleErrors.slice(0, 20) }, null, 2));
await browser.close();

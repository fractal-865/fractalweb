import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const BASE = process.env.BASE_URL || 'http://localhost:4323';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const outDir = path.resolve('qa-out');
fs.mkdirSync(outDir, { recursive: true });

const pages = [
  '/preview/',
  '/sitios-web/',
  '/sitios-web/micrositio/',
  '/sitios-web/one-page/',
  '/sitios-web/sitio-corporativo/',
  '/sitios-web/tienda-online/',
  '/sitios-web/eventos-y-entradas/',
  '/sitios-web/reserva-de-horas/',
  '/sitios-web/sitio-inmobiliario/',
  '/sitios-web/sitio-a-medida/',
  '/servicios/',
  '/hosting-global/',
  '/hosting-cono-sur/',
  '/correo-corporativo/',
  '/mantencion-web/',
  '/seguridad-informatica/',
  '/ley-21719/',
  '/migracion/',
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
});

const report = [];

for (const viewport of [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
]) {
  const page = await browser.newPage();
  await page.setViewport({ width: viewport.width, height: viewport.height, deviceScaleFactor: 1 });
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`));

  for (const url of pages) {
    await page.goto(`${BASE}${url}`, { waitUntil: 'networkidle0', timeout: 60000 });
    const info = await page.evaluate(() => {
      const w = document.documentElement.clientWidth;
      const bad = [...document.querySelectorAll('main *')]
        .filter((el) => {
          const cs = getComputedStyle(el);
          if (cs.position === 'fixed' || cs.position === 'absolute') return false;
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) return false;
          return r.right > w + 2 || r.left < -2;
        })
        .slice(0, 8)
        .map((el) => {
          const r = el.getBoundingClientRect();
          return {
            tag: el.tagName,
            cls: String(el.className || '').slice(0, 90),
            left: Math.round(r.left),
            right: Math.round(r.right),
            width: Math.round(r.width),
          };
        });
      const h1 = [...document.querySelectorAll('h1')].map((h) => h.textContent?.trim());
      return {
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '',
        robots: document.querySelector('meta[name="robots"]')?.getAttribute('content') || '',
        h1,
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: w,
        overflow: bad,
      };
    });
    report.push({ viewport: viewport.name, url, ...info, errors: [...errors] });
    errors.length = 0;
  }
  await page.close();
}

// Capturas de revisión
const shotPage = await browser.newPage();
await shotPage.setViewport({ width: 1440, height: 1200, deviceScaleFactor: 1 });
for (const url of ['/ples', '/sitios-web/', '/sitios-web/tienda-online/', '/hosting-global/']) {
  if (url === '/ples') continue;
  await shotPage.goto(`${BASE}${url}`, { waitUntil: 'networkidle0', timeout: 60000 });
  await shotPage.screenshot({ path: path.join(outDir, `${url.replaceAll('/', '_') || 'home'}-desktop.png`), fullPage: true });
}
await shotPage.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
for (const url of ['/sitios-web/tienda-online/', '/sitios-web/']) {
  await shotPage.goto(`${BASE}${url}`, { waitUntil: 'networkidle0', timeout: 60000 });
  await shotPage.screenshot({ path: path.join(outDir, `${url.replaceAll('/', '_')}-mobile.png`), fullPage: true });
}
await shotPage.close();

await browser.close();

fs.writeFileSync(path.join(outDir, 'report.json'), JSON.stringify(report, null, 2));

const problems = report.filter(
  (r) =>
    r.errors.length ||
    r.scrollWidth > r.clientWidth + 2 ||
    r.overflow.length ||
    r.h1.length !== 1 ||
    !r.title ||
    !r.description ||
    !r.canonical
);
console.log(JSON.stringify({ total: report.length, problems: problems.length, detail: problems }, null, 2));

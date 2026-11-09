import puppeteer from 'puppeteer-core';

const BASE = process.env.BASE_URL || 'http://localhost:4323';
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
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
  args: ['--no-sandbox', '--disable-gpu'],
});
const page = await browser.newPage();
const links = new Set();
for (const url of pages) {
  await page.goto(`${BASE}${url}`, { waitUntil: 'networkidle0' });
  const hrefs = await page.evaluate(() =>
    [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')).filter(Boolean)
  );
  for (const href of hrefs) {
    if (href.startsWith('/') && !href.startsWith('//')) links.add(href.split('#')[0]);
    if (href.startsWith('https://fractalhost.cl/')) links.add(href.replace('https://fractalhost.cl', '').split('#')[0]);
  }
}
await browser.close();

const results = [];
for (const href of [...links].sort()) {
  if (!href || href === '/') continue;
  let status = 0;
  try {
    const res = await fetch(`${BASE}${href}`, { redirect: 'manual' });
    status = res.status;
  } catch (e) {
    status = -1;
  }
  results.push({ href, status });
}
const bad = results.filter((r) => r.status !== 200 && r.status !== 301 && r.status !== 302);
console.log(JSON.stringify({ total: results.length, bad, ignored: results.filter((r) => r.status !== 200) }, null, 2));

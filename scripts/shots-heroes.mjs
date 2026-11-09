import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

const BASE = process.env.BASE_URL || 'http://localhost:4323';
const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
  args: ['--no-sandbox', '--disable-gpu'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
fs.mkdirSync('qa-out/heroes', { recursive: true });

const urls = [
  '/sitios-web/micrositio/',
  '/sitios-web/one-page/',
  '/sitios-web/sitio-corporativo/',
  '/sitios-web/eventos-y-entradas/',
  '/sitios-web/reserva-de-horas/',
  '/sitios-web/sitio-inmobiliario/',
  '/sitios-web/sitio-a-medida/',
  '/hosting-cono-sur/',
  '/correo-corporativo/',
  '/mantencion-web/',
  '/seguridad-informatica/',
  '/ley-21719/',
  '/migracion/',
];

for (const url of urls) {
  await page.goto(`${BASE}${url}`, { waitUntil: 'networkidle0' });
  const el = await page.$('.page-hero');
  if (el) {
    const name = url.replaceAll('/', '_').replace(/^_|_$/g, '');
    await el.screenshot({ path: `qa-out/heroes/${name}.png` });
  }
}
await browser.close();
console.log('ok');

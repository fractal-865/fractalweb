import puppeteer from 'puppeteer-core';

const BASE = process.env.BASE_URL || 'http://localhost:4323';
const urls = [
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
const out = [];
for (const url of urls) {
  await page.goto(`${BASE}${url}`, { waitUntil: 'networkidle0' });
  const data = await page.evaluate(() => {
    const blocks = [...document.querySelectorAll('script[type="application/ld+json"]')];
    return blocks.map((b) => {
      try {
        return { ok: true, value: JSON.parse(b.textContent || '') };
      } catch (e) {
        return { ok: false, error: String(e) };
      }
    });
  });
  const types = data.flatMap((d) => (d.ok ? (d.value['@graph'] || [d.value]).map((x) => x['@type']) : ['ERROR']));
  out.push({ url, blocks: data.length, ok: data.every((d) => d.ok), types });
}
await browser.close();
console.log(JSON.stringify(out, null, 2));

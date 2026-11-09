import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
  args: ['--no-sandbox', '--disable-gpu'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
await page.goto('http://localhost:4335/', { waitUntil: 'networkidle0' });
await page.evaluate(() => {
  const c = document.querySelector('#cookieBanner');
  if (c) c.remove();
  document.querySelectorAll('#sitios-web .reveal').forEach((el) => el.classList.add('visible'));
  document.querySelector('#sitios-web')?.scrollIntoView({ block: 'start' });
});
await new Promise((r) => setTimeout(r, 1000));
const section = await page.$('#sitios-web');
if (section) await section.screenshot({ path: 'qa-out/home-sitios.png' });
await page.click('[data-more-toggle][aria-controls="sitiosGrid"]');
await new Promise((r) => setTimeout(r, 500));
if (section) await section.screenshot({ path: 'qa-out/home-sitios-open.png' });
await browser.close();
console.log('ok');

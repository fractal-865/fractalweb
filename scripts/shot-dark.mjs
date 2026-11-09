import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
  args: ['--no-sandbox', '--disable-gpu'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
await page.evaluateOnNewDocument(() => localStorage.setItem('fh-theme', 'dark'));
await page.goto('http://localhost:4323/sitios-web/tienda-online/', { waitUntil: 'networkidle0' });
await page.screenshot({ path: 'qa-out/tienda-dark.png' });
await page.goto('http://localhost:4323/sitios-web/', { waitUntil: 'networkidle0' });
await page.screenshot({ path: 'qa-out/hub-dark.png' });
await browser.close();
console.log('ok');

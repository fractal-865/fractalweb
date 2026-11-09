import puppeteer from 'puppeteer-core';

const BASE = process.env.BASE_URL || 'http://localhost:4330';
const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
  args: ['--no-sandbox', '--disable-gpu'],
});
const page = await browser.newPage();

await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
await page.goto(`${BASE}/sitios-web/tienda-online/`, { waitUntil: 'networkidle0' });
await page.click('#burger');
await new Promise((r) => setTimeout(r, 350));
const mobile = await page.evaluate(() => ({
  expanded: document.getElementById('burger')?.getAttribute('aria-expanded'),
  open: document.getElementById('mobileMenu')?.classList.contains('open'),
  transform: getComputedStyle(document.getElementById('mobileMenu')).transform,
  bodyLocked: document.body.classList.contains('menu-open'),
}));
await page.click('#burger');
await new Promise((r) => setTimeout(r, 350));
const mobileClosed = await page.evaluate(() => ({
  expanded: document.getElementById('burger')?.getAttribute('aria-expanded'),
  open: document.getElementById('mobileMenu')?.classList.contains('open'),
  bodyLocked: document.body.classList.contains('menu-open'),
}));

await page.click('#themeBtn');
const theme = await page.evaluate(() => ({
  dark: document.documentElement.classList.contains('dark'),
  stored: localStorage.getItem('fh-theme'),
}));

await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
await page.goto(`${BASE}/sitios-web/tienda-online/`, { waitUntil: 'networkidle0' });
await page.hover('[data-drop="webs"]');
await new Promise((r) => setTimeout(r, 350));
const mega = await page.evaluate(() => {
  const panel = document.querySelector('[data-drop-panel="webs"]');
  const btn = document.querySelector('[data-drop="webs"]');
  return {
    open: panel?.classList.contains('mega-open'),
    visible: panel ? getComputedStyle(panel).visibility : null,
    opacity: panel ? getComputedStyle(panel).opacity : null,
    active: btn?.classList.contains('active-drop'),
  };
});

await browser.close();
console.log(JSON.stringify({ mobile, mobileClosed, theme, mega }, null, 2));

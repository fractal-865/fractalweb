import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
  args: ['--no-sandbox', '--disable-gpu'],
});
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
await page.goto('http://localhost:4323/sitios-web/tienda-online/', { waitUntil: 'networkidle0' });

const data = await page.evaluate(() => {
  const box = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { sel, left: Math.round(r.left), right: Math.round(r.right), top: Math.round(r.top), bottom: Math.round(r.bottom), width: Math.round(r.width), height: Math.round(r.height), display: getComputedStyle(el).display, overflow: getComputedStyle(el).overflow };
  };
  return {
    innerWidth: window.innerWidth,
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    topbar: box('#topbar'),
    topbarWrap: box('#topbar .wrap'),
    tbBtns: [...document.querySelectorAll('#topbar .tb-btn')].map((el) => {
      const r = el.getBoundingClientRect();
      return { text: el.textContent?.trim().slice(0, 30), left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width), display: getComputedStyle(el).display };
    }),
    headerMain: box('header > div:nth-child(2)'),
    headerWrap: box('header > div:nth-child(2) .wrap'),
    logo: box('header a[aria-label="Fractal Host, ir al inicio"]'),
    burger: box('#burger'),
    h1: box('h1'),
    hero: box('.page-hero'),
    heroWrap: box('.page-hero .wrap'),
    heroGrid: box('.hero-grid'),
  };
});
console.log(JSON.stringify(data, null, 2));

const header = await page.$('header');
if (header) await header.screenshot({ path: 'qa-out/header-mobile.png' });
await page.screenshot({ path: 'qa-out/tienda-mobile-viewport.png' });
await browser.close();

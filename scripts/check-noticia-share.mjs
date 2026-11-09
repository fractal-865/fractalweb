import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--no-sandbox','--disable-gpu'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
await page.goto('http://localhost:4330/noticias/falla-critica-php-2026-chile-proteger-sitio-web/', { waitUntil: 'networkidle0', timeout: 120000 });
await page.evaluate(() => document.querySelector('#cookieBanner')?.remove());
const info = await page.evaluate(() => {
  const buttons = [...document.querySelectorAll('.article-share__btn')];
  return {
    count: buttons.length,
    labels: buttons.map(b => b.getAttribute('aria-label')),
    facebook: document.querySelector('.article-share__btn[href*="facebook.com"]')?.getAttribute('href'),
    instagram: !!document.querySelector('[data-share-instagram]'),
    dataImage: document.querySelector('[data-share]')?.dataset.image,
    og: document.querySelector('meta[property="og:image"]')?.content,
    ogW: document.querySelector('meta[property="og:image:width"]')?.content,
    ogH: document.querySelector('meta[property="og:image:height"]')?.content,
    tw: document.querySelector('meta[name="twitter:image"]')?.content
  };
});
await page.evaluate(() => { window.__opened = null; window.open = (u) => { window.__opened = u; return null; }; });
await page.click('[data-share-instagram]');
await new Promise(r => setTimeout(r, 800));
const ig = await page.evaluate(() => ({ opened: window.__opened, status: document.querySelector('[data-share-status]')?.textContent, clipboard: navigator.clipboard ? 'api' : 'none' }));
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.reload({ waitUntil: 'networkidle0' });
await page.evaluate(() => document.querySelector('#cookieBanner')?.remove());
const mobile = await page.evaluate(() => ({ scrollW: document.documentElement.scrollWidth, clientW: document.documentElement.clientWidth, visibleButtons: [...document.querySelectorAll('.article-share__btn')].filter(b=>getComputedStyle(b).display!=='none').length, labelsHidden: getComputedStyle(document.querySelector('.article-share__btn span') ?? document.body).display }));
await page.evaluate(() => document.querySelector('.article-share')?.scrollIntoView({ block: 'center' }));
await new Promise(r => setTimeout(r, 300));
await page.screenshot({ path: 'qa-out/noticia-share-mobile.png' });
console.log(JSON.stringify({ info, ig, mobile }, null, 2));
await browser.close();

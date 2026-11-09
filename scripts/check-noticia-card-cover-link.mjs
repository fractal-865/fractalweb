import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--no-sandbox','--disable-gpu'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
await page.goto('http://localhost:4330/noticias/', { waitUntil: 'networkidle0', timeout: 120000 });
await page.evaluate(() => document.querySelector('#cookieBanner')?.remove());
const info = await page.evaluate(() => {
  const card = document.querySelector('.noticia-card');
  const cover = card?.querySelector('.noticia-card__cover');
  const img = cover?.querySelector('img');
  return { tag: cover?.tagName, href: cover?.getAttribute('href'), label: cover?.getAttribute('aria-label'), imgAlt: img?.alt, imgW: Math.round(img?.getBoundingClientRect().width||0), coverW: Math.round(cover?.getBoundingClientRect().width||0), display: cover?getComputedStyle(cover).display:null };
});
await page.click('.noticia-card__cover');
await new Promise(r => setTimeout(r, 500));
const afterClick = await page.evaluate(() => ({ url: location.pathname, h1: document.querySelector('h1')?.innerText }));
console.log(JSON.stringify({ info, afterClick }, null, 2));
await browser.close();

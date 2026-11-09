import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--no-sandbox','--disable-gpu'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
await page.goto('http://localhost:4330/noticias/falla-critica-php-2026-chile-proteger-sitio-web/', { waitUntil: 'networkidle0', timeout: 120000 });
await page.evaluate(() => document.querySelector('#cookieBanner')?.remove());
const info = await page.evaluate(() => ({
  buttons: document.querySelectorAll('.article-contact-btn').length,
  labels: [...document.querySelectorAll('.article-contact-btn')].map(a => a.innerText.trim()),
  hrefs: [...document.querySelectorAll('.article-contact-btn')].map(a => a.getAttribute('href')),
  targets: [...document.querySelectorAll('.article-contact-btn')].map(a => a.getAttribute('target')),
  emailVisible: document.querySelector('.article-body')?.innerText.includes('hola@fractalhost.cl'),
  listCount: document.querySelectorAll('.article-body ul').length,
  contactLink: document.querySelector('.article-contact-btn--ghost')?.href
}));
await page.evaluate(() => document.querySelector('.article-contact-actions')?.scrollIntoView({ block: 'center' }));
await new Promise(r => setTimeout(r, 400));
await page.screenshot({ path: 'qa-out/noticia-php-contact-buttons.png' });
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto('http://localhost:4330/noticias/falla-critica-php-2026-chile-proteger-sitio-web/', { waitUntil: 'networkidle0', timeout: 120000 });
await page.evaluate(() => document.querySelector('.article-contact-actions')?.scrollIntoView({ block: 'center' }));
await new Promise(r => setTimeout(r, 400));
await page.screenshot({ path: 'qa-out/noticia-php-contact-mobile.png' });
const mobile = await page.evaluate(() => ({ scrollW: document.documentElement.scrollWidth, clientW: document.documentElement.clientWidth, widths: [...document.querySelectorAll('.article-contact-btn')].map(a=>Math.round(a.getBoundingClientRect().width)) }));
console.log(JSON.stringify({ info, mobile }, null, 2));
await browser.close();

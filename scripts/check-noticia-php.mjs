import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--no-sandbox','--disable-gpu'] });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));
await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
await page.goto('http://localhost:4330/noticias/falla-critica-php-2026-chile-proteger-sitio-web/', { waitUntil: 'networkidle0', timeout: 120000 });
await page.evaluate(() => document.querySelector('#cookieBanner')?.remove());
await new Promise(r => setTimeout(r, 500));
const article = await page.evaluate(() => {
  const j = JSON.parse([...document.querySelectorAll('script[type="application/ld+json"]')][0].textContent);
  const post = j['@graph'].find(x => x['@type'] === 'BlogPosting');
  const cover = document.querySelector('.noticia-cover img');
  return {
    title: document.title,
    desc: document.querySelector('meta[name="description"]')?.content,
    canonical: document.querySelector('link[rel="canonical"]')?.href,
    robots: document.querySelector('meta[name="robots"]')?.content,
    h1: document.querySelector('h1')?.innerText,
    category: document.querySelector('.noticia-categoria')?.textContent?.trim(),
    date: document.querySelector('.noticia-meta time')?.textContent,
    toc: document.querySelectorAll('.article-toc a').length,
    figure: document.querySelectorAll('.article-figure').length,
    caption: document.querySelector('.article-figure figcaption')?.innerText.trim().slice(0, 80),
    faqs: document.querySelectorAll('.article-faq details').length,
    related: document.querySelectorAll('.article-related .noticia-card').length,
    coverSrc: cover?.currentSrc.split('/').pop(),
    coverAlt: cover?.alt,
    datePublished: post?.datePublished,
    section: post?.articleSection
  };
});
await page.evaluate(() => document.querySelector('.article-figure')?.scrollIntoView({ block: 'center' }));
await new Promise(r => setTimeout(r, 800));
const internal = await page.evaluate(() => { const i=document.querySelector('.article-figure img'); return { src: i?.currentSrc.split('/').pop(), loaded: !!(i && i.complete && i.naturalWidth>0), alt: i?.alt }; });
await page.screenshot({ path: 'qa-out/noticia-php-article.png' });

await page.goto('http://localhost:4330/noticias/', { waitUntil: 'networkidle0', timeout: 120000 });
await page.evaluate(() => document.querySelector('#cookieBanner')?.remove());
const hub = await page.evaluate(() => ({
  cards: document.querySelectorAll('.noticia-card').length,
  first: document.querySelector('.noticia-card .noticia-card__title')?.innerText,
  firstCat: document.querySelector('.noticia-card .noticia-card__cat')?.innerText,
  filters: [...document.querySelectorAll('.noticias-filtro')].map(b => b.innerText.replace(/\s+/g, ' ').trim()),
  result: document.querySelector('[data-noticias-resultado]')?.textContent?.trim()
}));
await page.screenshot({ path: 'qa-out/noticias-hub-php.png' });

await page.goto('http://localhost:4330/', { waitUntil: 'networkidle0', timeout: 120000 });
await page.evaluate(() => document.querySelector('#cookieBanner')?.remove());
const home = await page.evaluate(() => ({
  firstCarousel: document.querySelector('[data-carousel-track] .noticia-card__title')?.innerText,
  firstCarouselCat: document.querySelector('[data-carousel-track] .noticia-card__cat')?.innerText,
  firstMega: document.querySelector('[data-drop-panel="noticias"] li b')?.innerText
}));
const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf8');
console.log(JSON.stringify({ article, internal, hub, home, sitemap: { urls: (sitemap.match(/<loc>/g)||[]).length, hasNew: sitemap.includes('falla-critica-php') }, errors }, null, 2));
await browser.close();

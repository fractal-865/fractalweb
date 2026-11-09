import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const BASE = process.env.BASE_URL || 'http://localhost:4330';
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const out = path.resolve('qa-out');
fs.mkdirSync(out, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-gpu'],
});

const results = {};
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
const errors = [];
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(msg.text());
});
page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`));

// Hub
await page.goto(`${BASE}/noticias/`, { waitUntil: 'networkidle0', timeout: 120000 });
results.hub = await page.evaluate(() => ({
  title: document.title,
  robots: document.querySelector('meta[name="robots"]')?.content,
  h1: document.querySelector('h1')?.innerText,
  cards: document.querySelectorAll('.noticia-card').length,
  visible: [...document.querySelectorAll('.noticia-card')].filter((c) => !c.hidden).length,
  categories: document.querySelectorAll('.noticias-filtro').length,
  pageButtons: document.querySelectorAll('.noticias-pagination__page').length,
  result: document.querySelector('[data-noticias-resultado]')?.textContent?.trim(),
}));
await page.screenshot({ path: path.join(out, 'noticias-hub-desktop.png'), fullPage: false });

await page.click('.noticias-filtro[data-categoria="hosting"]');
results.hosting = await page.evaluate(() => ({
  visible: [...document.querySelectorAll('.noticia-card')].filter((c) => !c.hidden).length,
  result: document.querySelector('[data-noticias-resultado]')?.textContent?.trim(),
  pages: document.querySelectorAll('.noticias-pagination__page').length,
  pressed: document.querySelector('.noticias-filtro[data-categoria="hosting"]')?.getAttribute('aria-pressed'),
}));
await page.click('.noticias-pagination__page:nth-child(2)');
results.hostingPage2 = await page.evaluate(() => ({
  visible: [...document.querySelectorAll('.noticia-card')].filter((c) => !c.hidden).length,
  current: document.querySelector('.noticias-pagination__page[aria-current="page"]')?.textContent,
}));
await page.click('.noticias-filtro[data-categoria=""]');
await page.type('#buscar-noticias', 'wordpress');
results.search = await page.evaluate(() => ({
  visible: [...document.querySelectorAll('.noticia-card')].filter((c) => !c.hidden).length,
  result: document.querySelector('[data-noticias-resultado]')?.textContent?.trim(),
}));
await page.click('[data-noticias-clear]');

// Article
await page.goto(`${BASE}/noticias/ley-21719-sitio-web/`, { waitUntil: 'networkidle0', timeout: 120000 });
results.article = await page.evaluate(() => ({
  title: document.title,
  robots: document.querySelector('meta[name="robots"]')?.content,
  h1: document.querySelector('h1')?.innerText,
  h1Count: document.querySelectorAll('h1').length,
  toc: document.querySelectorAll('.article-toc a').length,
  figures: document.querySelectorAll('.article-figure').length,
  faqs: document.querySelectorAll('.article-faq details').length,
  related: document.querySelectorAll('.article-related .noticia-card').length,
  shareButtons: document.querySelectorAll('.article-share__btn').length,
  cta: !!document.querySelector('.article-cta'),
  duplicateRelatedHeading: [...document.querySelectorAll('.article-body h2')].some((h) => /Lecturas relacionadas/i.test(h.textContent || '')),
  duplicateFaqHeading: [...document.querySelectorAll('.article-body h2')].some((h) => /Preguntas frecuentes/i.test(h.textContent || '')),
  coverLoaded: (() => { const img = document.querySelector('.noticia-cover img'); return !!(img && img.complete && img.naturalWidth > 0); })(),
  internalLoaded: (() => { const img = document.querySelector('.article-figure img'); return !!(img && img.complete && img.naturalWidth > 0); })(),
  jsonLdTypes: [...document.querySelectorAll('script[type="application/ld+json"]')].flatMap((s) => { try { const j = JSON.parse(s.textContent); return (j['@graph'] || [j]).map((x) => x['@type']); } catch { return ['ERROR']; } }),
}));
await page.screenshot({ path: path.join(out, 'noticia-ley-desktop.png'), fullPage: false });

// Home carousel
await page.goto(`${BASE}/`, { waitUntil: 'networkidle0', timeout: 120000 });
await page.waitForFunction(() => document.querySelector('[data-carousel-status]')?.textContent?.includes('Página'));
results.carouselStart = await page.evaluate(() => ({
  slides: document.querySelectorAll('[data-carousel-track] .noticia-card').length,
  status: document.querySelector('[data-carousel-status]')?.textContent,
  prevDisabled: document.querySelector('[data-carousel-prev]')?.disabled,
  nextDisabled: document.querySelector('[data-carousel-next]')?.disabled,
  scrollLeft: document.querySelector('[data-carousel-track]')?.scrollLeft,
}));
const before = await page.evaluate(() => document.querySelector('[data-carousel-track]')?.scrollLeft);
await page.click('[data-carousel-next]');
await new Promise((r) => setTimeout(r, 900));
results.carouselNext = await page.evaluate(() => ({
  status: document.querySelector('[data-carousel-status]')?.textContent,
  scrollLeft: Math.round(document.querySelector('[data-carousel-track]')?.scrollLeft || 0),
  prevDisabled: document.querySelector('[data-carousel-prev]')?.disabled,
  nextDisabled: document.querySelector('[data-carousel-next]')?.disabled,
}));
await new Promise((r) => setTimeout(r, 1200));
const afterIdle = await page.evaluate(() => document.querySelector('[data-carousel-track]')?.scrollLeft);
results.noAutoAdvance = { before, afterIdle, stable: before !== afterIdle };
await page.click('[data-carousel-prev]');
await new Promise((r) => setTimeout(r, 900));

// Mobile article
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
await page.goto(`${BASE}/noticias/ley-21719-sitio-web/`, { waitUntil: 'networkidle0', timeout: 120000 });
results.mobile = await page.evaluate(() => ({
  scrollWidth: document.documentElement.scrollWidth,
  clientWidth: document.documentElement.clientWidth,
  h1: document.querySelector('h1')?.innerText,
  bodyFont: getComputedStyle(document.querySelector('.article-body')).fontSize,
  bodyWidth: document.querySelector('.article-body')?.getBoundingClientRect().width,
}));
await page.screenshot({ path: path.join(out, 'noticia-ley-mobile.png'), fullPage: false });

await browser.close();
results.errors = errors;
fs.writeFileSync(path.join(out, 'noticias-report.json'), JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));

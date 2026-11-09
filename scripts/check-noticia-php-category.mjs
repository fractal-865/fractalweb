import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--no-sandbox','--disable-gpu'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
await page.goto('http://localhost:4330/noticias/falla-critica-php-2026-chile-proteger-sitio-web/', { waitUntil: 'networkidle0', timeout: 120000 });
const article = await page.evaluate(() => {
  const j = JSON.parse([...document.querySelectorAll('script[type="application/ld+json"]')][0].textContent);
  const post = j['@graph'].find(x => x['@type'] === 'BlogPosting');
  return { category: document.querySelector('.noticia-categoria')?.textContent?.trim(), section: post?.articleSection, cta: document.querySelector('.article-cta h2')?.innerText, ctaHref: document.querySelector('.article-cta a')?.getAttribute('href') };
});
await page.goto('http://localhost:4330/noticias/', { waitUntil: 'networkidle0', timeout: 120000 });
const hub = await page.evaluate(() => ({
  firstCat: document.querySelector('.noticia-card .noticia-card__cat')?.innerText,
  filters: [...document.querySelectorAll('.noticias-filtro')].map(b => b.innerText.replace(/\s+/g,' ').trim()).filter(t=>/Seguridad|Diseño/.test(t)),
  result: document.querySelector('[data-noticias-resultado]')?.textContent?.trim()
}));
await page.goto('http://localhost:4330/', { waitUntil: 'networkidle0', timeout: 120000 });
const mega = await page.evaluate(() => [...document.querySelectorAll('[data-drop-panel="noticias"] .mega-link')].map(a=>a.textContent.trim()).filter(t=>/Seguridad|Diseño/.test(t)));
console.log(JSON.stringify({ article, hub, mega }, null, 2));
await browser.close();

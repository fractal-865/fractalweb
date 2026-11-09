import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--no-sandbox','--disable-gpu'] });
const page = await browser.newPage();
for (const [w,h,name] of [[1440,1000,'1440'],[390,844,'390']]) {
  await page.setViewport({ width:w, height:h, deviceScaleFactor: w===390?2:1 });
  await page.goto('http://localhost:4330/noticias/falla-critica-php-2026-chile-proteger-sitio-web/', { waitUntil:'networkidle0', timeout:120000 });
  await page.evaluate(() => document.querySelector('#cookieBanner')?.remove());
  const footer = await page.$('footer');
  if (footer) await footer.screenshot({ path:`qa-out/footer-current-${name}.png` });
  const info = await page.evaluate(() => {
    const f=document.querySelector('footer'); const r=f.getBoundingClientRect();
    const cols=[...f.querySelectorAll('.wrap > .grid > *')].map(el=>({h:Math.round(el.getBoundingClientRect().height), text:el.innerText.split('\n')[0]}));
    return { h:Math.round(r.height), cols, navs:[...f.querySelectorAll('nav')].map(n=>({label:n.getAttribute('aria-label'),h:Math.round(n.getBoundingClientRect().height)})) };
  });
  console.log(name, JSON.stringify(info));
}
await browser.close();

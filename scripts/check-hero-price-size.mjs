import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--no-sandbox','--disable-gpu'] });
const page = await browser.newPage();
for (const [w,h,name] of [[1440,1000,'1440'],[390,844,'390']]) {
  await page.setViewport({ width:w, height:h, deviceScaleFactor: w===390?2:1 });
  await page.goto('http://localhost:4330/', { waitUntil:'networkidle0', timeout:120000 });
  await page.evaluate(() => document.querySelector('#cookieBanner')?.remove());
  const info = await page.evaluate(() => { const el=document.querySelector('.hero-offer__price'); const r=el.getBoundingClientRect(); return { fs:getComputedStyle(el).fontSize, w:Math.round(r.width), h:Math.round(r.height), text:el.innerText }; });
  console.log(name, JSON.stringify(info));
  await page.screenshot({ path:`qa-out/hero-price-${name}.png`, clip:{x:0,y:0,width:w,height:h} });
}
await browser.close();

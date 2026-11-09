import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--no-sandbox','--disable-gpu'] });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));
await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
await page.goto('http://localhost:4330/cotizador/', { waitUntil: 'networkidle0', timeout: 120000 });
await page.evaluate(() => document.querySelector('#cookieBanner')?.remove());
const initial = await page.evaluate(() => ({
  prefix: document.querySelector('.cot-prefix').textContent,
  hint: document.getElementById('sfFonoHint').textContent,
  types: document.querySelectorAll('input[name="sfTipoSitio"]').length,
  inmobiliaria: !!document.querySelector('input[name="sfTipoSitio"][value="Inmobiliaria"]'),
  checkedType: document.querySelector('input[name="sfTipoSitio"]:checked'),
  typeWrapHidden: document.getElementById('sfTipoWrap').hidden
}));
// Parcial
await page.type('#sfFono', '9123');
await new Promise(r => setTimeout(r, 200));
const partial = await page.evaluate(() => ({ hint: document.getElementById('sfFonoHint').textContent, split: document.getElementById('sfActions').classList.contains('is-split') }));
// Completo móvil
await page.type('#sfFono', '45678');
await new Promise(r => setTimeout(r, 400));
const complete = await page.evaluate(() => ({ value: document.getElementById('sfFono').value, hint: document.getElementById('sfFonoHint').textContent, split: document.getElementById('sfActions').classList.contains('is-split'), waW: Math.round(document.getElementById('sfWhatsAppSubmit').getBoundingClientRect().width) }));
// Borrar y fijo
await page.evaluate(() => { const f=document.getElementById('sfFono'); f.value=''; f.dispatchEvent(new Event('input',{bubbles:true})); });
await page.type('#sfFono', '612345678');
await new Promise(r => setTimeout(r, 400));
const fixed = await page.evaluate(() => ({ value: document.getElementById('sfFono').value, hint: document.getElementById('sfFonoHint').textContent, split: document.getElementById('sfActions').classList.contains('is-split') }));
// Tipo nuevo + Inmobiliaria
await page.click('input[name="sfGoal"][value="Sitio web nuevo"]');
await new Promise(r => setTimeout(r, 250));
await page.evaluate(() => document.getElementById('sfTipoWrap').scrollIntoView({ block: 'center' }));
await new Promise(r => setTimeout(r, 300));
await page.screenshot({ path: 'qa-out/cotizador-tipos-1440.png' });
await page.click('input[name="sfTipoSitio"][value="Inmobiliaria"]');
const typeSel = await page.evaluate(() => ({ checked: document.querySelector('input[name="sfTipoSitio"]:checked')?.value, name: document.querySelector('input[name="sfTipoSitio"]:checked')?.closest('.sf-type')?.innerText.trim() }));
// WhatsApp con +56
await page.type('#sfNombre', 'Cliente Prueba');
await page.type('#sfMail', 'cliente@prueba.cl');
await page.click('#sfPrivacidad');
await page.evaluate(() => { window.__opened = null; window.open = (u) => { window.__opened = u; return null; }; });
await page.click('#sfWhatsAppSubmit');
await new Promise(r => setTimeout(r, 500));
const wa = await page.evaluate(() => ({ success: !document.getElementById('sfSuccess').hidden, opened: window.__opened, text: document.getElementById('sfSuccessText').innerText }));
// Móvil tipos
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto('http://localhost:4330/cotizador/', { waitUntil: 'networkidle0', timeout: 120000 });
await page.evaluate(() => document.querySelector('#cookieBanner')?.remove());
await page.click('input[name="sfGoal"][value="Sitio web nuevo"]');
await new Promise(r => setTimeout(r, 300));
await page.evaluate(() => document.getElementById('sfTipoWrap').scrollIntoView({ block: 'center' }));
await new Promise(r => setTimeout(r, 300));
await page.screenshot({ path: 'qa-out/cotizador-tipos-390.png' });
const mobile = await page.evaluate(() => ({ scrollW: document.documentElement.scrollWidth, clientW: document.documentElement.clientWidth, cols: getComputedStyle(document.querySelector('.sf-types')).gridTemplateColumns, types: document.querySelectorAll('.sf-type').length }));
console.log(JSON.stringify({ initial, partial, complete, fixed, typeSel, wa: { success: wa.success, text: wa.text, openedHasPhone: wa.opened.includes('+56%2061') }, mobile, errors }, null, 2));
await browser.close();

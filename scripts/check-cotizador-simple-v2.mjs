import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--no-sandbox','--disable-gpu'] });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push('pageerror: ' + e.message));
await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
await page.goto('http://localhost:4330/cotizador/', { waitUntil: 'networkidle0', timeout: 120000 });
await page.evaluate(() => document.querySelector('#cookieBanner')?.remove());
await new Promise(r => setTimeout(r, 400));

const initial = await page.evaluate(() => ({
  nameLabel: document.querySelector('label[for="sfNombre"]').innerText,
  phoneLabel: document.querySelector('label[for="sfFono"]').innerText,
  phoneRequired: document.getElementById('sfFono').required,
  tipoHidden: document.getElementById('sfTipoWrap').hidden,
  urlHidden: document.getElementById('sfSiteUrlWrap').hidden,
  privacyChecked: document.getElementById('sfPrivacidad').checked,
  split: document.getElementById('sfActions').classList.contains('is-split'),
  emailW: Math.round(document.getElementById('sfSubmit').getBoundingClientRect().width),
  actionsW: Math.round(document.getElementById('sfActions').getBoundingClientRect().width),
  waTab: document.getElementById('sfWhatsAppSubmit').tabIndex
}));

// Validación vacía
await page.click('#sfSubmit');
await new Promise(r => setTimeout(r, 300));
const empty = await page.evaluate(() => ({
  nameErr: !document.getElementById('sfErrNombre').hidden,
  phoneErr: !document.getElementById('sfErrFono').hidden,
  mailErr: !document.getElementById('sfErrMail').hidden,
  goalErr: !document.getElementById('sfErrGoal').hidden,
  privacyErr: !document.getElementById('sfErrPrivacidad').hidden,
  active: document.activeElement?.id
}));

// Sitio nuevo sin tipo
await page.click('input[name="sfGoal"][value="Sitio web nuevo"]');
await new Promise(r => setTimeout(r, 200));
const nuevo = await page.evaluate(() => ({ tipoHidden: document.getElementById('sfTipoWrap').hidden, urlHidden: document.getElementById('sfSiteUrlWrap').hidden }));
await page.click('#sfSubmit');
await new Promise(r => setTimeout(r, 200));
const tipoErr = await page.evaluate(() => !document.getElementById('sfErrTipo').hidden);

// Llenar datos y probar split
await page.type('#sfNombre', 'María González');
await page.type('#sfFono', '+56 9 1234 5678');
await page.type('#sfMail', 'maria@empresa.cl');
await page.select('#sfTipoSitio', 'Sitio informativo');
await page.click('#sfPrivacidad');
await new Promise(r => setTimeout(r, 600));
const split = await page.evaluate(() => {
  const e = document.getElementById('sfSubmit').getBoundingClientRect();
  const w = document.getElementById('sfWhatsAppSubmit').getBoundingClientRect();
  const a = document.getElementById('sfActions').getBoundingClientRect();
  return { isSplit: document.getElementById('sfActions').classList.contains('is-split'), emailW: Math.round(e.width), waW: Math.round(w.width), actionsW: Math.round(a.width), waVis: getComputedStyle(document.getElementById('sfWhatsAppSubmit')).opacity, waTab: document.getElementById('sfWhatsAppSubmit').tabIndex, label: document.getElementById('sfSubmit').innerText.trim() };
});
await page.screenshot({ path: 'qa-out/cotizador-split-1440.png' });

// Rediseño: URL
await page.click('input[name="sfGoal"][value="Rediseño de sitio web"]');
await new Promise(r => setTimeout(r, 250));
const red = await page.evaluate(() => ({ tipoHidden: document.getElementById('sfTipoWrap').hidden, urlHidden: document.getElementById('sfSiteUrlWrap').hidden, urlValue: document.getElementById('sfSiteUrl').value }));
await page.evaluate(() => { const s = document.getElementById('sfSiteUrl'); s.value = 'https://'; s.dispatchEvent(new Event('input', { bubbles: true })); });
await page.click('#sfSubmit');
await new Promise(r => setTimeout(r, 200));
const urlErr = await page.evaluate(() => !document.getElementById('sfErrSiteUrl').hidden);
await page.evaluate(() => { const s = document.getElementById('sfSiteUrl'); s.value = 'mi-sitio.cl'; s.dispatchEvent(new Event('input', { bubbles: true })); });
await page.evaluate(() => document.getElementById('sfSiteUrl').blur());
const urlNormalized = await page.evaluate(() => document.getElementById('sfSiteUrl').value);

// Mantención
await page.click('input[name="sfGoal"][value="Mantención web"]');
await new Promise(r => setTimeout(r, 200));
const mant = await page.evaluate(() => ({ urlHidden: document.getElementById('sfSiteUrlWrap').hidden, tipoHidden: document.getElementById('sfTipoWrap').hidden }));

// WhatsApp
await page.evaluate(() => { window.__opened = null; window.open = (url) => { window.__opened = url; return null; }; });
await page.click('#sfWhatsAppSubmit');
await new Promise(r => setTimeout(r, 600));
const wa = await page.evaluate(() => ({
  success: !document.getElementById('sfSuccess').hidden,
  formHidden: document.getElementById('sfForm').hidden,
  text: document.getElementById('sfSuccessText').innerText,
  code: document.getElementById('sfCode').textContent,
  opened: window.__opened,
  label: document.getElementById('sfWhatsappLabel').textContent
}));
await page.click('#sfAgain');
const reset = await page.evaluate(() => ({ split: document.getElementById('sfActions').classList.contains('is-split'), privacy: document.getElementById('sfPrivacidad').checked, tipoHidden: document.getElementById('sfTipoWrap').hidden, urlHidden: document.getElementById('sfSiteUrlWrap').hidden, urlValue: document.getElementById('sfSiteUrl').value }));

// Email path
await page.type('#sfNombre', 'Pedro Soto');
await page.type('#sfMail', 'pedro@empresa.cl');
await page.click('input[name="sfGoal"][value="Sitio web nuevo"]');
await page.select('#sfTipoSitio', 'One Page');
await page.click('#sfPrivacidad');
await page.click('#sfSubmit');
await new Promise(r => setTimeout(r, 1500));
const email = await page.evaluate(() => ({ success: !document.getElementById('sfSuccess').hidden, text: document.getElementById('sfSuccessText').innerText, code: document.getElementById('sfCode').textContent }));

// Móvil split
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto('http://localhost:4330/cotizador/', { waitUntil: 'networkidle0', timeout: 120000 });
await page.evaluate(() => document.querySelector('#cookieBanner')?.remove());
await page.type('#sfFono', '612345678');
await new Promise(r => setTimeout(r, 600));
await page.evaluate(() => window.scrollTo(0, 700));
await new Promise(r => setTimeout(r, 300));
await page.screenshot({ path: 'qa-out/cotizador-split-390.png' });
const mobile = await page.evaluate(() => {
  const e = document.getElementById('sfSubmit').getBoundingClientRect();
  const w = document.getElementById('sfWhatsAppSubmit').getBoundingClientRect();
  return { scrollW: document.documentElement.scrollWidth, clientW: document.documentElement.clientWidth, isSplit: document.getElementById('sfActions').classList.contains('is-split'), emailW: Math.round(e.width), waW: Math.round(w.width), emailText: document.getElementById('sfSubmit').innerText.trim() };
});

console.log(JSON.stringify({ initial, empty, nuevo, tipoErr, split, red, urlErr, urlNormalized, mant, wa, reset, email, mobile, errors }, null, 2));
await browser.close();

import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--no-sandbox','--disable-gpu'] });
const page = await browser.newPage();
const errors = [];
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', e => errors.push('pageerror: ' + e.message));
await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
await page.goto('http://localhost:4330/cotizador/', { waitUntil: 'networkidle0', timeout: 120000 });
await page.evaluate(() => document.querySelector('#cookieBanner')?.remove());
await new Promise(r => setTimeout(r, 600));
const inicial = await page.evaluate(() => ({
  simpleActive: document.getElementById('tabSimple').getAttribute('aria-selected'),
  avanzadoHidden: document.getElementById('panelAvanzado').hidden,
  simpleHidden: document.getElementById('panelSimple').hidden,
  pctHidden: document.getElementById('cotPct').hidden,
  tab: document.querySelector('.cot-formtab.is-active')?.id
}));
await page.screenshot({ path: 'qa-out/cotizador-simple-1440.png' });

// Validación vacía
await page.click('#sfSubmit');
await new Promise(r => setTimeout(r, 300));
const validacion = await page.evaluate(() => ({
  errNombre: !document.getElementById('sfErrNombre').hidden,
  errFono: !document.getElementById('sfErrFono').hidden,
  errMail: !document.getElementById('sfErrMail').hidden,
  errGoal: !document.getElementById('sfErrGoal').hidden,
  errWeb: !document.getElementById('sfErrWeb').hidden,
  active: document.activeElement?.id
}));

// Llenar y enviar
await page.type('#sfNombre', 'María González');
await page.type('#sfFono', '12345678');
await page.type('#sfMail', 'maria@empresa.cl');
await page.click('input[name="sfGoal"][value="Sitio web nuevo"]');
await page.click('input[name="sfWeb"][value="no"]');
await page.type('#sfMensaje', 'Tengo una pyme y quiero vender en línea.');
await page.click('#sfSubmit');
await new Promise(r => setTimeout(r, 1500));
const exito = await page.evaluate(() => ({
  formHidden: document.getElementById('sfForm').hidden,
  successHidden: document.getElementById('sfSuccess').hidden,
  titulo: document.getElementById('sfSuccessTitle').textContent,
  texto: document.getElementById('sfSuccessText').innerText,
  codigo: document.getElementById('sfCode').textContent,
  wa: document.getElementById('sfWhatsapp').getAttribute('href')?.slice(0, 80)
}));
await page.screenshot({ path: 'qa-out/cotizador-exito-1440.png' });

// Volver a enviar
await page.click('#sfAgain');
const reinicio = await page.evaluate(() => ({
  formHidden: document.getElementById('sfForm').hidden,
  successHidden: document.getElementById('sfSuccess').hidden,
  nombre: document.getElementById('sfNombre').value,
  webUrlHidden: document.getElementById('sfWebUrlWrap').hidden
}));

// Pestaña avanzada
await page.click('#tabAvanzado');
await new Promise(r => setTimeout(r, 500));
const avanzado = await page.evaluate(() => ({
  selected: document.getElementById('tabAvanzado').getAttribute('aria-selected'),
  panelHidden: document.getElementById('panelAvanzado').hidden,
  simpleHidden: document.getElementById('panelSimple').hidden,
  pctHidden: document.getElementById('cotPct').hidden,
  pasoActivo: document.querySelector('.cot-step.active')?.id,
  planes: document.querySelectorAll('#tiposGrid .cot-card').length,
  hash: location.hash
}));
await page.screenshot({ path: 'qa-out/cotizador-avanzado-1440.png' });

// Volver a simple con teclado
await page.focus('#tabAvanzado');
await page.keyboard.press('ArrowLeft');
await new Promise(r => setTimeout(r, 300));
const teclado = await page.evaluate(() => ({
  active: document.activeElement?.id,
  selected: document.getElementById('tabSimple').getAttribute('aria-selected'),
  simpleHidden: document.getElementById('panelSimple').hidden
}));

// Móvil
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto('http://localhost:4330/cotizador/', { waitUntil: 'networkidle0', timeout: 120000 });
await page.evaluate(() => document.querySelector('#cookieBanner')?.remove());
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise(r => setTimeout(r, 500));
await page.screenshot({ path: 'qa-out/cotizador-simple-390.png' });
const movil = await page.evaluate(() => ({
  scrollW: document.documentElement.scrollWidth,
  clientW: document.documentElement.clientWidth,
  goals: document.querySelectorAll('.sf-goal').length,
  tabCols: getComputedStyle(document.querySelector('.cot-formtabs')).gridTemplateColumns
}));

console.log(JSON.stringify({ inicial, validacion, exito, reinicio, avanzado, teclado, movil, errors: errors.slice(0, 15) }, null, 2));
await browser.close();

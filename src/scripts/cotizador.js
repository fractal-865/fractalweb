/* ============================================================
   Cotizador de sitios web — Fractal Host
   Lógica del cotizador de 6 pasos (puerto del cotizador original)
   ============================================================ */
import {
  DOMINIO_NIC, DOMINIO_FH, TIPOS, DETALLES, PLANES, EQUIV_PLAN, HOSTING_TIPO,
  ADICIONALES, INCLUIDOS, ARCHIVOS_PERMITIDOS, AUTOSAVE_KEY,
  FALLAS_REDISENO, PROBLEMAS_MANT
} from '../data/cotizador';

/* ================== ESTADO ================== */
const estado = {
  modo:'nuevo',
  tipo:null, opcion:null, extra:false, extras:{},
  redisUrl:'', redisFallas:{}, redisFallaOtra:'', redisPlataforma:null, redisPlatOtra:'',
  mantUrl:'', mantPlataforma:null, mantPlatOtra:'', mantAlojamiento:null, mantProblemas:{},
  situacionHost:'contratar', enlace:'usa', plan:null,
  negocio:'', persona:null, rubro:'', rubroOtro:'', correos:null,
  dominio:null, domTexto:'',
  pago:null, mensaje:'', fonoDigitos:'', rut:'',
  refSitio:'no', refUrl:'', refNota:'',
  paso:1, codigo:null
};

const fmt = n => '$' + n.toLocaleString('es-CL');
const $ = id => document.getElementById(id);

/* ================== AUTOGUARDADO ================== */
function guardarEstado(){
  try{
    const entradas = {};
    ['inpNombre','inpMail','inpMensaje','inpRut','inpNegocio','inpRubro','inpRubroOtro','inpDominio','inpRefUrl','inpRefNota',
     'inpRedisUrl','inpFallaOtra','inpPlatOtraRedis','inpMantUrl','inpPlatOtraMant'].forEach(id => {
      const el = $(id);
      if(el) entradas[id] = el.value;
    });
    localStorage.setItem(AUTOSAVE_KEY, JSON.stringify({estado, entradas}));
  }catch(e){}
}
function cargarEstado(){
  try{
    const raw = localStorage.getItem(AUTOSAVE_KEY);
    if(!raw) return null;
    return JSON.parse(raw);
  }catch(e){ return null; }
}

/* ================== VALIDACIÓN VISUAL ================== */
function marcarError(el){
  if(!el) return;
  el.classList.add('cot-field-err');
  const limpiar = () => el.classList.remove('cot-field-err');
  el.addEventListener('input', limpiar, {once:true});
  el.addEventListener('click', limpiar, {once:true});
}
function errShow(id, mostrar){
  const el = $(id);
  if(el) el.classList.toggle('hidden', !mostrar);
}
function mostrarPrimerError(el){
  if(el) el.scrollIntoView({behavior:'smooth', block:'center'});
}

/* ================== TARJETAS DE TIPO ================== */
const gridTipos = $('tiposGrid');
TIPOS.filter(t => !['rediseno','mantencion'].includes(t.id)).forEach(t => {
  const card = document.createElement('div');
  card.className = 'tipo-card cot-card selectable p-5';
  card.dataset.id = t.id;
  card.innerHTML = `
    <span class="cot-check" aria-hidden="true">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#111318" stroke-width="3" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg>
    </span>
    ${t.insignia ? `<span class="cot-badge-pop inline-block text-[10px] px-2.5 py-0.5 rounded-full mb-2.5">${t.insignia}</span>` : ''}
    <div class="cot-ico mb-3"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${t.icon}</svg></div>
    <h4 class="font-display font-bold text-sm md:text-base mb-1">${t.nombre}</h4>
    <p class="text-xs md:text-sm text-mut dark:text-mutd mb-3">${t.desc}</p>
    <span class="cot-badge-plazo inline-block text-[11px] px-2.5 py-1 rounded-full">⏱ ${t.plazo}</span>`;
  card.addEventListener('click', () => seleccionTipo(t.id));
  gridTipos.appendChild(card);
});

/* ================== TABS DE MODO ================== */
document.querySelectorAll('.tab-modo').forEach(btn => {
  btn.addEventListener('click', () => cambiarModo(btn.dataset.modo));
});

function cambiarModo(m){
  estado.modo = m;
  if(m === 'rediseno') estado.tipo = 'rediseno';
  else if(m === 'mantencion') estado.tipo = 'mantencion';
  else if(estado.tipo === 'rediseno' || estado.tipo === 'mantencion') estado.tipo = null;

  document.querySelectorAll('.tab-modo').forEach(b => b.classList.toggle('on', b.dataset.modo === m));
  $('tabNuevo').classList.toggle('hidden', m !== 'nuevo');
  $('tabRediseno').classList.toggle('hidden', m !== 'rediseno');
  $('tabMantencion').classList.toggle('hidden', m !== 'mantencion');

  if(m === 'rediseno') renderRediseno();
  if(m === 'mantencion') renderMantencion();
  if(m === 'nuevo' && !estado.tipo) renderPlaceholderPanel();
  if(m === 'nuevo' && estado.tipo) renderPanel();
  renderHosting();
  actualizarBarra();
  actualizarPorcentaje();
}

function piePanel(idErr){
  return `
    <div class="mt-4 pt-4 border-t border-line dark:border-lined">
      <p id="${idErr}" class="cot-err hidden"></p>
      <button type="button" onclick="irPaso(2)" class="cot-btn w-full">Siguiente →</button>
    </div>`;
}

function renderPlaceholderPanel(){
  $('panelDetalle').innerHTML = `
    <div class="text-center py-8 px-2">
      <div class="cot-ico flex justify-center mb-3 opacity-70">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 4l-2-2-9 9 9 9 2-2"/><path d="M8.5 12h13"/><path d="M18 8.5l3.5 3.5-3.5 3.5"/></svg>
      </div>
      <p class="font-display font-semibold text-txt dark:text-txtd mb-1">Elige un tipo de sitio</p>
      <p class="text-xs text-mut dark:text-mutd">Toca una tarjeta y aquí mismo verás sus variantes, extras y la estimación. Nada se mueve de lugar.</p>
    </div>
    ${piePanel('err1Nuevo')}`;
}

function seleccionTipo(idTipo){
  estado.tipo = idTipo;
  estado.opcion = null;
  estado.extra = false;
  document.querySelectorAll('.tipo-card').forEach(c => c.classList.toggle('selected', c.dataset.id === idTipo));
  gridTipos.classList.remove('cot-field-err');
  aplicarHostingPreselect();
  renderPanel();
  renderHosting();
  actualizarBarra();
  actualizarPorcentaje();
}

function notaSeguro(){
  return `
    <div class="cot-note-ok mt-3 flex gap-2">
      <span class="shrink-0 mt-0.5"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6l8-3z"/></svg></span>
      <span><strong>Sitio asegurado:</strong> si desarrollas tu sitio y mantienes el hosting con nosotros, nos hacemos cargo de que funcione: mantención gratuita de plantillas y plugins, y si sufre un ataque, lo reparamos sin costo. Aplica a sitios simples y corporativos.</span>
    </div>
    <div class="cot-note-info mt-2">
      Primer año de hosting y dominio .cl incluidos: <strong>$0 (GRATIS)</strong>. La renovación comienza el segundo año.
    </div>`;
}

function filaEstimacion(texto){
  return `
    <div class="flex flex-wrap items-center justify-between gap-2 mt-4 pt-4 border-t border-line dark:border-lined">
      <span class="text-sm text-mut dark:text-mutd">Inversión estimada:</span>
      <span class="cot-estim">${texto}</span>
    </div>`;
}

function renderPanel(){
  const panel = $('panelDetalle');
  const det = DETALLES[estado.tipo];

  if(!det){
    panel.innerHTML = `
      <h4 class="font-display font-bold mb-1.5">Proyecto a medida</h4>
      <p class="text-sm text-mut dark:text-mutd mb-3">Sistemas de pago, plataformas únicas, integraciones especiales. Estos proyectos los cotizamos conversando contigo, para entender bien el alcance antes de darte un número.</p>
      <div class="cot-note-info mb-3">
        Hosting: <strong>A evaluar según requerimientos del proyecto.</strong> El plan adecuado se definirá durante el análisis técnico.
      </div>
      <div class="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-line dark:border-lined">
        <span class="text-sm text-mut dark:text-mutd">Inversión estimada:</span>
        <span class="cot-estim">A convenir</span>
      </div>
      ${piePanel('err1Nuevo')}`;
    return;
  }

  let html = `<h4 class="font-display font-bold mb-1">${det.titulo}</h4><p class="text-xs text-mut dark:text-mutd mb-4">${det.intro}</p>`;
  if(det.nota) html += `<p class="cot-note-amber mb-4">${det.nota}</p>`;
  html += `<div class="space-y-2.5">`;
  det.opciones.forEach(op => {
    const insignia = op.tag
      ? `<span class="cot-badge-pop text-[10px] px-2 py-0.5 rounded-full ml-auto shrink-0">★ ${op.tag}</span>`
      : (op.badge ? `<span class="cot-badge-info text-[10px] px-2 py-0.5 rounded-full ml-auto shrink-0">${op.badge}</span>` : '');
    html += `
      <div class="det-card cot-card selectable flex gap-3 p-3.5" data-op="${op.id}">
        <span class="cot-radio" aria-hidden="true">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#111318" stroke-width="3.5" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg>
        </span>
        <div class="min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <p class="font-semibold text-sm">${op.nombre}</p>${insignia}
          </div>
          <p class="text-xs text-mut dark:text-mutd mt-0.5">${op.desc}</p>
        </div>
      </div>`;
  });
  html += `</div>`;

  if(det.extra){
    html += `
      <div class="chk-extra cot-card selectable flex gap-3 p-3.5 mt-2.5" id="chkExtra">
        <span class="cot-box" aria-hidden="true">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#111318" stroke-width="3.5" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg>
        </span>
        <div>
          <div class="flex items-center gap-2 flex-wrap">
            <p class="font-semibold text-sm">${det.extra.label}</p>
            <span class="cot-badge-cost text-[10px] px-2 py-0.5 rounded-full">${det.extra.badge}</span>
          </div>
          <p class="text-xs text-mut dark:text-mutd mt-0.5">${det.extra.desc}</p>
        </div>
      </div>`;
  }

  html += filaEstimacion(textoEstimacion());

  if(det.asegura) html += notaSeguro();
  html += piePanel('err1Nuevo');
  panel.innerHTML = html;

  const pop = det.opciones.find(o => o.tag);
  if(pop){
    estado.opcion = pop.id;
    const cardPop = panel.querySelector(`.det-card[data-op="${pop.id}"]`);
    if(cardPop) cardPop.classList.add('on');
  }

  panel.querySelectorAll('.det-card').forEach(card => {
    card.addEventListener('click', () => {
      estado.opcion = card.dataset.op;
      panel.querySelectorAll('.det-card').forEach(c => c.classList.toggle('on', c === card));
      panel.classList.remove('cot-field-err');
      actualizarBarra();
      actualizarPorcentaje();
    });
  });
  const chk = panel.querySelector('#chkExtra');
  if(chk){
    chk.addEventListener('click', () => {
      estado.extra = !estado.extra;
      chk.classList.toggle('on', estado.extra);
      actualizarBarra();
      actualizarPorcentaje();
    });
  }
}

/* ================== PANEL REDISEÑO ================== */
function chipsMulti(contId, opciones, estadoMap, onToggle){
  const cont = $(contId);
  cont.innerHTML = '';
  opciones.forEach(op => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'cot-seg';
    b.textContent = op;
    if(estadoMap[op]) b.classList.add('on');
    b.addEventListener('click', () => {
      estadoMap[op] = !estadoMap[op];
      b.classList.toggle('on', !!estadoMap[op]);
      if(onToggle) onToggle();
      actualizarBarra();
      actualizarPorcentaje();
    });
    cont.appendChild(b);
  });
}

function segBtn(op, selected){
  return `<button type="button" class="cot-seg${selected ? ' on' : ''}">${op}</button>`;
}

function renderRediseno(){
  const caja = $('panelRediseno');
  caja.innerHTML = `
    <h4 class="font-display font-bold mb-1">Cuéntanos de tu sitio actual</h4>
    <p class="text-xs text-mut dark:text-mutd mb-5">Responde con botones; así avanzamos rápido.</p>
    <div class="space-y-5">
      <div>
        <label class="text-xs text-mut dark:text-mutd block mb-1.5 font-medium" for="inpRedisUrl">¿Cuál es tu sitio actual? *</label>
        <input id="inpRedisUrl" type="text" placeholder="Ej: https://www.misitio.cl" class="cot-input">
        <p id="errRedisUrl" class="cot-err hidden">Necesitamos la dirección de tu sitio actual para evaluar el rediseño.</p>
      </div>
      <div>
        <p class="text-sm font-medium mb-2">¿Qué es lo que falla o no te gusta? <span class="text-mut dark:text-mutd font-normal">(puedes marcar varias)</span></p>
        <div id="chipsFallas" class="flex flex-wrap gap-2.5"></div>
        <div id="cajaFallaOtra" class="hidden mt-3">
          <input id="inpFallaOtra" type="text" placeholder="Cuéntanos qué más falla" class="cot-input">
        </div>
      </div>
      <div>
        <p class="text-sm font-medium mb-2">¿En qué plataforma está tu sitio?</p>
        <div id="segRedisPlat" class="flex flex-wrap gap-2.5"></div>
        <div id="cajaPlatOtraRedis" class="hidden mt-3">
          <input id="inpPlatOtraRedis" type="text" placeholder="¿Qué plataforma usa tu sitio?" class="cot-input">
        </div>
      </div>
    </div>
    ${filaEstimacion(DETALLES.rediseno.estimacion)}
    ${piePanel('err1Redis')}`;

  chipsMulti('chipsFallas', FALLAS_REDISENO, estado.redisFallas, () => {
    $('cajaFallaOtra').classList.toggle('hidden', !estado.redisFallas['Otro']);
  });
  $('cajaFallaOtra').classList.toggle('hidden', !estado.redisFallas['Otro']);

  const platCont = $('segRedisPlat');
  ['WordPress','No sé','Otra'].forEach(op => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'cot-seg';
    b.textContent = op;
    if(estado.redisPlataforma === op) b.classList.add('on');
    b.addEventListener('click', () => {
      estado.redisPlataforma = op;
      platCont.querySelectorAll('.cot-seg').forEach(x => x.classList.remove('on'));
      b.classList.add('on');
      $('cajaPlatOtraRedis').classList.toggle('hidden', op !== 'Otra');
      actualizarBarra();
      actualizarPorcentaje();
    });
    platCont.appendChild(b);
  });
  $('cajaPlatOtraRedis').classList.toggle('hidden', estado.redisPlataforma !== 'Otra');

  const inpUrl = $('inpRedisUrl');
  inpUrl.value = estado.redisUrl;
  inpUrl.addEventListener('input', e => { estado.redisUrl = e.target.value.trim(); actualizarBarra(); actualizarPorcentaje(); });
  const inpFO = $('inpFallaOtra');
  inpFO.value = estado.redisFallaOtra;
  inpFO.addEventListener('input', e => { estado.redisFallaOtra = e.target.value.trim(); guardarEstado(); });
  const inpPO = $('inpPlatOtraRedis');
  inpPO.value = estado.redisPlatOtra;
  inpPO.addEventListener('input', e => { estado.redisPlatOtra = e.target.value.trim(); guardarEstado(); });
}

/* ================== PANEL MANTENCIÓN ================== */
function renderMantencion(){
  const caja = $('panelMantencion');
  caja.innerHTML = `
    <h4 class="font-display font-bold mb-1">Para mantener tu sitio, necesitamos ubicarlo</h4>
    <p class="text-xs text-mut dark:text-mutd mb-5">La mantención incluye actualizaciones, respaldos, monitoreo de seguridad y soporte directo con nosotros.</p>
    <div class="space-y-5">
      <div>
        <label class="text-xs text-mut dark:text-mutd block mb-1.5 font-medium" for="inpMantUrl">¿Cuál es tu sitio actual? *</label>
        <input id="inpMantUrl" type="text" placeholder="Ej: https://www.misitio.cl" class="cot-input">
        <p id="errMantUrl" class="cot-err hidden">Necesitamos la dirección de tu sitio para cotizar la mantención.</p>
      </div>
      <div>
        <p class="text-sm font-medium mb-2">¿En qué plataforma está tu sitio?</p>
        <div id="segMantPlat" class="flex flex-wrap gap-2.5"></div>
        <div id="cajaPlatOtraMant" class="hidden mt-3">
          <input id="inpPlatOtraMant" type="text" placeholder="¿Qué plataforma usa tu sitio?" class="cot-input">
        </div>
      </div>
      <div>
        <p class="text-sm font-medium mb-2">¿Dónde está alojado hoy?</p>
        <div id="segMantAloj" class="flex flex-wrap gap-2.5"></div>
      </div>
      <div>
        <p class="text-sm font-medium mb-2">¿Ha tenido problemas? <span class="text-mut dark:text-mutd font-normal">(puedes marcar varias)</span></p>
        <div id="chipsProblemas" class="flex flex-wrap gap-2.5"></div>
      </div>
    </div>
    ${filaEstimacion(DETALLES.mantencion.estimacion)}
    ${piePanel('err1Mant')}`;

  const platCont = $('segMantPlat');
  ['WordPress','No sé','Otra'].forEach(op => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'cot-seg';
    b.textContent = op;
    if(estado.mantPlataforma === op) b.classList.add('on');
    b.addEventListener('click', () => {
      estado.mantPlataforma = op;
      platCont.querySelectorAll('.cot-seg').forEach(x => x.classList.remove('on'));
      b.classList.add('on');
      $('cajaPlatOtraMant').classList.toggle('hidden', op !== 'Otra');
      actualizarBarra();
      actualizarPorcentaje();
    });
    platCont.appendChild(b);
  });
  $('cajaPlatOtraMant').classList.toggle('hidden', estado.mantPlataforma !== 'Otra');

  const alojCont = $('segMantAloj');
  ['Con Fractal Host','Otro proveedor','No sé'].forEach(op => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'cot-seg';
    b.textContent = op;
    if(estado.mantAlojamiento === op) b.classList.add('on');
    b.addEventListener('click', () => {
      estado.mantAlojamiento = op;
      alojCont.querySelectorAll('.cot-seg').forEach(x => x.classList.remove('on'));
      b.classList.add('on');
      actualizarBarra();
      actualizarPorcentaje();
    });
    alojCont.appendChild(b);
  });

  function toggleProblemas(){
    if(estado.mantProblemas['Ninguno']){
      Object.keys(estado.mantProblemas).forEach(k => { if(k !== 'Ninguno') estado.mantProblemas[k] = false; });
    } else if(estado.mantProblemas['Lentitud'] || estado.mantProblemas['Fallas o caídas'] || estado.mantProblemas['Ha sufrido ataques']){
      estado.mantProblemas['Ninguno'] = false;
    }
    document.querySelectorAll('#chipsProblemas .cot-seg').forEach(b => {
      b.classList.toggle('on', !!estado.mantProblemas[b.textContent]);
    });
  }
  chipsMulti('chipsProblemas', PROBLEMAS_MANT, estado.mantProblemas, toggleProblemas);
  toggleProblemas();

  const inpUrl = $('inpMantUrl');
  inpUrl.value = estado.mantUrl;
  inpUrl.addEventListener('input', e => { estado.mantUrl = e.target.value.trim(); actualizarBarra(); actualizarPorcentaje(); });
  const inpPO = $('inpPlatOtraMant');
  inpPO.value = estado.mantPlatOtra;
  inpPO.addEventListener('input', e => { estado.mantPlatOtra = e.target.value.trim(); guardarEstado(); });
}

/* ================== SELECTOR DE HOSTING ================== */
function planActual(){
  if(estado.modo !== 'nuevo' || estado.tipo === 'medida' || !estado.tipo) return null;
  if(estado.situacionHost === 'mantener') return null;
  const lista = PLANES[estado.enlace] || [];
  return lista.find(p => p.id === estado.plan) || null;
}
function enlaceLabel(){ return estado.enlace === 'usa' ? 'Hosting Internacional (Datacenter USA)' : 'Enlace Nacional Patagonia'; }
function idsRecomendados(){
  const cfg = HOSTING_TIPO[estado.tipo];
  if(!cfg) return [];
  return [cfg[estado.enlace]];
}
function aplicarHostingPreselect(){
  if(estado.tipo === 'medida'){ estado.plan = null; return; }
  const cfg = HOSTING_TIPO[estado.tipo];
  if(cfg) estado.plan = cfg[estado.enlace];
}

const ICO_HOST = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01"/></svg>';
const ICO_MIGR = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M1 6h13v11H1z"/><path d="M14 10h4l3 3v4h-7"/><circle cx="6" cy="19" r="1.8"/><circle cx="17.5" cy="19" r="1.8"/></svg>';
const ICO_KEEP = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l9-5 9 5v8l-9 5-9-5V8z"/><path d="M3 8l9 5 9-5M12 13v8"/></svg>';

function renderHosting(){
  const caja = $('cajaHosting');
  if(estado.modo !== 'nuevo'){ caja.classList.add('hidden'); return; }
  caja.classList.remove('hidden');

  if(!estado.tipo){
    caja.innerHTML = `<div class="cot-soft">Primero elige un tipo de sitio y aquí te mostraremos el plan de hosting recomendado.</div>`;
    return;
  }
  if(estado.tipo === 'medida'){
    caja.innerHTML = `
      <div class="flex items-center gap-2.5 mb-2.5">
        <span class="cot-chip">6</span>
        <span class="cot-ico">${ICO_HOST}</span>
        <p class="font-display font-semibold text-sm md:text-base">Plan de hosting</p>
      </div>
      <div class="cot-note-info">
        <strong>A evaluar según requerimientos del proyecto.</strong>
        <span class="opacity-80">El plan adecuado se definirá durante el análisis técnico de tu cotización.</span>
      </div>`;
    return;
  }

  const recomendados = idsRecomendados();
  let html = `
    <div class="flex items-center gap-2.5 mb-1">
      <span class="cot-chip">6</span>
      <span class="cot-ico">${ICO_HOST}</span>
      <p class="font-display font-semibold text-sm md:text-base">Elige tu plan de hosting</p>
    </div>
    <p class="text-xs text-mut dark:text-mutd mb-3 ml-9">
      Primero cuéntanos tu situación. Si contratas con nosotros, el primer año de hosting es <strong class="text-ok dark:text-live">$0 (GRATIS)</strong> por desarrollar tu sitio. El dominio .cl del primer año también va incluido.
    </p>
    <div class="flex flex-wrap gap-2.5 mb-4" id="grupoSituacionHost">
      <button type="button" class="cot-seg" data-host="contratar">${ICO_HOST}Quiero mi hosting con Fractal Host</button>
      <button type="button" class="cot-seg" data-host="migrar">${ICO_MIGR}Voy a migrar mi hosting actual a Fractal Host</button>
      <button type="button" class="cot-seg" data-host="mantener">${ICO_KEEP}Ya tengo hosting y no me cambio</button>
    </div>`;

  if(estado.situacionHost === 'mantener'){
    html += `
      <div class="cot-soft">
        Perfecto: desarrollamos tu sitio y lo dejamos funcionando en tu hosting actual.
        Solo considera que necesitaremos acceso (o coordinación con tu proveedor) para publicar el sitio,
        y que el beneficio de <strong class="text-ok dark:text-live">primer año $0 y sitio asegurado</strong> aplica al contratar el hosting con nosotros.
      </div>
      ${filaEstimacion(textoEstimacion())}`;
    caja.innerHTML = html;
    caja.querySelectorAll('[data-host]').forEach(btn => {
      if(btn.dataset.host === estado.situacionHost) btn.classList.add('on');
      btn.addEventListener('click', () => { estado.situacionHost = btn.dataset.host; renderHosting(); actualizarBarra(); });
    });
    return;
  }

  if(estado.situacionHost === 'migrar'){
    html += `
      <div class="cot-note-ok mb-4">
        <strong>Migración gratuita:</strong> movemos tu sitio, correos y archivos desde tu proveedor actual sin caídas ni pérdida de datos. Tú no haces nada técnico.
      </div>`;
  }

  html += `
    <div class="flex flex-wrap gap-2.5 mb-4">
      <button type="button" class="cot-seg" data-enlace="usa">Hosting Internacional · Datacenter USA</button>
      <button type="button" class="cot-seg" data-enlace="nacional">Enlace Nacional Patagonia · más rápido en el sur</button>
    </div>`;
  if(estado.enlace === 'nacional'){
    html += `<p class="text-[11px] text-mut dark:text-mutd mb-3">Servidores cerca de la Patagonia: 150 a 200 ms menos de ping para tus visitantes locales. Panel Ferozo, simple y en español.</p>`;
  }
  html += `<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3" id="gridPlanes">`;
  PLANES[estado.enlace].forEach(p => {
    const esReco = recomendados.includes(p.id);
    html += `
      <div class="det-card cot-card selectable flex gap-3 p-3.5" data-plan="${p.id}">
        <span class="cot-radio" aria-hidden="true">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#111318" stroke-width="3.5" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg>
        </span>
        <div class="min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <p class="font-semibold text-sm">${p.nombre}</p>
            ${esReco ? `<span class="cot-badge-pop text-[10px] px-2 py-0.5 rounded-full">★ Recomendado para tu tipo de sitio</span>` : ''}
          </div>
          <p class="text-xs text-mut dark:text-mutd mt-0.5">${p.gb} · ${p.correos}</p>
          <p class="text-xs mt-1">Año 1: <strong class="text-ok dark:text-live">$0 (GRATIS)</strong> · Desde año 2: <strong class="text-cydeep dark:text-cyt">${fmt(p.precio)}/año</strong></p>
        </div>
      </div>`;
  });
  html += `</div>`;
  caja.innerHTML = html;

  caja.querySelectorAll('[data-host]').forEach(btn => {
    if(btn.dataset.host === estado.situacionHost) btn.classList.add('on');
    btn.addEventListener('click', () => { estado.situacionHost = btn.dataset.host; renderHosting(); actualizarBarra(); });
  });
  caja.querySelectorAll('[data-enlace]').forEach(btn => {
    if(btn.dataset.enlace === estado.enlace) btn.classList.add('on');
    btn.addEventListener('click', () => {
      const nuevo = btn.dataset.enlace;
      if(nuevo === estado.enlace) return;
      estado.enlace = nuevo;
      const equiv = EQUIV_PLAN[estado.plan];
      const existe = PLANES[nuevo].some(p => p.id === equiv);
      estado.plan = existe ? equiv : HOSTING_TIPO[estado.tipo][nuevo];
      renderHosting();
      actualizarBarra();
      actualizarPorcentaje();
    });
  });
  caja.querySelectorAll('[data-plan]').forEach(card => {
    if(card.dataset.plan === estado.plan) card.classList.add('on');
    card.addEventListener('click', () => {
      estado.plan = card.dataset.plan;
      caja.querySelectorAll('[data-plan]').forEach(c => c.classList.toggle('on', c === card));
      actualizarBarra();
      actualizarPorcentaje();
    });
  });
}

function textoHosting(){
  if(estado.modo !== 'nuevo') return 'No aplica (servicio sobre sitio existente)';
  if(estado.tipo === 'medida') return 'A evaluar según requerimientos del proyecto';
  if(estado.situacionHost === 'mantener') return 'Mantiene su hosting actual (solo desarrollo del sitio)';
  const p = planActual();
  if(!p) return 'Por definir';
  let txt = p.nombre + ' (' + p.gb + ') · ' + enlaceLabel() + ' · Año 1: $0 (GRATIS) · Renovación desde año 2: ' + fmt(p.precio) + '/año';
  if(estado.situacionHost === 'migrar') txt += ' · Migración gratuita incluida';
  return txt;
}

/* ================== PASO 4: OPCIONES ADICIONALES ================== */
function renderAdicionales(){
  const cont = $('gridAdicionales');
  let html = '';
  ADICIONALES.forEach((it, idx) => {
    const esUltimo = idx === ADICIONALES.length - 1;
    const spanExtra = (esUltimo && ADICIONALES.length % 2 === 1) ? 'sm:col-span-2 xl:col-span-1' : '';
    html += `
      <div class="chk-extra cot-card selectable flex gap-3 p-3.5 ${spanExtra}" data-ad="${it.id}">
        <span class="cot-box" aria-hidden="true">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#111318" stroke-width="3.5" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg>
        </span>
        <span class="cot-ico shrink-0 w-10 h-10 rounded-lg bg-cy/10 border border-cy/30 dark:border-cy/25 items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${it.icon}</svg>
        </span>
        <div class="min-w-0">
          <p class="text-[9px] font-semibold uppercase tracking-wider text-mut dark:text-mutd mb-0.5">${it.cat}</p>
          <div class="flex items-center gap-1.5 flex-wrap">
            <p class="font-semibold text-sm leading-snug">${it.nombre}</p>
            <span class="cot-badge-cost text-[9px] px-1.5 py-0.5 rounded-full shrink-0">+ costo</span>
          </div>
          <p class="text-xs text-mut dark:text-mutd mt-1 leading-snug">${it.desc}</p>
        </div>
      </div>`;
  });
  cont.innerHTML = html;
  cont.querySelectorAll('[data-ad]').forEach(lbl => {
    if(estado.extras[lbl.dataset.ad]) lbl.classList.add('on');
    lbl.addEventListener('click', () => {
      const id = lbl.dataset.ad;
      estado.extras[id] = !estado.extras[id];
      lbl.classList.toggle('on', !!estado.extras[id]);
      actualizarBarra();
      actualizarPorcentaje();
    });
  });

  const inc = $('gridIncluidos');
  inc.innerHTML = INCLUIDOS.map(it => `
    <div class="cot-note-ok flex gap-2.5 items-start !bg-transparent">
      <span class="mt-0.5 shrink-0 w-5 h-5 rounded-md flex items-center justify-center bg-ok text-white dark:bg-live dark:text-night">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg>
      </span>
      <div class="min-w-0">
        <p class="font-semibold text-[13px] leading-snug">${it.nombre}</p>
        <p class="text-[11px] opacity-80 mt-0.5 leading-snug">${it.desc}</p>
      </div>
    </div>`).join('');
}
function adicionalesSeleccionadas(){
  return ADICIONALES.filter(it => estado.extras[it.id]).map(it => it.nombre);
}
function omitirAdicionales(){
  estado.extras = {};
  renderAdicionales();
  actualizarBarra();
  irPaso(5);
}

/* ================== BARRA RECORDATORIO ================== */
function actualizarBarra(){
  const barra = $('barraSeleccion');
  if(!barra) return;
  const chips = [];
  if(estado.tipo){
    const t = TIPOS.find(x => x.id === estado.tipo);
    if(t) chips.push(t.nombre);
    const det = DETALLES[estado.tipo];
    if(det && estado.opcion){
      const op = det.opciones.find(o => o.id === estado.opcion);
      if(op) chips.push(op.nombre);
    }
    if(det && det.extra && estado.extra) chips.push(det.extra.label + ' (costo mayor)');
    if(estado.tipo !== 'medida'){
      if(estado.situacionHost === 'mantener') chips.push('Mantiene su hosting');
      else {
        const pl = planActual();
        if(pl) chips.push(pl.nombre + (estado.situacionHost === 'migrar' ? ' (migración)' : ''));
      }
    } else {
      chips.push('Hosting: a evaluar');
    }
    const nAd = adicionalesSeleccionadas().length;
    if(nAd > 0) chips.push(nAd + ' opc. adicional' + (nAd > 1 ? 'es' : ''));
  }
  if(estado.modo === 'rediseno' && estado.redisUrl) chips.push(estado.redisUrl);
  if(estado.modo === 'mantencion' && estado.mantUrl) chips.push(estado.mantUrl);

  barra.innerHTML = chips.length
    ? '<span class="text-xs text-mut dark:text-mutd mr-1">Tu selección:</span>' + chips.map(c => `<span class="cot-bar-chip">${c}</span>`).join('')
    : '';
  guardarEstado();
}

/* ================== % COMPLETADO ================== */
function calcularPorcentaje(){
  if(estado.paso >= 6) return 100;
  const items = [];
  items.push(estado.tipo ? 1 : 0);
  if(estado.tipo === 'rediseno') items.push(estado.redisUrl ? 1 : 0);
  else if(estado.tipo === 'mantencion') items.push(estado.mantUrl ? 1 : 0);
  else if(estado.tipo && DETALLES[estado.tipo]) items.push(estado.opcion ? 1 : 0);
  items.push(estado.negocio ? 1 : 0);
  items.push(estado.persona ? 1 : 0);
  items.push(estado.rubro ? 1 : 0);
  items.push(estado.correos ? 1 : 0);
  items.push(estado.dominio ? 1 : 0);
  items.push($('inpNombre').value.trim() ? 1 : 0);
  items.push(estado.fonoDigitos.length === 8 ? 1 : 0);
  const mailVal = $('inpMail').value.trim();
  items.push(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mailVal) ? 1 : 0);
  items.push(estado.pago ? 1 : 0);
  return Math.round(items.reduce((a,b) => a+b, 0) / items.length * 100);
}
function actualizarPorcentaje(){
  const p = calcularPorcentaje();
  $('pctNum').textContent = p + '%';
  $('pctRing').style.strokeDashoffset = (94.2 * (1 - p/100)).toFixed(1);
  guardarEstado();
}

function textoEstimacion(){
  const det = DETALLES[estado.tipo];
  if(!det) return 'A convenir';
  if(det.estimacion) return det.estimacion;
  if(det.desde) return 'Desde ' + fmt(det.desde) + ' CLP';
  return 'Se cotiza según tu proyecto';
}

/* ================== PASO 2 ================== */
$('inpNegocio').addEventListener('input', e => {
  estado.negocio = e.target.value.trim();
  errShow('errNegocio', false);
  actualizarPorcentaje();
});

document.querySelectorAll('.persona-card').forEach(card => {
  card.addEventListener('click', () => {
    estado.persona = card.dataset.pers;
    document.querySelectorAll('.persona-card').forEach(c => c.classList.toggle('on', c === card));
    $('grupoPersona').classList.remove('cot-field-err');
    errShow('errPersona', false);
    actualizarPorcentaje();
  });
});

$('inpRubro').addEventListener('change', e => {
  estado.rubro = e.target.value;
  $('cajaRubroOtro').classList.toggle('hidden', estado.rubro !== 'Otro');
  $('inpRubro').classList.remove('cot-field-err');
  errShow('errRubro', false);
  actualizarPorcentaje();
});
$('inpRubroOtro').addEventListener('input', e => { estado.rubroOtro = e.target.value.trim(); guardarEstado(); });

document.querySelectorAll('#grupoCorreos .cot-seg').forEach(btn => {
  btn.addEventListener('click', () => {
    estado.correos = btn.dataset.val;
    document.querySelectorAll('#grupoCorreos .cot-seg').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
    errShow('errCorreos', false);
    actualizarPorcentaje();
  });
});

document.querySelectorAll('#grupoDominio .cot-seg').forEach(btn => {
  btn.addEventListener('click', () => {
    estado.dominio = btn.dataset.val;
    document.querySelectorAll('#grupoDominio .cot-seg').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
    errShow('errDominio', false);
    controlarCajaDominio();
    actualizarPorcentaje();
  });
});

function controlarCajaDominio(){
  const caja = $('cajaDominio');
  const lbl = $('lblDominio');
  const notaNose = $('notaDominioNose');
  const inp = $('inpDominio');
  if(estado.dominio === 'si'){
    caja.classList.remove('hidden'); notaNose.classList.add('hidden');
    lbl.textContent = 'Escríbelo aquí';
    inp.placeholder = 'Ej: minegocio.cl';
  } else if(estado.dominio === 'no'){
    caja.classList.remove('hidden'); notaNose.classList.add('hidden');
    lbl.textContent = '¿Qué nombre te gustaría para tu sitio?';
    inp.placeholder = 'Ej: minegocio.cl';
  } else if(estado.dominio === 'nose'){
    caja.classList.add('hidden'); notaNose.classList.remove('hidden');
    inp.value = ''; estado.domTexto = '';
  } else {
    caja.classList.add('hidden'); notaNose.classList.add('hidden');
  }
}
$('inpDominio').addEventListener('input', e => { estado.domTexto = e.target.value.trim(); guardarEstado(); });

/* ================== PASO 3 ================== */
$('inpNombre').addEventListener('input', () => { errShow('errNombre', false); actualizarPorcentaje(); });
$('inpMail').addEventListener('input', () => { errShow('errMail', false); actualizarPorcentaje(); });
$('inpMensaje').addEventListener('input', guardarEstado);

$('inpFono').addEventListener('input', e => {
  let digitos = e.target.value.replace(/\D/g, '').slice(0, 8);
  estado.fonoDigitos = digitos;
  e.target.value = digitos.length > 4 ? digitos.slice(0,4) + ' ' + digitos.slice(4) : digitos;
  errShow('errFono', false);
  actualizarPorcentaje();
});

function formatearRut(valor){
  let limpio = valor.replace(/[^0-9kK]/g, '').toUpperCase().slice(0, 9);
  if(!limpio) return '';
  const dv = limpio.slice(-1);
  let cuerpo = limpio.slice(0, -1);
  cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return cuerpo + '-' + dv;
}
$('inpRut').addEventListener('input', e => {
  const pos = e.target.selectionStart;
  e.target.value = formatearRut(e.target.value);
  estado.rut = e.target.value;
  try{ e.target.setSelectionRange(Math.min(pos, e.target.value.length), Math.min(pos, e.target.value.length)); }catch(err){}
  guardarEstado();
});

document.querySelectorAll('#grupoPago .cot-seg').forEach(btn => {
  btn.addEventListener('click', () => {
    estado.pago = btn.dataset.val;
    document.querySelectorAll('#grupoPago .cot-seg').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
    $('grupoPago').classList.remove('cot-field-err');
    errShow('errPago', false);
    actualizarPorcentaje();
  });
});

document.querySelectorAll('#grupoRef .cot-seg').forEach(btn => {
  btn.addEventListener('click', () => {
    estado.refSitio = btn.dataset.val;
    document.querySelectorAll('#grupoRef .cot-seg').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
    $('cajaRef').classList.toggle('hidden', estado.refSitio !== 'si');
    guardarEstado();
  });
});
$('inpRefUrl').addEventListener('input', e => { estado.refUrl = e.target.value.trim(); errShow('errRefUrl', false); guardarEstado(); });
$('inpRefNota').addEventListener('input', e => { estado.refNota = e.target.value.trim(); guardarEstado(); });

/* ================== ADJUNTOS (50 MB) ================== */
$('inpAdjuntos').addEventListener('change', pintarAdjuntos);

function pintarAdjuntos(){
  const lista = $('listaAdjuntos');
  lista.innerHTML = '';
  errShow('errArch', false);
  const archivos = $('inpAdjuntos').files;
  for(const f of archivos){
    const chip = document.createElement('span');
    chip.className = 'cot-file-chip';
    chip.textContent = f.name + ' (' + (f.size/1024/1024).toFixed(1) + ' MB)';
    lista.appendChild(chip);
  }
}

function validarAdjuntos(){
  const archivos = $('inpAdjuntos').files;
  for(const f of archivos){
    const ext = f.name.split('.').pop().toLowerCase();
    if(!ARCHIVOS_PERMITIDOS.includes(ext)){
      $('errArch').textContent = 'El archivo "' + f.name + '" no tiene un formato permitido (PDF, DOC, XLS, TXT, JPG, PNG o WebP).';
      errShow('errArch', true);
      return false;
    }
    if(f.size > 50*1024*1024){
      $('errArch').textContent = 'El archivo "' + f.name + '" supera los 50 MB permitidos.';
      errShow('errArch', true);
      return false;
    }
  }
  return true;
}

/* ================== VALIDACIONES POR PASO ================== */
function validarPaso1(){
  let err = null;
  if(estado.modo === 'rediseno'){
    if(!estado.redisUrl){
      marcarError($('inpRedisUrl'));
      errShow('errRedisUrl', true);
      mostrarPrimerError($('inpRedisUrl'));
      return false;
    }
    errShow('errRedisUrl', false);
  } else if(estado.modo === 'mantencion'){
    if(!estado.mantUrl){
      marcarError($('inpMantUrl'));
      errShow('errMantUrl', true);
      mostrarPrimerError($('inpMantUrl'));
      return false;
    }
    errShow('errMantUrl', false);
  } else {
    err = $('err1Nuevo');
    if(!estado.tipo){
      marcarError(gridTipos);
      mostrarPrimerError(gridTipos);
      if(err){ err.textContent = 'Elige un tipo de sitio para continuar.'; err.classList.remove('hidden'); }
      return false;
    }
    const det = DETALLES[estado.tipo];
    if(det && !estado.opcion){
      marcarError($('panelDetalle'));
      mostrarPrimerError($('panelDetalle'));
      if(err){ err.textContent = 'Elige una variante para continuar.'; err.classList.remove('hidden'); }
      return false;
    }
    if(err) err.classList.add('hidden');
  }
  return true;
}

function validarPaso2(){
  let ok = true, primero = null;
  if(!estado.negocio){ marcarError($('inpNegocio')); errShow('errNegocio', true); ok = false; primero = primero || $('inpNegocio'); }
  if(!estado.persona){ marcarError($('grupoPersona')); errShow('errPersona', true); ok = false; primero = primero || $('grupoPersona'); }
  const rubroVal = $('inpRubro').value;
  estado.rubro = rubroVal || '';
  if(!estado.rubro){ marcarError($('inpRubro')); errShow('errRubro', true); $('errRubro').textContent = 'Selecciona tu rubro para continuar.'; ok = false; primero = primero || $('inpRubro'); }
  else if(estado.rubro === 'Otro' && !estado.rubroOtro){ marcarError($('inpRubroOtro')); errShow('errRubro', true); $('errRubro').textContent = 'Cuéntanos tu rubro en el campo de texto.'; ok = false; primero = primero || $('inpRubroOtro'); }
  if(!estado.correos){ errShow('errCorreos', true); ok = false; primero = primero || $('grupoCorreos'); }
  if(!estado.dominio){ marcarError($('grupoDominio')); errShow('errDominio', true); ok = false; primero = primero || $('grupoDominio'); }
  if(!ok) mostrarPrimerError(primero);
  return ok;
}

function validarPaso3(){
  let ok = true, primero = null;
  const nombre = $('inpNombre').value.trim();
  const mail = $('inpMail').value.trim();
  const mailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
  if(!nombre){ marcarError($('inpNombre')); errShow('errNombre', true); ok = false; primero = primero || $('inpNombre'); }
  if(estado.fonoDigitos.length !== 8){ marcarError($('inpFono')); errShow('errFono', true); ok = false; primero = primero || $('inpFono'); }
  if(!mailOk){ marcarError($('inpMail')); errShow('errMail', true); ok = false; primero = primero || $('inpMail'); }
  if(!estado.pago){ marcarError($('grupoPago')); errShow('errPago', true); ok = false; primero = primero || $('grupoPago'); }
  if(estado.refSitio === 'si' && !estado.refUrl){ marcarError($('inpRefUrl')); errShow('errRefUrl', true); ok = false; primero = primero || $('inpRefUrl'); }
  if(ok && !validarAdjuntos()) return false;
  if(!ok) mostrarPrimerError(primero);
  return ok;
}

/* ================== NAVEGACIÓN ================== */
function irPaso(n){
  if(n === estado.paso) return true;

  if(n === 2 && estado.paso === 1 && !validarPaso1()) return false;
  if(n === 3 && estado.paso === 2 && !validarPaso2()) return false;
  if(n >= 4 && estado.paso === 3 && !validarPaso3()) return false;

  if(n === 5) renderResumen();

  estado.paso = n;
  mostrarPaneles();
  window.scrollTo({top:0, behavior:'smooth'});
  guardarEstado();
  return true;
}

function mostrarPaneles(){
  for(let i=1;i<=6;i++) $('paso'+i).classList.toggle('active', i===estado.paso);
  $('progressBar').style.width = (Math.min(estado.paso,5)/5*100) + '%';
  ['lbl1','lbl2','lbl3','lbl4','lbl5'].forEach((id, idx) => {
    $(id).classList.toggle('done', (idx+1) <= Math.min(estado.paso,5));
  });
  actualizarPorcentaje();
}

function irAPaso(n){
  if(n === estado.paso) return;
  if(n < estado.paso){ irPaso(n); return; }
  for(let p = estado.paso; p < n; p++){
    if(!irPaso(p + 1)) return;
  }
}

/* ================== DATOS DE LA SOLICITUD ================== */
function dominioFormateado(){
  if(estado.dominio === 'si') return 'Sí, ya lo tiene: ' + (estado.domTexto || '(no indicado)');
  if(estado.dominio === 'no') return 'Aún no tiene. Le gustaría: ' + (estado.domTexto || '(sin preferencia)');
  if(estado.dominio === 'nose') return 'No sabe si tiene dominio';
  return 'Sin indicar';
}
function personaFormateada(){
  if(estado.persona === 'empresa') return 'Empresa' + (estado.rut ? ' · RUT ' + estado.rut : '');
  if(estado.persona === 'natural') return 'Persona natural';
  return 'Sin indicar';
}
function rubroFormateado(){
  if(!estado.rubro) return 'Sin indicar';
  return estado.rubro === 'Otro' ? ('Otro: ' + (estado.rubroOtro || '(sin detalle)')) : estado.rubro;
}
function referenciaFormateada(){
  if(estado.refSitio !== 'si') return 'No compartió sitio de referencia';
  return estado.refUrl + (estado.refNota ? ' — Le gusta: ' + estado.refNota : '');
}
function fallasListadas(){ return FALLAS_REDISENO.filter(f => estado.redisFallas[f]); }
function problemasListados(){ return PROBLEMAS_MANT.filter(p => estado.mantProblemas[p]); }

function detalleAdicional(){
  const lineas = [];
  lineas.push('• Negocio: ' + (estado.negocio || '(sin nombre)') + ' · Rubro: ' + rubroFormateado() + ' · Correos: ' + (estado.correos || 'Sin indicar'));
  const ad = adicionalesSeleccionadas();
  lineas.push('• Opciones adicionales: ' + (ad.length ? ad.join('; ') : 'Ninguna (paso omitido o sin selección)'));
  if(estado.modo === 'nuevo') lineas.push('• Incluidas sin costo: ' + INCLUIDOS.map(i => i.nombre).join(', '));
  lineas.push('• Sitio de referencia: ' + referenciaFormateada());
  if(estado.tipo === 'rediseno'){
    lineas.push('• Sitio actual: ' + (estado.redisUrl || '(no indicado)'));
    let fallas = fallasListadas();
    if(estado.redisFallas['Otro'] && estado.redisFallaOtra) fallas = fallas.map(f => f === 'Otro' ? 'Otro: ' + estado.redisFallaOtra : f);
    lineas.push('• Qué falla: ' + (fallas.length ? fallas.join('; ') : 'Sin indicar'));
    lineas.push('• Plataforma: ' + (estado.redisPlataforma === 'Otra' ? 'Otra: ' + (estado.redisPlatOtra || '(sin detalle)') : (estado.redisPlataforma || 'Sin indicar')));
  }
  if(estado.tipo === 'mantencion'){
    lineas.push('• Sitio actual: ' + (estado.mantUrl || '(no indicado)'));
    lineas.push('• Plataforma: ' + (estado.mantPlataforma === 'Otra' ? 'Otra: ' + (estado.mantPlatOtra || '(sin detalle)') : (estado.mantPlataforma || 'Sin indicar')));
    lineas.push('• Alojamiento actual: ' + (estado.mantAlojamiento || 'Sin indicar'));
    lineas.push('• Problemas: ' + (problemasListados().length ? problemasListados().join('; ') : 'Sin indicar'));
  }
  return lineas.join('\n');
}

function datosSolicitud(){
  const nombre = $('inpNombre').value.trim();
  const fono = '+56 9 ' + estado.fonoDigitos;
  const mail = $('inpMail').value.trim();
  estado.mensaje = $('inpMensaje').value.trim();
  const t = TIPOS.find(x => x.id === estado.tipo) || {};
  const det = DETALLES[estado.tipo];
  const op = det && estado.opcion ? det.opciones.find(o => o.id === estado.opcion) : null;
  const precioTxt = textoEstimacion();
  const extraTxt = (det && det.extra && estado.extra) ? det.extra.label : '';
  let variante = op ? op.nombre : 'A convenir';
  if(estado.tipo === 'rediseno') variante = 'Rediseño de sitio existente';
  if(estado.tipo === 'mantencion') variante = 'Mantención de sitio existente';
  const archivos = $('inpAdjuntos').files;
  const adjTxt = Array.from(archivos).map(f => f.name).join(', ');
  const modoTxt = {nuevo:'Crear sitio web nuevo', rediseno:'Rediseño de sitio', mantencion:'Mantención web'}[estado.modo];
  return {nombre, fono, mail, t, det, op, precioTxt, extraTxt, variante, adjTxt, archivos, modoTxt,
          detalle: detalleAdicional(), hosting: textoHosting(), plan: planActual(),
          adicionales: adicionalesSeleccionadas(), referencia: referenciaFormateada(),
          pago: estado.pago || 'Sin indicar', mensaje: estado.mensaje,
          persona: personaFormateada(), negocio: estado.negocio, rubro: rubroFormateado(), correos: estado.correos || 'Sin indicar',
          dominio: dominioFormateado()};
}

/* ================== COSTO ANUAL (AÑO 2 EN ADELANTE) ================== */
function textoDominioAnual(){
  if(estado.dominio === 'si') return 'Renovación directa en NIC Chile: ' + fmt(DOMINIO_NIC) + '/año';
  if(estado.dominio === 'no') return 'Registrado y administrado con nosotros: ' + fmt(DOMINIO_FH) + '/año';
  return 'Entre ' + fmt(DOMINIO_NIC) + ' directo en NIC Chile y ' + fmt(DOMINIO_FH) + ' si lo administramos nosotros, por año';
}

function costoAnualCalculado(){
  const plan = planActual();
  let hostMin = null, hostMax = null, hostTxt = '';
  if(estado.situacionHost === 'mantener'){
    hostTxt = 'No se cobra (mantienes tu hosting actual)';
  } else if(plan){
    hostTxt = fmt(plan.precio) + ' CLP/año (' + plan.nombre + ')';
    hostMin = hostMax = plan.precio;
  } else {
    hostTxt = 'A evaluar según el proyecto';
  }
  let domMin = DOMINIO_NIC, domMax = DOMINIO_NIC;
  if(estado.dominio === 'no'){ domMin = domMax = DOMINIO_FH; }
  else if(estado.dominio !== 'si'){ domMin = DOMINIO_NIC; domMax = DOMINIO_FH; }
  else { domMin = domMax = DOMINIO_NIC; }

  let totalTxt;
  if(hostMin === null){
    totalTxt = 'Hosting a evaluar + dominio (' + textoDominioAnual() + ')';
  } else if(hostMin === hostMax && domMin === domMax){
    totalTxt = fmt(hostMin + domMin) + ' CLP/año aprox.';
  } else {
    totalTxt = 'Entre ' + fmt(hostMin + domMin) + ' y ' + fmt(hostMax + domMax) + ' CLP/año aprox.';
  }
  return {hostTxt, totalTxt};
}

/* ================== PASO 5: RESUMEN ================== */
function filaResumen(label, valor, destaque){
  return `<div class="cot-row">
    <span>${label}</span>
    <span class="${destaque || ''}">${valor || '—'}</span>
  </div>`;
}
function bloqueResumen(titulo, pasoEditar, contenido){
  return `<div class="cot-block">
    <div class="flex items-center justify-between gap-3 mb-2">
      <p class="cot-block-title">${titulo}</p>
      ${pasoEditar ? `<button type="button" onclick="irPaso(${pasoEditar})" class="text-xs px-3 py-1.5 rounded-lg border border-cydeep/40 text-cydeep dark:border-cy/40 dark:text-cyt hover:bg-cy/10 transition inline-flex items-center gap-1.5">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3l4 4L8 20H4v-4L17 3z"/></svg>Editar</button>` : ''}
    </div>
    ${contenido}
  </div>`;
}

function renderResumen(){
  const d = datosSolicitud();
  let html = '';

  html += bloqueResumen('PROYECTO', 1,
    filaResumen('Servicio', d.modoTxt) +
    filaResumen('Tipo de sitio', d.t.nombre || '') +
    filaResumen('Variante elegida', d.variante) +
    (d.extraTxt ? filaResumen('Función adicional', d.extraTxt + ' (costo mayor)', 'text-[#8a6d00] dark:text-yel') : '') +
    filaResumen('Plazo estimado', d.t.plazo || '') +
    filaResumen('Inversión estimada', d.precioTxt, 'cot-estim !text-[1.02rem]')
  );

  let hostHtml = '';
  if(estado.modo !== 'nuevo'){
    hostHtml = filaResumen('Hosting', 'No aplica: es un servicio sobre tu sitio existente. Si lo necesitas, lo vemos en la cotización formal.');
  } else if(estado.tipo === 'medida'){
    hostHtml = filaResumen('Plan de hosting', 'A evaluar según requerimientos del proyecto. Se definirá durante el análisis técnico de tu cotización.');
  } else if(estado.situacionHost === 'mantener'){
    hostHtml = filaResumen('Hosting', 'El cliente mantiene su hosting actual · Solo desarrollo del sitio') +
      filaResumen('Dominio .cl', 'Primer año incluido ($0). ' + textoDominioAnual() + '.');
  } else if(d.plan){
    hostHtml = filaResumen('Situación', estado.situacionHost === 'migrar' ? 'Migrará su hosting actual a Fractal Host' : 'Contratará hosting nuevo con Fractal Host') +
      filaResumen('Plan elegido', d.plan.nombre + ' · ' + d.plan.gb + ' · ' + d.plan.correos) +
      filaResumen('Tipo de enlace', enlaceLabel()) +
      filaResumen('Primer año', '<span class="cot-estim !text-[1rem]">$0 (GRATIS)</span> — incluido por desarrollar tu sitio con nosotros') +
      filaResumen('Renovación desde el año 2', fmt(d.plan.precio) + ' CLP al año (valor normal del plan)') +
      (estado.situacionHost === 'migrar' ? filaResumen('Migración', 'Gratuita: movemos tu sitio desde tu proveedor actual sin caídas ni pérdida de datos') : '') +
      filaResumen('Dominio .cl', 'Primer año incluido ($0). ' + textoDominioAnual() + '.');
  }
  if(estado.modo === 'nuevo' && (estado.tipo === 'onepage' || estado.tipo === 'corp') && estado.situacionHost !== 'mantener'){
    hostHtml += `<div class="cot-note-ok mt-3">
      <strong>Sitio asegurado:</strong> como desarrollas tu sitio y mantienes el hosting con nosotros, nos hacemos cargo de que funcione: mantención gratuita de plantillas y plugins, y si sufre un ataque, lo reparamos sin costo adicional. Aplica a sitios simples y corporativos.
    </div>`;
  }
  html += bloqueResumen('HOSTING Y DOMINIO', 2, hostHtml);

  /* Bloque de costo anual desde el segundo año */
  if(estado.modo === 'nuevo'){
    const ca = costoAnualCalculado();
    html += bloqueResumen('COSTO ANUAL DESDE EL SEGUNDO AÑO', 2,
      filaResumen('Renovación del hosting', ca.hostTxt) +
      filaResumen('Renovación del dominio .cl', textoDominioAnual()) +
      filaResumen('Total anual aproximado', ca.totalTxt, 'cot-estim !text-[1.02rem]') +
      `<p class="text-[11px] text-mut dark:text-mutd mt-2">El primer año de hosting y dominio es $0 por desarrollar tu sitio con nosotros. Estos son los valores normales de renovación anual (dominio .cl según tarifa vigente de NIC Chile: ${fmt(DOMINIO_NIC)} directo en nic.cl; ${fmt(DOMINIO_FH)} si lo registramos y administramos nosotros).</p>`
    );
  }

  html += bloqueResumen('TU NEGOCIO', 2,
    filaResumen('Negocio o proyecto', d.negocio || '(sin nombre)') +
    filaResumen('Rubro', d.rubro) +
    filaResumen('Solicitante', d.persona) +
    filaResumen('Cuentas de correo', d.correos) +
    filaResumen('Dominio registrado', d.dominio)
  );

  html += bloqueResumen('CONTACTO Y PAGO', 3,
    filaResumen('Nombre', d.nombre) +
    filaResumen('WhatsApp / celular', d.fono) +
    filaResumen('Correo', d.mail) +
    (estado.rut ? filaResumen('RUT', estado.rut) : '') +
    filaResumen('Pago preferido', d.pago) +
    (d.mensaje ? filaResumen('Mensaje', '"' + d.mensaje + '"') : '') +
    (d.adjTxt ? filaResumen('Archivos adjuntos', d.adjTxt) : '') +
    filaResumen('Contenido (logo, fotos, textos)', 'Nos lo envías a hola@fractalhost.cl cuando partamos')
  );

  html += bloqueResumen('OPCIONES ADICIONALES', 4,
    filaResumen('Seleccionadas', d.adicionales.length ? d.adicionales.join(' · ') : 'Ninguna') +
    filaResumen('Sitio de referencia', d.referencia) +
    `<div class="cot-note-ok mt-3">
      <strong>Incluido sin costo en tu sitio:</strong> ${INCLUIDOS.map(i => i.nombre).join(' · ')}.
    </div>`
  );

  html += bloqueResumen('QUÉ PASA DESPUÉS', null, `
    <div class="space-y-3 text-sm text-txt dark:text-txtd">
      <p class="flex gap-3 items-start"><span class="cot-chip">1</span><span>Te enviamos la <strong>cotización formal</strong> por correo o WhatsApp, en menos de 24 h hábiles.</span></p>
      <p class="flex gap-3 items-start"><span class="cot-chip">2</span><span>Coordinamos y pagas el anticipo: <strong>50% en sitios simples</strong> o <strong>30% en proyectos grandes</strong>.</span></p>
      <p class="flex gap-3 items-start"><span class="cot-chip">3</span><span>Nos envías tu contenido (logo, fotos y textos) a <a href="mailto:hola@fractalhost.cl" class="text-cydeep dark:text-cyt font-semibold hover:underline">hola@fractalhost.cl</a> y comenzamos.</span></p>
    </div>`);

  $('resumenContenido').innerHTML = html;
}

/* ================== PDF ================== */
function descargarPDF(){
  if(!window.jspdf || !window.jspdf.jsPDF) return;
  const d = datosSolicitud();
  const doc = new window.jspdf.jsPDF();
  const W = 210;
  let y = 0;

  doc.setFillColor(4, 7, 13);
  doc.rect(0, 0, W, 32, 'F');
  doc.setTextColor(0, 169, 196);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('FRACTAL HOST — PATAGONIA CONECTADA', 14, 13);
  doc.setTextColor(237, 242, 248);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Resumen de solicitud de cotización' + (estado.codigo ? ' · ' + estado.codigo : ''), 14, 20);
  doc.setFontSize(8);
  doc.setTextColor(150, 170, 195);
  doc.text('Generado el ' + new Date().toLocaleString('es-CL'), 14, 26);
  y = 42;

  function linea(label, valor, resalte){
    if(y > 270){ doc.addPage(); y = 20; }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(0, 140, 165);
    doc.text(label + ':', 14, y);
    doc.setFont('helvetica', resalte ? 'bold' : 'normal');
    doc.setTextColor(resalte ? 0 : 43, resalte ? 169 : 47, resalte ? 196 : 54);
    const partes = doc.splitTextToSize(String(valor || '—'), 130);
    doc.text(partes, 66, y);
    y += partes.length * 4.5 + 2.5;
  }
  function titulo(txt){
    if(y > 260){ doc.addPage(); y = 20; }
    y += 4;
    doc.setFillColor(234, 243, 251);
    doc.roundedRect(12, y - 4.5, W - 24, 8, 1.5, 1.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(4, 7, 13);
    doc.text(txt, 16, y);
    y += 9;
  }

  titulo('PROYECTO');
  linea('Servicio', d.modoTxt);
  linea('Tipo de sitio', d.t.nombre || '');
  linea('Variante', d.variante);
  if(d.extraTxt) linea('Función adicional', d.extraTxt + ' (costo mayor)');
  linea('Plazo estimado', d.t.plazo || '');
  linea('Inversión estimada', d.precioTxt, true);

  titulo('HOSTING Y DOMINIO');
  linea('Hosting', d.hosting);
  if(d.plan && estado.situacionHost !== 'mantener'){
    linea('Primer año', '$0 (GRATIS) — incluido por desarrollar el sitio con Fractal Host', true);
    linea('Renovación hosting (año 2+)', fmt(d.plan.precio) + ' CLP al año');
  }
  linea('Dominio registrado', d.dominio);
  linea('Dominio .cl (año 2+)', textoDominioAnual());

  if(estado.modo === 'nuevo'){
    const ca = costoAnualCalculado();
    titulo('COSTO ANUAL DESDE EL SEGUNDO AÑO');
    linea('Renovación del hosting', ca.hostTxt);
    linea('Renovación del dominio .cl', textoDominioAnual());
    linea('Total anual aproximado', ca.totalTxt, true);
    linea('Nota', 'Dominio .cl según tarifa NIC Chile: ' + fmt(DOMINIO_NIC) + '/año directo en nic.cl; ' + fmt(DOMINIO_FH) + '/año si lo registramos y administramos nosotros.');
  }

  titulo('TU NEGOCIO');
  linea('Negocio o proyecto', d.negocio || '(sin nombre)');
  linea('Rubro', d.rubro);
  linea('Solicitante', d.persona);
  linea('Cuentas de correo', d.correos);

  titulo('CONTACTO Y PAGO');
  linea('Nombre', d.nombre);
  linea('Celular', d.fono);
  linea('Correo', d.mail);
  if(estado.rut) linea('RUT', estado.rut);
  linea('Pago preferido', d.pago);
  if(d.mensaje) linea('Mensaje', d.mensaje);
  if(d.adjTxt) linea('Adjuntos', d.adjTxt);
  linea('Opciones adicionales', d.adicionales.length ? d.adicionales.join('; ') : 'Ninguna');
  linea('Sitio de referencia', d.referencia);

  titulo('DETALLES');
  d.detalle.split('\n').forEach(l => linea('', l.replace(/^•\s*/, '')));

  titulo('QUÉ PASA DESPUÉS');
  linea('1', 'Te enviamos la cotización formal en menos de 24 h hábiles.');
  linea('2', 'Coordinamos y pagas el anticipo (50% sitios simples / 30% proyectos grandes).');
  linea('3', 'Nos envías logo, fotos y textos a hola@fractalhost.cl y comenzamos.');

  if(y > 255){ doc.addPage(); y = 20; }
  y += 6;
  doc.setFontSize(7.5);
  doc.setTextColor(120, 140, 160);
  const pie = doc.splitTextToSize('Este documento es un resumen referencial de la solicitud y no constituye una cotización formal. Valores líquidos; se emite Boleta de Honorarios (+15,25% que el cliente declara al SII). Fractal Host · hola@fractalhost.cl · +56 9 5413 2014 · Punta Arenas, Chile.', W - 28);
  doc.text(pie, 14, y);

  doc.save('resumen-cotizacion-fractalhost.pdf');
}

/* ================== ENVÍO ================== */
function codigoLocalRespaldo(){
  const n = (parseInt(localStorage.getItem('fhCotNum') || '0', 10) + 1);
  localStorage.setItem('fhCotNum', String(n));
  return 'COT-' + String(n).padStart(4, '0');
}

async function enviarCorreo(fd){
  try{
    const resp = await fetch('cotizacion-enviar.php', {method:'POST', body: fd});
    if(resp.status === 404) return {ok:false, msg:'no encontré cotizacion-enviar.php en el hosting'};
    if(!resp.ok) return {ok:false, msg:'HTTP ' + resp.status};
    const txt = (await resp.text()).trim();
    try{
      const datos = JSON.parse(txt);
      return (datos && typeof datos === 'object') ? datos : {ok:false, msg:'Respuesta no válida'};
    }catch(e){
      return {ok:false, msg:'Respuesta no válida del servidor'};
    }
  }catch(err){
    return {ok:false, msg:'sin backend PHP en este hosting'};
  }
}

async function enviarSolicitud(){
  const d = datosSolicitud();
  const btn = $('btnEnviar');
  btn.disabled = true;
  btn.innerHTML = 'Enviando tu solicitud…';

  const honeypot = $('fh_website').value.trim();

  let codigo, envioOk = false, motivo = '';
  if(honeypot === ''){
    const fd = new FormData();
    fd.append('nombre', d.nombre);
    fd.append('telefono', d.fono);
    fd.append('correo', d.mail);
    fd.append('persona', d.persona);
    fd.append('tipo', d.t.nombre || '');
    fd.append('variante', d.variante);
    fd.append('extra', d.extraTxt);
    fd.append('plazo', d.t.plazo || '');
    fd.append('precio', d.precioTxt);
    fd.append('dominio', d.dominio);
    fd.append('contenidos', '');
    fd.append('pago', d.pago);
    fd.append('mensaje', d.mensaje);
    fd.append('detalle', d.detalle);
    fd.append('hosting', d.hosting);
    fd.append('fh_website', honeypot);
    for(const f of d.archivos) fd.append('adjuntos[]', f);

    const respuesta = await enviarCorreo(fd);
    if(respuesta && respuesta.ok && respuesta.codigo){ codigo = respuesta.codigo; envioOk = true; }
    else {
      codigo = (respuesta && respuesta.codigo) ? respuesta.codigo : codigoLocalRespaldo();
      motivo = (respuesta && respuesta.msg) ? respuesta.msg : '';
    }
  } else {
    codigo = codigoLocalRespaldo();
    envioOk = true;
  }

  estado.codigo = codigo;

  const nombreLimpio = (d.nombre || '').trim();
  $('saludoFinal').innerHTML = nombreLimpio
    ? '¡Listo, <span class="text-cydeep dark:text-cyt">' + nombreLimpio.split(' ')[0] + '</span>!'
    : '¡Listo!';
  $('resCodigo').textContent = codigo;
  $('estadoEnvio').innerHTML = envioOk
    ? `Te enviamos una copia por correo a <strong>${d.mail}</strong> con tu código (revisa spam si no lo ves). Nosotros también la recibimos. Te respondemos en menos de 24 h hábiles.`
    : `Tu solicitud quedó lista con este código. Envíala por WhatsApp con un clic (botón abajo) y te respondemos en menos de 24 h hábiles.`
      + (motivo ? `<span class="block mt-2 text-[11px] text-mut dark:text-mutd">Copia automática no disponible: ${motivo}.</span>` : '');

  let lineas = [
    'Hola Fractal Host, soy ' + (nombreLimpio || '(cliente)') + ' y acabo de cotizar en su sitio web.',
    '• Código de seguimiento: ' + codigo,
    '• Proyecto: ' + (d.t.nombre || ''),
    '• Variante: ' + d.variante,
    '• Plazo estimado: ' + (d.t.plazo || ''),
    '• Inversión: ' + d.precioTxt,
    '• Hosting: ' + d.hosting,
    '• Negocio: ' + (d.negocio || '(sin nombre)') + ' · Rubro: ' + d.rubro + ' · Correos: ' + d.correos,
    '• Opciones adicionales: ' + (d.adicionales.length ? d.adicionales.join('; ') : 'Ninguna'),
    '• Sitio de referencia: ' + d.referencia,
    '• Solicitante: ' + d.persona,
    '• Dominio: ' + d.dominio,
    '• Pago preferido: ' + d.pago
  ];
  if(d.extraTxt) lineas.push('• Extra: ' + d.extraTxt);
  if(d.mensaje) lineas.push('• Mensaje: ' + d.mensaje);
  if(d.adjTxt) lineas.push('• Envié estos archivos por correo: ' + d.adjTxt);
  lineas.push('• Mi contacto: ' + d.fono + ' / ' + d.mail);
  lineas.push('Quedo atento(a) a la cotización formal. Gracias.');
  $('btnWA').href = 'https://wa.me/56954132014?text=' + encodeURIComponent(lineas.join('\n'));

  btn.disabled = false;
  btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg> Enviar solicitud';
  irPaso(6);
}

function reiniciar(){
  Object.assign(estado, {
    modo:'nuevo', tipo:null, opcion:null, extra:false,
    redisUrl:'', redisFallas:{}, redisFallaOtra:'', redisPlataforma:null, redisPlatOtra:'',
    mantUrl:'', mantPlataforma:null, mantPlatOtra:'', mantAlojamiento:null, mantProblemas:{},
    situacionHost:'contratar', enlace:'usa', plan:null,
    negocio:'', persona:null, rubro:'', rubroOtro:'', correos:null,
    dominio:null, domTexto:'',
    pago:null, mensaje:'', fonoDigitos:'', rut:'',
    refSitio:'no', refUrl:'', refNota:'',
    codigo:null, paso:1
  });
  estado.extras = {};
  try{ localStorage.removeItem(AUTOSAVE_KEY); }catch(e){}
  document.querySelectorAll('.tipo-card').forEach(c => c.classList.remove('selected'));
  document.querySelectorAll('.persona-card').forEach(c => c.classList.remove('on'));
  document.querySelectorAll('.cot-seg').forEach(b => b.classList.remove('on'));
  document.querySelectorAll('.cot-field-err').forEach(el => el.classList.remove('cot-field-err'));
  document.querySelectorAll('[id^="err"]').forEach(el => el.classList.add('hidden'));
  $('cajaRubroOtro').classList.add('hidden');
  $('cajaDominio').classList.add('hidden');
  $('notaDominioNose').classList.add('hidden');
  $('cajaRef').classList.add('hidden');
  $('listaAdjuntos').innerHTML = '';
  ['inpNombre','inpFono','inpMail','inpRut','inpMensaje','inpNegocio','inpRubroOtro','inpDominio','inpRefUrl','inpRefNota'].forEach(id => $(id).value = '');
  $('inpRubro').selectedIndex = 0;
  $('inpAdjuntos').value = '';
  document.querySelector('#grupoRef .cot-seg[data-val="no"]').classList.add('on');
  renderAdicionales();
  cambiarModo('nuevo');
  renderPlaceholderPanel();
  renderHosting();
  actualizarBarra();
  actualizarPorcentaje();
  mostrarPaneles();
}

/* ================== INICIO + RESTAURACIÓN ================== */
renderAdicionales();
cambiarModo('nuevo');
renderPlaceholderPanel();
renderHosting();

(function restaurar(){
  const guardado = cargarEstado();
  if(!guardado) { actualizarBarra(); actualizarPorcentaje(); return; }
  try{
    Object.assign(estado, guardado.estado);
    const ent = guardado.entradas || {};
    Object.keys(ent).forEach(id => { const el = $(id); if(el) el.value = ent[id]; });

    document.querySelectorAll('.tab-modo').forEach(b => b.classList.toggle('on', b.dataset.modo === estado.modo));
    $('tabNuevo').classList.toggle('hidden', estado.modo !== 'nuevo');
    $('tabRediseno').classList.toggle('hidden', estado.modo !== 'rediseno');
    $('tabMantencion').classList.toggle('hidden', estado.modo !== 'mantencion');
    if(estado.modo === 'rediseno') renderRediseno();
    if(estado.modo === 'mantencion') renderMantencion();
    if(estado.modo === 'nuevo' && estado.tipo){
      document.querySelectorAll('.tipo-card').forEach(c => c.classList.toggle('selected', c.dataset.id === estado.tipo));
      renderPanel();
    }
    document.querySelectorAll('.persona-card').forEach(c => c.classList.toggle('on', c.dataset.pers === estado.persona));
    if(estado.rubro){ $('inpRubro').value = estado.rubro; $('cajaRubroOtro').classList.toggle('hidden', estado.rubro !== 'Otro'); }
    document.querySelectorAll('#grupoCorreos .cot-seg').forEach(b => b.classList.toggle('on', b.dataset.val === estado.correos));
    document.querySelectorAll('#grupoDominio .cot-seg').forEach(b => b.classList.toggle('on', b.dataset.val === estado.dominio));
    controlarCajaDominio();
    document.querySelectorAll('#grupoPago .cot-seg').forEach(b => b.classList.toggle('on', b.dataset.val === estado.pago));
    document.querySelectorAll('#grupoRef .cot-seg').forEach(b => { b.classList.remove('on'); if(b.dataset.val === estado.refSitio) b.classList.add('on'); });
    $('cajaRef').classList.toggle('hidden', estado.refSitio !== 'si');
    estado.fonoDigitos = estado.fonoDigitos || '';
    $('inpFono').value = estado.fonoDigitos.length > 4 ? estado.fonoDigitos.slice(0,4) + ' ' + estado.fonoDigitos.slice(4) : estado.fonoDigitos;
    renderAdicionales();
    renderHosting();
    actualizarBarra();
    actualizarPorcentaje();

    const pasoGuardado = Math.min(Math.max(estado.paso || 1, 1), 5);
    estado.paso = pasoGuardado;
    if(pasoGuardado === 5) renderResumen();
    mostrarPaneles();
  }catch(e){ actualizarBarra(); actualizarPorcentaje(); }
})();

/* Los botones del HTML usan onclick: exponemos las funciones globales. */
window.irPaso = irPaso;
window.irAPaso = irAPaso;
window.omitirAdicionales = omitirAdicionales;
window.enviarSolicitud = enviarSolicitud;
window.descargarPDF = descargarPDF;
window.reiniciar = reiniciar;

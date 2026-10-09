/* ================= CONSENTIMIENTO (GA y Botpress condicionados; sin cambios) ================= */
(function(){
  var KEY = 'fh-cookie-consent';
  var banner = document.getElementById('cookieBanner');
  var panel = document.getElementById('cbPanel');
  var live = document.getElementById('liveRegion');
  function get(){ try { return JSON.parse(localStorage.getItem(KEY)); } catch(e){ return null; } }
  function set(c){ try { localStorage.setItem(KEY, JSON.stringify(c)); } catch(e){} }
  function announce(msg){ if (live) live.textContent = msg; }
  function loadAnalytics(){
    if (window.__fhGA) return; window.__fhGA = true;
    var s1 = document.createElement('script'); s1.async = true; s1.src = 'https://www.googletagmanager.com/gtag/js?id=G-1MBLJ8PHGD'; document.head.appendChild(s1);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', 'G-1MBLJ8PHGD');
  }
  function loadMarketing(){
    if (window.__fhBP) return; window.__fhBP = true;
    /* `async = false` es imprescindible aquí: un <script> creado con JS se marca
       solo (async=true) y entonces el de configuración puede ejecutarse ANTES
       que inject.js, y el chat no arranca. `defer` no vale en scripts dinámicos.
       Con async=false ambos entran en la cola "en orden de inserción", igual que
       cuando eran <script> del HTML en Footer.astro. */
    var s1 = document.createElement('script'); s1.async = false; s1.src = 'https://cdn.botpress.cloud/webchat/v5.0/inject.js';
    var s2 = document.createElement('script'); s2.async = false; s2.src = 'https://files.bpcontent.cloud/2026/08/28/13/20260828134040-5CULTYOO.js';
    document.head.appendChild(s1); document.head.appendChild(s2);
  }
  /* El chat NO se carga al abrir la página: espera al primer gesto del visitante
     (es lo que marca interés real) o, en su defecto, a 30 s. Así deja de competir
     con la imagen del hero y con el primer pintado. */
  var GESTOS = ['pointerdown', 'keydown', 'touchstart', 'wheel', 'scroll'];
  function scheduleMarketing(){
    if (window.__fhBPq) return; window.__fhBPq = true;
    var lanzado = false;
    var lanzar = function(){
      if (lanzado) return; lanzado = true;
      GESTOS.forEach(function(e){ window.removeEventListener(e, lanzar); });
      loadMarketing();
    };
    GESTOS.forEach(function(e){ window.addEventListener(e, lanzar, { passive: true }); });
    setTimeout(lanzar, 30000);
  }
  function apply(c, inmediato){
    if (c.analytics) loadAnalytics();
    if (c.marketing) { if (inmediato) loadMarketing(); else scheduleMarketing(); }
  }
  function hide(){ banner.hidden = true; document.body.classList.remove('cookies-open'); }
  function show(){ banner.hidden = false; document.body.classList.add('cookies-open'); }
  function save(c, msg){ set(c); apply(c, true); hide(); announce(msg || 'Preferencias de cookies guardadas.'); }
  var saved = get();
  /* Sin el componente de cookies en la página no hay nada que atar aquí:
     una excepción en este bloque mataría el resto del script (reveal, formularios…). */
  if (!banner) return;
  if (saved) { apply(saved); } else { show(); }
  function al(id, fn){ var el = document.getElementById(id); if (el) el.addEventListener('click', fn); }
  al('cbAcceptAll', function(){ save({functional:true, analytics:true, marketing:true}, 'Cookies: aceptaste todas las categorías.'); });
  al('cbRejectAll', function(){ save({functional:true, analytics:false, marketing:false}, 'Cookies: solo funcionales activas.'); });
  var cfgBtn = document.getElementById('cbConfigure');
  if (cfgBtn && panel) cfgBtn.addEventListener('click', function(){
    var open = panel.hidden;
    panel.hidden = !open;
    cfgBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  al('cbSave', function(){
    var ca = document.getElementById('cbAnalytics'), cm = document.getElementById('cbMarketing');
    save({ functional:true, analytics: !!(ca && ca.checked), marketing: !!(cm && cm.checked) });
  });
  al('cookiePrefs', function(){
    var c = get() || {functional:true, analytics:false, marketing:false};
    var ca = document.getElementById('cbAnalytics'), cm = document.getElementById('cbMarketing');
    if (ca) ca.checked = !!c.analytics;
    if (cm) cm.checked = !!c.marketing;
    if (panel) panel.hidden = false;
    show();
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  });
})();

/* ===== Burbuja de chat Botpress: sube al soltarse la caja de cookies ===== */
(function(){
  var intentos = 0;
  var timer = setInterval(function(){
    intentos++;
    var host = document.getElementById('fab-root');
    if (host && host.shadowRoot && !host.shadowRoot.querySelector('#fhFabFix')){
      var st = document.createElement('style');
      st.id = 'fhFabFix';
      st.textContent = '.bpFabWrapper { bottom: calc(24px + var(--fp-off, 0px)) !important; transition: bottom .35s ease !important; }';
      host.shadowRoot.appendChild(st);
    }
    /* Efecto de llamar la atención ahora va en el botón de Botpress (estilo especial: va inyectado al shadow root) */
    if (host && host.shadowRoot && !host.shadowRoot.querySelector('#fhFabRing')){
      var st2 = document.createElement('style');
      st2.id = 'fhFabRing';
      st2.textContent = '@keyframes fhRing { 0%{transform:scale(1);opacity:1} 100%{transform:scale(1.55);opacity:0} } .bpFab { position:relative !important; overflow:visible !important; } .bpFab::after { content:""; position:absolute; inset:0; border-radius:50%; border:2px solid rgba(0,229,255,.6); animation: fhRing 2s ease-out infinite; pointer-events:none; }';
      host.shadowRoot.appendChild(st2);
    }
    if (intentos > 60) clearInterval(timer);
  }, 500);
})();

/* ================= DATOS ================= */
function fmtCLP(n){ return '$' + Math.round(n).toLocaleString('es-CL'); }
var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

(function(){
  var faqRoot = document.getElementById('faq');
  if (!faqRoot) return;
  var tabs = Array.prototype.slice.call(faqRoot.querySelectorAll('[role="tab"]'));
  if (!tabs.length) return;
  var PAGE = parseInt(tabs[0].parentNode.getAttribute('data-page') || '12', 10) || 12;
  var busy = false;

  function panelFor(tab){ return document.getElementById(tab.getAttribute('aria-controls')); }
  function itemsIn(panel){ return Array.prototype.slice.call(panel.querySelectorAll('[data-faq-item]')); }

  /* ---------- acordeón (una respuesta abierta por panel, ~200ms) ---------- */
  function closeItem(d, instant){
    var summary = d.querySelector('summary');
    var content = d.querySelector('.faq-answer');
    if (!d.open) return;
    summary.setAttribute('aria-expanded','false');
    if (prefersReduced || instant || !content){
      d.open = false;
      if (content){ content.style.maxHeight = ''; content.style.opacity = ''; }
      return;
    }
    content.style.maxHeight = content.scrollHeight + 'px';
    content.style.opacity = '1';
    requestAnimationFrame(function(){ content.style.maxHeight = '0px'; content.style.opacity = '0'; });
    d.dataset.anim = '1';
    setTimeout(function(){
      d.open = false;
      content.style.maxHeight = ''; content.style.opacity = '';
      delete d.dataset.anim;
    }, 210);
  }

  function openItem(d){
    var summary = d.querySelector('summary');
    var content = d.querySelector('.faq-answer');
    d.open = true;
    summary.setAttribute('aria-expanded','true');
    d.dataset.anim = '1';
    setTimeout(function(){ delete d.dataset.anim; }, 210);
    if (prefersReduced || !content) return;
    var h = content.scrollHeight;
    content.style.maxHeight = '0px';
    content.style.opacity = '0';
    requestAnimationFrame(function(){ content.style.maxHeight = h + 'px'; content.style.opacity = '1'; });
    setTimeout(function(){ content.style.maxHeight = ''; content.style.opacity = ''; }, 210);
  }

  faqRoot.querySelectorAll('[data-faq-item]').forEach(function(d){
    var summary = d.querySelector('summary');
    summary.addEventListener('click', function(e){
      e.preventDefault();
      if (d.dataset.anim) return;
      if (d.open){ closeItem(d); return; }
      var panel = d.closest('[role="tabpanel"]');
      if (panel) itemsIn(panel).forEach(function(o){ if (o !== d && o.open) closeItem(o, false); });
      openItem(d);
    });
  });

  /* ---------- tabs: ARIA + teclado + contador por categoría ---------- */
  function selectTab(tab, moveFocus){
    tabs.forEach(function(t){
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      var p = panelFor(t);
      if (p) p.hidden = !on;
    });
    var active = panelFor(tab);
    if (!active) return;
    active.classList.remove('tab-in'); void active.offsetWidth; active.classList.add('tab-in');
    var items = itemsIn(active);
    items.forEach(function(d, idx){
      if (d.open) closeItem(d, true);
      d.hidden = idx >= PAGE;
    });
    var more = active.querySelector('[data-faq-more]');
    if (more) more.hidden = items.length <= PAGE;
    if (moveFocus) tab.focus();
  }

  tabs.forEach(function(tab, i){
    tab.addEventListener('click', function(){ selectTab(tab); });
    tab.addEventListener('keydown', function(e){
      var next = null;
      if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
      else if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (e.key === 'Home') next = tabs[0];
      else if (e.key === 'End') next = tabs[tabs.length - 1];
      if (next){ e.preventDefault(); selectTab(next, true); }
    });
  });

  /* ---------- cargar más (bloques de PAGE preguntas) ---------- */
  faqRoot.querySelectorAll('[data-faq-more]').forEach(function(btn){
    btn.addEventListener('click', function(){
      if (busy || btn.disabled) return;
      var panel = btn.closest('[role="tabpanel"]');
      if (!panel) return;
      var pending = itemsIn(panel).filter(function(d){ return d.hidden; });
      if (!pending.length){ btn.hidden = true; return; }
      busy = true;
      btn.disabled = true;
      btn.classList.add('is-loading');
      setTimeout(function(){
        pending.slice(0, PAGE).forEach(function(d){ d.hidden = false; });
        btn.hidden = pending.length - PAGE <= 0;
        btn.disabled = false;
        btn.classList.remove('is-loading');
        busy = false;
      }, prefersReduced ? 0 : 260);
    });
  });

  selectTab(tabs[0]);
})();

/* ================= TOOLTIP COMPARTIDO ================= */
(function(){
  var tip = document.createElement('div');
  tip.id = 'tipBox';
  tip.setAttribute('role', 'tooltip');
  var arrow = document.createElement('span'); arrow.className = 'tip-arrow'; tip.appendChild(arrow);
  var text = document.createElement('span'); tip.appendChild(text);
  document.body.appendChild(tip);
  var current = null;
  /* En pantallas táctiles no se muestran los tooltips marcados con data-tip-hoveronly:
     ahí el clic navega directo y la información la aporta la franja de pago. */
  var esTactil = window.matchMedia && window.matchMedia('(hover: none)').matches;
  function show(pill){
    if (esTactil && pill.hasAttribute('data-tip-hoveronly')) return;
    current = pill;
    text.textContent = pill.getAttribute('data-tip');
    tip.classList.add('show');
    pill.setAttribute('aria-describedby', 'tipBox');
    position(pill);
  }
  function position(pill){
    var r = pill.getBoundingClientRect();
    var tw = tip.offsetWidth, th = tip.offsetHeight;
    /* Con data-tip-place se fuerza la dirección; sin el atributo, abrimos hacia
       arriba si hay sitio libre (evita solapar el contenido de abajo). */
    var setLugar = pill.getAttribute('data-tip-place');
    var arriba = setLugar ? setLugar === 'above' : (r.top > th + 32);
    var place = arriba ? 'above' : 'below';
    var top = arriba ? r.top - th - 10 : r.bottom + 10;
    if (place === 'above' && top < 8) { place = 'below'; top = r.bottom + 10; }
    if (place === 'below' && top + th > window.innerHeight - 8) { place = 'above'; top = r.top - th - 10; }
    if (top < 8) { top = 8; }
    var left = r.left + r.width / 2 - tw / 2;
    left = Math.max(8, Math.min(window.innerWidth - tw - 8, left));
    tip.style.top = top + 'px';
    tip.style.left = left + 'px';
    tip.setAttribute('data-place', place);
    var al = r.left + r.width / 2 - left;
    al = Math.max(12, Math.min(tw - 12, al));
    arrow.style.left = (al - 6) + 'px';
  }
  function hide(){
    if (current) { current.removeAttribute('aria-describedby'); current = null; }
    tip.classList.remove('show');
  }
  document.querySelectorAll('.tip').forEach(function(pill){
    pill.addEventListener('mouseenter', function(){ show(pill); });
    pill.addEventListener('mouseleave', hide);
    pill.addEventListener('focus', function(){ show(pill); });
    pill.addEventListener('blur', hide);
    pill.addEventListener('click', function(e){
      e.stopPropagation();
      if (current === pill && tip.classList.contains('show')) { hide(); } else { show(pill); }
    });
  });
  document.addEventListener('click', function(e){ if (!e.target.closest('.tip')) hide(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') hide(); });
  window.addEventListener('scroll', function(){ if (current) position(current); }, { passive: true });
  window.addEventListener('resize', function(){ if (current) position(current); });
})();

/* ================= PRECIOS POR DURACIÓN ================= */
function renderCycle(block, cycle){
  var base = parseFloat(block.getAttribute('data-base'));
  var strike = block.querySelector('[data-strike]');
  var main = block.querySelector('[data-main]');
  var badge = block.querySelector('[data-badge]');
  var totalEl = block.querySelector('[data-total]');
  var saveEl = block.querySelector('[data-save]');
  /* Sin precio base o sin el bloque completo no se calcula nada: mejor el dato
     tal como está escrito en HTML que un "$NaN" a la vista. */
  if (isNaN(base) || base < 0 || !strike || !main || !badge || !totalEl || !saveEl) return;
  var years = cycle === 'biennial' ? 2 : cycle === 'triennial' ? 3 : 1;
  var disc = cycle === 'biennial' ? 0.06 : cycle === 'triennial' ? 0.12 : 0;
  var perYear = Math.round(base * (1 - disc));
  var total = perYear * years;
  var save = (base * years) - total;
  if (disc > 0) {
    strike.textContent = fmtCLP(base); strike.classList.remove('invisible');
    main.textContent = fmtCLP(perYear);
    badge.textContent = '-' + Math.round(disc * 100) + '%'; badge.classList.remove('invisible');
    totalEl.textContent = 'Por ' + years + ' años: ' + fmtCLP(total);
    totalEl.classList.remove('invisible');
    saveEl.textContent = '· Ahorras ' + fmtCLP(save) + ' en total';
    saveEl.classList.remove('invisible');
  } else {
    strike.textContent = '\u00A0'; strike.classList.add('invisible');
    main.textContent = fmtCLP(base);
    badge.classList.add('invisible');
    totalEl.textContent = '\u00A0'; totalEl.classList.add('invisible');
    saveEl.textContent = '\u00A0'; saveEl.classList.add('invisible');
  }
}
function applyCycle(scopeSel, cycle){
  document.querySelectorAll(scopeSel + ' .price-block').forEach(function(block){
    if (prefersReduced) { renderCycle(block, cycle); return; }
    block.classList.add('swap');
    setTimeout(function(){ renderCycle(block, cycle); block.classList.remove('swap'); }, 120);
  });
}
document.querySelectorAll('[data-cycle-btn]').forEach(function(btn){
  btn.addEventListener('click', function(){
    var target = btn.getAttribute('data-cycle-target') || '#plansGrid';
    document.querySelectorAll('[data-cycle-btn][data-cycle-target="' + target + '"]').forEach(function(b){
      b.classList.toggle('active', b === btn);
    });
    applyCycle(target, btn.getAttribute('data-cycle'));
  });
});

/* ================= SLIDER ================= */
(function(){
  var slider = document.getElementById('heroSlider');
  if (!slider) return;
  var slides = Array.prototype.slice.call(slider.querySelectorAll('.slide'));
  if (!slides.length) return;
  var idx = 0, timer = null, DELAY = 7000;
  var fillBar = document.getElementById('heroProgressFill');
  var live = document.getElementById('liveRegion');
  function go(n, manual){
    idx = (n + slides.length) % slides.length;
    slides.forEach(function(s, i){ s.classList.toggle('is-active', i === idx); });
    if (fillBar) fillBar.style.width = (((idx + 1) / slides.length) * 100) + '%';
    /* Solo el cambio manual se anuncia: el automático interrumpiría la lectura */
    if (manual && live) {
      var etiqueta = slides[idx].getAttribute('aria-label') || '';
      live.textContent = 'Lámina ' + (idx + 1) + ' de ' + slides.length + (etiqueta ? ': ' + etiqueta : '');
    }
    if (manual) restart();
  }
  function restart(){ clearInterval(timer); if (prefersReduced) return; timer = setInterval(function(){ go(idx + 1); }, DELAY); }
  document.getElementById('slidePrev').addEventListener('click', function(){ go(idx - 1, true); });
  document.getElementById('slideNext').addEventListener('click', function(){ go(idx + 1, true); });
  slider.addEventListener('mouseenter', function(){ clearInterval(timer); });
  slider.addEventListener('mouseleave', restart);
  /* Teclado: el carrusel se detiene mientras el foco está dentro y se reanuda al salir */
  slider.addEventListener('focusin', function(){ clearInterval(timer); });
  slider.addEventListener('focusout', function(){ restart(); });
  var tx = null;
  slider.addEventListener('touchstart', function(e){ tx = e.touches[0].clientX; }, { passive:true });
  slider.addEventListener('touchend', function(e){
    if (tx === null) return;
    var dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 48) go(idx + (dx < 0 ? 1 : -1), true);
    tx = null;
  }, { passive:true });
  if (!prefersReduced) restart();
})();

/* ================= DROPDOWN CARRITO (topbar Contratar) ================= */
(function(){
  var drop = document.getElementById('tbContratar');
  if (!drop) return;
  var btn = document.getElementById('tbContratarBtn');
  var closeT = null;
  function open(){ clearTimeout(closeT); drop.classList.add('open'); btn.setAttribute('aria-expanded','true'); }
  function close(){ drop.classList.remove('open'); btn.setAttribute('aria-expanded','false'); }
  function scheduleClose(){ clearTimeout(closeT); closeT = setTimeout(close, 260); }
  btn.addEventListener('click', function(e){ e.preventDefault(); if (drop.classList.contains('open')) close(); else open(); });
  drop.addEventListener('mouseenter', function(){ if (window.innerWidth >= 1024) open(); });
  drop.addEventListener('mouseleave', function(){ if (window.innerWidth >= 1024) scheduleClose(); });
  document.addEventListener('click', function(e){ if (!e.target.closest('#tbContratar')) close(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') close(); });
  window.addEventListener('scroll', close, { passive:true });
})();

/* ================= MEGAMENU ================= */
(function(){
  var dropBtns = Array.prototype.slice.call(document.querySelectorAll('.drop-btn'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('[data-drop-panel]'));
  var closeTimer = null;
  function panelOf(id){ return document.querySelector('[data-drop-panel="' + id + '"]'); }
  function placeArrow(panel, btn){
    var arrow = panel.querySelector('.mega-arrow');
    if (!arrow) return;
    requestAnimationFrame(function(){
      var pr = panel.getBoundingClientRect();
      var br = btn.getBoundingClientRect();
      var x = br.left + br.width / 2 - pr.left - 7;
      x = Math.max(18, Math.min(pr.width - 32, x));
      arrow.style.left = x + 'px';
    });
  }
  function openDrop(id){
    panels.forEach(function(p){ p.classList.toggle('mega-open', p.getAttribute('data-drop-panel') === id); });
    dropBtns.forEach(function(b){
      var on = b.getAttribute('data-drop') === id;
      b.classList.toggle('active-drop', on);
      b.setAttribute('aria-expanded', on ? 'true' : 'false');
      var c = b.querySelector('.chev'); if (c) c.classList.toggle('rot', on);
      if (on) placeArrow(panelOf(id), b);
    });
  }
  function closeAll(){
    panels.forEach(function(p){ p.classList.remove('mega-open'); });
    dropBtns.forEach(function(b){ b.classList.remove('active-drop'); b.setAttribute('aria-expanded','false'); var c = b.querySelector('.chev'); if (c) c.classList.remove('rot'); });
  }
  function scheduleClose(){ clearTimeout(closeTimer); closeTimer = setTimeout(closeAll, 280); }
  dropBtns.forEach(function(btn){
    var id = btn.getAttribute('data-drop');
    btn.addEventListener('mouseenter', function(){ if (window.innerWidth >= 1024) { clearTimeout(closeTimer); openDrop(id); } });
    btn.addEventListener('mouseleave', function(){ if (window.innerWidth >= 1024) scheduleClose(); });
    btn.addEventListener('click', function(){ closeAll(); });
    var p = panelOf(id);
    p.addEventListener('mouseenter', function(){ clearTimeout(closeTimer); });
    p.addEventListener('mouseleave', function(){ if (window.innerWidth >= 1024) scheduleClose(); });
  });
  window.addEventListener('resize', function(){ closeAll(); });
  window.addEventListener('scroll', function(){ closeAll(); }, { passive:true });
  document.querySelectorAll('.mega-card[data-goto]').forEach(function(card){
    card.addEventListener('click', function(e){
      if (e.target.closest('a,button')) return;
      var target = document.querySelector(card.getAttribute('data-goto'));
      if (target) { closeAll(); target.scrollIntoView({ behavior:'smooth' }); }
    });
  });
  document.addEventListener('click', function(e){
    var inside = e.target.closest('[data-drop-panel]') || e.target.closest('.drop-btn');
    if (!inside) closeAll();
  });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeAll(); });
  document.querySelectorAll('[data-mega-link]').forEach(function(a){ a.addEventListener('click', closeAll); });
})();

/* ================= TABS ================= */
(function(){
  var tabButtons = Array.prototype.slice.call(document.querySelectorAll('[data-tab-btn]'));
  var tabPanels = document.querySelectorAll('[data-tab-panel]');
  function activate(btn){
    tabButtons.forEach(function(b){
      var on = (b === btn);
      b.classList.toggle('active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
      b.tabIndex = on ? 0 : -1;
    });
    tabPanels.forEach(function(panel){
      var show = panel.getAttribute('data-tab-panel') === btn.getAttribute('data-tab-btn');
      if (show) { panel.removeAttribute('hidden'); panel.classList.remove('tab-in'); void panel.offsetWidth; panel.classList.add('tab-in'); }
      else { panel.setAttribute('hidden',''); }
    });
  }
  tabButtons.forEach(function(btn, i){
    btn.addEventListener('click', function(){ activate(btn); });
    btn.addEventListener('keydown', function(e){
      var dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!dir) return;
      e.preventDefault();
      var next = tabButtons[(i + dir + tabButtons.length) % tabButtons.length];
      next.focus(); activate(next);
    });
  });
})();

/* ================= MODALES LEGALES ================= */
(function(){
  var triggerActual = null;
  function focoUtil(m){
    return Array.prototype.slice.call(
      m.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])')
    ).filter(function(el){ return !el.hasAttribute('hidden'); });
  }
  function abiertos(){
    return Array.prototype.slice.call(document.querySelectorAll('.modal, [id^="modal-"]')).filter(function(m){ return !m.hidden; });
  }
  function openModal(id, trigger){
    var m = document.getElementById(id);
    if (!m) return; /* Página sin ese modal (404, cotizador): el clic no debe lanzar un error */
    triggerActual = trigger || document.activeElement;
    m.hidden = false;
    document.body.classList.add('modal-open');
    var x = m.querySelector('.modal-x');
    if (x) x.focus(); else { var f = focoUtil(m); if (f.length) f[0].focus(); }
  }
  function closeModal(m){
    if (!m) return;
    m.hidden = true;
    document.body.classList.remove('modal-open');
    if (triggerActual && document.contains(triggerActual)) triggerActual.focus();
    triggerActual = null;
  }
  /* Teclado: Tab queda dentro del modal abierto y el foco vuelve al botón que lo abrió */
  document.addEventListener('keydown', function(e){
    if (e.key !== 'Tab') return;
    var lista = abiertos();
    if (!lista.length) return;
    var m = lista[lista.length - 1];
    var f = focoUtil(m);
    if (!f.length) return;
    var primero = f[0], ultimo = f[f.length - 1];
    var dentro = m.contains(document.activeElement);
    if (e.shiftKey && (document.activeElement === primero || !dentro)) { e.preventDefault(); ultimo.focus(); }
    else if (!e.shiftKey && (document.activeElement === ultimo || !dentro)) { e.preventDefault(); primero.focus(); }
  });
  document.querySelectorAll('[data-modal]').forEach(function(b){
    b.addEventListener('click', function(){ openModal(b.getAttribute('data-modal'), b); });
  });
  document.querySelectorAll('[data-close]').forEach(function(b){
    b.addEventListener('click', function(){ closeModal(document.getElementById(b.getAttribute('data-close'))); });
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') {
      var lista = abiertos();
      for (var i = 0; i < lista.length; i++) closeModal(lista[i]);
    }
  });
  var legTabs = document.querySelectorAll('[data-legtab]');
  legTabs.forEach(function(t){
    t.addEventListener('click', function(){
      legTabs.forEach(function(x){ x.classList.toggle('active', x === t); });
      var a = document.getElementById('legA'), b = document.getElementById('legB');
      if (a) a.hidden = t.getAttribute('data-legtab') !== 'A';
      if (b) b.hidden = t.getAttribute('data-legtab') !== 'B';
    });
  });
})();

/* ================= HEADER / TEMA / MÓVIL ================= */
var headerEl = document.querySelector('header');
if (headerEl) window.addEventListener('scroll', function(){
  headerEl.classList.toggle('scrolled', window.scrollY > 40);
}, { passive:true });
var themeBtn = document.getElementById('themeBtn');
if (themeBtn) themeBtn.addEventListener('click', function(){
  var isDark = document.documentElement.classList.toggle('dark');
  try { localStorage.setItem('fh-theme', isDark ? 'dark' : 'light'); } catch(e){}
});
var mobileMenu = document.getElementById('mobileMenu');
var burgerBtn = document.getElementById('burger');
function cerrarMenuMovil(devolverFoco){
  if (!mobileMenu) return;
  mobileMenu.classList.add('-translate-y-[130%]');
  mobileMenu.classList.remove('mm-open');
  mobileMenu.setAttribute('inert', '');
  if (burgerBtn) {
    burgerBtn.setAttribute('aria-expanded','false');
    if (devolverFoco) burgerBtn.focus();
  }
}
if (mobileMenu && burgerBtn) {
  burgerBtn.addEventListener('click', function(){
    var open = mobileMenu.classList.toggle('-translate-y-[130%]') === false;
    mobileMenu.classList.toggle('mm-open', open);
    if (open) mobileMenu.removeAttribute('inert'); else mobileMenu.setAttribute('inert', '');
    burgerBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  mobileMenu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ cerrarMenuMovil(false); }); });
  /* Escape cierra el menú y devuelve el foco al botón que lo abrió */
  document.addEventListener('keydown', function(e){
    if (e.key !== 'Escape' || !mobileMenu.classList.contains('mm-open')) return;
    cerrarMenuMovil(true);
  });
  /* Al pasar a escritorio el menú queda fuera de pantalla: sincronizamos el estado */
  window.addEventListener('resize', function(){
    if (window.innerWidth >= 1024 && mobileMenu.classList.contains('mm-open')) cerrarMenuMovil(false);
  });
}

/* ================= PARALLAX ================= */
(function(){
  if (prefersReduced) return;
  var pxEls = Array.prototype.slice.call(document.querySelectorAll('[data-px]'));
  if (!pxEls.length) return;
  var ticking = false;
  function update(){
    var y = window.scrollY || window.pageYOffset || 0;
    pxEls.forEach(function(el){
      var s = parseFloat(el.getAttribute('data-px')) || 0;
      el.style.transform = 'translate3d(0,' + (y * s).toFixed(1) + 'px,0)';
    });
    ticking = false;
  }
  window.addEventListener('scroll', function(){ if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive:true });
  update();
})();

/* ================= REVEAL + PING ================= */
var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal, .ping-demo'));
if ('IntersectionObserver' in window) {
  var revealObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
    });
  }, { threshold:.12 });
  revealEls.forEach(function(el){ revealObserver.observe(el); });
} else {
  /* Sin IntersectionObserver todo lo que aparece con reveal se muestra de inmediato */
  revealEls.forEach(function(el){ el.classList.add('visible'); });
}

/* ================= CONTADORES 0 → N (franja de cifras) ================= */
var countEls = document.querySelectorAll('[data-count]');
function runCount(el){
  var target = parseInt(el.getAttribute('data-count'), 10);
  if (isNaN(target)) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { el.textContent = String(target); return; }
  var dur = 1500, t0 = null;
  el.textContent = '0';
  function tick(now){
    if (t0 === null) t0 = now;
    var p = Math.min((now - t0) / dur, 1);
    var eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
if (countEls.length) {
  if ('IntersectionObserver' in window) {
    var countObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) { runCount(entry.target); countObserver.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    countEls.forEach(function(el){ countObserver.observe(el); });
  } else {
    countEls.forEach(runCount);
  }
}

/* ================= FORMULARIO → enviar.php (PHPMailer) con respaldo WhatsApp ================= */
var contactFormEl = document.getElementById('contactForm');
if (contactFormEl) contactFormEl.addEventListener('submit', function(ev){
  ev.preventDefault();
  var btn = document.getElementById('formSubmit');
  var note = document.getElementById('formNote');
  /* Envío en curso: un segundo clic no vuelve a disparar el POST */
  if (contactFormEl.getAttribute('data-sending') === '1') return;
  var ok = true, primerError = null;
  function setErr(id, msg){
    var el = document.getElementById(id);
    var err = document.querySelector('[data-err-for="' + id + '"]');
    if (!el || !err) return;
    if (msg) { ok = false; primerError = primerError || el; err.classList.remove('hidden'); err.textContent = msg; el.setAttribute('aria-invalid','true'); }
    else { err.textContent = ''; err.classList.add('hidden'); el.removeAttribute('aria-invalid'); }
  }
  var nombre = (document.getElementById('fNombre') || {}).value || '';
  var email = (document.getElementById('fEmail') || {}).value || '';
  var telefono = (document.getElementById('fTelefono') || {}).value || '';
  var mensaje = (document.getElementById('fMensaje') || {}).value || '';
  var consentEl = document.getElementById('fConsent');
  nombre = nombre.trim(); email = email.trim(); telefono = telefono.trim(); mensaje = mensaje.trim();
  setErr('fNombre', nombre ? '' : 'Escribe tu nombre para poder responderte.');
  setErr('fEmail', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Escribe un correo válido, por ejemplo nombre@empresa.cl.');
  setErr('fMensaje', mensaje ? '' : 'Cuéntanos brevemente qué necesitas.');
  setErr('fConsent', (consentEl && consentEl.checked) ? '' : 'Para enviar, marca la casilla de consentimiento.');
  if (!ok) {
    note.classList.add('note-err');
    note.textContent = 'Revisa los campos marcados.';
    if (primerError && primerError.focus) primerError.focus();
    return;
  }

  function notaError(msg){ note.classList.add('note-err'); note.textContent = msg; }
  function linkWhatsApp(prefijo){
    var texto = 'Hola Fractal Host, soy ' + nombre + '.\nEmail: ' + email + (telefono ? '\nTeléfono: ' + telefono : '') + '\n' + mensaje;
    var url = 'https://wa.me/56954132014?text=' + encodeURIComponent(texto);
    var w = null;
    try { w = window.open(url, '_blank'); } catch (e) { w = null; }
    if (w) { notaError(prefijo + ' Abriendo WhatsApp como respaldo…'); return; }
    /* Popup bloqueado o ventana no disponible: dejamos el enlace a la vista */
    note.classList.add('note-err');
    note.textContent = '';
    note.appendChild(document.createTextNode(prefijo + ' '));
    var a = document.createElement('a');
    a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
    a.textContent = 'Abrir WhatsApp';
    a.className = 'font-bold underline underline-offset-4';
    note.appendChild(a);
  }
  function terminando(){
    contactFormEl.removeAttribute('data-sending');
    if (btn) { btn.disabled = false; btn.textContent = btn.getAttribute('data-label') || 'Enviar mensaje'; }
  }

  contactFormEl.setAttribute('data-sending', '1');
  if (btn) {
    btn.setAttribute('data-label', btn.textContent);
    btn.disabled = true;
    btn.textContent = 'Enviando…';
  }
  note.classList.remove('note-err');
  note.textContent = 'Enviando mensaje…';

  if (navigator.onLine === false) {
    notaError('No hay conexión a internet en este equipo.');
    linkWhatsApp('Tu mensaje no se envió:');
    terminando();
    return;
  }

  var fd = new FormData();
  fd.append('nombre', nombre);
  fd.append('email', email);
  fd.append('telefono', telefono);
  fd.append('mensaje', mensaje);
  fd.append('consent', 'si');

  var ctrl = (typeof AbortController !== 'undefined') ? new AbortController() : null;
  var reloj = ctrl ? window.setTimeout(function(){ ctrl.abort(); }, 15000) : null;

  fetch('enviar.php', { method: 'POST', body: fd, signal: ctrl ? ctrl.signal : undefined })
    .then(function(r){
      return r.json().then(
        function(data){ return { status: r.status, data: data }; },
        function(){ throw new Error('Respuesta inválida del servidor (' + r.status + ')'); }
      );
    })
    .then(function(res){
      var data = res.data;
      if (res.status >= 200 && res.status < 300 && data && data.ok) {
        note.classList.remove('note-err');
        note.textContent = data.msg || 'Mensaje enviado. Te responderemos a la brevedad.';
        contactFormEl.reset();
      } else {
        linkWhatsApp((data && data.msg ? data.msg + ' ' : 'No se pudo enviar el mensaje.'));
      }
    })
    .catch(function(){
      linkWhatsApp(navigator.onLine === false ? 'Se cortó la conexión.' : 'No se pudo enviar por correo.');
    })
    .then(function(){ if (reloj) window.clearTimeout(reloj); terminando(); });
});

var yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ================= INTRODUCCIÓN AL COTIZADOR: llega a #paso1 y muestra flecha guía ================= */
(function(){
  var KEY = 'fh-cot-intro';
  /* Marca la URL antes de salir desde cualquier enlace "Cotizar" */
  document.addEventListener('click', function(ev){
    var a = ev.target && ev.target.closest ? ev.target.closest('a') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (href.indexOf('/cotizador') > -1) {
      try { sessionStorage.setItem(KEY, '1'); } catch(e){}
    }
  }, { passive: true });

  function enCotizador(){
    return location.pathname && location.pathname.indexOf('cotizador') > -1;
  }
  var sigo = false;
  try { sigo = sessionStorage.getItem(KEY) === '1'; if (sigo) sessionStorage.removeItem(KEY); } catch(e){}
  if (!enCotizador() || !sigo) return;

  function iniciar(){
    var target = document.querySelector('button[data-modo="nuevo"]') || document.getElementById('paso1');
    if (!target) return;
    try { target.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch(e){ target.scrollIntoView(); }
    window.setTimeout(function(){ dibujarFlecha(target); }, 900);
  }

  if (document.readyState === 'complete') window.setTimeout(iniciar, 300);
  else window.addEventListener('load', function(){ window.setTimeout(iniciar, 300); });

  function dibujarFlecha(target){
    var el = document.createElement('div');
    el.className = 'cot-arrow';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = '<svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true"><circle cx="28" cy="28" r="26" fill="rgba(0,229,255,.12)" stroke="#00E5FF" stroke-width="2.5"/><path d="M21 28h14m-5-5 5 5-5 5" stroke="#00E5FF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    document.body.appendChild(el);
    var rect = target.getBoundingClientRect();
    var y = rect.top + rect.height / 2;
    y = Math.max(80, Math.min(y, window.innerHeight - 80));
    el.style.top = y + 'px';
    window.requestAnimationFrame(function(){ el.classList.add('cot-arrow--on'); });

    window.setTimeout(function(){
      el.classList.remove('cot-arrow--on');
      el.classList.add('cot-arrow--off');
      window.setTimeout(function(){ el.remove(); }, 900);
    }, 3800);
  }
})();
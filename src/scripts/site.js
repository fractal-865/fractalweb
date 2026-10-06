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
    var s1 = document.createElement('script'); s1.src = 'https://cdn.botpress.cloud/webchat/v5.0/inject.js'; document.head.appendChild(s1);
    var s2 = document.createElement('script'); s2.defer = true; s2.src = 'https://files.bpcontent.cloud/2026/08/28/13/20260828134040-5CULTYOO.js'; document.head.appendChild(s2);
  }
  function apply(c){ if (c.analytics) loadAnalytics(); if (c.marketing) loadMarketing(); }
  function hide(){ banner.hidden = true; document.body.classList.remove('cookies-open'); }
  function show(){ banner.hidden = false; document.body.classList.add('cookies-open'); }
  function save(c, msg){ set(c); apply(c); hide(); announce(msg || 'Preferencias de cookies guardadas.'); }
  var saved = get();
  if (saved) { apply(saved); } else { show(); }
  document.getElementById('cbAcceptAll').addEventListener('click', function(){ save({functional:true, analytics:true, marketing:true}, 'Cookies: aceptaste todas las categorías.'); });
  document.getElementById('cbRejectAll').addEventListener('click', function(){ save({functional:true, analytics:false, marketing:false}, 'Cookies: solo funcionales activas.'); });
  var cfgBtn = document.getElementById('cbConfigure');
  cfgBtn.addEventListener('click', function(){
    var open = panel.hidden;
    panel.hidden = !open;
    cfgBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.getElementById('cbSave').addEventListener('click', function(){
    save({ functional:true, analytics: document.getElementById('cbAnalytics').checked, marketing: document.getElementById('cbMarketing').checked });
  });
  document.getElementById('cookiePrefs').addEventListener('click', function(){
    var c = get() || {functional:true, analytics:false, marketing:false};
    document.getElementById('cbAnalytics').checked = !!c.analytics;
    document.getElementById('cbMarketing').checked = !!c.marketing;
    panel.hidden = false;
    show();
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  });
})();

/* ================= DATOS ================= */
function fmtCLP(n){ return '$' + Math.round(n).toLocaleString('es-CL'); }
var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

(function(){
  document.querySelectorAll('#faqWrap details').forEach(function(d){
    var summary = d.querySelector('summary');
    var content = d.querySelector('p');
    var anim = false;
    summary.addEventListener('click', function(e){
      e.preventDefault();
      if (anim) return;
      if (prefersReduced) { d.open = !d.open; summary.setAttribute('aria-expanded', d.open ? 'true' : 'false'); return; }
      anim = true;
      if (d.open) {
        summary.setAttribute('aria-expanded','false');
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.opacity = '1';
        requestAnimationFrame(function(){
          content.style.maxHeight = '0px';
          content.style.opacity = '0';
        });
        setTimeout(function(){ d.open = false; content.style.maxHeight=''; content.style.opacity=''; anim=false; }, 280);
      } else {
        d.open = true;
        summary.setAttribute('aria-expanded','true');
        var h = content.scrollHeight;
        content.style.maxHeight = '0px';
        content.style.opacity = '0';
        requestAnimationFrame(function(){
          content.style.maxHeight = h + 'px';
          content.style.opacity = '1';
        });
        setTimeout(function(){ content.style.maxHeight=''; content.style.opacity=''; anim=false; }, 280);
      }
    });
  });
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
  function show(pill){
    current = pill;
    text.textContent = pill.getAttribute('data-tip');
    tip.classList.add('show');
    pill.setAttribute('aria-describedby', 'tipBox');
    position(pill);
  }
  function position(pill){
    var r = pill.getBoundingClientRect();
    var tw = tip.offsetWidth, th = tip.offsetHeight;
    var place = 'below';
    var top = r.bottom + 10;
    if (top + th > window.innerHeight - 8) { place = 'above'; top = r.top - th - 10; }
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
  var years = cycle === 'biennial' ? 2 : cycle === 'triennial' ? 3 : 1;
  var disc = cycle === 'biennial' ? 0.06 : cycle === 'triennial' ? 0.12 : 0;
  var perYear = Math.round(base * (1 - disc));
  var total = perYear * years;
  var save = (base * years) - total;
  var strike = block.querySelector('[data-strike]');
  var main = block.querySelector('[data-main]');
  var badge = block.querySelector('[data-badge]');
  var totalEl = block.querySelector('[data-total]');
  var saveEl = block.querySelector('[data-save]');
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
  var slides = Array.prototype.slice.call(slider.querySelectorAll('.slide'));
  var dotsWrap = document.getElementById('slideDots');
  var idx = 0, timer = null, DELAY = 7000;
  slides.forEach(function(_, i){
    var d = document.createElement('button');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.setAttribute('role', 'tab');
    d.setAttribute('aria-label', 'Ir a lámina ' + (i + 1));
    d.addEventListener('click', function(){ go(i, true); });
    dotsWrap.appendChild(d);
  });
  var dots = Array.prototype.slice.call(dotsWrap.children);
  function go(n, manual){
    idx = (n + slides.length) % slides.length;
    slides.forEach(function(s, i){ s.classList.toggle('is-active', i === idx); });
    dots.forEach(function(d, i){ d.classList.toggle('active', i === idx); });
    if (manual) restart();
  }
  function restart(){ clearInterval(timer); timer = setInterval(function(){ go(idx + 1); }, DELAY); }
  document.getElementById('slidePrev').addEventListener('click', function(){ go(idx - 1, true); });
  document.getElementById('slideNext').addEventListener('click', function(){ go(idx + 1, true); });
  slider.addEventListener('mouseenter', function(){ clearInterval(timer); });
  slider.addEventListener('mouseleave', restart);
  var tx = null;
  slider.addEventListener('touchstart', function(e){ tx = e.touches[0].clientX; }, { passive:true });
  slider.addEventListener('touchend', function(e){
    if (tx === null) return;
    var dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 48) go(idx + (dx < 0 ? 1 : -1), true);
    tx = null;
  }, { passive:true });
  restart();
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
  function openModal(id){
    var m = document.getElementById(id);
    m.hidden = false;
    document.body.classList.add('modal-open');
    var x = m.querySelector('.modal-x');
    if (x) x.focus();
  }
  function closeModal(m){
    m.hidden = true;
    document.body.classList.remove('modal-open');
  }
  document.querySelectorAll('[data-modal]').forEach(function(b){
    b.addEventListener('click', function(){ openModal(b.getAttribute('data-modal')); });
  });
  document.querySelectorAll('[data-close]').forEach(function(b){
    b.addEventListener('click', function(){ closeModal(document.getElementById(b.getAttribute('data-close'))); });
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal, [id^="modal-"]').forEach(function(m){ if (!m.hidden) closeModal(m); });
    }
  });
  var legTabs = document.querySelectorAll('[data-legtab]');
  legTabs.forEach(function(t){
    t.addEventListener('click', function(){
      legTabs.forEach(function(x){ x.classList.toggle('active', x === t); });
      document.getElementById('legA').hidden = t.getAttribute('data-legtab') !== 'A';
      document.getElementById('legB').hidden = t.getAttribute('data-legtab') !== 'B';
    });
  });
})();

/* ================= HEADER / TEMA / MÓVIL / VOLVER ARRIBA ================= */
var headerEl = document.querySelector('header');
var toTopBtn = document.getElementById('toTop');
window.addEventListener('scroll', function(){
  headerEl.classList.toggle('scrolled', window.scrollY > 40);
  toTopBtn.classList.toggle('show', window.scrollY > 600);
}, { passive:true });
toTopBtn.addEventListener('click', function(){ window.scrollTo({ top: 0, behavior: 'smooth' }); });
document.getElementById('themeBtn').addEventListener('click', function(){
  var isDark = document.documentElement.classList.toggle('dark');
  try { localStorage.setItem('fh-theme', isDark ? 'dark' : 'light'); } catch(e){}
});
var mobileMenu = document.getElementById('mobileMenu');
var burgerBtn = document.getElementById('burger');
burgerBtn.addEventListener('click', function(){
  var open = mobileMenu.classList.toggle('-translate-y-[130%]') === false;
  burgerBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
});
mobileMenu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ mobileMenu.classList.add('-translate-y-[130%]'); burgerBtn.setAttribute('aria-expanded','false'); }); });

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
var revealObserver = new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
  });
}, { threshold:.12 });
document.querySelectorAll('.reveal, .ping-demo').forEach(function(el){ revealObserver.observe(el); });

/* ================= FORMULARIO → enviar.php (PHPMailer) con respaldo WhatsApp ================= */
document.getElementById('contactForm').addEventListener('submit', function(ev){
  ev.preventDefault();
  var ok = true;
  function setErr(id, msg){
    var el = document.getElementById(id);
    var err = document.querySelector('[data-err-for="' + id + '"]');
    if (msg) { ok = false; err.textContent = msg; err.classList.remove('hidden'); el.setAttribute('aria-invalid','true'); }
    else { err.textContent = ''; err.classList.add('hidden'); el.removeAttribute('aria-invalid'); }
  }
  var nombre = document.getElementById('fNombre').value.trim();
  var email = document.getElementById('fEmail').value.trim();
  var telefono = document.getElementById('fTelefono').value.trim();
  var mensaje = document.getElementById('fMensaje').value.trim();
  var consent = document.getElementById('fConsent').checked;
  setErr('fNombre', nombre ? '' : 'Escribe tu nombre para poder responderte.');
  setErr('fEmail', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Escribe un correo válido, por ejemplo nombre@empresa.cl.');
  setErr('fMensaje', mensaje ? '' : 'Cuéntanos brevemente qué necesitas.');
  setErr('fConsent', consent ? '' : 'Para enviar, marca la casilla de consentimiento.');
  var note = document.getElementById('formNote');
  if (!ok) { note.textContent = ''; return; }
  var fd = new FormData();
  fd.append('nombre', nombre);
  fd.append('email', email);
  fd.append('telefono', telefono);
  fd.append('mensaje', mensaje);
  fd.append('consent', 'si');
  note.style.color = '';
  note.textContent = 'Enviando mensaje…';
  function fallback(){
    note.textContent = 'No se pudo enviar por correo; abriendo WhatsApp como respaldo…';
    var texto = 'Hola Fractal Host, soy ' + encodeURIComponent(nombre) + '.%0AEmail: ' + encodeURIComponent(email) + (telefono ? '%0ATeléfono: ' + encodeURIComponent(telefono) : '') + '%0A' + encodeURIComponent(mensaje);
    window.open('https://wa.me/56954132014?text=' + texto, '_blank');
  }
  fetch('enviar.php', { method: 'POST', body: fd })
    .then(function(r){ return r.json(); })
    .then(function(res){
      if (res && res.ok) {
        note.textContent = res.msg || 'Mensaje enviado. Te responderemos a la brevedad.';
        ev.target.reset();
      } else {
        note.textContent = (res && res.msg ? res.msg + ' ' : '') + 'Abriendo WhatsApp como respaldo…';
        var texto = 'Hola Fractal Host, soy ' + encodeURIComponent(nombre) + '.%0AEmail: ' + encodeURIComponent(email) + (telefono ? '%0ATeléfono: ' + encodeURIComponent(telefono) : '') + '%0A' + encodeURIComponent(mensaje);
        window.open('https://wa.me/56954132014?text=' + texto, '_blank');
      }
    })
    .catch(fallback);
});

document.getElementById('year').textContent = new Date().getFullYear();
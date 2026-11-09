/* ============================================================
   Cotizador · pestañas simple / avanzado y formulario simple
   ============================================================ */
(function(){
  'use strict';

  var $ = function(id){ return document.getElementById(id); };
  var tabSimple = $('tabSimple');
  var tabAvanzado = $('tabAvanzado');
  var panelSimple = $('panelSimple');
  var panelAvanzado = $('panelAvanzado');
  var pct = $('cotPct');
  if (!tabSimple || !tabAvanzado || !panelSimple || !panelAvanzado) return;

  function track(name, params){
    if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
  }

  function activar(nombre, opciones){
    var opts = opciones || {};
    var simple = nombre !== 'avanzado';

    tabSimple.classList.toggle('is-active', simple);
    tabSimple.setAttribute('aria-selected', simple ? 'true' : 'false');
    tabSimple.tabIndex = simple ? 0 : -1;

    tabAvanzado.classList.toggle('is-active', !simple);
    tabAvanzado.setAttribute('aria-selected', simple ? 'false' : 'true');
    tabAvanzado.tabIndex = simple ? -1 : 0;

    panelSimple.hidden = !simple;
    panelAvanzado.hidden = simple;
    if (pct) pct.hidden = simple;

    if (!simple) {
      /* El formulario avanzado se inicializó oculto: al mostrarlo forzamos
         un recálculo de medidas (sliders, paneles y sticky). */
      window.dispatchEvent(new Event('resize'));
    }

    if (opts.hash !== false) {
      var url = location.pathname + location.search + (simple ? '' : '#avanzado');
      history.replaceState(null, '', url);
    }
    if (opts.track !== false) track('cotizador_tab', { tab: simple ? 'simple' : 'avanzado' });
  }

  tabSimple.addEventListener('click', function(){ activar('simple'); });
  tabAvanzado.addEventListener('click', function(){ activar('avanzado'); });

  function moverFoco(destino){
    destino.focus();
    activar(destino === tabAvanzado ? 'avanzado' : 'simple');
  }

  [tabSimple, tabAvanzado].forEach(function(tab, i){
    tab.addEventListener('keydown', function(e){
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        moverFoco(i === 0 ? tabAvanzado : tabSimple);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        moverFoco(i === 0 ? tabAvanzado : tabSimple);
      } else if (e.key === 'Home') {
        e.preventDefault();
        moverFoco(tabSimple);
      } else if (e.key === 'End') {
        e.preventDefault();
        moverFoco(tabAvanzado);
      }
    });
  });

  var inicial = location.hash === '#avanzado' ? 'avanzado' : 'simple';
  activar(inicial, { hash: false, track: false });

  window.addEventListener('hashchange', function(){
    activar(location.hash === '#avanzado' ? 'avanzado' : 'simple', { hash: false, track: false });
  });

  /* ---------- Formulario simple ---------- */
  var form = $('sfForm');
  if (!form) return;

  var nombre = $('sfNombre');
  var fono = $('sfFono');
  var mail = $('sfMail');
  var mensaje = $('sfMensaje');
  var website = $('sfWebsite');
  var webUrl = $('sfWebUrl');
  var webUrlWrap = $('sfWebUrlWrap');
  var submit = $('sfSubmit');
  var success = $('sfSuccess');
  var successTitle = $('sfSuccessTitle');
  var successText = $('sfSuccessText');
  var codeEl = $('sfCode');
  var waLink = $('sfWhatsapp');
  var again = $('sfAgain');
  var estado = $('sfEstado');
  var empezado = false;

  function limpiarError(id, campo){
    var el = $(id);
    if (el) el.hidden = true;
    if (campo) {
      campo.removeAttribute('aria-invalid');
      campo.classList.remove('cot-field-err');
    }
  }

  function marcarError(id, campo, mensajeTexto){
    var el = $(id);
    if (el) el.hidden = false;
    if (campo) {
      campo.setAttribute('aria-invalid', 'true');
      campo.classList.add('cot-field-err');
    }
    if (mensajeTexto) estado.textContent = mensajeTexto;
  }

  function normalizarFono(valor){
    var d = String(valor || '').replace(/\D/g, '');
    if (d.indexOf('569') === 0) d = d.slice(3);
    else if (d.indexOf('56') === 0) d = d.slice(2);
    if (d.charAt(0) === '9' && d.length > 8) d = d.slice(1);
    return d.slice(0, 8);
  }

  function formatearFono(){
    var d = normalizarFono(fono.value);
    fono.value = d.length > 4 ? d.slice(0, 4) + ' ' + d.slice(4) : d;
  }

  fono.addEventListener('input', function(){
    formatearFono();
    limpiarError('sfErrFono', fono);
  });

  nombre.addEventListener('input', function(){ limpiarError('sfErrNombre', nombre); });
  mail.addEventListener('input', function(){ limpiarError('sfErrMail', mail); });

  var radiosObjetivo = Array.prototype.slice.call(form.querySelectorAll('input[name="sfGoal"]'));
  var radiosWeb = Array.prototype.slice.call(form.querySelectorAll('input[name="sfWeb"]'));

  radiosObjetivo.forEach(function(r){
    r.addEventListener('change', function(){ limpiarError('sfErrGoal', null); });
  });

  radiosWeb.forEach(function(r){
    r.addEventListener('change', function(){
      limpiarError('sfErrWeb', null);
      webUrlWrap.hidden = r.value !== 'si';
      if (r.value !== 'si') webUrl.value = '';
    });
  });

  var unaVez = function(){
    if (empezado) return;
    empezado = true;
    track('cotizador_simple_start');
  };
  form.addEventListener('input', unaVez, { once: true });
  form.addEventListener('change', unaVez, { once: true });

  function objetivoElegido(){
    var el = form.querySelector('input[name="sfGoal"]:checked');
    return el ? el.value : '';
  }

  function webElegida(){
    var el = form.querySelector('input[name="sfWeb"]:checked');
    return el ? el.value : '';
  }

  function validar(){
    var ok = true;
    var primero = null;
    limpiarError('sfErrNombre', nombre);
    limpiarError('sfErrFono', fono);
    limpiarError('sfErrMail', mail);
    limpiarError('sfErrGoal', null);
    limpiarError('sfErrWeb', null);

    if (nombre.value.trim().length < 2) {
      marcarError('sfErrNombre', nombre);
      if (!primero) primero = nombre;
      ok = false;
    }

    if (normalizarFono(fono.value).length !== 8) {
      marcarError('sfErrFono', fono);
      if (!primero) primero = fono;
      ok = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail.value.trim())) {
      marcarError('sfErrMail', mail);
      if (!primero) primero = mail;
      ok = false;
    }

    if (!objetivoElegido()) {
      marcarError('sfErrGoal', null);
      if (!primero) primero = radiosObjetivo[0];
      ok = false;
    }

    if (!webElegida()) {
      marcarError('sfErrWeb', null);
      if (!primero) primero = radiosWeb[0];
      ok = false;
    }

    if (!ok) {
      estado.textContent = 'Revisa los campos marcados.';
      if (primero) primero.focus();
    }
    return ok;
  }

  function codigoLocal(){
    var n = parseInt(localStorage.getItem('fhCotSimpleNum') || '0', 10) + 1;
    localStorage.setItem('fhCotSimpleNum', String(n));
    return 'COT-S-' + String(n).padStart(4, '0');
  }

  function datos(){
    var nombreTxt = nombre.value.trim();
    var fonoTxt = normalizarFono(fono.value);
    var mailTxt = mail.value.trim();
    var objetivo = objetivoElegido();
    var web = webElegida();
    var url = webUrl.value.trim();
    var mensajeTxt = mensaje.value.trim();
    var webTxt = web === 'si'
      ? (url ? 'Sí, ' + url : 'Sí, pero no indicó la dirección')
      : 'No tiene sitio web';
    return {
      nombre: nombreTxt,
      fono: fonoTxt,
      mail: mailTxt,
      objetivo: objetivo,
      web: web,
      webTxt: webTxt,
      mensaje: mensajeTxt
    };
  }

  function resumenWhatsApp(d, codigo){
    var lineas = [
      'Hola Fractal Host, soy ' + d.nombre + '. Envié el formulario simple del cotizador.',
      '• Código: ' + codigo,
      '• Necesito: ' + d.objetivo,
      '• Sitio web: ' + d.webTxt
    ];
    if (d.mensaje) lineas.push('• Mensaje: ' + d.mensaje);
    lineas.push('• Mi contacto: +56 9 ' + d.fono + ' / ' + d.mail);
    lineas.push('Quedo atento(a) a la cotización. Gracias.');
    return lineas.join('\n');
  }

  function mostrarExito(d, codigo, enviado){
    var primerNombre = d.nombre.split(' ')[0] || '';
    successTitle.textContent = primerNombre ? '¡Recibido, ' + primerNombre + '!' : '¡Recibido!';
    successText.innerHTML = enviado
      ? 'Recibimos tu solicitud. Te escribimos a <b>' + d.mail + '</b> en menos de 24 h hábiles.'
      : 'Tu solicitud quedó lista. Envíala por WhatsApp para que la recibamos ahora y te respondamos en menos de 24 h hábiles.';
    codeEl.textContent = codigo;
    waLink.href = 'https://wa.me/56954132014?text=' + encodeURIComponent(resumenWhatsApp(d, codigo));
    form.hidden = true;
    success.hidden = false;
    estado.textContent = '';
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    success.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    successTitle.focus({ preventScroll: true });
    track('generate_lead', { form: 'simple', goal: d.objetivo, metodo: enviado ? 'email' : 'whatsapp' });
  }

  form.addEventListener('submit', async function(e){
    e.preventDefault();
    if (!validar()) return;

    var d = datos();
    var honeypot = website.value.trim();
    var textoBoton = submit.innerHTML;
    submit.disabled = true;
    submit.textContent = 'Enviando…';
    estado.textContent = 'Enviando tu solicitud.';

    var codigo = '';
    var enviado = false;

    if (!honeypot) {
      var fd = new FormData();
      fd.append('nombre', d.nombre);
      fd.append('telefono', '+56 9 ' + d.fono);
      fd.append('correo', d.mail);
      fd.append('persona', 'No especificado');
      fd.append('tipo', d.objetivo);
      fd.append('variante', 'Formulario simple');
      fd.append('extra', d.webTxt);
      fd.append('plazo', 'Por definir');
      fd.append('precio', 'Por definir');
      fd.append('dominio', d.web === 'si' ? d.webTxt : 'No tiene');
      fd.append('contenidos', '');
      fd.append('pago', 'Por definir');
      fd.append('mensaje', d.mensaje);
      fd.append('detalle', 'Formulario simple\nNecesita: ' + d.objetivo + '\nSitio web: ' + d.webTxt + (d.mensaje ? '\nMensaje: ' + d.mensaje : ''));
      fd.append('hosting', 'Por definir');
      fd.append('fh_website', honeypot);
      fd.append('origen', 'simple');

      try {
        var resp = await fetch('cotizacion-enviar.php', { method: 'POST', body: fd });
        if (resp.ok) {
          var txt = (await resp.text()).trim();
          if (txt && txt.charAt(0) !== '<') {
            var json = JSON.parse(txt);
            if (json && json.codigo) codigo = json.codigo;
            if (json && json.ok) enviado = true;
          } else {
            /* El servidor no devolvió JSON: se usa el respaldo por WhatsApp. */
          }
        }
      } catch (err) {
        /* Sin conexión con el backend: se usa el respaldo por WhatsApp. */
      }
    } else {
      enviado = true;
    }

    if (!codigo) codigo = codigoLocal();
    mostrarExito(d, codigo, enviado);
    submit.disabled = false;
    submit.innerHTML = textoBoton;
  });

  again.addEventListener('click', function(){
    form.reset();
    form.hidden = false;
    success.hidden = true;
    webUrlWrap.hidden = true;
    ['sfErrNombre','sfErrFono','sfErrMail','sfErrGoal','sfErrWeb'].forEach(function(id){
      var el = $(id); if (el) el.hidden = true;
    });
    [nombre, fono, mail].forEach(function(el){
      el.removeAttribute('aria-invalid');
      el.classList.remove('cot-field-err');
    });
    estado.textContent = '';
    nombre.focus();
  });

  waLink.addEventListener('click', function(){
    track('cotizador_simple_whatsapp', { goal: objetivoElegido() });
  });
})();

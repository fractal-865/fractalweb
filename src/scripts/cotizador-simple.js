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
  var tipoWrap = $('sfTipoWrap');
  var tipoSitio = $('sfTipoSitio');
  var siteUrlWrap = $('sfSiteUrlWrap');
  var siteUrl = $('sfSiteUrl');
  var privacidad = $('sfPrivacidad');
  var actions = $('sfActions');
  var waSubmit = $('sfWhatsAppSubmit');
  var submit = $('sfSubmit');
  var success = $('sfSuccess');
  var successTitle = $('sfSuccessTitle');
  var successText = $('sfSuccessText');
  var codeEl = $('sfCode');
  var waLink = $('sfWhatsapp');
  var waLabel = $('sfWhatsappLabel');
  var again = $('sfAgain');
  var estado = $('sfEstado');
  var empezado = false;

  var radiosObjetivo = Array.prototype.slice.call(form.querySelectorAll('input[name="sfGoal"]'));

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

  function objetivoElegido(){
    var el = form.querySelector('input[name="sfGoal"]:checked');
    return el ? el.value : '';
  }

  function telefonoDigitos(){
    return String(fono.value || '').replace(/\D/g, '');
  }

  function telefonoValido(){
    var d = telefonoDigitos();
    return d.length >= 8 && d.length <= 12;
  }

  function telefonoOpcionalValido(){
    var d = telefonoDigitos();
    return d.length === 0 || (d.length >= 8 && d.length <= 12);
  }

  function actualizarSplit(){
    var activo = telefonoValido();
    actions.classList.toggle('is-split', activo);
    waSubmit.tabIndex = activo ? 0 : -1;
    waSubmit.setAttribute('aria-hidden', activo ? 'false' : 'true');
  }

  function normalizarUrl(valor){
    var v = String(valor || '').trim();
    if (!v) return '';
    if (!/^https?:\/\//i.test(v)) v = 'https://' + v;
    return v;
  }

  function urlValida(valor){
    var v = normalizarUrl(valor);
    if (!v) return false;
    try {
      var u = new URL(v);
      return /\.[a-z]{2,}/i.test(u.hostname);
    } catch (e) {
      return false;
    }
  }

  function actualizarCondicionales(){
    var objetivo = objetivoElegido();
    var esNuevo = objetivo === 'Sitio web nuevo';
    var esUrl = objetivo === 'Rediseño de sitio web' || objetivo === 'Mantención web';

    tipoWrap.hidden = !esNuevo;
    siteUrlWrap.hidden = !esUrl;

    if (esUrl && !siteUrl.value.trim()) siteUrl.value = 'https://';
    if (!esNuevo) limpiarError('sfErrTipo', tipoSitio);
    if (!esUrl) limpiarError('sfErrSiteUrl', siteUrl);
  }

  fono.addEventListener('input', function(){
    limpiarError('sfErrFono', fono);
    actualizarSplit();
  });
  fono.addEventListener('change', actualizarSplit);

  nombre.addEventListener('input', function(){ limpiarError('sfErrNombre', nombre); });
  mail.addEventListener('input', function(){ limpiarError('sfErrMail', mail); });
  tipoSitio.addEventListener('change', function(){ limpiarError('sfErrTipo', tipoSitio); });
  privacidad.addEventListener('change', function(){ limpiarError('sfErrPrivacidad', privacidad); });

  siteUrl.addEventListener('input', function(){ limpiarError('sfErrSiteUrl', siteUrl); });
  siteUrl.addEventListener('blur', function(){
    var v = siteUrl.value.trim();
    if (v && !/^https?:\/\//i.test(v)) siteUrl.value = 'https://' + v;
  });

  radiosObjetivo.forEach(function(r){
    r.addEventListener('change', function(){
      limpiarError('sfErrGoal', null);
      actualizarCondicionales();
    });
  });

  var unaVez = function(){
    if (empezado) return;
    empezado = true;
    track('cotizador_simple_start');
  };
  form.addEventListener('input', unaVez, { once: true });
  form.addEventListener('change', unaVez, { once: true });

  function validar(){
    var ok = true;
    var primero = null;
    limpiarError('sfErrNombre', nombre);
    limpiarError('sfErrFono', fono);
    limpiarError('sfErrMail', mail);
    limpiarError('sfErrGoal', null);
    limpiarError('sfErrTipo', tipoSitio);
    limpiarError('sfErrSiteUrl', siteUrl);
    limpiarError('sfErrPrivacidad', privacidad);

    var objetivo = objetivoElegido();

    if (nombre.value.trim().length < 2) {
      marcarError('sfErrNombre', nombre);
      if (!primero) primero = nombre;
      ok = false;
    }

    if (fono.value.trim() && !telefonoOpcionalValido()) {
      marcarError('sfErrFono', fono);
      if (!primero) primero = fono;
      ok = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail.value.trim())) {
      marcarError('sfErrMail', mail);
      if (!primero) primero = mail;
      ok = false;
    }

    if (!objetivo) {
      marcarError('sfErrGoal', null);
      if (!primero) primero = radiosObjetivo[0];
      ok = false;
    }

    if (objetivo === 'Sitio web nuevo' && !tipoSitio.value) {
      marcarError('sfErrTipo', tipoSitio);
      if (!primero) primero = tipoSitio;
      ok = false;
    }

    if ((objetivo === 'Rediseño de sitio web' || objetivo === 'Mantención web') && !urlValida(siteUrl.value)) {
      marcarError('sfErrSiteUrl', siteUrl);
      if (!primero) primero = siteUrl;
      ok = false;
    }

    if (!privacidad.checked) {
      marcarError('sfErrPrivacidad', privacidad);
      if (!primero) primero = privacidad;
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
    var objetivo = objetivoElegido();
    var esNuevo = objetivo === 'Sitio web nuevo';
    var esUrl = objetivo === 'Rediseño de sitio web' || objetivo === 'Mantención web';
    return {
      nombre: nombre.value.trim(),
      fono: fono.value.trim(),
      mail: mail.value.trim(),
      objetivo: objetivo,
      tipo: esNuevo ? tipoSitio.value : '',
      url: esUrl ? normalizarUrl(siteUrl.value) : '',
      mensaje: mensaje.value.trim()
    };
  }

  function resumenWhatsApp(d, codigo){
    var lineas = [
      'Hola Fractal Host, soy ' + d.nombre + '. Quiero cotizar por WhatsApp.',
      '• Código: ' + codigo,
      '• Necesito: ' + d.objetivo
    ];
    if (d.tipo) lineas.push('• Tipo de sitio: ' + d.tipo);
    if (d.url) lineas.push('• Sitio actual: ' + d.url);
    if (d.mensaje) lineas.push('• Mensaje: ' + d.mensaje);
    lineas.push('• Mi contacto: ' + (d.fono || 'sin teléfono') + ' / ' + d.mail);
    lineas.push('Quedo atento(a) a la cotización. Gracias.');
    return lineas.join('\n');
  }

  function mostrarExito(d, codigo, canal, enviado){
    var primerNombre = d.nombre.split(' ')[0] || '';
    successTitle.textContent = primerNombre ? '¡Listo, ' + primerNombre + '!' : '¡Listo!';

    if (canal === 'whatsapp') {
      successText.innerHTML = 'Abrimos WhatsApp con tu solicitud. Envía el mensaje para que la recibamos y te respondamos en menos de 24 h hábiles.';
      if (waLabel) waLabel.textContent = 'Abrir WhatsApp';
    } else {
      successText.innerHTML = enviado
        ? 'Recibimos tu solicitud. Te escribimos a <b>' + d.mail + '</b> en menos de 24 h hábiles.'
        : 'Tu solicitud quedó lista. Envíala por WhatsApp para que la recibamos ahora y te respondamos en menos de 24 h hábiles.';
      if (waLabel) waLabel.textContent = 'Enviar por WhatsApp';
    }

    codeEl.textContent = codigo;
    waLink.href = 'https://wa.me/56954132014?text=' + encodeURIComponent(resumenWhatsApp(d, codigo));
    form.hidden = true;
    success.hidden = false;
    estado.textContent = '';

    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    success.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    successTitle.focus({ preventScroll: true });
    track('generate_lead', { form: 'simple', goal: d.objetivo, canal: canal, tipo_sitio: d.tipo || 'no aplica' });
  }

  function bloquearBotones(bloqueado){
    submit.disabled = bloqueado;
    waSubmit.disabled = bloqueado;
  }

  form.addEventListener('submit', async function(e){
    e.preventDefault();
    if (!validar()) return;

    var d = datos();
    var honeypot = website.value.trim();
    var htmlBoton = submit.innerHTML;
    bloquearBotones(true);
    submit.textContent = 'Enviando…';
    estado.textContent = 'Enviando tu solicitud.';

    var codigo = '';
    var enviado = false;

    if (!honeypot) {
      var fd = new FormData();
      fd.append('nombre', d.nombre);
      fd.append('telefono', d.fono || 'No indicado');
      fd.append('correo', d.mail);
      fd.append('persona', 'No especificado');
      fd.append('tipo', d.tipo || d.objetivo);
      fd.append('variante', 'Formulario simple');
      fd.append('extra', 'Necesita: ' + d.objetivo + (d.tipo ? '\nTipo de sitio: ' + d.tipo : '') + (d.url ? '\nSitio actual: ' + d.url : ''));
      fd.append('plazo', 'Por definir');
      fd.append('precio', 'Por definir');
      fd.append('dominio', d.url || 'No aplica');
      fd.append('contenidos', '');
      fd.append('pago', 'Por definir');
      fd.append('mensaje', d.mensaje);
      fd.append('detalle', 'Formulario simple\nNecesita: ' + d.objetivo + (d.tipo ? '\nTipo de sitio: ' + d.tipo : '') + (d.url ? '\nSitio actual: ' + d.url : '') + (d.mensaje ? '\nMensaje: ' + d.mensaje : ''));
      fd.append('hosting', 'Por definir');
      fd.append('fh_website', honeypot);
      fd.append('origen', 'simple');
      fd.append('canal', 'email');
      fd.append('tipo_sitio', d.tipo);
      fd.append('sitio_actual', d.url);

      try {
        var resp = await fetch('cotizacion-enviar.php', { method: 'POST', body: fd });
        if (resp.ok) {
          var txt = (await resp.text()).trim();
          if (txt && txt.charAt(0) !== '<') {
            var json = JSON.parse(txt);
            if (json && json.codigo) codigo = json.codigo;
            if (json && json.ok) enviado = true;
          }
        }
      } catch (err) {
        /* Sin conexión con el backend: se usa el respaldo por WhatsApp. */
      }
    } else {
      enviado = true;
    }

    if (!codigo) codigo = codigoLocal();
    mostrarExito(d, codigo, 'email', enviado);
    bloquearBotones(false);
    submit.innerHTML = htmlBoton;
  });

  waSubmit.addEventListener('click', function(){
    if (!validar()) return;

    var d = datos();
    var codigo = codigoLocal();
    mostrarExito(d, codigo, 'whatsapp', true);
    var waUrl = waLink.href;

    track('cotizador_simple_whatsapp', { goal: d.objetivo, tipo_sitio: d.tipo || 'no aplica' });
    window.open(waUrl, '_blank', 'noopener');
  });

  again.addEventListener('click', function(){
    form.reset();
    form.hidden = false;
    success.hidden = true;
    tipoWrap.hidden = true;
    siteUrlWrap.hidden = true;
    siteUrl.value = 'https://';
    actualizarSplit();
    ['sfErrNombre','sfErrFono','sfErrMail','sfErrGoal','sfErrTipo','sfErrSiteUrl','sfErrPrivacidad'].forEach(function(id){
      var el = $(id); if (el) el.hidden = true;
    });
    [nombre, fono, mail, tipoSitio, siteUrl, privacidad].forEach(function(el){
      el.removeAttribute('aria-invalid');
      el.classList.remove('cot-field-err');
    });
    estado.textContent = '';
    nombre.focus();
  });

  actualizarSplit();
  actualizarCondicionales();

  waLink.addEventListener('click', function(){
    track('cotizador_simple_whatsapp', { goal: objetivoElegido(), tipo_sitio: tipoSitio.value || 'no aplica' });
  });
})();

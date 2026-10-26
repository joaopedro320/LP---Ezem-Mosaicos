/* Ezem Mosaicos e Pedras | LP | QH4 Growth */
(function () {
  'use strict';
  var WA = '5585981448844';
  var doc = document.documentElement;
  doc.classList.add('js');
  window.dataLayer = window.dataLayer || [];
  function track(ev, data) { var o = { event: ev }; for (var k in (data || {})) o[k] = data[k]; window.dataLayer.push(o); }
  var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* intro do hero */
  requestAnimationFrame(function () { requestAnimationFrame(function () { doc.classList.add('pronto'); }); });

  /* parallax leve na foto do hero */
  var heroImg = document.querySelector('.hero__foto img');
  if (heroImg && !reduz) {
    var tick = false;
    window.addEventListener('scroll', function () {
      if (tick) return; tick = true;
      requestAnimationFrame(function () {
        var y = Math.min(window.scrollY, window.innerHeight);
        heroImg.style.transform = 'translate3d(0,' + (y * 0.12).toFixed(1) + 'px,0)';
        tick = false;
      });
    }, { passive: true });
  }

  /* scroll reveal */
  var alvos = document.querySelectorAll('.amostra__cab, .amostra__grid, .obras__cab, .fita, .processo__cab, .passos li, .vivencia__texto, .vivencia__fotos, .orc__texto, .form, .faq__grid');
  alvos.forEach(function (el, i) { el.classList.add('rv'); if (el.matches('.passos li')) el.style.transitionDelay = (Array.prototype.indexOf.call(el.parentNode.children, el) * 90) + 'ms'; });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    alvos.forEach(function (el) { io.observe(el); });
  } else { alvos.forEach(function (el) { el.classList.add('on'); }); }

  /* amostrario (tabs) */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.amostra__lista [role="tab"]'));
  function ativa(tab, foco) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    if (foco) tab.focus();
    if (window.matchMedia('(max-width:860px)').matches) tab.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduz ? 'auto' : 'smooth' });
    track('pedra_visualizada', { pedra: tab.querySelector('.n').textContent });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { ativa(t); });
    t.addEventListener('keydown', function (e) {
      var n = null;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === 'Home') n = tabs[0];
      if (e.key === 'End') n = tabs[tabs.length - 1];
      if (n) { e.preventDefault(); ativa(n, true); }
    });
  });

  /* botao "Orçar X" pre-seleciona a pedra no formulario */
  var selPedra = document.getElementById('f-pedra');
  document.querySelectorAll('[data-escolher]').forEach(function (b) {
    b.addEventListener('click', function () {
      var v = b.getAttribute('data-escolher');
      Array.prototype.forEach.call(selPedra.options, function (o) { if (o.text === v) selPedra.value = o.value || o.text; });
      selPedra.dispatchEvent(new Event('change', { bubbles: true }));
      track('cta_orcar_pedra', { pedra: v });
    });
  });

  /* galeria em fita */
  var fita = document.querySelector('.fita');
  document.querySelectorAll('.seta').forEach(function (b) {
    b.addEventListener('click', function () {
      fita.scrollBy({ left: Number(b.dataset.dir) * fita.clientWidth * 0.7, behavior: reduz ? 'auto' : 'smooth' });
    });
  });

  /* lightbox */
  var lb = document.getElementById('lb'), lbImg = lb.querySelector('img'), lbLeg = lb.querySelector('.lb__leg'), ultimo = null;
  function fecha() { lb.hidden = true; document.body.style.overflow = ''; if (ultimo) ultimo.focus(); }
  document.querySelectorAll('.zoom').forEach(function (z) {
    z.addEventListener('click', function () {
      var img = z.querySelector('img');
      ultimo = z; lbImg.src = img.src; lbImg.alt = img.alt;
      lbLeg.textContent = z.parentNode.querySelector('figcaption').textContent;
      lb.hidden = false; document.body.style.overflow = 'hidden';
      lb.querySelector('.lb__x').focus();
    });
  });
  lb.addEventListener('click', function (e) { if (e.target === lb || e.target.closest('.lb__x')) fecha(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !lb.hidden) fecha(); });

  /* cliques de WhatsApp */
  document.querySelectorAll('[data-wa]').forEach(function (a) {
    a.addEventListener('click', function () { track('whatsapp_click', { local: a.getAttribute('data-wa') }); });
  });
  document.querySelectorAll('[data-track]').forEach(function (a) {
    a.addEventListener('click', function () { track('cta_click', { local: a.getAttribute('data-track') }); });
  });

  /* formulario */
  var form = document.getElementById('form-orc');
  var btn = document.getElementById('f-enviar');
  var nota = document.getElementById('f-nota');
  var tel = document.getElementById('f-whats');
  var iniciado = false;

  tel.addEventListener('input', function () {
    var d = tel.value.replace(/\D/g, '').slice(0, 11), r = '';
    if (d.length > 0) r = '(' + d.slice(0, 2);
    if (d.length >= 3) r += ') ' + d.slice(2, 3);
    if (d.length >= 4) r += ' ' + d.slice(3, 7);
    if (d.length >= 8) r += '-' + d.slice(7, 11);
    tel.value = r;
  });

  function valida() {
    var ok = form.checkValidity();
    btn.disabled = !ok;
    nota.textContent = ok ? 'Tudo certo. Ao enviar, a conversa abre no WhatsApp com os seus dados.' : 'Preencha os campos para liberar o envio.';
  }
  ['input', 'change'].forEach(function (ev) {
    form.addEventListener(ev, function () {
      if (!iniciado) { iniciado = true; track('form_start'); }
      valida();
    });
  });
  valida();

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    var f = new FormData(form);
    var linhas = [
      'Olá, vim pelo site e quero um orçamento.',
      '',
      '*Nome:* ' + f.get('nome'),
      '*WhatsApp:* ' + f.get('whatsapp'),
      '*Perfil:* ' + f.get('perfil'),
      '*Pedra:* ' + f.get('pedra'),
      '*Aplicação:* ' + f.get('aplicacao'),
      '*Área aproximada:* ' + f.get('area') + ' m²',
      '*Cidade da obra:* ' + f.get('cidade')
    ];
    var msg = (f.get('mensagem') || '').trim();
    if (msg) linhas.push('*Sobre a obra:* ' + msg);
    var url = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(linhas.join('\n'));
    track('generate_lead', { form: 'orcamento', pedra: f.get('pedra'), perfil: f.get('perfil'), aplicacao: f.get('aplicacao') });
    try { sessionStorage.setItem('ezem_wa', url); } catch (err) {}
    window.open(url, '_blank', 'noopener');
    setTimeout(function () { window.location.href = 'obrigado.html'; }, 400);
  });
})();

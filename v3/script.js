// Menu no celular
(function () {
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('menu');
  if (!toggle || !nav) return;

  function setOpen(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  }

  toggle.addEventListener('click', function () {
    setOpen(!nav.classList.contains('is-open'));
  });

  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') setOpen(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });
})();

// Cabeçalho ganha sombra ao rolar
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;
  var update = function () {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
})();

// Revelação ao rolar: conteúdo já nasce visível; só fica pendente
// (e depois some a espera) se o navegador aceita IntersectionObserver
// e a pessoa não pediu para reduzir movimento.
(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window) || !items.length) return;

  items.forEach(function (el) { el.classList.add('reveal-pending'); });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.remove('reveal-pending');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });

  items.forEach(function (el) { io.observe(el); });
})();

// Disco do hero acompanha a rolagem com um leve parallax; o overflow
// escondido da seção o recorta ao sair, então ele "afunda" atrás do
// conteúdo em vez de flutuar por cima da página inteira.
(function () {
  var disc = document.querySelector('.hero__disc');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!disc || reduceMotion) return;

  var ticking = false;
  var update = function () {
    var shift = Math.min(window.scrollY * 0.18, 90);
    disc.style.transform = 'translateY(' + shift + 'px)';
    ticking = false;
  };
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
})();

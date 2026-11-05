(function () {
  var root = document.documentElement;
  var items = document.querySelectorAll('.reveal');

  function showAll() {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Fade-in on scroll. If anything fails, the content simply stays visible.
  try {
    if ('IntersectionObserver' in window) {
      root.classList.add('js');
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, { threshold: 0.12 });
      items.forEach(function (el, i) {
        el.style.transitionDelay = (i % 3) * 90 + 'ms';
        io.observe(el);
      });
    }
  } catch (err) {
    root.classList.remove('js');
    showAll();
  }

  // Mobile menu
  var menu = document.getElementById('menu');
  var links = document.getElementById('links');
  if (menu && links) {
    menu.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      menu.setAttribute('aria-expanded', open);
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        menu.setAttribute('aria-expanded', false);
      }
    });
  }
})();

(function () {
  'use strict';

  var root = document.documentElement;
  // The inline script in <head> adds .js (and skips it for reduced motion)
  if (!root.classList.contains('js')) return;

  var loader = document.querySelector('.loader');
  var MIN_LOADER_MS = 1200;
  var started = Date.now();
  var finished = false;

  // [selector, extra classes]
  var TARGETS = [
    ['.section-head, .gallery__head, .quote__intro, .quote-form', ''],
    ['.service-card', ''],
    ['.media--feature', 'reveal--left'],
    ['.feature__content', 'reveal--right'],
    ['.rental-tile', ''],
    ['.step', ''],
    ['.review', ''],
    ['.gallery__grid > li', ''],
    ['.site-footer__about, .site-footer__col', '']
  ];

  var observer = null;

  function reveal(batch) {
    batch.sort(function (a, b) {
      var ra = a.target.getBoundingClientRect();
      var rb = b.target.getBoundingClientRect();
      return ra.top - rb.top || ra.left - rb.left;
    });

    batch.forEach(function (entry, i) {
      var el = entry.target;
      var delay = Math.min(i, 5) * 90; // stagger only what appears together
      observer.unobserve(el);
      el.style.setProperty('--reveal-delay', delay + 'ms');
      el.classList.add('is-visible');

      // Hand control back to the element's own styles (hover lifts etc.)
      setTimeout(function () {
        el.classList.remove('reveal', 'reveal--left', 'reveal--right', 'is-visible');
        el.style.removeProperty('--reveal-delay');
      }, delay + 1800);
    });
  }

  function prepareReveals() {
    if (!('IntersectionObserver' in window)) return;

    var els = [];
    TARGETS.forEach(function (t) {
      document.querySelectorAll(t[0]).forEach(function (el) {
        el.classList.add('reveal');
        if (t[1]) t[1].split(' ').forEach(function (c) { el.classList.add(c); });
        els.push(el);
      });
    });

    observer = new IntersectionObserver(function (entries) {
      reveal(entries.filter(function (e) { return e.isIntersecting; }));
    }, { rootMargin: '0px 0px -5% 0px', threshold: 0.1 });

    void document.body.offsetHeight; // commit the hidden state before observing
    return els;
  }

  var pending = prepareReveals();

  function finish() {
    if (finished) return;
    finished = true;
    root.classList.add('is-loaded');
    if (observer && pending) pending.forEach(function (el) { observer.observe(el); });
    if (loader) setTimeout(function () { loader.remove(); }, 1500);
  }

  function whenReady() {
    var wait = Math.max(0, MIN_LOADER_MS - (Date.now() - started));
    setTimeout(finish, wait);
  }

  if (document.readyState === 'complete') whenReady();
  else window.addEventListener('load', whenReady);

  setTimeout(finish, 5000); // never leave visitors behind the loader
})();

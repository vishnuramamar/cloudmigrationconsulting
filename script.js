(function () {
  'use strict';

  // Year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Sticky header shadow
  var header = document.getElementById('siteHeader');
  function onScroll() {
    if (window.scrollY > 20) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Reveal on scroll
  var reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // Animated stat counters
  var counters = document.querySelectorAll('.stat-num');
  var counted = false;
  function animateCounters() {
    if (counted) return;
    counted = true;
    counters.forEach(function (el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var decimals = (target % 1 !== 0) ? 1 : 0;
      var start = 0;
      var duration = 1600;
      var startTime = null;
      function tick(now) {
        if (!startTime) startTime = now;
        var progress = Math.min((now - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var value = start + (target - start) * eased;
        el.textContent = value.toFixed(decimals);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target.toFixed(decimals);
      }
      requestAnimationFrame(tick);
    });
  }
  var statsSection = document.querySelector('.stats');
  if (statsSection && 'IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { animateCounters(); so.disconnect(); } });
    }, { threshold: 0.4 });
    so.observe(statsSection);
  } else {
    animateCounters();
  }

  // Service card spotlight follow
  document.querySelectorAll('.service-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
      card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
    });
  });

  // Contact form (client-side, opens mail client)
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();
      note.className = 'form-note';

      if (!name || !email || !message) {
        note.textContent = 'Please fill in all fields.';
        note.classList.add('error');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        note.textContent = 'Please enter a valid email address.';
        note.classList.add('error');
        return;
      }

      var subject = encodeURIComponent('Consultation request from ' + name);
      var body = encodeURIComponent(
        'Name: ' + name + '\nEmail: ' + email + '\n\n' + message
      );
      window.location.href =
        'mailto:accounts@cloudmigrationconsulting.net?subject=' + subject + '&body=' + body;

      note.textContent = 'Opening your email client… we\'ll be in touch shortly!';
      note.classList.add('success');
      form.reset();
    });
  }
})();

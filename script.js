/* =============================================
   FUSION MIXTA — script.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- NAVBAR: scroll effect + active link ---- */
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const onScroll = () => {
    // Scrolled class
    navbar.classList.toggle('scrolled', window.scrollY > 40);

    // Active nav link
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* ---- HAMBURGER MENU ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });

  // Close on link click
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });

  /* ---- MENU TABS ---- */
  const tabBtns  = document.querySelectorAll('.tab-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;

      // Toggle active button
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show/hide cards
      menuCards.forEach(card => {
        const show = card.dataset.cat === tab;
        card.style.display = show ? '' : 'none';
        if (show) {
          card.style.animation = 'none';
          card.offsetHeight; // reflow
          card.style.animation = 'fadeUp .4s ease both';
        }
      });
    });
  });

  /* ---- SCROLL REVEAL ---- */
  const revealEls = document.querySelectorAll(
    '.menu-card, .about-card, .review-card, .gallery-item, .contact-item, .stat'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeUp .55s ease both';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });

  /* ---- SMOOTH SCROLL for all internal links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });

  /* ---- WHATSAPP FLOAT: show after 2s ---- */
  const waBtn = document.querySelector('.whatsapp-float');
  if (waBtn) {
    waBtn.style.opacity = '0';
    waBtn.style.transform = 'scale(.5)';
    waBtn.style.transition = 'opacity .5s ease, transform .5s ease';
    setTimeout(() => {
      waBtn.style.opacity = '1';
      waBtn.style.transform = 'scale(1)';
    }, 2000);
  }

});

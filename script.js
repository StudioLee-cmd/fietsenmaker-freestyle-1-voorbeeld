/* ============================================
   FietsVakwerk — Script
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Lucide Icons --- */
  lucide.createIcons();

  /* --- Navbar scroll --- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* --- Mobile nav --- */
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  toggle.addEventListener('click', () => {
    links.classList.toggle('active');
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('active'));
  });

  /* --- GSAP Animations --- */
  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('[data-animate]').forEach(el => {
    const type = el.dataset.animate;
    const delay = parseFloat(el.dataset.delay) || 0;
    let from = { opacity: 0, duration: 0.8, delay };

    switch (type) {
      case 'fade-up':    from.y = 40; break;
      case 'fade-down':  from.y = -40; break;
      case 'fade-left':  from.x = 60; break;
      case 'fade-right': from.x = -60; break;
      default:           from.y = 30;
    }

    gsap.from(el, {
      ...from,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });
  });

  /* --- Counter animation --- */
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    gsap.to(el, {
      innerText: target,
      duration: 2,
      snap: { innerText: 1 },
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
      onUpdate() {
        const val = Math.round(parseFloat(el.innerText));
        el.innerText = val >= 1000 ? val.toLocaleString('nl-NL') : val;
      },
    });
  });

  /* --- Carousel --- */
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  let current = 0;

  function getVisible() {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  function moveCarousel() {
    const visible = getVisible();
    const maxIndex = Math.max(slides.length - visible, 0);
    current = Math.min(current, maxIndex);
    const slideW = slides[0].offsetWidth + 24;
    gsap.to(track, { x: -(current * slideW), duration: 0.6, ease: 'power2.out' });
  }

  prevBtn?.addEventListener('click', () => { if (current > 0) { current--; moveCarousel(); } });
  nextBtn?.addEventListener('click', () => {
    const visible = getVisible();
    if (current < slides.length - visible) { current++; moveCarousel(); }
  });
  window.addEventListener('resize', moveCarousel);

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
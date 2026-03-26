/* ========================================
   CLEANFLEX — Landing Page Scripts
   Vanilla JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Rotating Text Animation ---
  const words = [
    'restaurantes',
    'hoteles',
    'eventos',
    'gimnasios',
    'tu día a día',
    'oficinas',
    'food trucks'
  ];

  const rotatingEl = document.getElementById('rotatingText');
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      rotatingEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      rotatingEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 400; // Pause before next word
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();


  // --- Navbar Scroll Effect ---
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  function handleNavScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });


  // --- Mobile Menu Toggle ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });


  // --- Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // --- Counter Animation ---
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-count'));
        const duration = 2000;
        const start = performance.now();

        function updateCount(currentTime) {
          const elapsed = currentTime - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = eased * target;

          if (target % 1 !== 0) {
            el.textContent = current.toFixed(1);
          } else {
            el.textContent = Math.floor(current);
          }

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            if (target % 1 !== 0) {
              el.textContent = target.toFixed(1);
            } else {
              el.textContent = target;
            }
          }
        }

        requestAnimationFrame(updateCount);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));


  // --- Smooth Scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = navbar.offsetHeight + 20;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  // --- Active nav link on scroll ---
  const sections = document.querySelectorAll('section[id]');

  function highlightNav() {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop - navbar.offsetHeight - 40;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);

      if (link) {
        if (scrollY >= top && scrollY < bottom) {
          link.style.color = 'var(--primary)';
          link.style.fontWeight = '700';
        } else {
          link.style.color = '';
          link.style.fontWeight = '';
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });

});

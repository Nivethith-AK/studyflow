// === PRELOADER ===
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('preloader-hidden');
  }
});

// === Feather Icons ===
if (typeof feather !== 'undefined') {
  feather.replace();
}

// === Header Hide on Scroll ===
const header = document.querySelector('.main-header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  if (!header) return;
  if (navLinks && navLinks.classList.contains('active')) {
    header.classList.remove('header-hidden');
    return;
  }

  if (window.scrollY > lastScrollY && window.scrollY > 150) {
    header.classList.add('header-hidden');
  } else {
    header.classList.remove('header-hidden');
  }

  lastScrollY = Math.max(window.scrollY, 0);
});

// === Animate on Scroll ===
const animatedElements = document.querySelectorAll('.animate-on-scroll');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

animatedElements.forEach(el => {
  if (el.getBoundingClientRect().top < window.innerHeight) {
    el.classList.add('is-visible');
    observer.unobserve(el);
  } else {
    observer.observe(el);
  }
});

// === Mobile Menu Toggle ===
const menuToggle = document.getElementById('mobile-menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    if (header) {
      header.classList.toggle('nav-open', navLinks.classList.contains('active'));
    }

    const icon = menuToggle.querySelector('i');
    icon.setAttribute('data-feather', navLinks.classList.contains('active') ? 'x' : 'menu');
    feather.replace();
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      if (header) header.classList.remove('nav-open');
      const icon = menuToggle.querySelector('i');
      icon.setAttribute('data-feather', 'menu');
      feather.replace();
    });
  });
}
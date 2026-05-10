// ============================================
// Hero reveals on load (above the fold)
// ============================================
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.hero .reveal').forEach((el) => el.classList.add('is-visible'));
});

// ============================================
// Reveal-on-scroll using IntersectionObserver
// ============================================
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// ============================================
// Stagger groups: items inside .stagger get sequential reveal delays
// ============================================
document.querySelectorAll('.stagger').forEach((group) => {
  // Skip groups that define their own stagger in CSS
  if (group.classList.contains('gallery')) return;
  group.querySelectorAll('.reveal').forEach((item, i) => {
    item.style.transitionDelay = `${i * 100}ms`;
  });
});

// ============================================
// Sticky nav: shadow on scroll + mobile toggle
// ============================================
const nav = document.getElementById('nav');
const navToggle = document.getElementById('nav-toggle');
const navList = document.getElementById('nav-list');

window.addEventListener('scroll', () => {
  nav.classList.toggle('is-scrolled', window.scrollY > 80);
}, { passive: true });

navToggle.addEventListener('click', () => {
  const isOpen = navList.classList.toggle('is-open');
  navToggle.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close menu when a link is clicked (mobile UX)
navList.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', () => {
    navList.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============================================
// Count-up stats: animate 0 → target when scrolled into view
// ============================================
function countUp(el) {
  const target = parseInt(el.dataset.countTo, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1500;
  const start = performance.now();

  function tick(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
    el.textContent = Math.round(target * eased) + suffix;
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('[data-count-to]').forEach((el) => countObserver.observe(el));

// ============================================
// Contact form (preview-only — no real backend yet)
// ============================================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic required-field check (HTML5 validation)
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    // Show success message
    const success = document.getElementById('form-success');
    if (success) {
      success.hidden = false;
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Optionally clear the form
    contactForm.reset();
  });
}

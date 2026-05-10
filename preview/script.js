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
// Testimonials carousel
// ============================================
class TestimonialsCarousel {
  constructor(el) {
    this.el = el;
    this.track = el.querySelector('.testimonials__track');
    this.cards = [...el.querySelectorAll('.testimonial')];
    this.prevBtn = el.querySelector('.testimonials__btn--prev');
    this.nextBtn = el.querySelector('.testimonials__btn--next');
    this.dots = [...el.querySelectorAll('.testimonials__dot')];
    this.index = 0;
    this.autoMs = 6000;
    this.timer = null;

    this.prevBtn?.addEventListener('click', () => { this.go(-1); this.restart(); });
    this.nextBtn?.addEventListener('click', () => { this.go(1); this.restart(); });
    this.dots.forEach((d, i) => d.addEventListener('click', () => { this.set(i); this.restart(); }));
    this.el.addEventListener('mouseenter', () => this.pause());
    this.el.addEventListener('mouseleave', () => this.play());

    // Touch swipe (basic)
    let startX = 0;
    this.track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    this.track.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) { this.go(dx < 0 ? 1 : -1); this.restart(); }
    });

    this.update();
    this.play();
  }
  go(delta) {
    this.index = (this.index + delta + this.cards.length) % this.cards.length;
    this.update();
  }
  set(i) {
    this.index = i;
    this.update();
  }
  update() {
    this.track.style.transform = `translateX(${-this.index * 100}%)`;
    this.dots.forEach((d, i) => d.classList.toggle('is-active', i === this.index));
  }
  play() {
    this.pause();
    if (this.cards.length <= 1) return;
    this.timer = setInterval(() => this.go(1), this.autoMs);
  }
  pause() {
    if (this.timer) { clearInterval(this.timer); this.timer = null; }
  }
  restart() { this.play(); }
}

document.querySelectorAll('.testimonials').forEach((el) => new TestimonialsCarousel(el));

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

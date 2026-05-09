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

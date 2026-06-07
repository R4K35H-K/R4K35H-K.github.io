// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

  // Navbar scroll effect + Back to Top button
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    // Navbar shrink
    if (window.scrollY > 50) {
      navbar.style.padding = '0.6rem 0';
      navbar.style.background = 'rgba(10, 15, 30, 0.95)';
    } else {
      navbar.style.padding = '1.1rem 0';
      navbar.style.background = 'rgba(10, 15, 30, 0.75)';
    }

    // Back to Top visibility
    if (backToTop) {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  }, { passive: true });

  // Back to Top click handler
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Intersection Observer for scroll-reveal
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: "0px 0px -40px 0px"
  });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Animate stat numbers in hero
  const animateNumbers = () => {
    document.querySelectorAll('.stat-num').forEach(el => {
      const target = el.textContent.replace(/\D/g, '');
      if (!target || isNaN(target)) return;
      const suffix = el.textContent.replace(/\d/g, '').trim();
      let current = 0;
      const increment = Math.ceil(Number(target) / 30);
      const timer = setInterval(() => {
        current += increment;
        if (current >= Number(target)) {
          el.textContent = target + suffix;
          clearInterval(timer);
        } else {
          el.textContent = current + suffix;
        }
      }, 40);
    });
  };

  // Trigger number animation when hero is visible
  const heroObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateNumbers();
      heroObserver.disconnect();
    }
  }, { threshold: 0.3 });

  const heroSection = document.getElementById('hero');
  if (heroSection) heroObserver.observe(heroSection);
});

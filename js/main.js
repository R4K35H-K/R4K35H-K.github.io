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

  // Autoplay handler and loaded state check for steganography videos
  const stegoVideos = document.querySelectorAll('.featured-visual video');
  stegoVideos.forEach(video => {
    // When first frame is loaded, fade it in
    video.addEventListener('loadeddata', () => {
      video.parentElement.classList.add('has-media');
      video.classList.add('loaded');
    });
    // Force loaded state if already ready
    if (video.readyState >= 2) {
      video.parentElement.classList.add('has-media');
      video.classList.add('loaded');
    }
    // Attempt play programmatically and fall back to static first frame on autoplay block
    video.play().catch(function() {
      video.parentElement.classList.add('has-media');
      video.classList.add('loaded');
    });
  });
});

// Global function to switch between steganography demo tabs in the featured project window
function switchStegoDemo(type) {
  const textVideo = document.getElementById('stego-video-text');
  const audioVideo = document.getElementById('stego-video-audio');
  
  const textImg = document.getElementById('stego-img-text');
  const audioImg = document.getElementById('stego-img-audio');
  
  const tabs = document.querySelectorAll('.window-tab');
  if (tabs.length < 2) return;
  
  tabs.forEach(tab => tab.classList.remove('active'));
  
  if (type === 'text') {
    tabs[0].classList.add('active');
    
    if (textVideo) {
      textVideo.style.display = 'block';
      textVideo.play().catch(function() {});
    }
    if (textImg) textImg.style.display = 'block';
    
    if (audioVideo) {
      audioVideo.style.display = 'none';
      audioVideo.pause();
    }
    if (audioImg) audioImg.style.display = 'none';
    
  } else if (type === 'audio') {
    tabs[1].classList.add('active');
    
    if (audioVideo) {
      audioVideo.style.display = 'block';
      audioVideo.play().catch(function() {});
    }
    if (audioImg) audioImg.style.display = 'block';
    
    if (textVideo) {
      textVideo.style.display = 'none';
      textVideo.pause();
    }
    if (textImg) textImg.style.display = 'none';
  }
}

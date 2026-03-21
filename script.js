// Smooth Scrolling Functionality
function smoothScrollTo(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

function applyTheme(themeName) {
  const theme = themeName || 'dark';

  if (theme === 'dark') {
    document.documentElement.style.setProperty('--dark-bg-primary', '#0D0D0D');
    document.documentElement.style.setProperty('--dark-bg-secondary', '#1A1A2E');
    document.documentElement.style.setProperty('--neon-pink', '#FF007F');
    document.documentElement.style.setProperty('--lavender', '#B388EB');
    document.documentElement.style.setProperty('--electric-blue', '#00BFFF');
  } else if (theme === 'urban') {
    document.documentElement.style.setProperty('--dark-bg-primary', '#2C3E50');
    document.documentElement.style.setProperty('--dark-bg-secondary', '#8E44AD');
    document.documentElement.style.setProperty('--neon-pink', '#FF69B4');
    document.documentElement.style.setProperty('--lavender', '#FF69B4');
    document.documentElement.style.setProperty('--electric-blue', '#FF69B4');
  } else if (theme === 'minimalist') {
    document.documentElement.style.setProperty('--dark-bg-primary', '#121212');
    document.documentElement.style.setProperty('--dark-bg-secondary', '#121212');
    document.documentElement.style.setProperty('--neon-pink', '#E91E63');
    document.documentElement.style.setProperty('--lavender', '#E91E63');
    document.documentElement.style.setProperty('--electric-blue', '#00BCD4');
  }
}

// Theme Switching Functionality
document.addEventListener('DOMContentLoaded', () => {
  const introOverlay = document.getElementById('intro-overlay');
  const introRole = document.getElementById('intro-role');
  const introSkip = document.getElementById('intro-skip');
  const introRoles = ['Full-Stack Developer', 'Tech Innovator', 'React Developer', 'Security-Focused Builder'];
  let introRoleIndex = 0;
  let introIntervalId;
  let introClosed = false;

  const closeIntro = () => {
    if (!introOverlay || introOverlay.classList.contains('is-hidden') || introClosed) {
      return;
    }

    introClosed = true;

    if (introIntervalId) {
      clearInterval(introIntervalId);
    }

    introOverlay.classList.add('is-hidden');
    document.body.classList.remove('intro-active');
  };

  const handleIntroExit = () => {
    closeIntro();
    window.removeEventListener('wheel', handleIntroExit);
    window.removeEventListener('touchstart', handleIntroExit);
    window.removeEventListener('keydown', handleIntroExit);
    window.removeEventListener('scroll', handleIntroScroll);
  };

  const handleIntroScroll = () => {
    if (window.scrollY > 10) {
      handleIntroExit();
    }
  };

  if (introOverlay && introRole) {
    introIntervalId = window.setInterval(() => {
      introRoleIndex = (introRoleIndex + 1) % introRoles.length;
      introRole.textContent = introRoles[introRoleIndex];
    }, 1000);

    if (introSkip) {
      introSkip.addEventListener('click', handleIntroExit);
    }

    window.addEventListener('wheel', handleIntroExit, { passive: true });
    window.addEventListener('touchstart', handleIntroExit, { passive: true });
    window.addEventListener('keydown', handleIntroExit);
    window.addEventListener('scroll', handleIntroScroll, { passive: true });
  } else {
    document.body.classList.remove('intro-active');
  }

  // Add smooth scrolling to all links with class 'smooth-scroll'
  document.querySelectorAll('.smooth-scroll').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = link.getAttribute('href');
      if (!target || !target.startsWith('#')) {
        return;
      }
      e.preventDefault();
      smoothScrollTo(target);
    });
  });
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const storedTheme = window.localStorage.getItem('portfolio-theme') || 'dark';
    themeToggle.value = storedTheme;
    applyTheme(storedTheme);

    themeToggle.addEventListener('change', (event) => {
      const selectedTheme = event.target.value;
      applyTheme(selectedTheme);
      window.localStorage.setItem('portfolio-theme', selectedTheme);
    });
  } else {
    applyTheme(window.localStorage.getItem('portfolio-theme') || 'dark');
  }

  // Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const formResponse = document.getElementById('form-response');
      if (formResponse) {
        formResponse.textContent = 'Thanks for reaching out! I’ll get back to you soon.';
      }
    });
  }
  const fadeUpTargets = document.querySelectorAll(
    '.hero h2, .hero p, .hero .btn, main section h2, .feature-kicker, .feature-intro, .skills-subtitle, .test-sub'
  );

  fadeUpTargets.forEach((element, index) => {
    element.classList.add('fade-up');
    element.style.transitionDelay = `${Math.min(index * 0.06, 0.45)}s`;
  });

  if (fadeUpTargets.length) {
    const fadeObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });

    fadeUpTargets.forEach((element) => fadeObserver.observe(element));
  }

  const featureCards = document.querySelectorAll('.animate-feature-card');
  if (featureCards.length) {
    const featureObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.25
    });

    featureCards.forEach((card) => featureObserver.observe(card));
  }

  const revealGroups = [
    '.project-section .project-card',
    '#ethical-hacking .project-card',
    '.reports-section .report-card',
    '.experience .timeline-item',
    '.skills .skills-list span',
    '.testimonials .test-card',
    '.about-intro .animate-section-item',
    '.journey-section .animate-section-item',
    '.about-values .animate-section-item'
  ];

  revealGroups.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.classList.add('animate-section-item');
      element.style.setProperty('--reveal-delay', `${Math.min(index * 0.12, 0.48)}s`);
    });
  });

  const sectionItems = document.querySelectorAll('.animate-section-item');
  if (sectionItems.length) {
    const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });

    sectionItems.forEach((item) => sectionObserver.observe(item));
  }

  const tiltCards = document.querySelectorAll('.project-card, .report-card, .feature-card');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = (y / rect.height - 0.5) * -10;
      const rotateY = (x / rect.width - 0.5) * 10;

      card.style.setProperty('--tilt-x', `${rotateX}deg`);
      card.style.setProperty('--tilt-y', `${rotateY}deg`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    });
  });
});


const row1 = document.getElementById('mosaic-row-1');
const row2 = document.getElementById('mosaic-row-2');
const row3 = document.getElementById('mosaic-row-3');

if (row1 && row2 && row3) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    row1.style.transform = `translateX(${-scrollY * 0.12}px)`;
    row2.style.transform = `translateX(${scrollY * 0.08}px)`;
    row3.style.transform = `translateX(${-scrollY * 0.14}px)`;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('video[data-src]');
  const loadVideo = (video) => {
    video.src = video.dataset.src;
    video.load();
    video.play().catch(() => {});
  };
  if ('IntersectionObserver' in window && videos.length) {
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        loadVideo(entry.target);
        instance.unobserve(entry.target);
      });
    }, { rootMargin: '300px 0px' });
    videos.forEach((video) => observer.observe(video));
  } else {
    videos.forEach(loadVideo);
  }

  const nav = document.querySelector('nav');
  const menu = document.querySelector('.nav-menu');
  if (nav && menu) {
    const icon = menu.querySelector('i');
    const closeMenu = () => {
      nav.classList.remove('nav-open');
      menu.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-label', 'Open navigation menu');
      icon?.classList.add('fa-bars');
      icon?.classList.remove('fa-xmark');
    };
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('nav-open');
      menu.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      icon?.classList.toggle('fa-bars', !open);
      icon?.classList.toggle('fa-xmark', open);
    });
    nav.querySelectorAll('ul a').forEach((link) => link.addEventListener('click', closeMenu));
  }

  const revealTargets = new Set(document.querySelectorAll(
    [...['.animate-section-item'], '.animate-section-item'].join(',')
  ));
  revealTargets.forEach((item, index) => {
    item.classList.add('animate-section-item');
    if (!item.style.getPropertyValue('--reveal-delay')) {
      item.style.setProperty('--reveal-delay', `${Math.min(index * 0.12, 0.48)}s`);
    }
  });
  const fadeTargets = [...document.querySelectorAll(
    '.hero h2, .hero p, .hero .btn, main section h2, .feature-kicker, .feature-intro, .skills-subtitle, .test-sub'
  )];
  fadeTargets.forEach((item, index) => {
    item.classList.add('fade-up');
    item.style.transitionDelay = `${Math.min(index * 0.06, 0.45)}s`;
  });
  const observed = [...new Set([...revealTargets, ...fadeTargets])];
  if ('IntersectionObserver' in window && observed.length) {
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        instance.unobserve(entry.target);
      });
    }, { threshold: 0.2 });
    observed.forEach((item) => observer.observe(item));
  } else {
    observed.forEach((item) => item.classList.add('is-visible'));
  }
  document.querySelectorAll('.project-card, .report-card, .feature-card').forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--tilt-x', `${((event.clientY - rect.top) / rect.height - 0.5) * -10}deg`);
      card.style.setProperty('--tilt-y', `${((event.clientX - rect.left) / rect.width - 0.5) * 10}deg`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
    });
  });

});

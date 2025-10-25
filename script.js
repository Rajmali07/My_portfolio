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

// Theme Switching Functionality
document.addEventListener('DOMContentLoaded', () => {
  // Add smooth scrolling to all links with class 'smooth-scroll'
  document.querySelectorAll('.smooth-scroll').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href');
      smoothScrollTo(target);
    });
  });
  const themeToggle = document.getElementById('theme-toggle');

  themeToggle.addEventListener('change', (event) => {
    const selectedTheme = event.target.value;

    if (selectedTheme === 'dark') {
      // Dark Mode Elegance + Neon Accent Theme
      document.documentElement.style.setProperty('--dark-bg-primary', '#0D0D0D');
      document.documentElement.style.setProperty('--dark-bg-secondary', '#1A1A2E');
      document.documentElement.style.setProperty('--neon-pink', '#FF007F');
      document.documentElement.style.setProperty('--lavender', '#B388EB');
      document.documentElement.style.setProperty('--electric-blue', '#00BFFF');
    } else if (selectedTheme === 'urban') {
      // Urban Gradient + Futuristic Glow Theme
      document.documentElement.style.setProperty('--dark-bg-primary', '#2C3E50');
      document.documentElement.style.setProperty('--dark-bg-secondary', '#8E44AD');
      document.documentElement.style.setProperty('--neon-pink', '#FF69B4');
      document.documentElement.style.setProperty('--lavender', '#FF69B4');
      document.documentElement.style.setProperty('--electric-blue', '#FF69B4');
    } else if (selectedTheme === 'minimalist') {
      // Minimalist Noir + Spotlight Color Theme
      document.documentElement.style.setProperty('--dark-bg-primary', '#121212');
      document.documentElement.style.setProperty('--dark-bg-secondary', '#121212');
      document.documentElement.style.setProperty('--neon-pink', '#E91E63');
      document.documentElement.style.setProperty('--lavender', '#E91E63');
      document.documentElement.style.setProperty('--electric-blue', '#00BCD4');
    }
  });

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
});

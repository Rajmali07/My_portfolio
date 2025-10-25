// Smooth scrolling for navigation
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Copy to clipboard functionality
document.querySelectorAll('.copy-btn').forEach(button => {
  button.addEventListener('click', function (e) {
    e.stopPropagation();
    const contactItem = this.closest('.contact-item');
    const textToCopy = contactItem.getAttribute('data-copy');
    
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        // Show success feedback
        this.textContent = '✅';
        this.classList.add('copy-success');
        
        // Reset button after animation
        setTimeout(() => {
          this.textContent = '📋';
          this.classList.remove('copy-success');
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
        this.textContent = '❌';
        setTimeout(() => {
          this.textContent = '📋';
        }, 2000);
      });
    }
  });
});

// Contact form handling
document.getElementById('messageForm').addEventListener('submit', function (e) {
  e.preventDefault();
  
  const formData = {
    name: this.name.value.trim(),
    email: this.email.value.trim(),
    message: this.message.value.trim()
  };
  
  // Basic validation
  if (!formData.name || !formData.email || !formData.message) {
    alert('Please fill in all fields');
    return;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    alert('Please enter a valid email address');
    return;
  }
  
  // Show loading state
  const submitBtn = this.querySelector('.submit-btn');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  // Simulate form submission (replace with actual form submission)
  setTimeout(() => {
    // Reset form
    this.reset();
    
    // Show success message
    submitBtn.textContent = 'Message Sent! ✅';
    
    // Reset button after 3 seconds
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 3000);
    
    // You can replace this with actual form submission code
    console.log('Form submitted:', formData);
    // Example: fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
    
  }, 1500);
});

// Add hover effects to contact items
document.querySelectorAll('.contact-item').forEach(item => {
  item.addEventListener('click', function () {
    const copyBtn = this.querySelector('.copy-btn');
    if (copyBtn && this.getAttribute('data-copy')) {
      copyBtn.click();
    }
  });
});

// Add intersection observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe contact section elements
document.addEventListener('DOMContentLoaded', () => {
  const contactElements = document.querySelectorAll('.contact-card, .contact-item, .social-link');
  contactElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

// Scroll to top function
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
  const scrollTop = document.querySelector('.scroll-top');
  if (window.pageYOffset > 300) {
    scrollTop.style.opacity = '1';
    scrollTop.style.visibility = 'visible';
  } else {
    scrollTop.style.opacity = '0';
    scrollTop.style.visibility = 'hidden';
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});

// Recommendation form handling
function addRecommendation() {
  const name = document.getElementById('recommender_name').value;
  const title = document.getElementById('recommender_title').value;
  const company = document.getElementById('recommender_company').value;
  const rating = document.getElementById('recommendation_rating').value;
  const text = document.getElementById('new_recommendation').value;

  if (!name || !rating || !text) {
    alert('Please fill in all required fields');
    return;
  }

  // Create new recommendation card
  const recommendationsGrid = document.querySelector('.recommendations-grid');
  const newCard = document.createElement('div');
  newCard.className = 'recommendation-card fade-in';
  
  const stars = '★'.repeat(parseInt(rating));
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
  const jobTitle = title ? `${title}${company ? ` at ${company}` : ''}` : (company || '');
  
  newCard.innerHTML = `
    <div class="rec-header">
      <div class="rec-avatar">${initials}</div>
      <div class="rec-info">
        <h4>${name}</h4>
        <p>${jobTitle}</p>
        <div class="stars">${stars}</div>
      </div>
    </div>
    <div class="rec-text">${text}</div>
  `;
  
  // Add to grid (at the beginning)
  recommendationsGrid.insertBefore(newCard, recommendationsGrid.firstChild);
  
  showPopup(true);
  document.querySelector('.contact-form').reset();
  document.querySelector('.select-text').textContent = 'Select a rating';
}

function showPopup(show) {
  const popup = document.getElementById('popup');
  if (show) {
    popup.classList.add('show');
  } else {
    popup.classList.remove('show');
  }
}

// Enhanced navigation highlight
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Particle effect for background (optional enhancement)
function createParticle() {
  const particle = document.createElement('div');
  particle.style.position = 'fixed';
  particle.style.width = '2px';
  particle.style.height = '2px';
  particle.style.background = 'var(--primary)';
  particle.style.borderRadius = '50%';
  particle.style.pointerEvents = 'none';
  particle.style.opacity = '0.5';
  particle.style.left = Math.random() * window.innerWidth + 'px';
  particle.style.top = window.innerHeight + 'px';
  particle.style.zIndex = '-1';
  
  document.body.appendChild(particle);
  
  const animation = particle.animate([
    { transform: 'translateY(0px)', opacity: 0.5 },
    { transform: `translateY(-${window.innerHeight + 100}px)`, opacity: 0 }
  ], {
    duration: Math.random() * 3000 + 2000,
    easing: 'linear'
  });
  
  animation.onfinish = () => {
    particle.remove();
  };
}

// Theme toggle functionality
function toggleTheme() {
  const body = document.body;
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Update toggle animation
  updateToggleState(newTheme);
}

function updateToggleState(theme) {
  const toggle = document.querySelector('.theme-toggle');
  if (theme === 'light') {
    toggle.classList.add('light');
  } else {
    toggle.classList.remove('light');
  }
}

// Initialize theme on page load
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.setAttribute('data-theme', savedTheme);
  updateToggleState(savedTheme);
}

// Add to your existing window load event or create new one
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
  initializeTheme(); // Add this line
});

// Custom dropdown functionality
function toggleDropdown() {
  const trigger = document.querySelector('.select-trigger');
  const options = document.querySelector('.select-options');
  
  trigger.classList.toggle('active');
  options.classList.toggle('show');
}

function selectOption(option) {
  const trigger = document.querySelector('.select-trigger');
  const options = document.querySelector('.select-options');
  const hiddenInput = document.getElementById('recommendation_rating');
  const selectText = document.querySelector('.select-text');
  
  selectText.textContent = option.textContent;
  hiddenInput.value = option.dataset.value;
  
  trigger.classList.remove('active');
  options.classList.remove('show');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
  if (!e.target.closest('.custom-select')) {
    const trigger = document.querySelector('.select-trigger');
    const options = document.querySelector('.select-options');
    if (trigger && options) {
      trigger.classList.remove('active');
      options.classList.remove('show');
    }
  }
});

// Create particles periodically
setInterval(createParticle, 300);

// Initialize animations on load
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});
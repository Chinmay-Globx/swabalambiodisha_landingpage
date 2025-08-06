// Enhanced Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    menuToggle.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (mainNav.classList.contains('open')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
      mainNav.classList.remove('open');
      menuToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('open')) {
      mainNav.classList.remove('open');
      menuToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// Enhanced Smooth scroll for nav links
const navLinks = document.querySelectorAll('.main-nav a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId.startsWith('#')) {
      e.preventDefault();
      
      // Close mobile menu
      if (mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
      
      // Smooth scroll to target
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Enhanced Scroll reveal functionality
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 100;
    
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('active');
    }
  });
}

// Enhanced Header scroll effect
function headerScrollEffect() {
  const header = document.querySelector('.site-header');
  const scrolled = window.scrollY;
  
  if (scrolled > 50) {
    header.style.background = 'rgba(255, 255, 255, 0.98)';
    header.style.boxShadow = '0 8px 32px rgba(0,0,0,0.15)';
    header.style.borderBottom = '1px solid rgba(139, 69, 19, 0.2)';
  } else {
    header.style.background = 'rgba(255, 255, 255, 0.95)';
    header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    header.style.borderBottom = '1px solid rgba(139, 69, 19, 0.1)';
  }
}

// Enhanced Parallax effect for hero section
function parallaxEffect() {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  const heroImage = document.querySelector('.hero-image img');
  
  if (hero && scrolled < hero.offsetHeight) {
    const rate = scrolled * -0.3;
    const imageRate = scrolled * 0.2;
    
    if (heroImage) {
      heroImage.style.transform = `translateY(${imageRate}px) scale(1.05)`;
    }
  }
}

// Enhanced Service card hover effects
function initServiceCards() {
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.03) rotateY(5deg)';
      this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
      this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.08)';
    });
  });
}

// Enhanced Gallery image hover effects
function initGalleryImages() {
  const galleryImages = document.querySelectorAll('.gallery-grid img');
  galleryImages.forEach(img => {
    img.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1) rotateY(5deg)';
      this.style.boxShadow = '0 15px 35px rgba(0,0,0,0.2)';
      this.style.filter = 'brightness(1.1) contrast(1.1)';
    });
    
    img.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1) rotateY(0deg)';
      this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.08)';
      this.style.filter = 'brightness(1) contrast(1)';
    });
  });
}

// Gallery Carousel Functionality
function initGalleryCarousel() {
  const carouselContainer = document.querySelector('.gallery-carousel');
  const leftArrow = document.querySelector('.carousel-arrow.left');
  const rightArrow = document.querySelector('.carousel-arrow.right');
  const indicatorsContainer = document.querySelector('.carousel-indicators');

  const maxImages = 30;
  const imagePaths = [];
  for (let i = 1; i <= maxImages; i++) {
    imagePaths.push(`assets/gallery${i}.jpg`);
  }

  let loadedImages = new Array(maxImages);
  let loadedCount = 0;
  let foundCount = 0;
  let currentIndex = 0;

  imagePaths.forEach((src, idx) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      loadedImages[idx] = src;
      foundCount++;
      loadedCount++;
      if (loadedCount === imagePaths.length) {
        loadedImages = loadedImages.filter(Boolean);
        currentIndex = 0;
        renderCarousel();
      }
    };
    img.onerror = () => {
      loadedCount++;
      if (loadedCount === imagePaths.length) {
        loadedImages = loadedImages.filter(Boolean);
        currentIndex = 0;
        renderCarousel();
      }
    };
  });

  function renderCarousel() {
    if (loadedImages.length === 0) {
      carouselContainer.innerHTML = '<p style="color:#8b4513;opacity:0.7;text-align:center;width:100%">No gallery images found.</p>';
      indicatorsContainer.innerHTML = '';
      leftArrow.style.display = 'none';
      rightArrow.style.display = 'none';
      return;
    }
    if (currentIndex >= loadedImages.length) currentIndex = 0;
    carouselContainer.innerHTML = '';
    const img = document.createElement('img');
    img.src = loadedImages[currentIndex];
    img.alt = `Gallery Image ${currentIndex + 1}`;
    img.className = 'reveal';
    carouselContainer.appendChild(img);
    renderIndicators();
    updateArrows();
  }

  function renderIndicators() {
    indicatorsContainer.innerHTML = '';
    loadedImages.forEach((_, idx) => {
      const dot = document.createElement('span');
      dot.className = 'indicator' + (idx === currentIndex ? ' active' : '');
      dot.addEventListener('click', () => {
        currentIndex = idx;
        renderCarousel();
      });
      indicatorsContainer.appendChild(dot);
    });
  }

  function updateArrows() {
    leftArrow.style.visibility = loadedImages.length > 1 ? 'visible' : 'hidden';
    rightArrow.style.visibility = loadedImages.length > 1 ? 'visible' : 'hidden';
  }

  leftArrow.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + loadedImages.length) % loadedImages.length;
    renderCarousel();
  });
  rightArrow.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % loadedImages.length;
    renderCarousel();
  });

  // Swipe support for mobile
  let startX = null;
  carouselContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });
  carouselContainer.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const endX = e.changedTouches[0].clientX;
    if (endX - startX > 40) {
      leftArrow.click();
    } else if (startX - endX > 40) {
      rightArrow.click();
    }
    startX = null;
  });
}

// Contact form removed - map now takes its place

// Add smooth scroll to top functionality
function addScrollToTop() {
  const scrollBtn = document.createElement('button');
  scrollBtn.innerHTML = '↑';
  scrollBtn.className = 'scroll-to-top';
  scrollBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #8b4513, #d4af37);
    color: white;
    border: none;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(139, 69, 19, 0.3);
  `;
  
  document.body.appendChild(scrollBtn);
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.style.opacity = '1';
      scrollBtn.style.visibility = 'visible';
    } else {
      scrollBtn.style.opacity = '0';
      scrollBtn.style.visibility = 'hidden';
    }
  });
  
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  scrollBtn.addEventListener('mouseenter', () => {
    scrollBtn.style.transform = 'scale(1.1)';
    scrollBtn.style.boxShadow = '0 6px 20px rgba(139, 69, 19, 0.4)';
  });
  
  scrollBtn.addEventListener('mouseleave', () => {
    scrollBtn.style.transform = 'scale(1)';
    scrollBtn.style.boxShadow = '0 4px 15px rgba(139, 69, 19, 0.3)';
  });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initServiceCards();
  initGalleryImages();
  initGalleryCarousel();
  addScrollToTop();
  
  // Add scroll event listeners with throttling
  let ticking = false;
  function updateOnScroll() {
    revealOnScroll();
    headerScrollEffect();
    parallaxEffect();
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateOnScroll);
      ticking = true;
    }
  });
  
  // Initial call for elements already in view
  revealOnScroll();
  
  // Add loading animation
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease-in-out';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});




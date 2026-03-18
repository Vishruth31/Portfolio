/**
 * VISHUTH PORTFOLIO - JAVASCRIPT
 * Cyberpunk / Hacker Theme
 * Pure Vanilla JavaScript - No Dependencies
 */

// ============================================
// LOADING SCREEN
// ============================================
const terminalLines = [
  '> Initializing Vishruth Portfolio...',
  '> Access granted.'
];

let currentLine = 0;
let currentChar = 0;
let isLoadingComplete = false;

function typeTerminalLine() {
  const terminalLinesContainer = document.getElementById('terminal-lines');
  const typingLine = document.getElementById('typing-line');
  
  if (currentLine >= terminalLines.length) {
    // All lines typed, show success message
    setTimeout(() => {
      document.getElementById('success-message').classList.remove('hidden');
      setTimeout(exitLoadingScreen, 1000);
    }, 400);
    return;
  }
  
  const line = terminalLines[currentLine];
  
  if (currentChar < line.length) {
    // Still typing current line
    typingLine.textContent = line.substring(0, currentChar + 1);
    currentChar++;
    setTimeout(typeTerminalLine, 25 + Math.random() * 30);
  } else {
    // Finished current line, add to completed lines
    const lineDiv = document.createElement('div');
    lineDiv.className = 'terminal-line';
    lineDiv.style.animationDelay = '0s';
    lineDiv.textContent = line;
    terminalLinesContainer.appendChild(lineDiv);
    
    // Clear typing line
    typingLine.textContent = '';
    currentChar = 0;
    currentLine++;
    
    // Small pause before next line
    setTimeout(typeTerminalLine, 150);
  }
}

function exitLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  const mainContent = document.getElementById('main-content');
  
  loadingScreen.classList.add('exiting');
  
  setTimeout(() => {
    loadingScreen.style.display = 'none';
    mainContent.classList.remove('hidden');
    
    // Trigger reflow
    void mainContent.offsetWidth;
    
    mainContent.classList.add('visible');
    
    // Start hero typing animation
    startHeroTyping();
    
    // Initialize particles
    createParticles();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Animate skill bars
    animateSkillBars();
    
    // Animate timeline
    animateTimeline();
  }, 800);
}

// ============================================
// HERO TYPING ANIMATION
// ============================================
const roles = ['Software Developer', 'Game Developer', 'App Developer'];
let roleIndex = 0;
let roleChar = 0;
let isDeleting = false;
let heroTypingStarted = false;

function startHeroTyping() {
  if (heroTypingStarted) return;
  heroTypingStarted = true;
  typeRole();
}

function typeRole() {
  const roleText = document.getElementById('role-text');
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    roleText.textContent = currentRole.substring(0, roleChar - 1);
    roleChar--;
  } else {
    roleText.textContent = currentRole.substring(0, roleChar + 1);
    roleChar++;
  }
  
  let typeSpeed = isDeleting ? 50 : 100;
  
  if (!isDeleting && roleChar === currentRole.length) {
    // Finished typing, pause before deleting
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && roleChar === 0) {
    // Finished deleting, move to next role
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeSpeed = 500;
  }
  
  setTimeout(typeRole, typeSpeed);
}

// ============================================
// PARTICLES
// ============================================
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  
  const particleCount = 20;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 3}s`;
    particle.style.animationDuration = `${3 + Math.random() * 2}s`;
    container.appendChild(particle);
  }
}

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  
  // Scroll effect for navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Update active nav link
    updateActiveNavLink();
  }, { passive: true });
  
  // Mobile menu toggle
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });
  
  // Smooth scroll for nav links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      scrollToSection(targetId);
    });
  });
  
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      mobileMenuBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
      scrollToSection(targetId);
    });
  });
}

function scrollToSection(targetId) {
  const target = document.querySelector(targetId);
  if (target) {
    const offset = 80;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

function updateActiveNavLink() {
  const sections = ['home', 'projects', 'skills', 'certifications', 'about', 'contact'];
  const scrollPos = window.scrollY + 150;
  
  sections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    const navLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
    const mobileNavLink = document.querySelector(`.mobile-nav-link[data-section="${sectionId}"]`);
    
    if (section && navLink) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      
      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        document.querySelectorAll('.mobile-nav-link').forEach(l => l.classList.remove('active'));
        navLink.classList.add('active');
        if (mobileNavLink) mobileNavLink.classList.add('active');
      }
    }
  });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '-100px 0px'
  });
  
  revealElements.forEach(el => revealObserver.observe(el));
}

// ============================================
// SKILL BARS ANIMATION
// ============================================
function animateSkillBars() {
  const skillItems = document.querySelectorAll('.skill-item');
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progress = entry.target.querySelector('.skill-progress');
        const level = entry.target.dataset.level;
        
        if (progress && level) {
          setTimeout(() => {
            progress.style.width = `${level}%`;
          }, 200);
        }
        
        skillObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });
  
  skillItems.forEach(item => skillObserver.observe(item));
}

// ============================================
// TIMELINE ANIMATION
// ============================================
function animateTimeline() {
  const timelineLine = document.querySelector('.timeline-line');
  
  if (!timelineLine) return;
  
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        timelineLine.classList.add('animate');
        timelineObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });
  
  timelineObserver.observe(timelineLine);
}

// ============================================
// COPY TO CLIPBOARD
// ============================================
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');
  
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.dataset.copy;
      
      navigator.clipboard.writeText(text).then(() => {
        btn.classList.add('copied');
        
        // Change icon to checkmark
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
        
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = originalHTML;
        }, 2000);
      });
    });
  });
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
  const form = document.querySelector('.contact-form');
  
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<div class="spinner"></div> Sending...';

    // Let Formspree handle submission, then reset form after delay
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      // Show success message
      const formMessage = document.getElementById('form-message');
      if (formMessage) {
        formMessage.textContent = "Message sent successfully! I'll get back to you soon.";
        formMessage.classList.remove('hidden');
        formMessage.classList.add('success');

        setTimeout(() => {
          formMessage.classList.add('hidden');
          formMessage.classList.remove('success');
        }, 5000);
      }

      // Reset form
      form.reset();
    }, 1500);
  });
}

// ============================================
// GLITCH EFFECT
// ============================================
function initGlitchEffect() {
  const glitchElements = document.querySelectorAll('.glitch');
  
  glitchElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.animation = 'none';
      setTimeout(() => {
        el.style.animation = '';
      }, 10);
    });
  });
}

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Start terminal typing
  typeTerminalLine();
  
  // Initialize navigation
  initNavigation();
  
  // Initialize copy buttons
  initCopyButtons();
  
  // Initialize contact form
  initContactForm();
  
  // Initialize glitch effect
  initGlitchEffect();
});

// Handle visibility change (pause animations when tab is hidden)
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause animations
  } else {
    // Resume animations
  }
});

// DOM Elements
const preloader = document.getElementById('preloader');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const header = document.getElementById('header');
const navLinks = document.querySelectorAll('.nav__link');
const navLogo = document.querySelector('.nav__logo');
const whatsappBtn = document.getElementById('whatsapp-btn');
const callBtn = document.getElementById('call-btn');
const contactForm = document.querySelector('.contact-form');
const heroCtaBtn = document.querySelector('.hero__cta');

// Preloader Management
function hidePreloader() {
    if (preloader) {
        preloader.classList.add('hidden');
        // Enable scrolling after preloader is hidden
        document.body.style.overflow = 'visible';
        console.log('Preloader hidden');
    }
}

// Initialize preloader
function initializePreloader() {
    // Disable scrolling during preloader
    document.body.style.overflow = 'hidden';
    
    // Hide preloader after 3.5 seconds
    setTimeout(() => {
        hidePreloader();
        // Initialize hero content animation after preloader
        setTimeout(() => {
            initializeHeroAnimation();
        }, 500);
    }, 3500);
}

// Initialize hero content animation
function initializeHeroAnimation() {
    const heroContent = document.querySelector('.hero__content');
    const heroAnimation = document.querySelector('.hero__animation');
    
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }
    
    if (heroAnimation) {
        heroAnimation.style.opacity = '0';
        heroAnimation.style.transform = 'translateX(50px)';
        
        setTimeout(() => {
            heroAnimation.style.transition = 'opacity 1s ease, transform 1s ease';
            heroAnimation.style.opacity = '1';
            heroAnimation.style.transform = 'translateX(0)';
        }, 300);
    }
}

// Smooth scroll to section
function scrollToSection(targetId) {
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const headerHeight = header ? header.offsetHeight : 70;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        console.log('Scrolling to:', targetId, targetPosition);
        return true;
    } else {
        console.error('Target section not found:', targetId);
        return false;
    }
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing SivanadiAstro website...');
    
    // Initialize preloader
    initializePreloader();
    
    // Logo click handler - scroll to home/hero section
    if (navLogo) {
        navLogo.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Logo clicked - scrolling to home');
            scrollToSection('#home');
            
            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('show-menu')) {
                navMenu.classList.remove('show-menu');
                navToggle.classList.remove('active');
            }
        });
    }
    
    // Mobile Navigation Toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show-menu');
            navToggle.classList.toggle('active');
            console.log('Mobile menu toggled:', navMenu.classList.contains('show-menu'));
        });
    }

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu && navMenu.classList.contains('show-menu')) {
                navMenu.classList.remove('show-menu');
                navToggle.classList.remove('active');
                console.log('Mobile menu closed via nav link');
            }
        });
    });

    // Smooth Scrolling for Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            console.log('Nav link clicked:', targetId);
            
            // Handle special case for home link
            if (targetId === '#home') {
                scrollToSection('#home');
            } else {
                scrollToSection(targetId);
            }
        });
    });

    // Hero CTA Button Scroll to Contact
    if (heroCtaBtn) {
        heroCtaBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Hero CTA clicked - scrolling to contact');
            scrollToSection('#contact');
        });
    }

    // Floating Action Buttons
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            const phoneNumber = '919876543210'; // Remove + and spaces
            const message = encodeURIComponent('Hello! I would like to know more about Nadi Astrology readings.');
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
            console.log('Opening WhatsApp:', whatsappUrl);
            window.open(whatsappUrl, '_blank');
        });
    }

    if (callBtn) {
        callBtn.addEventListener('click', function() {
            console.log('Initiating call');
            window.location.href = 'tel:+919876543210';
        });
    }

    // Contact Form Handling
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');
            
            // Get form elements
            const nameInput = contactForm.querySelector('input[type="text"]');
            const emailInput = contactForm.querySelector('input[type="email"]');
            const phoneInput = contactForm.querySelector('input[type="tel"]');
            const serviceSelect = contactForm.querySelector('select');
            const messageTextarea = contactForm.querySelector('textarea');
            
            // Get form values
            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const service = serviceSelect ? serviceSelect.value : '';
            const message = messageTextarea ? messageTextarea.value.trim() : '';
            
            console.log('Form data:', { name, email, phone, service, message });
            
            // Basic form validation
            if (!name || !email || !phone) {
                showNotification('Please fill in all required fields (Name, Email, Phone).', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show success message
            showNotification('Thank you for your message! We will contact you within 24 hours to discuss your Nadi reading.', 'success');
            contactForm.reset();
            
            console.log('Form submission successful');
        });
    }

    // Service cards click to scroll to contact
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            console.log('Service card clicked - scrolling to contact');
            scrollToSection('#contact');
            
            // Pre-fill service in contact form
            const serviceTitle = card.querySelector('.service-card__title');
            const serviceSelect = contactForm ? contactForm.querySelector('select') : null;
            if (serviceTitle && serviceSelect) {
                const titleText = serviceTitle.textContent;
                const options = serviceSelect.querySelectorAll('option');
                options.forEach(option => {
                    if (option.textContent === titleText) {
                        option.selected = true;
                    }
                });
                console.log('Pre-filled service:', titleText);
            }
        });
    });

    // Chapter cards click to scroll to services
    const chapterCards = document.querySelectorAll('.chapter-card');
    chapterCards.forEach(card => {
        card.addEventListener('click', function() {
            console.log('Chapter card clicked - scrolling to services');
            scrollToSection('#services');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('show-menu')) {
            // Check if click is outside nav menu and toggle button
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('show-menu');
                navToggle.classList.remove('active');
                console.log('Mobile menu closed via outside click');
            }
        }
    });

    // Initialize scroll effects
    updateActiveNavLink();
    initializeAnimations();
    
    console.log('SivanadiAstro website initialized successfully!');
});

// Sticky Header Effect and Active Nav Updates
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    
    if (header) {
        if (scrolled > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Update active navigation link
    updateActiveNavLink();
    
    // Parallax effect for zodiac wheel
    const zodiacWheel = document.querySelector('.zodiac-wheel');
    if (zodiacWheel && scrolled < window.innerHeight) {
        const parallaxSpeed = scrolled * 0.2;
        zodiacWheel.style.transform = `translateY(${parallaxSpeed}px)`;
    }
});

// Update Active Navigation Link Based on Scroll Position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + (header ? header.offsetHeight : 70) + 50;
    
    let activeSection = null;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            activeSection = sectionId;
        }
    });
    
    // Update active nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        if (linkHref === `#${activeSection}`) {
            link.classList.add('active');
        }
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced Notification system
function showNotification(message, type = 'info') {
    console.log('Showing notification:', message, type);
    
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    // Set notification content and styles
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : '⚠'}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Close notification">&times;</button>
        </div>
    `;
    
    // Apply styles
    const bgColor = type === 'success' ? 'rgba(33, 128, 141, 0.95)' : 'rgba(192, 21, 47, 0.95)';
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(20px);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.4s ease;
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    // Style the content
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.75rem;
    `;
    
    // Style the close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
        opacity: 0.8;
        transition: opacity 0.2s;
    `;
    
    closeBtn.addEventListener('mouseenter', () => closeBtn.style.opacity = '1');
    closeBtn.addEventListener('mouseleave', () => closeBtn.style.opacity = '0.8');
    closeBtn.addEventListener('click', () => notification.remove());
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 6 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 6000);
}

// Animation initialization
function initializeAnimations() {
    // Add required CSS animations
    if (!document.querySelector('#dynamic-animations')) {
        const animationStyles = document.createElement('style');
        animationStyles.id = 'dynamic-animations';
        animationStyles.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            .fade-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            .header.scrolled {
                background: rgba(26, 26, 46, 0.98);
                backdrop-filter: blur(30px);
                box-shadow: 0 2px 20px rgba(108, 92, 231, 0.1);
            }
            
            .nav__link.active {
                color: var(--cosmic-purple);
            }
            
            .nav__link.active::after {
                width: 100%;
            }
            
            .service-card,
            .chapter-card {
                cursor: pointer;
            }
            
            .service-card:active,
            .chapter-card:active {
                transform: translateY(-5px) scale(0.98);
            }
        `;
        document.head.appendChild(animationStyles);
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.chapter-card, .service-card, .gallery-item, .contact-item');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Enhanced zodiac wheel interactions
function initializeZodiacInteractions() {
    const zodiacSigns = document.querySelectorAll('.zodiac-sign');
    const planets = document.querySelectorAll('.planet');
    
    // Add hover effects to zodiac signs
    zodiacSigns.forEach(sign => {
        sign.addEventListener('mouseenter', function() {
            this.style.transform += ' scale(1.2)';
            this.style.textShadow = '0 0 20px rgba(253, 203, 110, 0.8)';
        });
        
        sign.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(' scale(1.2)', '');
            this.style.textShadow = '0 0 10px rgba(253, 203, 110, 0.5)';
        });
    });
    
    // Add hover effects to planets
    planets.forEach(planet => {
        planet.addEventListener('mouseenter', function() {
            this.style.transform += ' scale(1.3)';
            this.style.textShadow = '0 0 15px rgba(162, 155, 254, 0.8)';
        });
        
        planet.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(' scale(1.3)', '');
            this.style.textShadow = '0 0 8px rgba(162, 155, 254, 0.5)';
        });
    });
}

// Initialize zodiac interactions after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Delay zodiac interactions until after preloader
    setTimeout(() => {
        initializeZodiacInteractions();
    }, 4000);
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('show-menu')) {
        navMenu.classList.remove('show-menu');
        navToggle.classList.remove('active');
        console.log('Mobile menu closed on resize');
    }
    
    // Adjust zodiac wheel size based on screen size
    const zodiacWheel = document.querySelector('.zodiac-wheel');
    if (zodiacWheel) {
        const windowWidth = window.innerWidth;
        if (windowWidth <= 480) {
            zodiacWheel.style.width = '200px';
            zodiacWheel.style.height = '200px';
        } else if (windowWidth <= 768) {
            zodiacWheel.style.width = '250px';
            zodiacWheel.style.height = '250px';
        } else if (windowWidth <= 1024) {
            zodiacWheel.style.width = '300px';
            zodiacWheel.style.height = '300px';
        } else {
            zodiacWheel.style.width = '400px';
            zodiacWheel.style.height = '400px';
        }
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close mobile menu on Escape key
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('show-menu')) {
        navMenu.classList.remove('show-menu');
        navToggle.classList.remove('active');
        console.log('Mobile menu closed via Escape key');
    }
});

// Debug function to check if elements exist
function debugElements() {
    console.log('=== Element Debug Info ===');
    console.log('Preloader:', preloader);
    console.log('Header:', header);
    console.log('Nav Logo:', navLogo);
    console.log('Nav Links:', navLinks.length);
    console.log('Hero CTA:', heroCtaBtn);
    console.log('WhatsApp Btn:', whatsappBtn);
    console.log('Call Btn:', callBtn);
    console.log('Contact Form:', contactForm);
    console.log('Nav Menu:', navMenu);
    console.log('Nav Toggle:', navToggle);
    console.log('Zodiac Wheel:', document.querySelector('.zodiac-wheel'));
}

// Call debug function in development
setTimeout(debugElements, 1000);
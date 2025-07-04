// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for anchor links
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

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const firstName = this.querySelector('input[placeholder="First Name"]').value;
        const lastName = this.querySelector('input[placeholder="Last Name"]').value;
        const email = this.querySelector('input[placeholder="Email Address"]').value;
        const subject = this.querySelector('input[placeholder="Subject"]').value;
        const message = this.querySelector('textarea').value;
        
        // Basic validation
        if (!firstName || !lastName || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert(`Thank you ${firstName}! Your message has been sent. We'll get back to you soon.`);
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Intersection Observer for animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .feature, .contact-item, .highlight');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format the number based on the original format
            if (counter.textContent.includes('K')) {
                counter.textContent = Math.floor(current / 1000) + 'K+';
            } else if (counter.textContent.includes('/')) {
                counter.textContent = '24/7';
            } else {
                counter.textContent = Math.floor(current) + '+';
            }
        }, 20);
    });
}

// Trigger counter animation when hero section is visible
const heroSection = document.querySelector('.hero');
if (heroSection) {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    heroObserver.observe(heroSection);
}

// Floating animation for hero particles
function animateParticles() {
    const particles = document.querySelector('.hero-particles');
    if (particles) {
        let scrolled = window.pageYOffset;
        let rate = scrolled * -0.5;
        particles.style.transform = `translate3d(0, ${rate}px, 0)`;
    }
}

window.addEventListener('scroll', animateParticles);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Cookie consent (basic implementation)
function showCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
        const cookieBanner = document.createElement('div');
        cookieBanner.className = 'cookie-banner';
        cookieBanner.innerHTML = `
            <div class="cookie-content">
                <p>We use cookies to enhance your experience on our website. By continuing to use our site, you consent to our use of cookies.</p>
                <div class="cookie-buttons">
                    <button onclick="acceptCookies()" class="btn btn-primary">Accept</button>
                    <button onclick="declineCookies()" class="btn btn-secondary">Decline</button>
                </div>
            </div>
        `;
        document.body.appendChild(cookieBanner);
    }
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    document.querySelector('.cookie-banner').remove();
}

function declineCookies() {
    localStorage.setItem('cookieConsent', 'declined');
    document.querySelector('.cookie-banner').remove();
}

// Show cookie consent after page load
setTimeout(showCookieConsent, 2000);

// Copy to clipboard functionality
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Create temporary notification
        const notification = document.createElement('div');
        notification.className = 'copy-notification';
        notification.textContent = 'Copied to clipboard!';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    });
}

// Add click listeners to email addresses for copying
document.addEventListener('DOMContentLoaded', () => {
    const emailElements = document.querySelectorAll('p:contains("@")');
    emailElements.forEach(el => {
        if (el.textContent.includes('@') && el.textContent.includes('.com')) {
            el.style.cursor = 'pointer';
            el.title = 'Click to copy email address';
            el.addEventListener('click', () => {
                copyToClipboard(el.textContent.trim());
            });
        }
    });
});

// Back to top button
const backToTopBtn = document.createElement('button');
backToTopBtn.className = 'back-to-top';
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.title = 'Back to top';
document.body.appendChild(backToTopBtn);

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

// Search functionality (basic)
function initSearch() {
    const searchIcon = document.createElement('div');
    searchIcon.className = 'search-icon';
    searchIcon.innerHTML = '<i class="fas fa-search"></i>';
    
    const navContainer = document.querySelector('.nav-container');
    if (navContainer) {
        navContainer.appendChild(searchIcon);
        
        searchIcon.addEventListener('click', () => {
            const searchTerm = prompt('Search Maya AI:');
            if (searchTerm) {
                // Simple search - scroll to relevant section
                const searchLower = searchTerm.toLowerCase();
                if (searchLower.includes('service') || searchLower.includes('ai') || searchLower.includes('voice')) {
                    document.querySelector('#services').scrollIntoView({ behavior: 'smooth' });
                } else if (searchLower.includes('about') || searchLower.includes('company')) {
                    document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
                } else if (searchLower.includes('contact')) {
                    document.querySelector('#contact-section').scrollIntoView({ behavior: 'smooth' });
                } else if (searchLower.includes('platform')) {
                    document.querySelector('#ai-platform').scrollIntoView({ behavior: 'smooth' });
                } else {
                    alert('Section not found. Please try: services, about, contact, or platform');
                }
            }
        });
    }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', initSearch);

// Performance optimization - lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add some CSS for additional elements
const additionalStyles = `
.cookie-banner {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--bg-dark);
    color: white;
    padding: 1rem;
    z-index: 10000;
    transform: translateY(100%);
    animation: slideUp 0.3s ease forwards;
}

@keyframes slideUp {
    to { transform: translateY(0); }
}

.cookie-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    gap: 2rem;
}

.cookie-buttons {
    display: flex;
    gap: 1rem;
}

.back-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: var(--gradient-primary);
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: var(--shadow-lg);
}

.back-to-top.visible {
    opacity: 1;
    visibility: visible;
}

.back-to-top:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-xl);
}

.copy-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--primary-color);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    z-index: 10000;
    animation: slideInRight 0.3s ease;
}

@keyframes slideInRight {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
}

.search-icon {
    cursor: pointer;
    padding: 0.5rem;
    color: var(--text-primary);
    transition: color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.search-icon:hover {
    color: var(--primary-color);
}

body.loaded {
    opacity: 1;
}

@media (max-width: 768px) {
    .cookie-content {
        flex-direction: column;
        text-align: center;
        gap: 1rem;
    }
    
    .cookie-buttons {
        justify-content: center;
    }
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet); 
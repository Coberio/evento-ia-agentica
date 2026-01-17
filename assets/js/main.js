/**
 * AI Boardroom 2026 - Main JavaScript
 * Premium Event Landing Page
 */

document.addEventListener('DOMContentLoaded', function() {

    // ================================================
    // NAVBAR SCROLL EFFECT
    // ================================================
    const navbar = document.getElementById('navbar');

    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // ================================================
    // MOBILE MENU TOGGLE
    // ================================================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // ================================================
    // COUNTDOWN TIMER
    // ================================================
    const eventDate = new Date('2026-06-11T08:30:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');

        if (daysEl) daysEl.textContent = days > 0 ? days : '0';
        if (hoursEl) hoursEl.textContent = hours > 0 ? String(hours).padStart(2, '0') : '00';
        if (minutesEl) minutesEl.textContent = minutes > 0 ? String(minutes).padStart(2, '0') : '00';

        if (distance < 0) {
            if (daysEl) daysEl.textContent = '0';
            if (hoursEl) hoursEl.textContent = '00';
            if (minutesEl) minutesEl.textContent = '00';
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 60000); // Update every minute

    // ================================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ================================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const navHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ================================================
    // FORM HANDLING
    // ================================================

    // Registration Form
    const registerForm = document.getElementById('register-form');

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => data[key] = value);

            // Validate required fields
            const requiredFields = ['name', 'position', 'company', 'sector', 'email'];
            let isValid = true;

            requiredFields.forEach(field => {
                const input = this.querySelector(`[name="${field}"]`);
                if (!input.value.trim()) {
                    input.style.borderColor = '#EF4444';
                    isValid = false;
                } else {
                    input.style.borderColor = '';
                }
            });

            // Validate email format
            const emailInput = this.querySelector('[name="email"]');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                emailInput.style.borderColor = '#EF4444';
                isValid = false;
            }

            // Check privacy checkbox
            const privacyCheckbox = this.querySelector('[name="privacy"]');
            if (!privacyCheckbox.checked) {
                privacyCheckbox.parentElement.style.color = '#EF4444';
                isValid = false;
            } else {
                privacyCheckbox.parentElement.style.color = '';
            }

            if (isValid) {
                // Show success message
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Enviando...';
                submitBtn.disabled = true;

                // Simulate form submission
                setTimeout(() => {
                    submitBtn.textContent = 'Solicitud enviada';
                    submitBtn.style.background = '#10B981';

                    // Reset form after delay
                    setTimeout(() => {
                        this.reset();
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;

                        // Show success modal or alert
                        alert('Gracias por tu interes. Validaremos tu perfil y te contactaremos en 24-48h.');
                    }, 1500);
                }, 1500);

                // In production, send data to server
                console.log('Form data:', data);
            }
        });
    }

    // Notify Form (for speaker updates)
    const notifyForm = document.getElementById('notify-form');

    if (notifyForm) {
        notifyForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button[type="submit"]');

            if (emailInput.value.trim()) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Registrado';
                submitBtn.disabled = true;
                emailInput.disabled = true;

                setTimeout(() => {
                    emailInput.value = '';
                    emailInput.disabled = false;
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    }

    // ================================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ================================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements that should animate
    const animatedElements = document.querySelectorAll(
        '.about-card, .timeline-item, .speaker-card, .pricing-card, .faq-item, .stat-item'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animateOnScroll.observe(el);
    });

    // Add animation class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // ================================================
    // STATS COUNTER ANIMATION
    // ================================================
    const statNumbers = document.querySelectorAll('.stat-number');

    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);

            if (element.textContent.includes('%')) {
                element.textContent = value + '%';
            } else {
                element.textContent = value;
            }

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const value = parseInt(text);

                if (!isNaN(value) && value > 0) {
                    animateValue(target, 0, value, 2000);
                }

                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // ================================================
    // ACTIVE NAVIGATION LINK
    // ================================================
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.style.color = '';
                });
                navLink.style.color = '#10B981';
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // ================================================
    // FORM INPUT ANIMATIONS
    // ================================================
    const formInputs = document.querySelectorAll('.form-group input, .form-group select');

    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // ================================================
    // EARLY BIRD COUNTDOWN (Optional)
    // ================================================
    const earlyBirdEnd = new Date('2026-03-23T23:59:59').getTime();

    function checkEarlyBird() {
        const now = new Date().getTime();
        const distance = earlyBirdEnd - now;

        if (distance <= 0) {
            // Early bird ended - update pricing
            const earlyBirdBadge = document.querySelector('.pricing-badge');
            if (earlyBirdBadge) {
                earlyBirdBadge.textContent = 'Tarifa Regular';
                earlyBirdBadge.style.background = 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)';
            }

            const oldPrice = document.querySelector('.price-old');
            if (oldPrice) {
                oldPrice.style.display = 'none';
            }

            const currentPrice = document.querySelector('.price-current');
            if (currentPrice) {
                currentPrice.textContent = '1.500 EUR';
            }
        }
    }

    checkEarlyBird();

    // ================================================
    // CONSOLE EASTER EGG
    // ================================================
    console.log('%c IA Agéntica 2026 ', 'background: linear-gradient(135deg, #2563EB, #10B981); color: white; font-size: 20px; padding: 10px 20px; border-radius: 8px;');
    console.log('%c El futuro de los agentes autonomos en Banca & Seguros ', 'color: #6B7280; font-size: 14px;');
    console.log('%c 11 de Junio | Hotel Beatriz Madrid ', 'color: #6B7280; font-size: 12px;');
    console.log('%c www.inteligenciaartificialagentica.com ', 'color: #2563EB; font-size: 12px;');

});

// ================================================
// UTILITY FUNCTIONS
// ================================================

/**
 * Debounce function for performance
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function for scroll events
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

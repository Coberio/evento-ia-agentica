/**
 * IA Agéntica 2026 - Enhanced JavaScript
 * Premium Event Landing Page with Advanced UX
 */

document.addEventListener('DOMContentLoaded', function() {

    // ================================================
    // NAVBAR SCROLL EFFECT
    // ================================================
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;

    function handleScroll() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', throttle(handleScroll, 100));
    handleScroll();

    // ================================================
    // MOBILE MENU TOGGLE
    // ================================================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ================================================
    // COUNTDOWN TIMER WITH ANIMATION
    // ================================================
    const eventDate = new Date('2026-06-16T08:30:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');

        if (daysEl && days !== parseInt(daysEl.textContent)) {
            animateNumber(daysEl, days > 0 ? days : 0);
        }
        if (hoursEl) hoursEl.textContent = hours > 0 ? String(hours).padStart(2, '0') : '00';
        if (minutesEl) minutesEl.textContent = minutes > 0 ? String(minutes).padStart(2, '0') : '00';

        if (distance < 0) {
            if (daysEl) daysEl.textContent = '0';
            if (hoursEl) hoursEl.textContent = '00';
            if (minutesEl) minutesEl.textContent = '00';
        }
    }

    function animateNumber(element, newValue) {
        element.style.transform = 'translateY(-10px)';
        element.style.opacity = '0.5';
        setTimeout(() => {
            element.textContent = newValue;
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
        }, 150);
    }

    updateCountdown();
    setInterval(updateCountdown, 60000);

    // ================================================
    // SMOOTH SCROLL WITH EASING
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
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

                smoothScrollTo(targetPosition, 800);
            }
        });
    });

    function smoothScrollTo(targetPosition, duration) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeOutCubic(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function easeOutCubic(t, b, c, d) {
            t /= d;
            t--;
            return c * (t * t * t + 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // ================================================
    // ENHANCED SCROLL ANIMATIONS
    // ================================================
    const observerOptions = {
        root: null,
        rootMargin: '-50px',
        threshold: [0, 0.1, 0.2, 0.3]
    };

    // Staggered animations for grid items
    const staggeredObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
                const parent = entry.target.parentElement;
                const siblings = Array.from(parent.children).filter(child =>
                    child.classList.contains('animate-on-scroll')
                );
                const index = siblings.indexOf(entry.target);

                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, index * 100);

                staggeredObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply to all animatable elements
    const animatableSelectors = [
        '.about-card',
        '.timeline-item',
        '.speaker-card',
        '.pricing-card',
        '.faq-item',
        '.stat-item',
        '.partner-slot'
    ];

    animatableSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('animate-on-scroll');
            staggeredObserver.observe(el);
        });
    });

    // ================================================
    // PARALLAX EFFECT FOR HERO
    // ================================================
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    if (hero && heroContent) {
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;

            if (scrolled < heroHeight) {
                const parallaxValue = scrolled * 0.4;
                const opacityValue = 1 - (scrolled / heroHeight) * 0.5;

                heroContent.style.transform = `translateY(${parallaxValue}px)`;
                heroContent.style.opacity = opacityValue;
            }
        }, 16));
    }

    // ================================================
    // MAGNETIC BUTTONS EFFECT
    // ================================================
    const magneticButtons = document.querySelectorAll('.btn-primary, .nav-cta');

    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            this.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.02)`;
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0) scale(1)';
        });
    });

    // ================================================
    // FORM HANDLING WITH ENHANCED UX
    // ================================================
    const registerForm = document.getElementById('register-form');

    if (registerForm) {
        // Add floating label effect
        const formGroups = registerForm.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const input = group.querySelector('input, select');
            if (input) {
                input.addEventListener('focus', () => group.classList.add('focused'));
                input.addEventListener('blur', () => {
                    group.classList.remove('focused');
                    if (input.value) group.classList.add('filled');
                    else group.classList.remove('filled');
                });
            }
        });

        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => data[key] = value);

            const requiredFields = ['name', 'position', 'company', 'sector', 'email'];
            let isValid = true;

            requiredFields.forEach(field => {
                const input = this.querySelector(`[name="${field}"]`);
                const group = input.closest('.form-group');

                if (!input.value.trim()) {
                    group.classList.add('error');
                    shakeElement(group);
                    isValid = false;
                } else {
                    group.classList.remove('error');
                }
            });

            const emailInput = this.querySelector('[name="email"]');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                const group = emailInput.closest('.form-group');
                group.classList.add('error');
                shakeElement(group);
                isValid = false;
            }

            const privacyCheckbox = this.querySelector('[name="privacy"]');
            if (!privacyCheckbox.checked) {
                const group = privacyCheckbox.closest('.form-group');
                group.classList.add('error');
                shakeElement(group);
                isValid = false;
            }

            if (isValid) {
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;

                submitBtn.innerHTML = '<span class="loading-spinner"></span> Enviando...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    submitBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Solicitud enviada';
                    submitBtn.style.background = 'linear-gradient(135deg, #06D6A0 0%, #059669 100%)';

                    confettiEffect();

                    setTimeout(() => {
                        this.reset();
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;

                        showNotification('Gracias por tu interés. Validaremos tu perfil y te contactaremos en 24-48h.', 'success');
                    }, 2000);
                }, 1500);

                console.log('Form data:', data);
            }
        });
    }

    function shakeElement(element) {
        element.style.animation = 'shake 0.5s ease';
        setTimeout(() => element.style.animation = '', 500);
    }

    // Add shake animation to document
    const shakeStyle = document.createElement('style');
    shakeStyle.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .form-group.error input,
        .form-group.error select {
            border-color: #EF4444 !important;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2) !important;
        }
        .loading-spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 0.8s ease infinite;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(shakeStyle);

    // Notify Form
    const notifyForm = document.getElementById('notify-form');

    if (notifyForm) {
        notifyForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button[type="submit"]');

            if (emailInput.value.trim()) {
                const originalText = submitBtn.textContent;
                submitBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Registrado';
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
    // NOTIFICATION SYSTEM
    // ================================================
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;
        document.body.appendChild(notification);

        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // Notification styles
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        .notification {
            position: fixed;
            bottom: 30px;
            right: 30px;
            padding: 16px 24px;
            background: #1E293B;
            color: white;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            gap: 16px;
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 10000;
            max-width: 400px;
        }
        .notification.show {
            transform: translateY(0);
            opacity: 1;
        }
        .notification-success {
            background: linear-gradient(135deg, #059669, #047857);
        }
        .notification button {
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.2s;
        }
        .notification button:hover {
            opacity: 1;
        }
    `;
    document.head.appendChild(notificationStyle);

    // ================================================
    // CONFETTI EFFECT
    // ================================================
    function confettiEffect() {
        const colors = ['#4F46E5', '#06D6A0', '#F59E0B', '#EC4899'];
        const confettiCount = 50;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}vw;
                top: -10px;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                animation: confetti-fall ${2 + Math.random() * 2}s linear forwards;
                z-index: 10001;
            `;
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 4000);
        }
    }

    // Confetti animation
    const confettiStyle = document.createElement('style');
    confettiStyle.textContent = `
        @keyframes confetti-fall {
            to {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(confettiStyle);

    // ================================================
    // STATS COUNTER ANIMATION
    // ================================================
    const statNumbers = document.querySelectorAll('.stat-number');

    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const value = Math.floor(easeProgress * (end - start) + start);

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
                    target.textContent = '0';
                    setTimeout(() => animateValue(target, 0, value, 2000), 200);
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
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', throttle(updateActiveNav, 100));

    // Active nav link style
    const activeNavStyle = document.createElement('style');
    activeNavStyle.textContent = `
        .nav-link.active {
            color: #06D6A0 !important;
        }
        .nav-link.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(activeNavStyle);

    // ================================================
    // CURSOR GLOW EFFECT (Desktop only)
    // ================================================
    if (window.matchMedia('(hover: hover)').matches) {
        const cursorGlow = document.createElement('div');
        cursorGlow.className = 'cursor-glow';
        document.body.appendChild(cursorGlow);

        const cursorGlowStyle = document.createElement('style');
        cursorGlowStyle.textContent = `
            .cursor-glow {
                position: fixed;
                width: 400px;
                height: 400px;
                background: radial-gradient(circle, rgba(79, 70, 229, 0.08) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                transform: translate(-50%, -50%);
                z-index: 0;
                transition: opacity 0.3s ease;
                opacity: 0;
            }
            .hero:hover .cursor-glow,
            .speakers:hover .cursor-glow,
            .register:hover .cursor-glow {
                opacity: 1;
            }
        `;
        document.head.appendChild(cursorGlowStyle);

        let cursorX = 0, cursorY = 0;
        let glowX = 0, glowY = 0;

        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
        });

        function updateCursorGlow() {
            glowX += (cursorX - glowX) * 0.1;
            glowY += (cursorY - glowY) * 0.1;
            cursorGlow.style.left = glowX + 'px';
            cursorGlow.style.top = glowY + 'px';
            requestAnimationFrame(updateCursorGlow);
        }
        updateCursorGlow();
    }

    // ================================================
    // EARLY BIRD COUNTDOWN
    // ================================================
    const earlyBirdEnd = new Date('2026-03-23T23:59:59').getTime();

    function checkEarlyBird() {
        const now = new Date().getTime();
        const distance = earlyBirdEnd - now;

        if (distance <= 0) {
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
                currentPrice.textContent = '1.200 EUR';
            }
        }
    }

    checkEarlyBird();

    // ================================================
    // CONSOLE BRANDING
    // ================================================
    console.log('%c IA Agéntica 2026 ', 'background: linear-gradient(135deg, #4F46E5, #06D6A0); color: white; font-size: 24px; padding: 15px 30px; border-radius: 12px; font-weight: bold;');
    console.log('%c El futuro de los agentes autónomos en Banca & Seguros ', 'color: #64748B; font-size: 14px; padding: 5px 0;');
    console.log('%c 16 de Junio 2026 | Auditorio El Beatriz Madrid ', 'color: #64748B; font-size: 12px;');
    console.log('%c www.inteligenciaartificialagentica.com ', 'color: #4F46E5; font-size: 14px; font-weight: bold;');

});

// ================================================
// UTILITY FUNCTIONS
// ================================================

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

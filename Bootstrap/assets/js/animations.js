// ===== ADVANCED ANIMATIONS & INTERACTIONS =====

class ShopHubAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.createParticleBackground();
        this.initScrollAnimations();
        this.initInteractiveElements();
        this.initLoadingAnimations();
        this.initMicroInteractions();
        this.initAdvancedEffects();
    }

    // ===== PARTICLE BACKGROUND =====
    createParticleBackground() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-bg';
        document.body.appendChild(particleContainer);

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            particleContainer.appendChild(particle);
        }
    }

    // ===== SCROLL ANIMATIONS =====
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Stagger animations for child elements
                    const children = entry.target.querySelectorAll('.stagger-animation');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animated');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Observe elements with animation classes
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // Parallax scrolling
        window.addEventListener('scroll', this.handleParallaxScroll.bind(this));
    }

    handleParallaxScroll() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });

        // Update navbar on scroll
        const navbar = document.querySelector('.navbar');
        if (scrolled > 100) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    }

    // ===== INTERACTIVE ELEMENTS =====
    initInteractiveElements() {
        // Floating buttons
        this.createFloatingActionButton();
        
        // Interactive cards
        this.initInteractiveCards();
        
        // Magnetic buttons
        this.initMagneticButtons();
        
        // Ripple effects
        this.initRippleEffects();
    }

    createFloatingActionButton() {
        const fab = document.createElement('div');
        fab.className = 'floating-action-btn';
        fab.innerHTML = `
            <div class="fab-main">
                <i class="fas fa-plus"></i>
            </div>
            <div class="fab-options">
                <a href="#" class="fab-option" title="Wishlist">
                    <i class="fas fa-heart"></i>
                </a>
                <a href="#" class="fab-option" title="Compare">
                    <i class="fas fa-balance-scale"></i>
                </a>
                <a href="#" class="fab-option" title="Help">
                    <i class="fas fa-question"></i>
                </a>
            </div>
        `;
        
        // Add FAB styles
        const fabStyles = `
            .floating-action-btn {
                position: fixed;
                bottom: 30px;
                right: 30px;
                z-index: 1000;
            }
            .fab-main {
                width: 60px;
                height: 60px;
                background: var(--primary-gradient);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
            }
            .fab-main:hover {
                transform: scale(1.1) rotate(45deg);
                box-shadow: 0 6px 30px rgba(102, 126, 234, 0.4);
            }
            .fab-options {
                position: absolute;
                bottom: 70px;
                right: 0;
                display: flex;
                flex-direction: column;
                gap: 10px;
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.3s ease;
                pointer-events: none;
            }
            .floating-action-btn.active .fab-options {
                opacity: 1;
                transform: translateY(0);
                pointer-events: all;
            }
            .fab-option {
                width: 45px;
                height: 45px;
                background: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--primary-color);
                text-decoration: none;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                transition: all 0.3s ease;
            }
            .fab-option:hover {
                transform: scale(1.1);
                color: white;
                background: var(--primary-gradient);
            }
        `;
        
        if (!document.querySelector('#fab-styles')) {
            const style = document.createElement('style');
            style.id = 'fab-styles';
            style.textContent = fabStyles;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(fab);
        
        // FAB functionality
        const fabMain = fab.querySelector('.fab-main');
        fabMain.addEventListener('click', () => {
            fab.classList.toggle('active');
        });
    }

    initInteractiveCards() {
        const cards = document.querySelectorAll('.interactive-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });
    }

    initMagneticButtons() {
        const magneticButtons = document.querySelectorAll('.magnetic-btn');
        
        magneticButtons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0px, 0px)';
            });
        });
    }

    initRippleEffects() {
        const rippleButtons = document.querySelectorAll('.ripple-btn');
        
        rippleButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = btn.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                btn.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // Add ripple styles
        const rippleStyles = `
            .ripple-btn {
                position: relative;
                overflow: hidden;
            }
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                pointer-events: none;
                animation: ripple-animation 0.6s ease;
            }
            @keyframes ripple-animation {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(1);
                    opacity: 0;
                }
            }
        `;
        
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = rippleStyles;
            document.head.appendChild(style);
        }
    }

    // ===== LOADING ANIMATIONS =====
    initLoadingAnimations() {
        // Page loader
        window.addEventListener('load', () => {
            const loader = document.querySelector('.page-loader');
            if (loader) {
                setTimeout(() => {
                    loader.classList.add('fade-out');
                    setTimeout(() => {
                        loader.remove();
                    }, 500);
                }, 1000);
            }
        });

        // Skeleton loading for images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('skeleton-loader');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            img.classList.add('skeleton-loader');
            imageObserver.observe(img);
        });
    }

    // ===== MICRO-INTERACTIONS =====
    initMicroInteractions() {
        // Button interactions
        document.querySelectorAll('.btn').forEach(btn => {
            btn.classList.add('micro-bounce');
        });

        // Form focus effects
        document.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
            });
        });

        // Icon hover effects
        document.querySelectorAll('.fa, .fas, .far, .fab').forEach(icon => {
            if (!icon.closest('.no-animation')) {
                icon.classList.add('micro-rotate');
            }
        });
    }

    // ===== ADVANCED EFFECTS =====
    initAdvancedEffects() {
        this.initTypewriterEffect();
        this.initCounterAnimations();
        this.initProgressBars();
        this.initMorphingElements();
    }

    initTypewriterEffect() {
        const typewriterElements = document.querySelectorAll('.typewriter-text');
        
        typewriterElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.display = 'inline-block';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        typeWriter();
                        observer.unobserve(element);
                    }
                });
            });
            
            observer.observe(element);
        });
    }

    initCounterAnimations() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const target = parseInt(counter.dataset.target);
                        const duration = parseInt(counter.dataset.duration) || 2000;
                        const increment = target / (duration / 16);
                        let current = 0;
                        
                        const updateCounter = () => {
                            current += increment;
                            if (current < target) {
                                counter.textContent = Math.floor(current);
                                requestAnimationFrame(updateCounter);
                            } else {
                                counter.textContent = target;
                            }
                        };
                        
                        updateCounter();
                        observer.unobserve(counter);
                    }
                });
            });
            
            observer.observe(counter);
        });
    }

    initProgressBars() {
        const progressBars = document.querySelectorAll('.animated-progress');
        
        progressBars.forEach(bar => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const progress = bar.dataset.progress;
                        bar.style.width = progress + '%';
                        observer.unobserve(bar);
                    }
                });
            });
            
            observer.observe(bar);
        });
    }

    initMorphingElements() {
        const morphElements = document.querySelectorAll('.morph-element');
        
        morphElements.forEach(element => {
            setInterval(() => {
                const randomBorderRadius = () => Math.random() * 50 + 25;
                element.style.borderRadius = `${randomBorderRadius()}% ${randomBorderRadius()}% ${randomBorderRadius()}% ${randomBorderRadius()}% / ${randomBorderRadius()}% ${randomBorderRadius()}% ${randomBorderRadius()}% ${randomBorderRadius()}%`;
            }, 3000);
        });
    }

    // ===== UTILITY METHODS =====
    static addAnimationClass(element, className, duration = 1000) {
        element.classList.add(className);
        setTimeout(() => {
            element.classList.remove(className);
        }, duration);
    }

    static createFireworks(x, y) {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            
            const angle = (Math.PI * 2 * i) / 10;
            const velocity = Math.random() * 100 + 50;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            document.body.appendChild(particle);
            
            let posX = x;
            let posY = y;
            let opacity = 1;
            
            const animate = () => {
                posX += vx * 0.02;
                posY += vy * 0.02;
                opacity -= 0.02;
                
                particle.style.left = posX + 'px';
                particle.style.top = posY + 'px';
                particle.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    particle.remove();
                }
            };
            
            animate();
        }
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.shopHubAnimations = new ShopHubAnimations();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ShopHubAnimations;
}

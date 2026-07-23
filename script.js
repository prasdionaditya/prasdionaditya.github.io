/* ============================================================
   DION'S PORTFOLIO — script.js
   Animations, custom cursor, scroll reveals, interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ============ PRELOADER ============
    const preloader = document.getElementById('preloader');

    const dismissPreloader = () => {
        preloader.classList.add('done');
        document.body.classList.add('loaded');
    };

    // Dismiss after 2.2s (enough time for the animation)
    setTimeout(dismissPreloader, 2200);


    // ============ CUSTOM CURSOR ============
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice && cursorDot && cursorRing) {
        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Dot follows instantly
            cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
        });

        // Ring follows with lerp (smooth delay)
        const animateRing = () => {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            cursorRing.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
            requestAnimationFrame(animateRing);
        };
        animateRing();

        // Hover effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .skill-pill, .vibe-card, .project-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('hover');
                cursorRing.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('hover');
                cursorRing.classList.remove('hover');
            });
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursorDot.classList.add('hidden');
            cursorRing.classList.add('hidden');
        });
        document.addEventListener('mouseenter', () => {
            cursorDot.classList.remove('hidden');
            cursorRing.classList.remove('hidden');
        });
    }


    // ============ NAVBAR SCROLL BEHAVIOR ============
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    let navHideTimeout;

    const handleNavbarScroll = () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });


    // ============ MOBILE MENU ============
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }


    // ============ SCROLL REVEAL (Intersection Observer) ============
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on sibling position
                const parent = entry.target.parentElement;
                const siblings = parent ? parent.querySelectorAll('.scroll-reveal') : [];
                let siblingIndex = 0;
                siblings.forEach((sib, i) => {
                    if (sib === entry.target) siblingIndex = i;
                });

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, siblingIndex * 100);

                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // ============ SMOOTH SCROLL for anchor links ============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });


    // ============ BACK TO TOP ============
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, { passive: true });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    // ============ ACTIVE NAV LINK HIGHLIGHT ============
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');

    const highlightNavLink = () => {
        const scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinksAll.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNavLink, { passive: true });


    // ============ SKILL PILLS STAGGER ANIMATION ============
    const skillCategories = document.querySelectorAll('.skill-category');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const pills = entry.target.querySelectorAll('.skill-pill');
                pills.forEach((pill, index) => {
                    pill.style.opacity = '0';
                    pill.style.transform = 'translateY(15px) scale(0.95)';
                    pill.style.transition = `opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.05}s, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.05}s`;

                    setTimeout(() => {
                        pill.style.opacity = '1';
                        pill.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                });

                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    skillCategories.forEach(cat => skillObserver.observe(cat));


    // ============ VIBE CARDS STAGGER ============
    const vibeContainer = document.querySelector('.about-vibes');

    if (vibeContainer) {
        const vibeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cards = entry.target.querySelectorAll('.vibe-card');
                    cards.forEach((card, index) => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        card.style.transition = `opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s`;

                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    });

                    vibeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        vibeObserver.observe(vibeContainer);
    }


    // ============ PROJECT CARD TILT EFFECT ============
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / centerY * -4;
            const rotateY = (x - centerX) / centerX * 4;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });


    // ============ MAGNETIC BUTTON EFFECT ============
    const magneticBtns = document.querySelectorAll('.btn-primary');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-3px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });


    // ============ PARALLAX SHAPES ============
    const shapes = document.querySelectorAll('.shape');

    if (shapes.length && !isTouchDevice) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;

            shapes.forEach((shape, index) => {
                const speed = 0.03 + (index * 0.015);
                shape.style.transform = `translateY(${scrollY * speed}px)`;
            });
        }, { passive: true });
    }


    // ============ TYPING EFFECT FOR HERO GREETING (optional subtle touch) ============
    // Not implementing a full typewriter to keep things smooth,
    // but the CSS reveal-up animation handles the entrance nicely.


    // ============ CONSOLE EASTER EGG ============
    console.log(
        '%c👋 hey! curious soul, huh?',
        'color: #4361EE; font-size: 18px; font-weight: bold; font-family: "Space Grotesk", sans-serif;'
    );
    console.log(
        '%cthis portfolio was crafted with love, caffeine, and probably some questionable CSS decisions.',
        'color: #64748B; font-size: 13px; font-family: "Inter", sans-serif;'
    );
    console.log(
        '%c→ wanna collab? hit me up at dionaditya59@gmail.com ✨',
        'color: #4361EE; font-size: 13px; font-family: "Inter", sans-serif;'
    );

});

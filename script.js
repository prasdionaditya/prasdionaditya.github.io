/* ============================================================
   DION'S PORTFOLIO — script.js
   Bold × Fun × Interactive
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ============ PRELOADER ============
    const preloader = document.getElementById('preloader');
    const body = document.body;

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('done');
            body.classList.add('loaded');
        }, 1500);
    });

    // Fallback
    setTimeout(() => {
        preloader?.classList.add('done');
        body.classList.add('loaded');
    }, 2500);


    // ============ CUSTOM HAND CURSOR ============
    const cursorHand = document.getElementById('cursorHand');

    if (cursorHand && window.matchMedia('(pointer: fine)').matches) {
        let mouseX = -100, mouseY = -100;
        let curX = -100, curY = -100;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorHand.classList.add('visible');
        });

        const animateHandCursor = () => {
            curX += (mouseX - curX) * 0.35;
            curY += (mouseY - curY) * 0.35;

            // Offset (-8px, -2px) aligns the index fingertip with the mouse pointer
            cursorHand.style.transform = `translate(${curX - 8}px, ${curY - 2}px)`;
            requestAnimationFrame(animateHandCursor);
        };
        animateHandCursor();

        // Hover animation on interactive elements
        document.addEventListener('mouseover', (e) => {
            const el = e.target.closest('a, button, [role="button"], .snd-hover, .snd-click');
            if (el) cursorHand.classList.add('hover');
        });
        document.addEventListener('mouseout', (e) => {
            const el = e.target.closest('a, button, [role="button"], .snd-hover, .snd-click');
            if (el) cursorHand.classList.remove('hover');
        });

        // Click / tap animation
        document.addEventListener('mousedown', () => cursorHand.classList.add('clicking'));
        document.addEventListener('mouseup', () => cursorHand.classList.remove('clicking'));

        document.addEventListener('mouseleave', () => cursorHand.classList.remove('visible'));
        document.addEventListener('mouseenter', () => cursorHand.classList.add('visible'));
    }


    // ============ NAVBAR ============
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // Scroll effects
    const handleScroll = () => {
        const scrolled = window.scrollY > 50;
        navbar.classList.toggle('scrolled', scrolled);

        // Back to top button
        const btt = document.getElementById('backToTop');
        if (btt) btt.classList.toggle('visible', window.scrollY > 400);

        // Active nav link highlighting
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 120) current = s.id;
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Mobile toggle
    const toggleMobile = () => {
        const isOpen = mobileMenu.classList.toggle('active');
        navToggle.classList.toggle('active', isOpen);
        body.style.overflow = isOpen ? 'hidden' : '';
    };

    navToggle?.addEventListener('click', toggleMobile);
    mobileLinks.forEach(link => link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navToggle.classList.remove('active');
        body.style.overflow = '';
    }));


    // ============ SCROLL REVEAL ============
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));


    // ============ BACK TO TOP ============
    const backToTop = document.getElementById('backToTop');
    backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // ============ COPY EMAIL ============
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const toast = document.getElementById('toastNotification');
    let toastTimeout;

    const showToast = (msg) => {
        if (!toast) return;
        const msgEl = toast.querySelector('.toast-msg');
        if (msgEl) msgEl.textContent = msg;
        toast.classList.add('active');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => toast.classList.remove('active'), 2800);
    };

    copyEmailBtn?.addEventListener('click', async () => {
        const email = 'dionaditya59@gmail.com';
        try {
            await navigator.clipboard.writeText(email);
            showToast('Email copied! ✦');
        } catch {
            const ta = document.createElement('textarea');
            ta.value = email;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            showToast('Email copied! ✦');
        }
    });


    // ============ OTW RING — pause on hover ============
    const otwRing = document.getElementById('otwRing');
    if (otwRing) {
        otwRing.addEventListener('mouseenter', () => {
            otwRing.style.animationPlayState = 'paused';
        });
        otwRing.addEventListener('mouseleave', () => {
            otwRing.style.animationPlayState = 'running';
        });
    }


    // ============ PROJECT CARDS — tilt effect ============
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
            card.style.transform = `translateY(-8px) perspective(600px) rotateX(${-y}deg) rotateY(${x}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });


    // ============ SKILL PILLS — stagger reveal ============
    const skillBlocks = document.querySelectorAll('.skill-block');
    const pillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const pills = entry.target.querySelectorAll('.skill-pill');
                pills.forEach((pill, i) => {
                    pill.style.animationDelay = `${i * 0.06}s`;
                    pill.classList.add('pill-animate');
                });
                pillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    skillBlocks.forEach(block => pillObserver.observe(block));


    // ============ ABOUT TAGS — interactive bounce ============
    const aboutTags = document.querySelectorAll('.about-tag');
    aboutTags.forEach(tag => {
        tag.addEventListener('click', () => {
            tag.animate([
                { transform: 'scale(1)' },
                { transform: 'scale(0.9)' },
                { transform: 'scale(1.1)' },
                { transform: 'scale(1)' }
            ], { duration: 300, easing: 'ease-out' });
        });
    });


    // ============ SMOOTH ANCHOR SCROLLING ============
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });


    // ============ PARALLAX GRID ============
    const heroGrid = document.querySelector('.hero-grid');
    if (heroGrid && window.matchMedia('(min-width: 769px)').matches) {
        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            heroGrid.style.transform = `translateY(${y * 0.15}px)`;
        }, { passive: true });
    }


    // ============ MARQUEE DRAG ============
    const marqueeTrack = document.querySelector('.marquee-track');
    if (marqueeTrack) {
        marqueeTrack.addEventListener('mousedown', () => {
            marqueeTrack.style.animationPlayState = 'paused';
        });
        document.addEventListener('mouseup', () => {
            marqueeTrack.style.animationPlayState = 'running';
        });
    }


    // ============ LETTERBOXD LIVE RSS SYNC ============
    const syncLetterboxd = async () => {
        const movieCard = document.querySelector('.movie-card');
        if (!movieCard) return;

        const posterImg = movieCard.querySelector('.vibing-poster');
        const trackTitle = movieCard.querySelector('.vibing-track');
        const trackArtist = movieCard.querySelector('.vibing-artist');
        const profileLink = movieCard.querySelector('.vibing-link');

        try {
            const res = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fletterboxd.com%2Fdionicious%2Frss%2F');
            const data = await res.json();

            if (data.status === 'ok' && data.items && data.items.length > 0) {
                const latest = data.items[0];
                const titleParts = latest.title.split(' - ');
                const rawTitle = titleParts[0] || latest.title;
                const rating = titleParts[1] || '★★★★★';
                const filmName = rawTitle.replace(/,\s*\d{4}$/, '');

                const imgMatch = latest.description ? latest.description.match(/<img[^>]+src="([^">]+)"/) : null;
                if (imgMatch && imgMatch[1]) {
                    posterImg.src = imgMatch[1];
                    posterImg.alt = `${filmName} Poster`;
                }

                trackTitle.textContent = filmName;
                trackArtist.textContent = `Latest Log • ${rating}`;
                if (latest.link && profileLink) {
                    profileLink.href = latest.link;
                    const span = profileLink.querySelector('span');
                    if (span) span.textContent = 'read on letterboxd';
                }
            }
        } catch (e) {
            console.warn('Letterboxd live sync fallback active:', e);
        }
    };

    syncLetterboxd();


    // Helper to dynamically fetch official high-res album artwork via iTunes Search API
    const fetchAlbumCover = async (artist, track) => {
        try {
            const query = encodeURIComponent(`${artist} ${track}`);
            const res = await fetch(`https://itunes.apple.com/search?term=${query}&entity=song&limit=10`);
            const data = await res.json();
            if (data.results && data.results.length > 0) {
                const artistLower = artist.toLowerCase();
                // Find exact artist match first
                const match = data.results.find(item => 
                    item.artistName && (
                        item.artistName.toLowerCase().includes(artistLower) || 
                        artistLower.includes(item.artistName.toLowerCase())
                    )
                );
                const target = match || data.results[0];
                if (target && target.artworkUrl100) {
                    return target.artworkUrl100.replace('100x100bb', '600x600bb');
                }
            }
        } catch (e) {
            console.warn('iTunes album cover fetch fallback:', e);
        }
        return null;
    };

    // ============ LAST.FM LIVE API SYNC ============
    const LASTFM_CONFIG = {
        USERNAME: 'dionicious',
        API_KEY: 'b25b959554ed76058ac220b7b2e0a026'
    };

    const syncLastFm = async () => {
        const musicCard = document.querySelector('.music-card');
        if (!musicCard) return;

        const posterImg = musicCard.querySelector('.music-poster');
        const trackTitle = musicCard.querySelector('.vibing-track');
        const trackArtist = musicCard.querySelector('.vibing-artist');
        const trackLink = musicCard.querySelector('#spotifyTrackBtn');
        const musicHandle = musicCard.querySelector('.music-handle');

        try {
            // 1. Try fetching top tracks for 1 month
            let url = `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${LASTFM_CONFIG.USERNAME}&period=1month&limit=1&api_key=${LASTFM_CONFIG.API_KEY}&format=json`;
            let res = await fetch(url);
            let data = await res.json();

            let track = data?.toptracks?.track?.[0];
            let isRecent = false;

            // 2. Fallback to recent tracks if top tracks is empty
            if (!track) {
                url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_CONFIG.USERNAME}&limit=1&api_key=${LASTFM_CONFIG.API_KEY}&format=json`;
                res = await fetch(url);
                data = await res.json();
                track = data?.recenttracks?.track?.[0];
                isRecent = true;
            }

            if (track) {
                const trackName = track.name;
                const artistName = typeof track.artist === 'string' ? track.artist : (track.artist?.name || 'Artist');
                const subtext = isRecent ? 'Recently Scrobbled' : (track.playcount ? `${track.playcount} plays this month` : 'Top Track');

                if (trackTitle) trackTitle.textContent = trackName;
                if (trackArtist) trackArtist.textContent = `${artistName} • ${subtext}`;
                if (musicHandle) musicHandle.textContent = `@${LASTFM_CONFIG.USERNAME}`;
                if (trackLink) {
                    trackLink.href = 'https://open.spotify.com/user/31xl4dkmwqq6nwcu4isdaotls6rm';
                    const span = trackLink.querySelector('span');
                    if (span) span.textContent = 'see my taste in music';
                }

                // Try fetching official high-res album cover
                const liveCover = await fetchAlbumCover(artistName, trackName);
                if (liveCover) {
                    posterImg.src = liveCover;
                    posterImg.alt = `${trackName} — ${artistName}`;
                } else if (track.image && track.image.length > 0) {
                    const imgUrl = track.image[track.image.length - 1]['#text'];
                    if (imgUrl && imgUrl.startsWith('http') && !imgUrl.includes('2a96cbd8b46e442fc41c2b86b821562f')) {
                        posterImg.src = imgUrl;
                        posterImg.alt = `${trackName} — ${artistName}`;
                    }
                }
            }
        } catch (e) {
            console.warn('Last.fm live sync fallback active:', e);
        }
    };

    syncLastFm();


    // ============ SAY HI OPTIONS TOGGLE ============
    const sayHiBtn = document.getElementById('sayHiBtn');
    const sayHiOptions = document.getElementById('sayHiOptions');

    sayHiBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        const isExpanded = sayHiBtn.getAttribute('aria-expanded') === 'true';
        
        if (isExpanded) {
            sayHiOptions.style.display = 'none';
            sayHiBtn.setAttribute('aria-expanded', 'false');
        } else {
            sayHiOptions.style.display = 'flex';
            sayHiBtn.setAttribute('aria-expanded', 'true');
            if (window.playSound) window.playSound('click');
        }
    });


    // ============ UI SOUNDS (ALWAYS ENABLED) ============
    let soundEnabled = true;
    let audioCtx = null;

    const getSoundCtx = () => {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    };

    // Auto unlock AudioContext on first interaction
    const unlockAudio = () => {
        getSoundCtx();
        document.removeEventListener('click', unlockAudio);
        document.removeEventListener('keydown', unlockAudio);
    };
    document.addEventListener('click', unlockAudio);
    document.addEventListener('keydown', unlockAudio);

    const playSound = (type = 'click') => {
        if (!soundEnabled) return;
        try {
            const ctx = getSoundCtx();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            const now = ctx.currentTime;

            if (type === 'click') {
                osc.frequency.setValueAtTime(520, now);
                osc.frequency.exponentialRampToValueAtTime(340, now + 0.09);
                gain.gain.setValueAtTime(0.18, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);
                osc.start(now); osc.stop(now + 0.14);
            } else if (type === 'hover') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(700, now);
                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
                osc.start(now); osc.stop(now + 0.07);
            } else if (type === 'success') {
                [440, 550, 660].forEach((freq, i) => {
                    const o2 = ctx.createOscillator();
                    const g2 = ctx.createGain();
                    o2.connect(g2); g2.connect(ctx.destination);
                    o2.type = 'sine';
                    const t = now + i * 0.13;
                    o2.frequency.setValueAtTime(freq, t);
                    g2.gain.setValueAtTime(0.14, t);
                    g2.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
                    o2.start(t); o2.stop(t + 0.22);
                });
                return;
            }
        } catch (e) { }
    };

    // Expose globally so form handler & modals can call it
    window.playSound = playSound;

    // Wire click sounds to elements
    document.querySelectorAll('.snd-click').forEach(el => {
        el.addEventListener('click', () => playSound('click'));
    });

    // Wire hover sounds to elements
    document.querySelectorAll('.snd-hover').forEach(el => {
        el.addEventListener('mouseenter', () => playSound('hover'));
    });


    // ============ MAGNETIC BUTTONS ============
    document.querySelectorAll('.btn-lime, .btn-ghost, .nav-cta').forEach(btn => {
        btn.classList.add('magnetic-btn');
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });


    // ============ RIPPLE EFFECT ON BUTTONS ============
    document.querySelectorAll('.btn-lime, .btn-ghost, .nav-cta').forEach(btn => {
        btn.classList.add('ripple-wrap');
        btn.addEventListener('click', (e) => {
            const rect = btn.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
            btn.appendChild(ripple);
            ripple.addEventListener('animationend', () => ripple.remove());
        });
    });


    // ============ 3D TILT ON PROJECT CARDS ============
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const tiltX = (y - 0.5) * 8;   // -4 to +4 deg
            const tiltY = (x - 0.5) * -8;
            card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });


    // ============ MOUSE-FOLLOW GLOW ON PROJECT CARDS ============
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
    });


    // ============ TITLE HOVER SCRAMBLE ANIMATION ============
    const scrambleChars = '!<>-_\\/[]{}—=+*^?#A1B0X9';

    class TextScramble {
        constructor(el) {
            this.el = el;
            this.original = el.textContent.trim();
            this.queue = [];
            this.frame = 0;
            this.frameRequest = null;
            this.isBusy = false;
        }
        scramble() {
            if (this.isBusy) return;
            this.isBusy = true;
            const oldText = this.original;
            const length = oldText.length;
            this.queue = [];
            for (let i = 0; i < length; i++) {
                const from = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                const start = Math.floor(Math.random() * 8);
                const end = start + Math.floor(Math.random() * 12 + 8);
                this.queue.push({ from, to: oldText[i], start, end });
            }
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
        }
        update() {
            let output = '';
            let complete = 0;
            for (let i = 0; i < this.queue.length; i++) {
                let { from, to, start, end } = this.queue[i];
                if (this.frame >= end || to === ' ' || to === '\n') {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (Math.random() < 0.22) {
                        this.queue[i].from = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                    }
                    output += `<span style="color:var(--lime);font-weight:bold">${this.queue[i].from}</span>`;
                } else {
                    output += to;
                }
            }
            this.el.innerHTML = output;
            if (complete < this.queue.length) {
                this.frameRequest = requestAnimationFrame(() => this.update());
                this.frame++;
            } else {
                this.el.textContent = this.original;
                setTimeout(() => { this.isBusy = false; }, 400);
            }
        }
    }

    // Apply scramble glitch ONLY to "OFF THE SCREEN & IN THE ZONE" (.vibing-title)
    document.querySelectorAll('.vibing-title').forEach(title => {
        const scrambler = new TextScramble(title);
        title.addEventListener('mouseenter', () => scrambler.scramble());
    });


    // ============ CURSOR TRAIL ============
    if (window.matchMedia('(pointer: fine)').matches) {
        const TRAIL_COUNT = 8;
        const trailDots = [];
        for (let i = 0; i < TRAIL_COUNT; i++) {
            const dot = document.createElement('div');
            dot.classList.add('cursor-trail-dot');
            dot.style.width = `${6 - i * 0.5}px`;
            dot.style.height = `${6 - i * 0.5}px`;
            document.body.appendChild(dot);
            trailDots.push({ el: dot, x: 0, y: 0 });
        }

        let mouseX = 0, mouseY = 0;
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            trailDots.forEach(d => d.el.style.opacity = '0.5');
        });

        const animateTrail = () => {
            let px = mouseX, py = mouseY;
            trailDots.forEach((dot, i) => {
                const speed = 0.25 - i * 0.02;
                dot.x += (px - dot.x) * speed;
                dot.y += (py - dot.y) * speed;
                dot.el.style.transform = `translate(${dot.x - 3}px, ${dot.y - 3}px)`;
                px = dot.x;
                py = dot.y;
            });
            requestAnimationFrame(animateTrail);
        };
        animateTrail();

        // Fade out when idle
        let idleTimer;
        document.addEventListener('mousemove', () => {
            clearTimeout(idleTimer);
            idleTimer = setTimeout(() => {
                trailDots.forEach(d => d.el.style.opacity = '0');
            }, 2000);
        });
    }


    // ============ HOBBY PORTFOLIO MODAL ============
    const hobbyModal = document.getElementById('hobbyModal');
    const hobbyModalContent = document.getElementById('hobbyModalContent');
    const hobbyModalClose = document.getElementById('hobbyModalClose');

    const hobbyData = {
        guitar: {
            badge: "🎸 Playing Guitar",
            title: "GUITAR & RIFFS",
            image: "img/hobby_guitar.png",
            desc: "Writing acoustic fingerstyle arrangements, lead guitar solos, and ambient guitar loops. Music is my primary creative outlet outside of programming.",
            tags: ["Acoustic Fingerstyle", "Electric Lead", "Music Production", "Improv & Riffs"]
        },
        content: {
            badge: "🎙️ Content Creating",
            title: "SONG COVERS & MEDIA",
            image: "img/hobby_content.png",
            desc: "Arranging and recording acoustic song covers / handling everything from vocal tracks and DAW mixing (Logic / Ableton) to video editing and color grading.",
            tags: ["Song Cover Production", "Vocal & DAW Mixing", "Video Editing", "Audio Mastering"]
        },
        photo: {
            badge: "📸 Photography",
            title: "VISUAL PHOTOGRAPHY",
            image: "img/hobby_photo.png",
            desc: "Exploring visual composition through street photography, architectural framing, and mood color-grading. A passion that directly feeds into my UI/UX design taste.",
            tags: ["Street Photography", "Architectural Shots", "Color Grading", "Visual Storytelling"]
        },
        design: {
            badge: "🎨 Graphic Design",
            title: "BRAND & VISUAL SYSTEMS",
            image: "img/hobby_content.png",
            desc: "Crafting bold brand identities, design systems, visual layouts, and digital graphics. Combining typography, color theory, and modern aesthetics.",
            tags: ["Brand Identity", "Design Systems", "Visual Layouts", "Typography & Color"]
        }
    };

    const openHobbyModal = (hobbyKey) => {
        const data = hobbyData[hobbyKey];
        if (!data) return;

        hobbyModalContent.innerHTML = `
            <div class="modal-header-badge">${data.badge}</div>
            <h3 class="modal-title">${data.title}</h3>
            <div class="modal-image-wrap">
                <img src="${data.image}" alt="${data.title}" class="modal-image">
            </div>
            <p class="modal-desc">${data.desc}</p>
            <div class="modal-tags">
                ${data.tags.map(t => `<span class="modal-tag">${t}</span>`).join('')}
            </div>
        `;

        hobbyModal.classList.add('active');
        hobbyModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        if (window.playSound) window.playSound('click');
    };

    const closeHobbyModal = () => {
        hobbyModal.classList.remove('active');
        hobbyModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    document.querySelectorAll('.hobby-click-item').forEach(item => {
        item.addEventListener('click', () => {
            const hobby = item.getAttribute('data-hobby');
            openHobbyModal(hobby);
        });
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const hobby = item.getAttribute('data-hobby');
                openHobbyModal(hobby);
            }
        });
    });

    hobbyModalClose?.addEventListener('click', closeHobbyModal);

    hobbyModal?.addEventListener('click', (e) => {
        if (e.target === hobbyModal) closeHobbyModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && hobbyModal?.classList.contains('active')) {
            closeHobbyModal();
        }
    });

});


// ============ SKILL PILL ANIMATION KEYFRAMES ============
const styleTag = document.createElement('style');
styleTag.textContent = `
    .skill-pill.pill-animate {
        animation: pillPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
    }
    @keyframes pillPop {
        from { opacity: 0; transform: scale(0.6) translateY(10px); }
        to   { opacity: 1; transform: scale(1) translateY(0); }
    }
`;
document.head.appendChild(styleTag);


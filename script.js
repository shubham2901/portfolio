document.addEventListener('DOMContentLoaded', () => {

    // --- Sticky Header Logic ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    // --- Timeline Drawing Animation ---
    const timelineContainer = document.querySelector('.timeline-container');
    const timelineProgress = document.getElementById('timeline-progress');

    function updateTimelineProgress() {
        const rect = timelineContainer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const startOffset = windowHeight * 0.5;
        const containerTop = rect.top;
        const containerHeight = rect.height;

        let progress = 0;

        if (containerTop < startOffset) {
            const distance = startOffset - containerTop;
            progress = (distance / containerHeight) * 100;
        }

        progress = Math.max(0, Math.min(100, progress));
        timelineProgress.style.height = `${progress}%`;
    }

    if (timelineContainer && timelineProgress) {
        window.addEventListener('scroll', updateTimelineProgress);
        updateTimelineProgress();
    }

    // --- Particle System ---
    const canvas = document.getElementById('hero-particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = document.querySelector('.hero').offsetHeight;
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.4 - 0.2;
                this.speedY = Math.random() * 0.4 - 0.2;
                this.opacity = Math.random() * 0.3 + 0.05;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.fillStyle = `rgba(100, 255, 218, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            const particleCount = Math.min(80, (canvas.width * canvas.height) / 12000);
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();
    }

    // --- Intersection Observer for Animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('timeline-card-wrapper')) {
                    entry.target.style.transitionDelay = '0.1s';
                    entry.target.classList.add('visible');
                    animateOnScroll.unobserve(entry.target);

                    const counters = entry.target.querySelectorAll('.stat-value');
                    counters.forEach(counter => {
                        animateCounter(counter);
                    });
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.timeline-card-wrapper').forEach(card => {
        animateOnScroll.observe(card);
    });

    // --- Counter Animation ---
    function animateCounter(el) {
        const target = parseFloat(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '';
        const prefix = el.getAttribute('data-prefix') || '';
        const duration = 2000;
        const frameDuration = 1000 / 60;
        const totalFrames = Math.round(duration / frameDuration);

        let frame = 0;

        const timer = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const easeProgress = easeOutQuad(progress);
            const currentValue = easeProgress * target;

            el.textContent = prefix + (Number.isInteger(target) ? Math.round(currentValue) : currentValue.toFixed(1)) + suffix;

            if (frame === totalFrames) {
                clearInterval(timer);
                el.textContent = prefix + target + suffix;
            }
        }, frameDuration);
    }

    function easeOutQuad(x) {
        return 1 - (1 - x) * (1 - x);
    }

    // --- Accordion Logic ---
    const accHeaders = document.querySelectorAll('.accordion-header');

    accHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isActive = header.classList.contains('active');

            header.classList.toggle('active');

            if (isActive) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');

    function highlightNav() {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinksAll.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav);
});

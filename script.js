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

    // --- Timeline Drawing Animation ---
    const timelineContainer = document.querySelector('.timeline-container');
    const timelineProgress = document.getElementById('timeline-progress');

    // Function to update the timeline line height based on scroll
    function updateTimelineProgress() {
        const rect = timelineContainer.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate how much of the timeline container has been scrolled past the center of the viewport
        // We want the line to draw as we scroll down
        const startOffset = windowHeight * 0.5;
        const containerTop = rect.top;
        const containerHeight = rect.height;

        let progress = 0;

        if (containerTop < startOffset) {
            // Container has entered the "active" zone
            const distance = startOffset - containerTop;
            progress = (distance / containerHeight) * 100;
        }

        // Clamp between 0 and 100
        progress = Math.max(0, Math.min(100, progress));
        timelineProgress.style.height = `${progress}%`;
    }

    if (timelineContainer && timelineProgress) {
        window.addEventListener('scroll', updateTimelineProgress);
        // Initial check
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
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random() * 0.5 + 0.1;
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
                ctx.fillStyle = `rgba(168, 85, 247, ${this.opacity})`; // Using the purple accent color
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            const particleCount = Math.min(100, (canvas.width * canvas.height) / 10000); // Responsive count
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


    // --- Intersection Observer for Animations (Cards & Counters) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Reveal Timeline Cards
                if (entry.target.classList.contains('timeline-card-wrapper')) {

                    // Add slight stagger if scrolling fast
                    entry.target.style.transitionDelay = '0.1s';

                    entry.target.classList.add('visible');
                    animateOnScroll.unobserve(entry.target);

                    // Trigger counters inside this card
                    const counters = entry.target.querySelectorAll('.stat-value');
                    counters.forEach(counter => {
                        animateCounter(counter);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe timeline cards
    document.querySelectorAll('.timeline-card-wrapper').forEach(card => {
        animateOnScroll.observe(card);
    });

    // --- Counter Animation Logic ---
    function animateCounter(el) {
        const target = parseFloat(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '';
        const prefix = el.getAttribute('data-prefix') || '';
        const duration = 2000; // Slower counter for smoother feel
        const frameDuration = 1000 / 60; // 60fps
        const totalFrames = Math.round(duration / frameDuration);

        let frame = 0;

        const timer = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const easeProgress = easeOutQuad(progress);

            const currentValue = easeProgress * target;

            // Format: if integer, show integer. If float, show 1 decimal
            el.textContent = prefix + (Number.isInteger(target) ? Math.round(currentValue) : currentValue.toFixed(1)) + suffix;

            if (frame === totalFrames) {
                clearInterval(timer);
                el.textContent = prefix + target + suffix; // Ensure final value is exact
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

            // Toggle active class
            header.classList.toggle('active');

            if (isActive) {
                // Close
                content.style.maxHeight = null;
            } else {
                // Open: Set max-height to scrollHeight
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

});

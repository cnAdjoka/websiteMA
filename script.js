// Scroll progress bar
const progressBar = document.getElementById('progress-bar');
if (progressBar) {
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    }, { passive: true });
}

// Header scroll effect
const header = document.querySelector('header');
if (header) {
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
}

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const navOverlay = document.getElementById('nav-overlay');

if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('active');
        hamburger.classList.toggle('open', isOpen);
        if (navOverlay) navOverlay.classList.toggle('active', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            hamburger.classList.remove('open');
            if (navOverlay) navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    if (navOverlay) {
        navOverlay.addEventListener('click', () => {
            nav.classList.remove('active');
            hamburger.classList.remove('open');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
}

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

// Counter animation
function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// Parallax hero
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
    window.addEventListener('scroll', () => {
        heroBg.style.transform = `scale(1.08) translateY(${window.scrollY * 0.25}px)`;
    }, { passive: true });
}

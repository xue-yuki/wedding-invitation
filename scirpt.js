// Gallery images array
const galleryImages = [
    'https://images.unsplash.com/photo-1651924739855-ef03b6b9f929?w=1200',
    'https://images.unsplash.com/photo-1514846528774-8de9d4a07023?w=1200',
    'https://images.unsplash.com/photo-1519657502999-ab785d28a1f6?w=1200',
    'https://images.unsplash.com/photo-1762708592558-f20927d09a43?w=1200',
    'https://images.unsplash.com/photo-1737498205245-dbb396c262ed?w=1200',
    'https://images.unsplash.com/photo-1652018539007-fda8e4103459?w=1200'
];

// Open invitation
function openInvitation() {
    const content = document.getElementById('invitation-content');
    if (content) {
        content.classList.remove('hidden');
        content.classList.add('fade-in');

        // Smooth scroll to couple section
        setTimeout(() => {
            const coupleSection = document.getElementById('couple');
            if (coupleSection) {
                coupleSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300);
    }
}

// Gallery lightbox
function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = galleryImages[index];
    lightbox.classList.add('active');
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const offset = 70;
    const top = section.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
}

// RSVP Form submission
function handleRSVPSubmit(event) {
    event.preventDefault();

    const submitBtn = document.getElementById('submit-btn');
    const originalContent = submitBtn.innerHTML;

    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.innerHTML = 'Terima kasih! ✓';
        submitBtn.style.background = '#4CAF50';

        // Reset form after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalContent;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            event.target.reset();
        }, 3000);
    }, 1500);
}

// Scroll to top button
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    const currentY = window.pageYOffset;

    if (currentY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }

    if (floatingNav) {
        if (currentY > lastScrollY && currentY > 120) {
            floatingNav.style.transform = 'translateY(-120%)';
        } else {
            floatingNav.style.transform = 'translateY(0)';
        }
    }

    lastScrollY = currentY;
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Countdown to 2 December
const countdownElements = {
    days: document.getElementById('countdown-days'),
    hours: document.getElementById('countdown-hours'),
    minutes: document.getElementById('countdown-minutes'),
    seconds: document.getElementById('countdown-seconds'),
};

function getNextCountdownDate() {
    const now = new Date();
    const currentYear = now.getFullYear();
    let target = new Date(currentYear, 11, 2, 0, 0, 0); // 2 December

    if (target.getTime() <= now.getTime()) {
        target = new Date(currentYear + 1, 11, 2, 0, 0, 0);
    }

    return target;
}

const countdownTargetDate = getNextCountdownDate();
const countdownTitleEl = document.getElementById('countdown-date');

if (countdownTitleEl) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    countdownTitleEl.textContent = `Towards ${countdownTargetDate.toLocaleDateString('id-ID', options)}`;
}

function padTime(value) {
    return String(value).padStart(2, '0');
}

function updateCountdown() {
    if (!countdownElements.days) return;

    const now = new Date().getTime();
    const distance = countdownTargetDate.getTime() - now;

    if (distance <= 0) {
        countdownElements.days.textContent = '00';
        countdownElements.hours.textContent = '00';
        countdownElements.minutes.textContent = '00';
        countdownElements.seconds.textContent = '00';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElements.days.textContent = padTime(days);
    countdownElements.hours.textContent = padTime(hours);
    countdownElements.minutes.textContent = padTime(minutes);
    countdownElements.seconds.textContent = padTime(seconds);
}

if (countdownElements.days) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Navigation interactions
const navLinksContainer = document.getElementById('nav-links');
const navToggle = document.getElementById('nav-toggle');
const navAnchors = document.querySelectorAll('.nav-links a');
const floatingNav = document.getElementById('floating-nav');

if (navToggle && navLinksContainer) {
    navToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('open');
    });
}

navAnchors.forEach((link) => {
    link.addEventListener('click', () => {
        navLinksContainer?.classList.remove('open');
    });
});

const sections = document.querySelectorAll('[data-section]');

if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const id = entry.target.getAttribute('id');
                if (!id) return;

                const activeLink = Array.from(navAnchors).find((link) => link.dataset.nav === id);
                if (!activeLink) return;

                navAnchors.forEach((link) => {
                    link.classList.toggle('active', link === activeLink);
                });
            });
        },
        { threshold: 0.5 }
    );

    sections.forEach((section) => navObserver.observe(section));
}

// Element reveal animations
const animatedElements = document.querySelectorAll('[data-animate]');

if ('IntersectionObserver' in window && animatedElements.length) {
    const animateObserver = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const delay = entry.target.dataset.delay;
                if (delay) entry.target.style.transitionDelay = `${delay}ms`;

                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            });
        },
        { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    animatedElements.forEach((el) => animateObserver.observe(el));
}

let lastScrollY = window.pageYOffset;

// Smooth fade-in on load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});
// ===== NAVBAR SCROLL =====
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 50);

    // Progress bar
    const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    const pb = document.getElementById('progress-bar');
    if (pb) pb.style.width = pct + '%';

    // Back to top
    document.getElementById('backToTop')?.classList.toggle('show', window.scrollY > 400);
});

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== BACK TO TOP =====
document.getElementById('backToTop')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
let isDark = true;
themeToggle?.addEventListener('click', () => {
    isDark = !isDark;
    document.body.classList.toggle('light-theme', !isDark);
    themeToggle.textContent = isDark ? '🌙' : '☀️';
});

// ===== REVEAL ON SCROLL =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== PROJECT FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
            const show = filter === 'all' || card.dataset.category === filter;
            card.classList.toggle('hidden', !show);
        });
    });
});

// ===== CONTACT FORM VALIDATION =====
const contactForm = document.getElementById('contactForm');

function setError(inputId, errorId, msg) {
    document.getElementById(inputId)?.classList.add('error');
    const err = document.getElementById(errorId);
    if (err) err.textContent = msg;
}

function clearError(inputId, errorId) {
    document.getElementById(inputId)?.classList.remove('error');
    const err = document.getElementById(errorId);
    if (err) err.textContent = '';
}

contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    clearError('name', 'nameError');
    clearError('email', 'emailError');
    clearError('message', 'messageError');

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name.length < 2) { setError('name', 'nameError', 'Please enter your name'); valid = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('email', 'emailError', 'Please enter a valid email'); valid = false; }
    if (message.length < 10) { setError('message', 'messageError', 'Message must be at least 10 characters'); valid = false; }

    if (!valid) return;

    const btn = document.getElementById('submitBtn');
    const btnText = btn.querySelector('.btn-text');
    btnText.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
        btnText.textContent = 'Send Message';
        btn.disabled = false;
        contactForm.reset();
        const success = document.getElementById('formSuccess');
        if (success) {
            success.classList.add('show');
            setTimeout(() => success.classList.remove('show'), 4000);
        }
    }, 1600);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== KEYBOARD SHORTCUT =====
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
});

// ===== CONSOLE =====
console.log('%c👋 Welcome to Owais\'s Portfolio!', 'font-size: 18px; color: #6366f1; font-weight: bold;');
console.log('%cBuilt with HTML, CSS & JavaScript', 'font-size: 13px; color: #06b6d4;');

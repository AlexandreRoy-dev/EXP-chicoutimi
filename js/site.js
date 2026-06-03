function initLucide() {
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function initCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    if (!cursorDot || !cursorOutline || window.matchMedia('(max-width: 767px)').matches) return;

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        cursorOutline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 500, fill: 'forwards' });
    });

    document.querySelectorAll('.hover-trigger').forEach((trigger) => {
        trigger.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.backgroundColor = 'rgba(229, 106, 37, 0.1)';
        });
        trigger.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });
}

function initFaq() {
    document.querySelectorAll('.faq-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('i');
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                if (icon) icon.style.transform = 'rotate(0deg)';
            } else {
                document.querySelectorAll('.faq-content').forEach((c) => (c.style.maxHeight = null));
                document.querySelectorAll('.faq-btn i').forEach((i) => (i.style.transform = 'rotate(0deg)'));
                content.style.maxHeight = content.scrollHeight + 'px';
                if (icon) icon.style.transform = 'rotate(45deg)';
            }
        });
    });
}

function initScrollReveal() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    document.querySelectorAll('.gs-reveal').forEach((element) => {
        gsap.fromTo(
            element,
            { autoAlpha: 0, y: 50 },
            {
                duration: 1,
                autoAlpha: 1,
                y: 0,
                ease: 'power3.out',
                scrollTrigger: { trigger: element, start: 'top 85%', toggleActions: 'play none none reverse' },
            }
        );
    });
}

function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const panel = document.getElementById('mobile-menu-panel');
    if (!btn || !panel) return;
    btn.addEventListener('click', () => {
        panel.classList.toggle('hidden');
        const open = !panel.classList.contains('hidden');
        btn.setAttribute('aria-expanded', open);
    });
}

function initMortgageCalculator() {
    const form = document.getElementById('mortgage-calc');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const principal = parseFloat(document.getElementById('mc-principal').value) || 0;
        const rate = (parseFloat(document.getElementById('mc-rate').value) || 0) / 100 / 12;
        const years = parseInt(document.getElementById('mc-years').value, 10) || 25;
        const n = years * 12;
        let payment = 0;
        if (rate > 0 && n > 0) {
            payment = (principal * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
        } else if (n > 0) {
            payment = principal / n;
        }
        const out = document.getElementById('mc-result');
        if (out) {
            out.textContent = payment.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }) + ' / mois';
        }
    });
}

function initMutationCalculator() {
    const form = document.getElementById('mutation-calc');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const value = parseFloat(document.getElementById('mut-value').value) || 0;
        let tax = 0;
        const brackets = [
            [55200, 0.005],
            [276200, 0.01],
            [552300, 0.015],
            [1104600, 0.02],
            [2209200, 0.025],
            [Infinity, 0.03],
        ];
        let remaining = value;
        let prev = 0;
        for (const [limit, rate] of brackets) {
            const slice = Math.min(remaining, limit - prev);
            if (slice <= 0) break;
            tax += slice * rate;
            remaining -= slice;
            prev = limit;
            if (remaining <= 0) break;
        }
        const out = document.getElementById('mut-result');
        if (out) {
            out.textContent = tax.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initLucide();
    initCursor();
    initFaq();
    initScrollReveal();
    initMobileMenu();
    initMortgageCalculator();
    initMutationCalculator();
});

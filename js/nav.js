const SITE_LINKS = {
    phone: '418-580-8958',
    phoneHref: 'tel:+14185808958',
    email: 'rene.bouchard@exprealty.com',
    emailHref: 'mailto:rene.bouchard@exprealty.com',
    properties: 'https://renebouchard.ca/fr/proprietes',
};

function linkAttrs(item) {
    if (item.external) return ' target="_blank" rel="noopener noreferrer"';
    return '';
}

const NAV_ITEMS = [
    { label: 'Accueil', href: 'index.html' },
    { label: 'À propos', href: 'a-propos.html' },
    { label: 'Propriétés', href: SITE_LINKS.properties, external: true },
    {
        label: 'Acheter',
        href: 'achat.html',
        children: [
            { label: 'Conseils pour l\'achat', href: 'achat-conseils.html' },
            { label: 'Analyser vos besoins', href: 'achat-analyser-besoins.html' },
            { label: 'Dépenses à prévoir', href: 'achat-depenses.html' },
            { label: 'Envie d\'investir?', href: 'achat-investir.html' },
        ],
    },
    {
        label: 'Vendre',
        href: 'vendre.html',
        children: [
            { label: 'Acheter ou vendre', href: 'vendre-acheter-vendre.html' },
            { label: 'Pour vendre rapidement', href: 'vendre-rapidement.html' },
            { label: 'Le juste prix', href: 'vendre-juste-prix.html' },
            { label: 'Le courtier immobilier', href: 'vendre-courtier.html' },
        ],
    },
    {
        label: 'Outils',
        href: 'outils.html',
        children: [
            { label: 'Évaluation gratuite', href: 'evaluation-gratuite.html' },
            { label: 'Calculatrice hypothécaire', href: 'calculatrice-hypothecaire.html' },
            { label: 'Droit de mutation', href: 'calculatrice-mutation.html' },
        ],
    },
    { label: 'Contact', href: 'contact.html' },
];

function renderSiteNav(activePage, options = {}) {
    const root = document.getElementById('site-nav');
    if (!root) return;
    const isHome = options.home === true;

    const desktopLinks = NAV_ITEMS.map((item) => {
        const isActive = activePage === item.href || activePage === item.label;
        if (item.children) {
            const childLinks = item.children
                .map(
                    (c) =>
                        `<a href="${c.href}" class="block px-4 py-2 text-sm text-zinc-300 hover:text-brand-orange hover:bg-white/5 transition">${c.label}</a>`
                )
                .join('');
            return `
                <div class="nav-dropdown relative">
                    <a href="${item.href}" class="hover-trigger flex items-center gap-1 text-sm uppercase tracking-widest ${isActive ? 'text-brand-orange' : 'text-white hover:text-brand-orange'} transition">
                        ${item.label} <i data-lucide="chevron-down" class="w-3 h-3"></i>
                    </a>
                    <div class="nav-dropdown-panel absolute top-full left-0 mt-2 min-w-[220px] bg-[#111] border border-white/10 rounded-xl py-2 shadow-xl z-50">
                        ${childLinks}
                    </div>
                </div>`;
        }
        return `<a href="${item.href}"${linkAttrs(item)} class="hover-trigger text-sm uppercase tracking-widest ${isActive ? 'text-brand-orange' : 'text-white hover:text-brand-orange'} transition">${item.label}</a>`;
    }).join('');

    const mobileLinks = NAV_ITEMS.map((item) => {
        const children = item.children
            ? item.children
                  .map((c) => `<a href="${c.href}" class="block py-2 pl-4 text-sm text-zinc-400 hover:text-brand-orange">${c.label}</a>`)
                  .join('')
            : '';
        return `
            <div class="border-b border-white/10 py-3">
                <a href="${item.href}"${linkAttrs(item)} class="block text-sm uppercase tracking-widest text-white hover:text-brand-orange">${item.label}</a>
                ${children}
            </div>`;
    }).join('');

    const topBar = isHome
        ? ''
        : `<div class="hidden lg:flex items-center gap-2 text-xs text-zinc-400 border-b border-white/10 py-2 px-8 bg-brand-dark/95">
            <a href="${SITE_LINKS.phoneHref}" class="hover:text-brand-orange transition">${SITE_LINKS.phone}</a>
            <span class="text-white/20">|</span>
            <a href="${SITE_LINKS.emailHref}" class="hover:text-brand-orange transition">${SITE_LINKS.email}</a>
        </div>`;
    const navClass = isHome
        ? 'fixed w-full z-50 top-0 py-6 px-6 md:px-8 flex justify-between items-center mix-blend-difference'
        : 'sticky top-0 z-50 py-5 px-6 md:px-8 flex justify-between items-center bg-brand-dark/95 backdrop-blur-md border-b border-white/10';

    root.innerHTML = `
        ${topBar}
        <nav class="${navClass}">
            <a href="index.html" class="hover-trigger text-xl md:text-2xl font-serif font-semibold tracking-wider uppercase text-white">EXP Chicoutimi</a>
            <div class="hidden lg:flex gap-6 items-center">${desktopLinks}</div>
            <button id="mobile-menu-btn" type="button" class="lg:hidden hover-trigger text-white p-2" aria-label="Menu" aria-expanded="false">
                <i data-lucide="menu" class="w-6 h-6"></i>
            </button>
        </nav>
        <div id="mobile-menu-panel" class="hidden lg:hidden bg-brand-dark border-b border-white/10 px-6 pb-4">
            ${mobileLinks}
        </div>`;

    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function renderSiteFooter() {
    const root = document.getElementById('site-footer');
    if (!root) return;
    root.innerHTML = `
        <footer class="py-12 px-6 border-t border-white/10 bg-brand-dark">
            <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-sm text-zinc-500 mb-10">
                <div>
                    <p class="text-white font-serif text-lg mb-3">René Bouchard</p>
                    <p class="mb-2">Courtier immobilier — EXP Chicoutimi</p>
                    <p>Saguenay–Lac-Saint-Jean, Québec</p>
                </div>
                <div>
                    <p class="text-xs uppercase tracking-widest text-zinc-600 mb-3">Navigation</p>
                    <div class="flex flex-col gap-2">
                        <a href="index.html" class="hover:text-brand-orange transition">Accueil</a>
                        <a href="${SITE_LINKS.properties}" target="_blank" rel="noopener noreferrer" class="hover:text-brand-orange transition">Propriétés</a>
                        <a href="evaluation-gratuite.html" class="hover:text-brand-orange transition">Évaluation gratuite</a>
                        <a href="contact.html" class="hover:text-brand-orange transition">Contact</a>
                    </div>
                </div>
                <div>
                    <p class="text-xs uppercase tracking-widest text-zinc-600 mb-3">Coordonnées</p>
                    <a href="${SITE_LINKS.phoneHref}" class="block hover:text-brand-orange transition mb-2">${SITE_LINKS.phone}</a>
                    <a href="${SITE_LINKS.emailHref}" class="block hover:text-brand-orange transition">${SITE_LINKS.email}</a>
                </div>
            </div>
            <p class="text-center text-xs text-zinc-600">
                &copy; ${new Date().getFullYear()} René Bouchard | EXP Chicoutimi. Tous droits réservés.
                <a href="politique-confidentialite.html" class="hover:text-brand-orange transition ml-2">Politique de confidentialité</a>
            </p>
        </footer>`;
}

function renderPageHero(title, subtitle, breadcrumb) {
    const root = document.getElementById('page-hero');
    if (!root) return;
    const crumbs = breadcrumb
        ? breadcrumb.map((c, i) => {
              const sep = i > 0 ? '<span class="mx-2 text-zinc-600">/</span>' : '';
              if (c.href) return `${sep}<a href="${c.href}" class="hover:text-brand-orange transition">${c.label}</a>`;
              return `${sep}<span class="text-brand-orange">${c.label}</span>`;
          }).join('')
        : '';
    root.innerHTML = `
        <section class="page-hero pt-32 pb-20 px-6 md:px-12">
            <div class="max-w-4xl mx-auto gs-reveal">
                ${crumbs ? `<p class="text-xs uppercase tracking-widest text-zinc-500 mb-6">${crumbs}</p>` : ''}
                <h1 class="text-4xl md:text-6xl font-serif mb-6">${title}</h1>
                ${subtitle ? `<p class="text-lg text-zinc-400 font-light max-w-2xl">${subtitle}</p>` : ''}
                <div class="w-20 h-1 bg-brand-orange mt-8"></div>
            </div>
        </section>`;
}

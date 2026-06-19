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
    { label: 'Transfert militaire', href: 'transfert-militaire.html', highlight: true },
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
            { label: 'Transfert militaire', href: 'transfert-militaire.html' },
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

function navLinkClass(item, isActive, isHome) {
    if (item.highlight) {
        if (isHome) {
            return `hover-trigger inline-flex items-center gap-1.5 text-xs uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/50 bg-white/15 text-white hover:bg-white hover:text-brand-dark transition ${isActive ? '!bg-white !text-brand-dark' : ''}`;
        }
        return `hover-trigger inline-flex items-center gap-1.5 text-xs uppercase tracking-widest px-3 py-1.5 rounded-full bg-brand-blue text-white hover:bg-brand-dark transition ${isActive ? 'ring-2 ring-brand-blue/20' : ''}`;
    }
    return `hover-trigger text-sm uppercase tracking-widest ${isActive ? 'text-brand-blue' : isHome ? 'text-white hover:text-brand-blue' : 'text-brand-dark hover:text-brand-blue'} transition`;
}

function mobileLinkClass(item, isActive) {
    if (item.highlight) {
        return `block text-sm uppercase tracking-widest text-brand-blue font-semibold bg-brand-blue/5 border border-brand-blue/20 rounded-lg px-3 py-2 hover:bg-brand-blue/10 ${isActive ? 'bg-brand-blue/10' : ''}`;
    }
    return `block text-sm uppercase tracking-widest text-brand-dark hover:text-brand-blue ${isActive ? 'text-brand-blue' : ''}`;
}

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
                        `<a href="${c.href}" class="block px-4 py-2 text-sm text-slate-600 hover:text-brand-blue hover:bg-slate-50 transition">${c.label}</a>`
                )
                .join('');
            return `
                <div class="nav-dropdown relative">
                    <a href="${item.href}" class="hover-trigger flex items-center gap-1 text-sm uppercase tracking-widest ${isActive ? 'text-brand-blue' : isHome ? 'text-white hover:text-brand-blue' : 'text-brand-dark hover:text-brand-blue'} transition">
                        ${item.label} <i data-lucide="chevron-down" class="w-3 h-3"></i>
                    </a>
                    <div class="nav-dropdown-panel absolute top-full left-0 mt-2 min-w-[220px] bg-white border border-slate-200 rounded-xl py-2 shadow-xl z-50">
                        ${childLinks}
                    </div>
                </div>`;
        }
        return `<a href="${item.href}"${linkAttrs(item)} class="${navLinkClass(item, isActive, isHome)}">${item.label}</a>`;
    }).join('');

    const mobileLinks = NAV_ITEMS.map((item) => {
        const children = item.children
            ? item.children
                  .map((c) => `<a href="${c.href}" class="block py-2 pl-4 text-sm text-slate-500 hover:text-brand-blue">${c.label}</a>`)
                  .join('')
            : '';
        return `
            <div class="border-b border-slate-200 py-3">
                <a href="${item.href}"${linkAttrs(item)} class="${mobileLinkClass(item, activePage === item.href || activePage === item.label)}">${item.label}</a>
                ${children}
            </div>`;
    }).join('');

    const topBar = isHome
        ? ''
        : `<div class="hidden lg:flex items-center gap-2 text-xs text-slate-500 border-b border-slate-200 py-2 px-8 bg-white/95">
            <a href="${SITE_LINKS.phoneHref}" class="hover:text-brand-blue transition">${SITE_LINKS.phone}</a>
            <span class="text-slate-300">|</span>
            <a href="${SITE_LINKS.emailHref}" class="hover:text-brand-blue transition">${SITE_LINKS.email}</a>
        </div>`;
    const navClass = isHome
        ? 'fixed w-full z-50 top-0 py-6 px-6 md:px-8 flex justify-between items-center mix-blend-difference'
        : 'sticky top-0 z-50 py-5 px-6 md:px-8 flex justify-between items-center bg-white/95 backdrop-blur-md border-b border-slate-200';

    root.innerHTML = `
        ${topBar}
        <nav class="${navClass}">
            <a href="index.html" class="hover-trigger text-xl md:text-2xl font-serif font-semibold tracking-wider uppercase ${isHome ? 'text-white' : 'text-brand-dark'}">EXP Chicoutimi</a>
            <div class="hidden lg:flex gap-6 items-center">${desktopLinks}</div>
            <button id="mobile-menu-btn" type="button" class="lg:hidden hover-trigger ${isHome ? 'text-white' : 'text-brand-dark'} p-2" aria-label="Menu" aria-expanded="false">
                <i data-lucide="menu" class="w-6 h-6"></i>
            </button>
        </nav>
        <div id="mobile-menu-panel" class="hidden lg:hidden bg-white border-b border-slate-200 px-6 pb-4">
            ${mobileLinks}
        </div>`;

    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function renderSiteFooter() {
    const root = document.getElementById('site-footer');
    if (!root) return;
    root.innerHTML = `
        <footer class="py-12 px-6 border-t border-slate-200 bg-white">
            <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-sm text-slate-500 mb-10">
                <div>
                    <p class="text-brand-dark font-serif text-lg mb-3">René Bouchard</p>
                    <p class="mb-2">Courtier immobilier — EXP Chicoutimi</p>
                    <p>Saguenay–Lac-Saint-Jean, Québec</p>
                </div>
                <div>
                    <p class="text-xs uppercase tracking-widest text-slate-400 mb-3">Navigation</p>
                    <div class="flex flex-col gap-2">
                        <a href="index.html" class="hover:text-brand-blue transition">Accueil</a>
                        <a href="${SITE_LINKS.properties}" target="_blank" rel="noopener noreferrer" class="hover:text-brand-blue transition">Propriétés</a>
                        <a href="evaluation-gratuite.html" class="hover:text-brand-blue transition">Évaluation gratuite</a>
                        <a href="contact.html" class="hover:text-brand-blue transition">Contact</a>
                    </div>
                </div>
                <div>
                    <p class="text-xs uppercase tracking-widest text-slate-400 mb-3">Coordonnées</p>
                    <a href="${SITE_LINKS.phoneHref}" class="block hover:text-brand-blue transition mb-2">${SITE_LINKS.phone}</a>
                    <a href="${SITE_LINKS.emailHref}" class="block hover:text-brand-blue transition">${SITE_LINKS.email}</a>
                </div>
            </div>
            <p class="text-center text-xs text-slate-400">
                &copy; ${new Date().getFullYear()} René Bouchard | EXP Chicoutimi. Tous droits réservés.
                <a href="politique-confidentialite.html" class="hover:text-brand-blue transition ml-2">Politique de confidentialité</a>
            </p>
        </footer>`;
}

function renderPageHero(title, subtitle, breadcrumb) {
    const root = document.getElementById('page-hero');
    if (!root) return;
    const crumbs = breadcrumb
        ? breadcrumb.map((c, i) => {
              const sep = i > 0 ? '<span class="mx-2 text-slate-400">/</span>' : '';
              if (c.href) return `${sep}<a href="${c.href}" class="hover:text-white transition">${c.label}</a>`;
              return `${sep}<span class="text-white/80">${c.label}</span>`;
          }).join('')
        : '';
    root.innerHTML = `
        <section class="page-hero pt-32 pb-20 px-6 md:px-12">
            <div class="max-w-4xl mx-auto gs-reveal">
                ${crumbs ? `<p class="text-xs uppercase tracking-widest text-slate-300 mb-6">${crumbs}</p>` : ''}
                <h1 class="text-4xl md:text-6xl font-serif mb-6">${title}</h1>
                ${subtitle ? `<p class="text-lg text-slate-200 font-light max-w-2xl">${subtitle}</p>` : ''}
                <div class="w-20 h-1 bg-white/60 mt-8"></div>
            </div>
        </section>`;
}

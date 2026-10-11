import { products } from './products.js';
import { siteConfig } from './siteConfig.js';
import './styles.css';

const arrow = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3.5 10h12m-5-5 5 5-5 5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>';
const leaf = '<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 33c-1-12-8-19-16-23 0 13 5 22 16 23Zm0 0c1-12 8-19 16-23 0 13-5 22-16 23ZM20 33V16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/></svg>';
const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
const phone = String(siteConfig.contact.whatsapp || '').replace(/\D/g, '');
const whatsappHref = (subject = 'Kibogo Organic Fertilizer') => phone ? `https://wa.me/${phone}?text=${encodeURIComponent(`Hello, I would like to enquire about ${subject}.`)}` : '/contact/';
const productPath = (product) => `/products/${product.id}/`;
const paths = [
  ['/our-story/', 'Our story'], ['/products/', 'Products'], ['/impact/', 'Our impact'],
  ['/growing-zones/', 'Growing zones'], ['/kibogo-guides/', 'Kibogo guides'], ['/contact/', 'Contact'],
];
const path = location.pathname.replace(/\/{2,}/g, '/').replace(/\/?$/, '/');
const isHome = path === '/';
const currentProduct = products.find((product) => path === productPath(product));
const titleMap = {
  '/': 'Kibogo Organic Fertilizer | Organic Fertilizers for Kenyan Farms',
  '/our-story/': 'Our Story | Kibogo Organic Fertilizer',
  '/products/': 'Our Products | Kibogo and Leorganic Fertilizers',
  '/impact/': 'From Waste to Value | Kibogo Organic Fertilizer',
  '/growing-zones/': 'Growing Zones | Kibogo Organic Fertilizer',
  '/kibogo-guides/': 'Kibogo Guides | Organic Fertilizer Information',
  '/contact/': 'Contact Kibogo Organic Fertilizer',
};
const descriptionMap = {
  '/': 'Kibogo leads a range of organic fertilizers for Kenyan farms. Discover our avocado and organic waste-to-value story.',
  '/our-story/': 'Learn about Kibogo’s commitment to turning suitable organic waste into value through composting.',
  '/products/': 'Explore Kibogo Organic Fertilizer and the Leorganic product range for different crops and farming operations.',
  '/impact/': 'Follow the journey from avocado and other organic waste streams through composting and back to agriculture.',
  '/growing-zones/': 'Explore Kibogo’s ecological-zone approach to differing soils, rainfall and cropping needs.',
  '/kibogo-guides/': 'View Kibogo product and soil information posters, reproduced as supplied by the client.',
  '/contact/': 'Contact Kibogo about organic fertilizers for your crops, farm, cooperative or business.',
};
const pageTitle = currentProduct ? `${currentProduct.name} | Kibogo Organic Fertilizer` : (titleMap[path] || 'Page not found | Kibogo Organic Fertilizer');
document.title = pageTitle;
document.querySelector('meta[name="description"]')?.setAttribute('content', currentProduct ? `${currentProduct.description} Enquire about ${currentProduct.name} from Kibogo Organic Fertilizer.` : (descriptionMap[path] || 'Explore Kibogo Organic Fertilizer and the Leorganic range.'));
document.querySelector('meta[property="og:title"]')?.setAttribute('content', pageTitle);
document.querySelector('meta[property="og:description"]')?.setAttribute('content', currentProduct ? currentProduct.description : (descriptionMap[path] || 'Explore Kibogo Organic Fertilizer and the Leorganic range.'));

const button = (label, href, style = 'dark') => `<a class="button button--${style}" href="${href}">${label}${arrow}</a>`;
const image = (src, alt, className = '', eager = false) => `<img class="${className}" src="${src}" alt="${escapeHtml(alt)}" loading="${eager ? 'eager' : 'lazy'}"${eager ? ' fetchpriority="high"' : ''} />`;
const siteHeader = `
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header" id="top"><div class="header-inner page-shell">
    <a class="brand" href="/" aria-label="Kibogo home">${image('/images/kibogo-official-logo.webp', 'Kibogo', 'brand__logo', true)}</a>
    <button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="primary-navigation"><span></span><span></span></button>
    <nav class="primary-nav" id="primary-navigation" aria-label="Main navigation">
      ${paths.map(([href, label]) => `<a href="${href}"${path === href || (currentProduct && href === '/products/') ? ' aria-current="page"' : ''}>${label}</a>`).join('')}
      <a class="button button--small button--dark nav-cta" href="/contact/">Make an enquiry ${arrow}</a>
    </nav>
  </div></header>`;

const socialIcons = {
  facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.6 21v-8.2h2.8l.4-3.2h-3.2v-2c0-.9.3-1.5 1.6-1.5H17V3.2c-.7-.1-1.5-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2.3H7.5v3.2h2.8V21h3.3Z" fill="currentColor"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.5" cy="6.8" r="1.1" fill="currentColor"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3v11.1a4.4 4.4 0 1 1-3.6-4.3v3.4a1.2 1.2 0 1 0 .3.8V3h3.3c.2 2.3 1.5 3.7 4 4.1v3.3A8.1 8.1 0 0 1 14 8.7" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/></svg>',
};
const socials = Object.entries(siteConfig.socials)
  .filter(([key, value]) => key !== 'other' && typeof value === 'string' && value.trim())
  .map(([key, href]) => `<a class="social-link" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer" aria-label="Visit our ${key} page"><span class="social-link__icon">${socialIcons[key] || arrow}</span><span class="social-link__label">${key[0].toUpperCase() + key.slice(1)}</span></a>`).join('');
const email = siteConfig.contact.email.trim();
const telephone = siteConfig.contact.telephone.trim();
const telephoneHref = telephone.replace(/[^\d+]/g, '');
const contactDetails = `
  <a class="contact-action contact-action--whatsapp" href="${whatsappHref('Kibogo and Leorganic fertilizers')}" target="_blank" rel="noopener noreferrer"><span class="contact-action__whatsapp-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.8a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.3-4.9A8.4 8.4 0 1 1 20.5 11.8Z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M8 8c1-1 2-.5 2.5 1l-.7 1c.5 1 1.3 1.7 2.4 2.2l.9-.7c1.5.5 2 1.3 1.2 2.3-2 1.5-6.8-2.8-6.3-5.8Z" fill="currentColor"/></svg></span><span class="contact-action__whatsapp-text"><small>WHATSAPP</small><strong>Message our team</strong></span><span class="contact-action__whatsapp-arrow">${arrow}</span></a>
  ${email ? `<a class="contact-action" href="mailto:${escapeHtml(email)}"><span><small>EMAIL</small><strong>${escapeHtml(email)}</strong></span>${arrow}</a>` : ''}
  ${telephone ? `<a class="contact-action" href="tel:${escapeHtml(telephoneHref)}"><span><small>TELEPHONE</small><strong>${escapeHtml(telephone)}</strong></span>${arrow}</a>` : ''}`;
const siteFooter = `
  <footer class="site-footer"><div class="page-shell footer-main">
    <div class="footer-brand"><a class="brand brand--footer" href="/" aria-label="Kibogo home">${image('/images/kibogo-official-logo.webp', 'Kibogo', 'brand__logo')}</a><p>Turning suitable organic waste into useful agricultural inputs, and bringing value back to the land.</p></div>
    <div class="footer-column"><h2>Explore</h2>${paths.map(([href, label]) => `<a href="${href}">${label}</a>`).join('')}</div>
    <div class="footer-column"><h2>The range</h2>${products.map((product) => `<a href="${productPath(product)}">${escapeHtml(product.name)}</a>`).join('')}</div>
    <div class="footer-column footer-contact"><h2>Get in touch</h2>${email ? `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>` : ''}${telephone ? `<a href="tel:${escapeHtml(telephoneHref)}">${escapeHtml(telephone)}</a>` : ''}<div class="footer-socials">${socials}</div></div>
  </div><div class="page-shell footer-bottom"><span>© ${new Date().getFullYear()} KIBOGO Organic Fertilizer</span><span>Waste becomes a resource. A resource returns to the land.</span><a href="#top">Back to top ↑</a></div></footer>
  <a class="whatsapp-float" href="${whatsappHref('Kibogo Organic Fertilizer')}" target="_blank" rel="noopener noreferrer" aria-label="Chat with Kibogo Organic Fertilizer on WhatsApp"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.8a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.3-4.9A8.4 8.4 0 1 1 20.5 11.8Z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M8 8c1-1 2-.5 2.5 1l-.7 1c.5 1 1.3 1.7 2.4 2.2l.9-.7c1.5.5 2 1.3 1.2 2.3-2 1.5-6.8-2.8-6.3-5.8Z" fill="currentColor"/></svg><span>WhatsApp us</span></a>`;

const processSteps = `
  <div class="process-grid process-grid--story">
    <article class="process-step"><div class="process-step__image">${image('/images/waste-source.webp', 'Organic waste collection at a client processing site')}</div><span class="process-step__number">01</span><h3>Waste, gathered</h3><p>Avocado and other suitable organic materials begin a new journey.</p></article>
    <article class="process-step"><div class="process-step__image">${image('/images/compost-processing.webp', 'Workers sieving organic compost material at a client site')}</div><span class="process-step__number">02</span><h3>Sorted and prepared</h3><p>Organic material is separated and prepared for composting.</p></article>
    <article class="process-step"><div class="process-step__image">${image('/images/compost-bagging.webp', 'Workers handling compost material during processing')}</div><span class="process-step__number">03</span><h3>Composted</h3><p>Through composting, discarded organic matter becomes a useful resource.</p></article>
    <article class="process-step"><div class="process-step__image">${image('/images/finished-bags.webp', 'Kibogo Organic Fertilizer bags ready for agricultural use')}</div><span class="process-step__number">04</span><h3>Back to the land</h3><p>Kibogo brings the cycle back to agriculture.</p></article>
  </div>`;

const productCard = (product, detailed = false) => `
  <article class="product-card${product.flagship ? ' product-card--flagship' : ''}">
    <a class="product-card__photo ${product.imageClass}" href="${productPath(product)}" aria-label="Learn about ${escapeHtml(product.name)}">
      ${product.image ? image(product.image, product.imageAlt) : `<div class="product-illustration" aria-label="${escapeHtml(product.visualLabel)} illustration"><span class="product-illustration__drop" aria-hidden="true"></span><span class="product-illustration__label">${escapeHtml(product.visualLabel)}</span><span class="product-illustration__note">For farms of different scales</span></div>`}
      ${product.flagship ? '<span class="photo-label">Kibogo flagship</span>' : ''}${product.imageNote ? `<span class="photo-label photo-label--quiet">${escapeHtml(product.imageNote)}</span>` : ''}
    </a>
    <div class="product-card__body"><p class="eyebrow product-card__category">${escapeHtml(product.category)}</p><h3><a href="${productPath(product)}">${escapeHtml(product.name)}</a></h3><p class="product-card__description">${escapeHtml(product.description)}</p>
      ${detailed ? `<a class="text-link" href="${productPath(product)}"><span>Product details</span>${arrow}</a>` : `<a class="text-link" href="${whatsappHref(product.name)}" target="_blank" rel="noopener noreferrer"><span>${escapeHtml(product.enquiry)}</span>${arrow}</a>`}
    </div>
  </article>`;

const homePage = `
  <section class="hero page-shell" aria-labelledby="hero-title">
    <div class="hero__copy"><p class="eyebrow eyebrow--leaf"><span></span> KIBOGO ORGANIC FERTILIZER</p><h1 id="hero-title">Fertilizer grown from what the land <em>already grows.</em></h1><p class="hero__intro">We turn avocado waste and other suitable organic materials into useful fertilizer through composting.</p><div class="hero__actions">${button('See our impact', '/impact/')}${button('Make an enquiry', '/contact/', 'outline')}</div><div class="hero__note"><span class="note-dot"></span> From organic waste back to the soil.</div></div>
    <figure class="hero__visual">${image('/images/hero-farm.jpg', 'A farm landscape at harvest time; illustrative stock photography, not a Kibogo site', '', true)}<figcaption class="hero-caption"><span class="hero-caption__icon">${leaf}</span><span><strong>From waste to value</strong><small>Organic matter, returned to agriculture</small></span></figcaption><span class="hero__image-index" aria-hidden="true">KIBOGO · CIRCULAR AGRICULTURE</span></figure>
    <div class="hero__bottom-line"><span>Rooted in organic matter</span><span class="hero__bottom-rule"></span><span>Made for Kenya's farms</span></div>
  </section>
  <section class="process-section section-pad" aria-labelledby="home-impact-title"><div class="page-shell"><div class="process-heading"><div><p class="eyebrow">AVOCADO WASTE TO AGRICULTURAL VALUE</p><h2 id="home-impact-title">From waste to <em>value.</em></h2></div><p>Organic material, returned to the land.</p></div><div class="impact-story"><p>Avocado farms and packhouses can leave off-grade fruit, peels and seeds. We bring suitable organic materials into a composting journey—turning waste into a resource for agriculture.</p><span class="impact-story__tag">A circular story, rooted in Kenya</span></div>${processSteps}<p class="process-disclaimer">Client photographs show supplied activities and materials. They do not imply every bag is made solely from avocado waste or represent verified processing volumes.</p><a class="text-link" href="/impact/"><span>Explore our waste-to-value story</span>${arrow}</a></div></section>
  <section class="products-section section-pad" aria-labelledby="home-products-title"><div class="page-shell"><div class="section-heading section-heading--split"><div><p class="eyebrow">THE RANGE</p><h2 id="home-products-title">Products for the field.</h2></div><p>Kibogo leads, alongside the Leorganic range.</p></div><div class="product-grid">${productCard(products[0], true)}<div class="product-grid__rest">${products.slice(1).map((product) => productCard(product, true)).join('')}</div></div><p class="products-footnote"><a href="/products/">Explore all products ${arrow}</a></p></div></section>
  <section class="home-story-band"><div class="page-shell home-story-band__inner"><div><p class="eyebrow eyebrow--light">OUR APPROACH</p><h2>Quality and clean production, <em>together.</em></h2></div><p>We consider organic material, farming needs and ecological conditions as part of one agricultural story.</p>${button('Get to know Kibogo', '/our-story/', 'harvest')}</div></section>
  <section class="home-partners page-shell"><p class="eyebrow">WORKING TOGETHER</p><h2>For a cleaner agricultural future.</h2><div class="partners__list"><span>County Government<br />of Murang'a</span><span>Avocado<br />cooperatives</span><span>Avocado<br />processors</span><span>Harcourt Agro Ecology<br />Company</span></div></section>`;

const productPage = `
  <section class="page-hero page-shell"><p class="eyebrow">KIBOGO &amp; LEORGANIC</p><h1>Our products, <em>for the field.</em></h1><p>Meet the range, compare the supplied product descriptions, and ask our team what may suit your crops and operation.</p></section>
  <section class="products-section section-pad"><div class="page-shell"><div class="product-grid">${products.map((product) => productCard(product, true)).join('')}</div><p class="products-footnote">Product details are limited to information supplied by the client. Ask the team for current label information and advice.</p></div></section>`;

const productDetailPage = (product) => `
  <section class="product-detail page-shell"><a class="back-link" href="/products/">← All products</a><div class="product-detail__grid"><div class="product-detail__visual ${product.imageClass}">${product.image ? image(product.image, product.imageAlt, '', true) : `<div class="product-illustration"><span class="product-illustration__drop" aria-hidden="true"></span><span class="product-illustration__label">${escapeHtml(product.visualLabel)}</span><span class="product-illustration__note">Illustrative graphic — not product packaging</span></div>`}</div><div class="product-detail__copy"><p class="eyebrow">${escapeHtml(product.category)}${product.flagship ? ' · KIBOGO FLAGSHIP' : ' · LEORGANIC RANGE'}</p><h1>${escapeHtml(product.name)}</h1><p class="product-detail__lead">${escapeHtml(product.description)}</p><p>Product information on this page reflects the description provided by Kibogo. For current approved label directions, availability and product-specific questions, please contact the team.</p><a class="button button--dark" href="${whatsappHref(product.name)}" target="_blank" rel="noopener noreferrer">${escapeHtml(product.enquiry)} ${arrow}</a><a class="text-link" href="/products/">Compare the range ${arrow}</a></div></div></section>
  <section class="detail-context"><div class="page-shell detail-context__inner"><div><p class="eyebrow">NEED A HAND CHOOSING?</p><h2>Tell us about your crops and growing area.</h2></div><p>Farm type, crop and local conditions all help make an enquiry more useful. We can help direct your question to the right product information.</p><a href="/contact/" class="text-link">Talk to our team ${arrow}</a></div></section>`;

const impactPage = `
  <section class="page-hero page-shell"><p class="eyebrow">THE CIRCULAR STORY</p><h1>From avocado waste to <em>agricultural value.</em></h1><p>Kenya's avocado trade can leave off-grade fruit and processing material. Composting offers a way to return suitable organic material to productive use.</p></section>
  <section class="process-section section-pad"><div class="page-shell"><div class="impact-intro"><div><p class="eyebrow">A RESOURCE, NOT JUST A RESIDUE</p><h2>When organic material is handled well, <em>it can begin again.</em></h2></div><div><p>Avocado farms and packhouses may generate off-grade fruit, peels and seeds that do not reach consumers. Organic municipal or county waste is another potential material stream.</p><p>Kibogo's waste-to-value story is about collecting suitable organic material, composting it and making an agricultural input from the process.</p></div></div>${processSteps}<p class="process-disclaimer">The photos show supplied client activities and materials. They are not a claim that all fertilizer uses avocado waste, and no processing volumes, emissions savings or certifications are asserted here.</p></div></section>
  <section class="impact-close page-shell"><span class="impact-close__icon">${leaf}</span><div><p class="eyebrow">THE VALUE CYCLE</p><h2>Waste becomes a resource.<br /><em>A resource returns to the land.</em></h2></div>${button('Explore Kibogo products', '/products/')}</section>`;

const storyPage = `
  <section class="page-hero page-shell"><p class="eyebrow">OUR PURPOSE</p><h1>Quality and clean production, <em>together.</em></h1><p>Kibogo is built around a practical idea: suitable organic waste can become a useful resource for farming.</p></section>
  <section class="story-values section-pad"><div class="page-shell"><div class="story-values__intro"><p class="lead">We believe environmental responsibility and useful agricultural inputs belong in the same conversation.</p><p>Through composting, we work to return organic materials to agricultural use while considering the different conditions farms grow in.</p></div><div class="mission__values"><article class="value-point"><span class="value-point__number">01</span><div><h3>Turn waste into value</h3><p>Recover suitable organic matter and find a purposeful next use.</p></div></article><article class="value-point"><span class="value-point__number">02</span><div><h3>Produce through composting</h3><p>Transform organic materials into agricultural inputs.</p></div></article><article class="value-point"><span class="value-point__number">03</span><div><h3>Consider the ground</h3><p>Account for ecological conditions and varied farming needs.</p></div></article></div></div></section>
  <section class="partners-section"><div class="page-shell partners__inner"><div class="partners__heading"><p class="eyebrow">BETTER, TOGETHER</p><h2>Working together for a cleaner agricultural future.</h2></div><div class="partners__list"><span>County Government<br />of Murang'a</span><span>Avocado<br />cooperatives</span><span>Avocado<br />processors</span><span>Harcourt Agro Ecology<br />Company</span></div><p class="partners__note">Relationships and sourcing connections as supplied. No endorsement or formal partnership is implied.</p></div></section>`;

const zonesPage = `
  <section class="page-hero page-shell"><p class="eyebrow">A PLACE-SPECIFIC APPROACH</p><h1>Built for your ground, <em>not any ground.</em></h1><p>Soil, rainfall and cropping patterns differ between ecological zones. Fertilizer blends can be tailored to the conditions and farming needs they are intended to serve.</p></section>
  <section class="zones-section section-pad"><div class="page-shell zones__layout"><div class="zones__copy"><p class="eyebrow eyebrow--light">DIFFERENT PLACES, DIFFERENT NEEDS</p><h2>Start with the growing conditions.</h2><p class="zones__intro">These broad zone descriptions explain the approach—not geographic coverage, fixed formulations or guaranteed performance.</p><a class="button button--harvest" href="/contact/">Ask about your area ${arrow}</a></div><div class="zone-list"><article class="zone-item"><span>01</span><div><h3>Highland and high-rainfall zones</h3><p>For leaching-prone soils and cooler, wetter growing conditions.</p></div></article><article class="zone-item"><span>02</span><div><h3>Mid-altitude mixed-farming zones</h3><p>For diversified cropping and variable rainfall.</p></div></article><article class="zone-item"><span>03</span><div><h3>Semi-arid and drought-prone zones</h3><p>For farming where moisture stress and lighter soils matter.</p></div></article></div><figure class="zones__photo">${image('/images/zone-fields.jpg', 'Freshly harvested vegetables, illustrating varied crops')}<figcaption>Different ground. Different growing conditions.</figcaption></figure></div></section>
  <section class="zone-crops page-shell"><div><p class="eyebrow">A CROP-LED QUESTION</p><h2>What are you growing?</h2></div><p>Share your crop, growing area and farm type when you enquire. The team can help you discuss product options using current information.</p>${button('Ask the Kibogo team', '/contact/', 'outline')}</section>`;

const guidesPage = `
  <section class="page-hero page-shell"><p class="eyebrow">A CLOSER LOOK AT KIBOGO</p><h1>Good to know, <em>before you grow.</em></h1><p>Browse the Kibogo soil and product information posters supplied by the team.</p></section>
  <section class="guides-section section-pad"><div class="page-shell"><div class="guides-grid">
  <article class="guide-card"><a class="guide-image-link" href="/images/kibogo-soil-comparison.webp" target="_blank" rel="noopener noreferrer" aria-label="Open Kibogo soil comparison poster full size">${image('/images/kibogo-soil-comparison.webp', 'Kibogo poster comparing common soil concerns with benefits described in the supplied graphic')}<span class="guide-expand">View full poster ${arrow}</span></a><div class="guide-card__body"><p class="eyebrow">SOIL &amp; FERTILIZER</p><h2>Healthy soil, season after season.</h2><p>The supplied poster introduces the Kibogo approach to soil life, water retention and crop growth. Ask the team how its claims relate to your crops and local conditions.</p></div></article>
  <article class="guide-card"><a class="guide-image-link" href="/images/kibogo-product-guide.webp" target="_blank" rel="noopener noreferrer" aria-label="Open Kibogo product poster full size">${image('/images/kibogo-product-guide.webp', 'Kibogo Organic Fertilizer poster describing the product and its benefits')}<span class="guide-expand">View full poster ${arrow}</span></a><div class="guide-card__body"><p class="eyebrow">PRODUCT OVERVIEW</p><h2>Meet Kibogo Organic Fertilizer.</h2><p>A visual introduction to the flagship product and benefits described in the supplied artwork. For product directions, refer to the current approved label.</p></div></article>
  </div><p class="guides-note">Posters are reproduced as supplied by the client. Product performance statements shown in the artwork have not been independently verified; confirm product information with the team before relying on it.</p></div></section>`;

const contactPage = `
  <section class="page-hero page-shell"><p class="eyebrow">LET'S TALK ABOUT YOUR FARM</p><h1>Let's find the right fertilizer for <em>your farm.</em></h1><p>Farmers, commercial growers, cooperatives and agro-dealers are welcome to ask about Kibogo and the Leorganic range.</p></section>
  <section class="contact-section section-pad"><div class="page-shell contact__layout"><div class="contact__copy"><p class="eyebrow eyebrow--light">GET IN TOUCH</p><h2>Tell us what you grow.</h2><p>Share your crop, location and operation type to help us understand your enquiry.</p></div><div class="contact__actions">${contactDetails}<div class="contact-socials"><span>FOLLOW ALONG</span>${socials}</div></div></div></section>`;

const notFoundPage = `<section class="page-hero page-shell"><p class="eyebrow">KIBOGO ORGANIC FERTILIZER</p><h1>Page not <em>found.</em></h1><p>We couldn't find that page. Explore the product range or return to the home page.</p><div class="hero__actions">${button('Visit home', '/')}${button('Explore products', '/products/', 'outline')}</div></section>`;

let content;
if (isHome) content = homePage;
else if (path === '/products/') content = productPage;
else if (path === '/impact/') content = impactPage;
else if (path === '/our-story/') content = storyPage;
else if (path === '/growing-zones/') content = zonesPage;
else if (path === '/kibogo-guides/') content = guidesPage;
else if (path === '/contact/') content = contactPage;
else if (currentProduct) content = productDetailPage(currentProduct);
else content = notFoundPage;

const app = document.querySelector('#app');
app.innerHTML = `${siteHeader}<main id="main">${content}</main>${siteFooter}`;

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-navigation');
const closeMenu = () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('is-open');
};
menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navigation.classList.toggle('is-open', !isOpen);
});
navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
document.querySelectorAll('img').forEach((img) => img.addEventListener('error', () => { img.classList.add('image-fallback'); img.removeAttribute('src'); }, { once: true }));

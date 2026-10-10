import { products } from './products.js';
import { siteConfig } from './siteConfig.js';
import './styles.css';

const leafMark = `<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 33c-1-12-8-19-16-23 0 13 5 22 16 23Zm0 0c1-12 8-19 16-23 0 13-5 22-16 23ZM20 33V16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/></svg>`;
const arrowIcon = `<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3.5 10h12m-5-5 5 5-5 5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/></svg>`;

const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]));

const getWhatsAppNumber = () => String(siteConfig.contact.whatsapp || '').replace(/\D/g, '');
const whatsappHref = (productName) => {
  const number = getWhatsAppNumber();
  if (!number) return '#contact';
  const message = `Hello, I would like to enquire about ${productName}.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
};

const productCard = (product) => `
  <article class="product-card${product.flagship ? ' product-card--flagship' : ''}">
    <div class="product-card__photo ${product.imageClass}">
      ${product.image ? `<img src="${product.image}" alt="${escapeHtml(product.imageAlt)}" loading="lazy" width="720" height="520" />` : `<div class="product-illustration" aria-label="${escapeHtml(product.visualLabel)} illustration"><span class="product-illustration__drop" aria-hidden="true"></span><span class="product-illustration__label">${escapeHtml(product.visualLabel)}</span><span class="product-illustration__note">For farms of different scales</span></div>`}
      ${product.flagship ? '<span class="photo-label">Kibogo flagship</span>' : ''}
      ${product.imageNote ? `<span class="photo-label photo-label--quiet">${escapeHtml(product.imageNote)}</span>` : ''}
    </div>
    <div class="product-card__body">
      <p class="eyebrow product-card__category">${escapeHtml(product.category)}</p>
      <h3>${escapeHtml(product.name)}</h3>
      <p class="product-card__description">${escapeHtml(product.description)}</p>
      <a class="text-link" href="${whatsappHref(product.name)}"${getWhatsAppNumber() ? ' target="_blank" rel="noopener noreferrer"' : ''}>
        <span>${escapeHtml(product.enquiry)}</span>${arrowIcon}
      </a>
    </div>
  </article>`;

const availableSocials = Object.entries(siteConfig.socials)
  .filter(([key, value]) => key !== 'other' && typeof value === 'string' && value.trim())
  .map(([key, value]) => ({ label: key[0].toUpperCase() + key.slice(1), key, url: value.trim() }))
  .concat((siteConfig.socials.other || []).filter((item) => item?.url?.trim()).map((item) => ({ label: item.label, url: item.url.trim() })));

const socialIcon = (key) => {
  if (key === 'instagram') return '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.5" cy="6.8" r="1.1" fill="currentColor"/></svg>';
  if (key === 'tiktok') return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3v11.1a4.4 4.4 0 1 1-3.6-4.3v3.4a1.2 1.2 0 1 0 .3.8V3h3.3c.2 2.3 1.5 3.7 4 4.1v3.3A8.1 8.1 0 0 1 14 8.7" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/></svg>';
  if (key === 'facebook') return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.6 21v-8.2h2.8l.4-3.2h-3.2v-2c0-.9.3-1.5 1.6-1.5H17V3.2c-.7-.1-1.5-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2.3H7.5v3.2h2.8V21h3.3Z" fill="currentColor"/></svg>';
  return arrowIcon;
};

const socialLinks = availableSocials.map(({ label, key, url }) => `
  <a class="social-link${key ? ` social-link--${escapeHtml(key)}` : ''}" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" aria-label="Visit our ${escapeHtml(label)} page"><span class="social-link__icon">${socialIcon(key)}</span><span class="social-link__label">${escapeHtml(label)}</span></a>`).join('');

const email = siteConfig.contact.email.trim();
const telephone = siteConfig.contact.telephone.trim();
const phoneLink = telephone.replace(/[^\d+]/g, '');
const whatsappConfigured = Boolean(getWhatsAppNumber());

const app = document.querySelector('#app');
app.innerHTML = `
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header" id="top">
    <div class="header-inner page-shell">
      <a class="brand" href="#top" aria-label="Kibogo home">
        <img class="brand__logo" src="/images/kibogo-official-logo.webp" alt="Kibogo" width="1061" height="298" />
      </a>
      <button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="primary-navigation">
        <span></span><span></span>
      </button>
      <nav class="primary-nav" id="primary-navigation" aria-label="Main navigation">
        <a href="#story">Our story</a>
        <a href="#products">Products</a>
        <a href="#process">Our process</a>
        <a href="#zones">Ecological zones</a>
        <a href="#kibogo-guides">Kibogo guides</a>
        <a href="#contact">Contact</a>
        <a class="button button--small button--dark nav-cta" href="#contact">Make an enquiry ${arrowIcon}</a>
      </nav>
    </div>
  </header>

  <main id="main">
    <section class="hero page-shell" aria-labelledby="hero-title">
      <div class="hero__copy">
        <p class="eyebrow eyebrow--leaf"><span></span> KIBOGO ORGANIC FERTILIZER</p>
        <h1 id="hero-title">Fertilizer grown from what the land <em>already grows.</em></h1>
        <p class="hero__intro">We turn avocado waste and municipal or county organic waste into useful fertilizer through composting — bringing discarded material back into the cycle of productive farming.</p>
        <div class="hero__actions">
          <a class="button button--dark" href="#products">Explore our products ${arrowIcon}</a>
          <a class="button button--outline" href="#contact">Make an enquiry</a>
        </div>
        <div class="hero__note"><span class="note-dot"></span> A more thoughtful path from organic waste to the soil.</div>
      </div>
      <figure class="hero__visual">
        <img src="/images/hero-farm.jpg" alt="A farm landscape at harvest time; illustrative stock photography, not a Kibogo site" width="1600" height="900" fetchpriority="high" />
        <figcaption class="hero-caption"><span class="hero-caption__icon">${leafMark}</span><span><strong>From waste to Kibogo</strong><small>Organic matter, returned to agricultural use</small></span></figcaption>
        <span class="hero__image-index" aria-hidden="true">01 / THE LAND CYCLE</span>
      </figure>
      <div class="hero__bottom-line"><span>Rooted in organic matter</span><span class="hero__bottom-rule"></span><span>Made for Kenya's farms</span></div>
    </section>

    <section class="mission section-pad" id="story" aria-labelledby="mission-title">
      <div class="page-shell mission__grid">
        <div class="section-intro">
          <p class="eyebrow">OUR PURPOSE</p>
          <h2 id="mission-title">Quality and clean production, <em>together.</em></h2>
        </div>
        <div class="mission__copy">
          <p class="lead">We believe quality fertilizers and environmental responsibility belong in the same conversation.</p>
          <p>By composting suitable organic materials, we work to turn what might otherwise be discarded into useful agricultural inputs. It is a practical approach to cleaner surroundings and more considered farming.</p>
          <a class="text-link" href="#process"><span>See how the cycle works</span>${arrowIcon}</a>
        </div>
        <div class="mission__values">
          <article class="value-point"><span class="value-point__number">01</span><div><h3>Waste into value</h3><p>Recovering organic materials and finding a purposeful next use.</p></div></article>
          <article class="value-point"><span class="value-point__number">02</span><div><h3>Made through composting</h3><p>Transforming suitable organic matter into agricultural inputs.</p></div></article>
          <article class="value-point"><span class="value-point__number">03</span><div><h3>Grounded in place</h3><p>Considering ecological conditions and the needs of different farms.</p></div></article>
        </div>
      </div>
    </section>

    <section class="products-section section-pad" id="products" aria-labelledby="products-title">
      <div class="page-shell">
        <div class="section-heading section-heading--split">
          <div><p class="eyebrow">A RANGE FOR THE FIELD</p><h2 id="products-title">Our products</h2></div>
          <p>Four fertilizers, one standard: clean inputs, measurable results in the field.</p>
        </div>
        <div class="product-grid">
          ${productCard(products[0])}
          <div class="product-grid__rest">${products.slice(1).map(productCard).join('')}</div>
        </div>
        <p class="products-footnote">Not sure which product suits your crops or operation? <a href="#contact">Talk with our team ${arrowIcon}</a></p>
      </div>
    </section>

    <section class="zones-section section-pad" id="zones" aria-labelledby="zones-title">
      <div class="page-shell zones__layout">
        <div class="zones__copy">
          <p class="eyebrow eyebrow--light">A PLACE-SPECIFIC APPROACH</p>
          <h2 id="zones-title">Built for your ground, <em>not any ground.</em></h2>
          <p class="zones__intro">Soil, rainfall and cropping patterns change from one ecological zone to another. Fertilizer blends can be tailored to the conditions and farming needs they are intended to serve.</p>
          <a class="button button--harvest" href="#contact">Ask about your growing area ${arrowIcon}</a>
        </div>
        <div class="zone-list">
          <article class="zone-item"><span>01</span><div><h3>Highland and high-rainfall zones</h3><p>For leaching-prone soils and cooler, wetter growing conditions.</p></div><span class="zone-item__mark" aria-hidden="true">↗</span></article>
          <article class="zone-item"><span>02</span><div><h3>Mid-altitude mixed-farming zones</h3><p>For diversified cropping and variable rainfall.</p></div><span class="zone-item__mark" aria-hidden="true">↗</span></article>
          <article class="zone-item"><span>03</span><div><h3>Semi-arid and drought-prone zones</h3><p>For farming where moisture stress and lighter soils matter.</p></div><span class="zone-item__mark" aria-hidden="true">↗</span></article>
        </div>
        <figure class="zones__photo"><img src="/images/zone-fields.jpg" alt="Freshly harvested vegetables, illustrating varied crops" loading="lazy" width="1200" height="800" /><figcaption>Different ground. Different growing conditions.</figcaption></figure>
      </div>
    </section>

    <section class="process-section section-pad" id="process" aria-labelledby="process-title">
      <div class="page-shell">
        <div class="process-heading">
          <div><p class="eyebrow">THE CIRCULAR STORY</p><h2 id="process-title">From waste to <em>Kibogo.</em></h2></div>
          <p>Waste becomes a resource, and a resource returns to the land.</p>
        </div>
        <div class="process-lede">
          <p>Avocado trade can leave off-grade fruit and processing materials behind. Organic waste from farms, packhouses and municipal or county sources can become a resource when it is collected, sorted and composted.</p>
          <p>We are working to keep suitable organic material in use and support efforts to reduce harmful emissions associated with unmanaged organic waste.</p>
        </div>
        <div class="process-grid">
          <article class="process-step"><div class="process-step__image process-step__streams" aria-hidden="true"><span class="stream-line"><i>01</i><b>Avocado farms<br />&amp; packhouses</b></span><span class="stream-line"><i>02</i><b>County &amp; municipal<br />organics</b></span><span class="stream-join">Organic matter <span>↓</span></span></div><span class="process-step__number">01</span><h3>Two organic waste streams</h3><p>Avocado waste from farms and packhouses, alongside organic municipal or county waste.</p></article>
          <article class="process-step"><div class="process-step__image"><img src="/images/compost-processing.webp" alt="Workers handling organic material during processing at a client site" loading="lazy" width="1200" height="900" /></div><span class="process-step__number">02</span><h3>Collection and sorting</h3><p>Suitable organic materials are gathered and separated for processing.</p></article>
          <article class="process-step"><div class="process-step__image"><img src="/images/compost-bagging.webp" alt="Workers bagging processed organic material at a client site" loading="lazy" width="1200" height="1600" /></div><span class="process-step__number">03</span><h3>Composting and processing</h3><p>Collected organic material moves through a composting process.</p></article>
          <article class="process-step"><div class="process-step__image"><img src="/images/finished-bags.webp" alt="Kibogo Organic Fertilizer bags ready for agricultural use" loading="lazy" width="1200" height="1600" /></div><span class="process-step__number">04</span><h3>Returning value to the soil</h3><p>The resulting fertilizer returns organic material to agricultural use through Kibogo Organic Fertilizer.</p></article>
        </div>
        <p class="process-disclaimer">Client photographs show supplied materials and working scenes; they are not presented as a claim about process capacity or environmental certification.</p>
      </div>
    </section>

    <section class="guides-section section-pad" id="kibogo-guides" aria-labelledby="guides-title">
      <div class="page-shell">
        <div class="section-heading section-heading--split guides-heading">
          <div><p class="eyebrow">A CLOSER LOOK AT KIBOGO</p><h2 id="guides-title">Good to know, before you grow.</h2></div>
          <p>Explore the two Kibogo guides supplied by the team. They share product and soil information to help start a useful conversation about your farm.</p>
        </div>
        <div class="guides-grid">
          <article class="guide-card guide-card--soil">
            <a class="guide-image-link" href="/images/kibogo-soil-comparison.webp" target="_blank" rel="noopener noreferrer" aria-label="Open the Kibogo soil comparison poster at full size">
              <img src="/images/kibogo-soil-comparison.webp" alt="Kibogo poster comparing common soil concerns with the soil benefits described in the supplied graphic" loading="lazy" width="720" height="935" />
              <span class="guide-expand">View full poster ${arrowIcon}</span>
            </a>
            <div class="guide-card__body"><p class="eyebrow">SOIL &amp; FERTILIZER</p><h3>Healthy soil, season after season.</h3><p>The supplied poster introduces the Kibogo approach to soil life, water retention and crop growth. Ask our team how its claims relate to your crops and local conditions.</p><a class="text-link" href="${whatsappHref('Kibogo Organic Fertilizer')}"${whatsappConfigured ? ' target="_blank" rel="noopener noreferrer"' : ''}><span>Ask about Kibogo</span>${arrowIcon}</a></div>
          </article>
          <article class="guide-card guide-card--product">
            <a class="guide-image-link" href="/images/kibogo-product-guide.webp" target="_blank" rel="noopener noreferrer" aria-label="Open the Kibogo product information poster at full size">
              <img src="/images/kibogo-product-guide.webp" alt="Kibogo Organic Fertilizer product poster with illustrated roots, soil and product benefits" loading="lazy" width="578" height="1089" />
              <span class="guide-expand">View full poster ${arrowIcon}</span>
            </a>
            <div class="guide-card__body"><p class="eyebrow">PRODUCT OVERVIEW</p><h3>Meet Kibogo Organic Fertilizer.</h3><p>A visual introduction to the flagship product and the benefits described in the supplied poster. Product details and use should always follow the current approved label.</p><a class="text-link" href="${whatsappHref('Kibogo Organic Fertilizer')}"${whatsappConfigured ? ' target="_blank" rel="noopener noreferrer"' : ''}><span>Enquire about Kibogo</span>${arrowIcon}</a></div>
          </article>
        </div>
        <p class="guides-note">Posters are reproduced as supplied by the client. Product performance statements shown in the artwork have not been independently verified; confirm product information with the team before relying on it.</p>
      </div>
    </section>

    <section class="partners-section" aria-labelledby="partners-title">
      <div class="page-shell partners__inner">
        <div class="partners__heading"><p class="eyebrow">BETTER, TOGETHER</p><h2 id="partners-title">Working together for a cleaner agricultural future.</h2></div>
        <div class="partners__list" aria-label="Relationships described by the client"><span>County Government<br />of Murang'a</span><span>Avocado<br />cooperatives</span><span>Avocado<br />processors</span><span>Harcourt Agro Ecology<br />Company</span></div>
        <p class="partners__note">Relationships and sourcing connections as supplied. No endorsement or formal partnership is implied.</p>
      </div>
    </section>

    <section class="brand-family" aria-label="Kibogo and Leorganic product family">
      <div class="page-shell brand-family__inner">
        <div class="brand-family__kibogo"><span>OUR LEAD BRAND</span><img src="/images/kibogo-official-logo.webp" alt="Kibogo official buffalo logo" width="1061" height="298" loading="lazy" /></div>
        <span class="brand-family__divider" aria-hidden="true"></span>
        <div class="brand-family__leorganic"><span>ALONGSIDE KIBOGO</span><img src="/images/leorganic-logo.webp" alt="Leorganic" width="757" height="203" loading="lazy" /></div>
        <p>Kibogo leads the range, alongside Leorganic products.</p>
      </div>
    </section>

    <section class="contact-section section-pad" id="contact" aria-labelledby="contact-title">
      <div class="page-shell contact__layout">
        <div class="contact__copy"><p class="eyebrow eyebrow--light">LET'S TALK ABOUT YOUR FARM</p><h2 id="contact-title">Let's find the right fertilizer for <em>your farm.</em></h2><p>Farmers, commercial growers, cooperatives and agro-dealers are welcome to get in touch about the Kibogo and Leorganic range.</p></div>
        <div class="contact__actions">
          ${whatsappConfigured ? `<a class="contact-action contact-action--featured" href="${whatsappHref('Kibogo and Leorganic fertilizers')}" target="_blank" rel="noopener noreferrer"><span><small>QUICK ENQUIRY</small><strong>Chat with us on WhatsApp</strong></span>${arrowIcon}</a>` : '<p class="contact-prompt">WhatsApp enquiries will appear here once a verified destination is added to the site configuration.</p>'}
          ${whatsappConfigured ? `<a class="contact-action contact-action--whatsapp" href="${whatsappHref('Kibogo and Leorganic fertilizers')}" target="_blank" rel="noopener noreferrer" aria-label="Contact Kibogo on WhatsApp"><span class="contact-action__whatsapp-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.8a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.3-4.9A8.4 8.4 0 1 1 20.5 11.8Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.7"/><path d="M8.3 7.7c-.3.3-.7.8-.7 1.5s.5 1.6.6 1.8c.1.2 1.1 1.8 2.7 2.5 1.3.6 1.6.5 1.9.4.3-.1 1-.4 1.1-.8.2-.4.2-.7.1-.8-.1-.1-.3-.2-.6-.3l-1.1-.5c-.2-.1-.4-.1-.5.2l-.5.6c-.1.2-.3.2-.5.1-.3-.1-1-.4-1.6-1-.5-.5-.8-1.1-.9-1.4-.1-.2 0-.3.1-.4l.4-.5c.1-.1.1-.3.1-.4l-.5-1.2c-.1-.3-.3-.3-.5-.3h-.4c-.2 0-.5.2-.7.5Z" fill="currentColor"/></svg></span><span class="contact-action__whatsapp-text"><small>WHATSAPP</small><strong>Message our team</strong></span><span class="contact-action__whatsapp-arrow">${arrowIcon}</span></a>` : ''}
          ${email ? `<a class="contact-action" href="mailto:${escapeHtml(email)}"><span><small>EMAIL</small><strong>${escapeHtml(email)}</strong></span>${arrowIcon}</a>` : ''}
          ${telephone ? `<a class="contact-action" href="tel:${escapeHtml(phoneLink)}"><span><small>TELEPHONE</small><strong>${escapeHtml(telephone)}</strong></span>${arrowIcon}</a>` : ''}
          ${socialLinks ? `<div class="contact-socials"><span>FOLLOW ALONG</span>${socialLinks}</div>` : '<p class="contact-social-note">Social links will be added here when the official destinations are confirmed.</p>'}
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="page-shell footer-main">
      <div class="footer-brand"><a class="brand brand--footer" href="#top" aria-label="Kibogo home"><img class="brand__logo" src="/images/kibogo-official-logo.webp" alt="Kibogo" width="1061" height="298" /></a><p>Turning organic waste into useful agricultural inputs, and bringing value back to the land.</p></div>
      <div class="footer-column"><h2>Explore</h2><a href="#story">Our story</a><a href="#products">Products</a><a href="#process">Our process</a><a href="#zones">Ecological zones</a><a href="#kibogo-guides">Kibogo guides</a><a href="#contact">Contact</a></div>
      <div class="footer-column"><h2>The range</h2>${products.map((product) => `<a href="#products">${escapeHtml(product.name)}</a>`).join('')}</div>
      <div class="footer-column footer-contact"><h2>Get in touch</h2>${email ? `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>` : ''}${telephone ? `<a href="tel:${escapeHtml(phoneLink)}">${escapeHtml(telephone)}</a>` : ''}${socialLinks ? `<div class="footer-socials">${socialLinks}</div>` : ''}</div>
    </div>
    <div class="page-shell footer-bottom"><span>© <span id="copyright-year"></span> KIBOGO Organic Fertilizer</span><span>Waste becomes a resource. A resource returns to the land.</span><a href="#top">Back to top ↑</a></div>
  </footer>
  <a class="whatsapp-float" href="${whatsappHref('Kibogo Organic Fertilizer')}" target="_blank" rel="noopener noreferrer" aria-label="Chat with Kibogo Organic Fertilizer on WhatsApp">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.8a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.3-4.9A8.4 8.4 0 1 1 20.5 11.8Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.7"/><path d="M8.3 7.7c-.3.3-.7.8-.7 1.5s.5 1.6.6 1.8c.1.2 1.1 1.8 2.7 2.5 1.3.6 1.6.5 1.9.4.3-.1 1-.4 1.1-.8.2-.4.2-.7.1-.8-.1-.1-.3-.2-.6-.3l-1.1-.5c-.2-.1-.4-.1-.5.2l-.5.6c-.1.2-.3.2-.5.1-.3-.1-1-.4-1.6-1-.5-.5-.8-1.1-.9-1.4-.1-.2 0-.3.1-.4l.4-.5c.1-.1.1-.3.1-.4l-.5-1.2c-.1-.3-.3-.3-.5-.3h-.4c-.2 0-.5.2-.7.5Z" fill="currentColor"/></svg>
    <span>WhatsApp us</span>
  </a>
`;

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
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});
document.querySelector('#copyright-year').textContent = new Date().getFullYear();

// Replace failed photographs with a quiet, branded background rather than a broken-image icon.
document.querySelectorAll('img').forEach((image) => {
  image.addEventListener('error', () => {
    image.classList.add('image-fallback');
    image.removeAttribute('src');
  }, { once: true });
});

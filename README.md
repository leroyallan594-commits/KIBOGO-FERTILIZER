# KIBOGO Organic Fertilizer website

A responsive, enquiry-focused multi-page website built with vanilla JavaScript, CSS and Vite. It includes Home, Our Story, Products, individual product pages, Our Impact, Growing Zones, Kibogo Guides, and Contact. No cart or backend form is included.

## Run locally

- `npm install`
- `npm run dev`
- `npm run build` for a production build
- `npm run preview` to preview the built site

## Contact and social configuration

Edit `src/siteConfig.js`:

- Set `contact.whatsapp` to the verified international phone number using digits only (for example, country code followed by the number; do not include `+`, spaces or punctuation). Product enquiry links then open WhatsApp with the relevant product name pre-filled. Until set, those links scroll to the contact section.
- Update `contact.email` and `contact.telephone` if needed.
- Paste verified full profile URLs into `socials.facebook`, `socials.instagram`, and `socials.tiktok`. Add any future platform to `socials.other` as `{ label, url }`. Empty social values remain hidden.

The displayed email and telephone are editable defaults supplied in the project brief and should be confirmed before publishing. Image inventory, source mapping and product-photo caveats are in `ASSET_SOURCES.md`.

## Pages

- `/` — visual homepage and short waste-to-value overview
- `/our-story/` — Kibogo purpose, approach and relationships
- `/products/` — product-range overview
- `/products/kibogo/`, `/products/folia/`, `/products/maxim/`, `/products/shambapro/` — product-specific information and enquiry links
- `/impact/` — expanded organic and avocado waste-to-value story
- `/growing-zones/` — ecological-zone approach
- `/kibogo-guides/` — supplied product and soil posters
- `/contact/` — WhatsApp, phone, email and social links

The Vite build emits static files and includes `public/_redirects` for clean-path fallback on Cloudflare Pages. All page content is rendered according to the browser path by `src/site.js`.

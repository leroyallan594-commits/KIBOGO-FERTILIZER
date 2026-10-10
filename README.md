# KIBOGO Organic Fertilizer website

A responsive, enquiry-focused landing page built with vanilla JavaScript, CSS and Vite. No cart or backend form is included.

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

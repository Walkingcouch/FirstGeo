# First Geospatial — website

A static, no-build-step website matching the supplied brand mockup
(`Website_FirstGeo.png`) and logo (`Logo_FirstGeo.jpg`). Plain HTML, CSS and
JavaScript — no framework, no bundler, no npm install required to run it.

## Structure

```
first-geospatial/
├── public/                    ← deploy this folder as-is
│   ├── index.html
│   ├── contact.html           ← contact page with a working form (see below)
│   ├── favicon.png
│   └── assets/
│       ├── css/styles.css     ← one stylesheet, sectioned with comments
│       ├── js/main.js         ← mobile menu, scroll header, nav-spy, video dialog
│       ├── fonts/             ← self-hosted Montserrat, Inter, Lora (woff2)
│       └── img/                ← every image, cropped/derived from the two
│                                 uploaded reference files — nothing generated
├── vercel.json
├── package.json
├── .vscode/
└── README.md
```

## Run it locally

No build step. Any static file server works:

```bash
npm run dev        # serves public/ at http://localhost:3000
```

or just open `public/index.html` directly in a browser, or use the VS Code
"Live Server" extension pointed at `public/`.

## Deploy to Vercel

Project settings → Framework Preset: **Other**. Build command: none.
Output directory: **public**. `vercel.json` is already set up for this;
`vercel --prod` from this folder will work out of the box.

## Brand tokens

All colours and fonts live at the top of `public/assets/css/styles.css`
under `:root`. Do not add colours outside the eight specified in the brief:

| Token       | Hex       | Use                                   |
|-------------|-----------|----------------------------------------|
| `--charcoal`| `#10151B` | Primary background                    |
| `--ocean`   | `#082B45` | Secondary backgrounds                 |
| `--ochre`   | `#DDA66A` | Buttons, headings, highlights         |
| `--red`     | `#B94E29` | Supporting accents                    |
| `--cyan`    | `#159DC7` | Scanning effects, contours, links     |
| `--teal`    | `#248F89` | Secondary technical accents           |
| `--sand`    | `#F5F3EF` | Light backgrounds                     |
| `--slate`   | `#8998A5` | Secondary text                        |
| `--white`   | `#FFFFFF` | Primary text on dark                  |

Fonts: Montserrat (headings/nav/buttons/taglines) and Inter (body), both
self-hosted as variable woff2 files under `assets/fonts/`, so no Google
Fonts request is made at runtime. A Lora italic face is used only for the
pull-quote in the "Our Purpose" section, matching the serif treatment shown
in the mockup (the brief's font list doesn't cover it explicitly).

`--fw-display` in `styles.css` controls the heading weight. The brief's
written spec says 700 (bold); the mockup artwork itself reads closer to a
500–600 weight. It's currently set to `700` to follow the written spec —
change that one variable to `500` if you'd rather match the artwork look.

## Images

Every photo and graphic comes from the two files you supplied
(`Logo_FirstGeo.jpg`, `Website_FirstGeo.png`) — cropped, and in the case of
the hero landscape, retouched to remove the baked-in text/button layer so it
could sit behind real HTML text. No new images were generated. Because the
source mockup is only 870px wide, the derived photos are lower resolution
than production assets would normally be — swap in your original,
full-resolution photography under `assets/img/` when you have it (same
filenames, so no HTML changes needed):

| File | Used for |
|---|---|
| `hero-landscape.jpg` | Hero section background |
| `hero-map.webp` | Dot-painting map of Australia, hero |
| `purpose-landscape.jpg` | "Our Purpose" section background |
| `work-environmental.jpg`, `work-infrastructure.jpg`, `work-land.jpg` | Featured work cards |
| `cta-contours.jpg` | Call-to-action band background texture |
| `logo-mark.webp`, `logo-wordmark.webp` | Header/footer logo |
| `og-image.jpg` | Social share preview image |

## Contact page & form

`public/contact.html` is a dedicated contact page (linked from every "Get in
touch"/"Contact"/"Careers" link across the site, replacing the old `mailto:`
button). It has a proper form — name, email, phone (optional), an enquiry-type
dropdown, and a message field — plus the business email,
**contact@firstgeospatial.com.au**, shown directly on the page and in both
footers as a clickable `mailto:` link.

**The form needs no server of your own.** It posts to
[FormSubmit](https://formsubmit.co), a free relay that forwards submissions
straight to your inbox — no signup, no API key, nothing to deploy. The form's
`action` attribute already points to
`https://formsubmit.co/contact@firstgeospatial.com.au`.

**One-time setup required before it works:** the *first* time the form is
submitted, FormSubmit sends a confirmation email to
`contact@firstgeospatial.com.au` with an "Activate Form" link. Until someone
clicks that link, submissions won't be delivered. So: deploy the site, submit
the form once yourself as a test, then check that inbox and confirm. After
that, every submission goes straight through.

On success, FormSubmit redirects back to `contact.html#sent`, which shows an
inline "message sent" confirmation (see the small script at the bottom of
`contact.html`). The redirect URL is currently hardcoded to
`https://first-geo.vercel.app/contact.html#sent` in a hidden `_next` field —
update that if you move to a custom domain.

If you'd rather not depend on a third party, swap the `<form>`'s `action` for
your own endpoint (e.g. a Vercel serverless function under `/api` that sends
mail via Resend/SendGrid, or another form service like Formspree/Web3Forms).
The rest of the markup and styling won't need to change.

## Known placeholders (marked `TODO` in `index.html`)

- Project card links (`Our Work`) point to `#work` — link to real project pages.
- Social links (LinkedIn/Instagram/YouTube) point to `#` — add your profile URLs.
- The "Get in touch" button in the CTA band uses `mailto:hello@example.com` — replace with your real address or a contact-form URL.
- `assets/video/intro.mp4` doesn't exist yet — the "Watch video" button opens a dialog that shows "Video coming soon" until you add a file there (optionally `assets/video/intro.jpg` as a poster).

## Accessibility & performance notes

- Semantic landmarks (`header`, `nav`, `main`, `footer`), skip link, visible
  focus states, `prefers-reduced-motion` respected.
- Icons are inline SVG symbols (drawn to match the mockup's line-icon style)
  reused via `<use>`, so there's a single icon sprite rather than repeated
  markup.
- Social icons are the real Font Awesome 6 Free glyphs (CC BY 4.0) — see the
  filled paths in `index.html`; licence details in `assets/fonts/`.
- Hero image is `fetchpriority="high"` and preloaded; below-the-fold images
  use `loading="lazy"`.

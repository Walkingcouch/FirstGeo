# Agent instructions — First Geospatial site

This file is for AI coding assistants (Claude in VS Code, local Ollama
models, etc.) working on this repository. Read it before making changes.

## What this project is

A static marketing website (`public/index.html`, `assets/css/styles.css`,
`assets/js/main.js`) built to match a client-supplied design mockup exactly.
There is no build step, no framework, and no bundler — keep it that way
unless the person explicitly asks for one.

## Hard constraints — do not violate these without being asked

1. **Colour palette is fixed.** Only use the eight hex values defined as
   CSS custom properties at the top of `styles.css` (`--charcoal`,
   `--ocean`, `--ochre`, `--red`, `--cyan`, `--teal`, `--sand`, `--slate`,
   `--white`). Do not introduce new colours, tints, or gradients that use
   colours outside this set, even for hover/focus states.
2. **Typefaces are fixed.** Montserrat for headings/nav/buttons/taglines,
   Inter for body text, both self-hosted under `assets/fonts/` — don't add
   a Google Fonts `<link>` or swap in a different family. The one exception
   already in the codebase is Lora italic, used only for the pull-quote.
3. **Don't regenerate or replace the images** in `assets/img/` with AI-
   generated art unless asked. They were deliberately cropped from the
   client's own reference files rather than generated, to keep the actual
   brand artwork. If you need a new image (e.g. a new project card), ask
   the person for the source photo rather than inventing one.
4. **Layout is modelled on a real mockup**, `Website_FirstGeo.png` (not
   included in this deployable folder — it lives with the original chat
   upload). Section order, proportions and copy were measured against it.
   If you're asked to adjust spacing/sizing, keep changes proportional
   (the CSS uses `clamp()` and `vw` units deliberately so the layout scales
   correctly between mobile and large desktop) rather than switching to
   fixed pixel values.
5. **No build tooling.** Don't add webpack/vite/npm build scripts that
   compile `styles.css` or `main.js` — they're meant to be readable and
   editable directly. `package.json`'s only job is a local dev server.

## Contact form — don't break the FormSubmit wiring

`public/contact.html` posts to `https://formsubmit.co/contact@firstgeospatial.com.au`
(no backend of our own). If you change the form, keep the hidden `_subject`,
`_template`, `_next` and `_honey` (honeypot) fields intact, and keep `_next`
pointing at an absolute URL ending in `/contact.html#sent` — that's what
triggers the inline "message sent" confirmation via the small script at the
bottom of the page. See `README.md`'s "Contact page & form" section for the
one-time activation step this depends on.

## Where things live

- All copy, structure and section IDs: `public/index.html`.
- All styling, organised into ten numbered sections with a comment banner
  at the top of the file listing them: `public/assets/css/styles.css`.
- All interactivity (mobile menu, scroll-aware header, active-nav
  highlighting via `IntersectionObserver`, the "Watch video" `<dialog>`):
  `public/assets/js/main.js`. It's one IIFE, framework-free.
- Icons are inline `<symbol>` definitions in an SVG sprite near the top of
  `index.html`'s `<body>`, referenced elsewhere with `<use href="#i-name">`.
  Add new icons the same way rather than pulling in an icon library.

## Before committing a change

- Check the page still has no console errors and no failed network
  requests (broken image/font paths are the most common regression).
- Re-check both a desktop width (~1440px) and a narrow mobile width
  (~390px) — the mobile styles live in the `@media (max-width: 1023px)`
  block near the bottom of `styles.css`, and it's easy to fix desktop while
  quietly breaking mobile (or vice versa).
- Respect `prefers-reduced-motion` — any new animation needs a reduced-
  motion fallback, following the existing pattern at the bottom of the
  hero section's CSS and in the global `@media (prefers-reduced-motion:
  reduce)` block.
- Leave `TODO` comments (see `README.md`'s "Known placeholders" section)
  alone unless you're the one filling them in with real data — don't
  silently invent a contact email, social URL or project link.

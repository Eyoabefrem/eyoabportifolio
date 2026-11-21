# Eyoab Tessera: Portfolio

A personal portfolio for **Eyoab Efrem Tessera**, a full-stack and AI developer based in Addis Ababa, Ethiopia. It shows 16 projects across apps, AI tools, Web3, operations systems and design, and it is built to be explored rather than scrolled past.

**Live site:** [(https://eyoabportifolio.vercel.app/)](https://eyoabportifolio.vercel.app/)
**GitHub:** [github.com/Eyoabefrem](https://github.com/Eyoabefrem) · **LinkedIn:** [linkedin.com/in/eyoabtessera](https://linkedin.com/in/eyoabtessera)

<!-- Add a screenshot: save it as docs/preview.png and uncomment the line below -->
<!-- ![Portfolio preview](docs/preview.png) -->

---

## Highlights

- **Swiss grid design.** A visible 12-column structure, huge flush-left type, hairline rules and one accent color. Press `G` (or the Grid button) to show the column guides.
- **Animated loader.** The grid lines draw down the screen and a spinning ET* mark appears before the page reveals itself.
- **Swipe deck in the hero.** Project covers are stacked like cards. Drag or flick the top card to send it to the back, or tap it to open the project. It advances by itself every few seconds and pauses when you touch it.
- **Prompt chips that control the deck.** Chips such as "Any Web3?" reshuffle the deck to matching projects and generate a one-line answer from the real project data.
- **Work index with a color flood.** Hovering a project turns the whole section into that project's brand colors, with a cover preview following the cursor. Filters narrow the list by category.
- **Project sheets.** Each project opens a detail view with role, highlights, stack, status tag, and live and code links.
- **Toolkit marquee and logo grid.** Technology logos load from Simple Icons.
- **Light and dark themes**, a scroll progress bar, count-up stats, and a copy-email button.
- **Built for phones.** A dedicated menu, a bottom-sheet project view, larger tap targets, and a 4-column guide overlay on small screens.
- **Accessible by default.** Keyboard navigation (arrow keys on the deck, Esc to close sheets), visible focus outlines, and reduced-motion support that turns off the loader, autoplay and animations.

---

## Tech stack

| Area | Choice |
| --- | --- |
| Build tool | Vite 5 |
| UI | React 18 |
| Animation | Framer Motion 11 |
| Styling | Plain CSS with design tokens (CSS variables) |
| Fonts | Archivo (variable width and weight) and IBM Plex Mono, via Google Fonts |
| Logos | [Simple Icons](https://simpleicons.org) CDN |
| Hosting | Static site, deployed on Vercel |

There is no backend and no environment variables.

---

## Getting started

Requires Node.js 18 or newer.

```bash
npm install
npm run dev        # local dev server, usually http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build locally
```

---

## Project structure

```
.
├── index.html            # Page title, description, fonts, favicon link
├── vercel.json           # Rewrites all routes to index.html
├── .gitignore            # Keeps node_modules, dist and .env out of Git
├── public/
│   ├── favicon.svg       # ET* tab icon
│   ├── me.png            # Portrait used in the About section
│   └── shots/            # Project screenshots (referenced from data.js)
└── src/
    ├── main.jsx          # React entry point
    ├── App.jsx           # All sections and interactive components
    ├── data.js           # All content: projects, links, text, skills
    └── index.css         # Design tokens, layout, responsive rules
```

---

## Editing the content

Almost everything you will want to change lives in **`src/data.js`**.

### Links and site text

- `links`: email, LinkedIn, GitHub and CV.
- `site`: name, typed hero words, hero sentence, contact headline, clock time zone, and footer text.
- `asks`: the prompt chips in the hero, as `[label, category]` pairs. Their answers are generated from `projects`, so they stay correct as you add work.
- `about`: photo path and the About paragraphs.
- `experience`, `certs` and `skills`: the Path section. Each skill is `[name, simple-icons-slug]`. If a logo does not appear, check the slug on simpleicons.org.

### Adding a project

Add an object to the `projects` array. The first projects in the list appear first in the hero deck.

```js
{
  id: 'my-project',                       // unique, lowercase
  name: 'My Project',
  cats: ['build', 'ai'],                  // build | ai | web3 | ops | design
  year: 2026,
  c: ['#0a0a0a', '#ff5a36'],              // [background, text], from the project's brand
  role: 'Design and full-stack',
  blurb: 'One sentence on what it is.',
  points: ['What you built.', 'A result or detail.'],
  stack: ['React', 'Supabase'],
  status: 'Free tier',                    // optional tag shown on the project sheet
  live: 'https://…',                      // use '' or omit to hide the button
  repo: 'https://…',                      // use '' or omit to hide the button
  img: '/shots/my-project.png'            // leave '' for a colored placeholder
}
```

Screenshots work best at a 16:10 ratio. Put them in `public/shots/`.

### Colors and fonts

- Colors and spacing tokens are at the top of `src/index.css` (`:root` for dark, `:root[data-theme=light]` for light).
- Fonts are loaded in `index.html` and set in `src/index.css`.

### Timing

- Loader length: the `2300` timeout and the line delays in the `Loader` component in `App.jsx`.
- Deck autoplay: the `3500` interval and the `6000` pause after a touch in the `Stack` component.

---

## Deployment

### Vercel (recommended)

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Use these settings:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`

Do not commit `node_modules`. The included `.gitignore` prevents that, and uploading it breaks the Vercel build with a "Permission denied" error.

### Netlify or any static host

Run `npm run build` and upload the `dist/` folder. If the host does not follow `vercel.json`, add a rule that sends all routes to `index.html`.

---

## Before you publish

- [ ] Replace placeholder links (`#`) in `data.js`, or set them to `''` to hide the button.
- [ ] Make sure shared Google Drive, Notion and Airtable links are view-only and contain nothing private. Prefer read-only share links over personal invite links.
- [ ] Add a social preview image so shared links look good. Save a 1200×630 image as `public/og.png`, then add the following inside `<head>` in `index.html` using your real domain:
  ```html
  <meta property="og:title" content="Eyoab Tessera, builds and systems"/>
  <meta property="og:description" content="Full-stack and AI developer in Addis Ababa."/>
  <meta property="og:image" content="https://YOUR-DOMAIN.com/og.png"/>
  <meta property="og:url" content="https://YOUR-DOMAIN.com"/>
  <meta name="twitter:card" content="summary_large_image"/>
  ```
- [ ] Compress screenshots (WebP or well-optimized PNG) so the site loads quickly on mobile data.

---

## Browser support

Current versions of Chrome, Edge, Firefox and Safari, on desktop, Android and iOS. Technology logos need a network connection to load, and if one fails the name still displays.

---

## Roadmap ideas

- Screenshot gallery and code or diagram snippets in project sheets, with next and previous arrows and shareable links to each project.
- Case studies for flagship projects.
- A contact form.
- An "available for work" badge.
- Analytics to see which projects are opened.

---

## License

© 2026 Eyoab Efrem Tessera. All rights reserved. Change this section if you prefer an open-source license.
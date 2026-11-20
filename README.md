# Eyoab Tessera — Personal Portfolio

[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

A high-performance, responsive personal portfolio website showcasing full-stack applications, AI assistants, Web3 experiences, and operations systems. Built with an editorial design philosophy, custom spring animations, and zero heavy component libraries.

---

## 🌐 Live Demo & Contact

- **Live Site:** [eyoab-portfolio.vercel.app](https://eyoab-portfolio.vercel.app) *(or your deployed Vercel/Netlify URL)*
- **GitHub:** [@Eyoabefrem](https://github.com/Eyoabefrem)
- **LinkedIn:** [linkedin.com/in/eyoabtessera](https://linkedin.com/in/eyoabtessera)
- **Email:** [eyoabefrem9@gmail.com](mailto:eyoabefrem9@gmail.com)
- **Resume / CV:** [View on Google Drive](https://drive.google.com/file/d/1Jjg53yYtIe177JpBYqV50flFownsOS6D/view?usp=sharing)

---

## ⚡ Highlights & Key Features

- **Editorial Swiss Design Aesthetic:** Modern typographic hierarchy pairing **Archivo** (variable weight & width) with **IBM Plex Mono**, structured over a dynamic 12-column responsive layout.
- **Ambient Project Previews:** Hovering over project rows dynamically shifts page background and text colors to match each project's brand identity.
- **Physics-Driven 3D Tilt Deck:** Interactive card deck reacting in real-time to pointer coordinates using spring interpolation (`useMotionValue` + `useSpring`).
- **Interactive "Ask the Portfolio" Assistant:** Prompt-based quick filters allowing recruiters and visitors to jump directly into AI, Web3, Ops, or App showcases.
- **Comprehensive Project Modal System:** In-depth view for every project featuring key bullet points, architecture highlights, live preview links, and source repositories.
- **Inspection Grid Mode:** Press <kbd>G</kbd> on your keyboard (or click the **Grid** button in the navbar) to toggle an overlay of the underlying 12-column design grid.
- **Accessible & Performance-Minded:**
  - Full support for `prefers-reduced-motion` to bypass intro sequences for users with motion sensitivity.
  - Live Addis Ababa clock (`Africa/Addis_Ababa` time zone).
  - Infinite logo marquee powered by simple-icons.
  - Light and Dark mode toggle with persistent state.

---

## 🛠️ Tech Stack

### Core
- **Framework:** [React 18](https://react.dev/)
- **Build Tool:** [Vite 5](https://vitejs.dev/)
- **Animation:** [Framer Motion 11](https://www.framer.com/motion/)
- **Styling:** Vanilla CSS3 with CSS Custom Properties & 12-Column CSS Grid
- **Typography:** Archivo & IBM Plex Mono via Google Fonts
- **Deployment:** [Vercel](https://vercel.com/) (configured with client-side routing rewrites)

---

## 📂 Project Structure

```text
eyoab-portfolio/
├── public/
│   ├── favicon.svg          # Custom SVG favicon
│   ├── me.png               # Profile / About photograph
│   └── shots/               # Project screenshots and preview mockups
│       ├── gebere.png
│       ├── pause.png
│       ├── patchnote.png
│       ├── arena.jfif
│       ├── gamut.png
│       └── ...
├── src/
│   ├── App.jsx              # Main application shell & interactive components
│   ├── data.js              # Central data store (projects, bio, skills, links)
│   ├── index.css            # Design system tokens, typography, grid & animations
│   └── main.jsx             # React DOM entrypoint
├── index.html               # HTML5 shell & Google Fonts preconnects
├── package.json             # Scripts & dependency definitions
├── vercel.json              # SPA rewrite rules for Vercel deployment
└── vite.config.js           # Vite plugin configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18.0.0 or higher) and **npm** installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Eyoabefrem/eyoab-portfolio.git
   cd eyoab-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📜 Available Scripts

| Script | Command | Purpose |
| :--- | :--- | :--- |
| **Development** | `npm run dev` | Runs the local Vite dev server with Hot Module Replacement (HMR). |
| **Production Build** | `npm run build` | Compiles and optimizes assets into the `dist/` directory. |
| **Preview** | `npm run preview` | Locally serves the production build from `dist/` for verification. |

---

## 🎨 Customization & Data Management

All content is cleanly decoupled from presentation logic in `src/data.js`. You can customize the entire portfolio by modifying that single file:

### 1. Contact Links & Socials
Update the `links` object in `src/data.js`:
```javascript
export const links = {
  email: 'your-email@example.com',
  linkedin: 'https://linkedin.com/in/your-handle',
  github: 'https://github.com/your-username',
  cv: 'https://link-to-your-resume'
};
```

### 2. Adding / Modifying Projects
Add project records to `projects` array in `src/data.js`:
```javascript
{
  id: 'project-slug',
  name: 'Project Name',
  cats: ['build', 'ai'], // Categories: 'all' | 'build' | 'ai' | 'web3' | 'ops' | 'design'
  year: 2026,
  c: ['#0a0a0a', '#ff5a36'], // [Background Color, Accent / Text Color]
  role: 'Full-stack Developer',
  blurb: 'Short summary of the problem and solution.',
  points: [
    'Key technical feature or architecture detail.',
    'Metrics, benchmarks, or delivery highlights.'
  ],
  stack: ['React', 'FastAPI', 'PostgreSQL'],
  status: 'Live', // Optional status pill (e.g., 'Free tier', 'Mock mode')
  live: 'https://your-project.vercel.app', // Leave empty string if no live demo
  repo: 'https://github.com/your-username/project-repo', // Leave empty string if private
  img: '/shots/project-screenshot.png' // Place images in public/shots/
}
```

### 3. Career Timeline & Toolkit
- **Experience:** Edit `export const experience = [...]` with roles, companies, dates, and summaries.
- **Skills:** Add or rearrange skills in `export const skills = [...]` using `[DisplayName, SimpleIconsSlug]`.
- **Bio & Photo:** Update `export const about = { img: '/me.png', text: [...] }`.

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)
1. Push your code to a GitHub repository.
2. Import the project into [Vercel](https://vercel.com/).
3. Framework preset will automatically detect **Vite**.
4. The included [`vercel.json`](vercel.json) automatically routes all requests to `index.html`.

### Deploy to Netlify
1. Connect your repository to [Netlify](https://www.netlify.com/).
2. Set Build Command to `npm run build` and Publish Directory to `dist`.
3. Add a `_redirects` file with `/*  /index.html  200` for SPA history fallback.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
Feel free to fork, customize, and make it your own!

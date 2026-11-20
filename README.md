# Eyoab Tessera portfolio
Vite + React 18 + Framer Motion. No backend.
## Run
    npm install
    npm run dev
## Build and deploy
    npm run build      # output in dist/
Push to GitHub and import into Vercel (vercel.json is included), or drag dist/ into Netlify.
## Edit
Everything you will change is in `src/data.js`: links, projects, screenshots (`img`), experience, skills.
Put screenshots in `public/shots/` and set `img:'/shots/name.png'`. Empty `live`/`repo` hides that button.
Colors and fonts: top of `src/index.css` and the Google Fonts link in `index.html`.

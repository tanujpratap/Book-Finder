# Book Finder

A small React app (Vite + Tailwind) that searches the Open Library API and displays book results with covers, pagination.

## Features added
- Favorites (save/remove books to localStorage)
- Deployment configs for Vercel and Netlify

## Local setup

1. Node 18+ recommended.
2. Install dependencies

```bash
npm install
```

3. Start the dev server

```bash
npm run dev
```

Open http://localhost:5173 (or address printed by Vite).

## Deploy
- Vercel: Connect the repo, build command `npm run build`, output `dist/`.
- Netlify: Connect the repo, build command `npm run build`, publish `dist/`.

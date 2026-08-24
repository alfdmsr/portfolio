# ALMAS.SYS — Portfolio Website

Portfolio pribadi bergaya **terminal/HUD cyberpunk** (React + Vite + Tailwind CSS v4), menampilkan project-project Machine Learning & Software Engineering.

## 🛠️ Tech Stack

- **React 19** + **Vite** — build tool cepat
- **Tailwind CSS v4** — styling (konfigurasi via `@theme` di `src/index.css`, bukan `tailwind.config.js`)
- **JetBrains Mono** (Google Fonts) — font monospace di seluruh halaman

## 📂 Struktur Project

```
portfolio/
├── src/
│   ├── components/       # Semua komponen UI (Hero, Navbar, ProjectCard, dll.)
│   ├── data/
│   │   ├── projects.js   # Data project — EDIT DI SINI untuk tambah/ubah project
│   │   └── skills.js     # Data skill — EDIT DI SINI untuk ubah skill
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css         # Design token (warna, font, animasi) via @theme
├── public/
│   └── favicon.svg
└── index.html
```

## ✏️ Cara Mengedit Konten

- **Tambah/ubah project** → edit `src/data/projects.js`
- **Ubah skill/kemampuan** → edit `src/data/skills.js`
- **Ubah info kontak** → edit `src/components/Contact.jsx` (bagian `CHANNELS`)
- **Ubah warna tema** → edit variabel `--color-*` di `src/index.css` bagian `@theme`

## ▶️ Menjalankan Secara Lokal

```sh
npm install
npm run dev
```

Buka `http://localhost:5173`.

## 📦 Build untuk Production

```sh
npm run build
```

Hasil build ada di folder `dist/`.

## 🚀 Deploy ke Vercel / Netlify

### Vercel
1. Push project ini ke repository GitHub.
2. Buka vercel.com -> Add New Project -> pilih repo ini.
3. Vercel otomatis mendeteksi framework Vite -- biarkan setting default, klik Deploy.

### Netlify
1. Push project ini ke repository GitHub.
2. Buka netlify.com -> Add new site -> Import an existing project.
3. Build command: `npm run build`, Publish directory: `dist`.
4. Klik Deploy site.

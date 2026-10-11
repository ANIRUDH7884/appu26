# Our Anniversary Website

A romantic, interactive anniversary site: sealed-envelope intro, live "together for" counter,
scroll-drawn timeline, photo gallery with lightbox, a jar of love notes, a typed love letter,
falling petals, heart trail, and a countdown to the next anniversary.

Pure HTML, CSS and JavaScript. No build step, no dependencies.

## Folder structure

```
anniversary-website/
├── index.html
├── vercel.json
├── css/style.css
├── js/script.js      <- edit names, date, story, notes and letter at the top
├── photos/           <- cover.jpg, photo1.jpg ... photo9.jpg
└── music/            <- song.mp3 (optional)
```

## Make it yours (2 minutes)

1. Open `js/script.js`. Edit the `CONFIG` block at the very top: names, start date, story, reasons, letter.
2. Drop your photos into `photos/` using the names in `photos/README.txt`.
3. (Optional) add `music/song.mp3`.
4. Test locally: open `index.html` in your browser, or run `npx serve` in this folder.

## Deploy on Vercel

**Option A: Vercel CLI (fastest)**
1. Inside this folder run: `npx vercel` and press Enter at every question.
2. For the final live link run: `npx vercel --prod`

**Option B: GitHub**
1. Push this folder to a GitHub repository.
2. On vercel.com choose Add New > Project, import the repository.
3. Framework Preset: **Other**. Leave Build Command and Output Directory empty. Click Deploy.

Because `index.html` is in the project root, no extra settings are needed.

## Troubleshooting

- A photo does not show: check the file name is lowercase and exactly matches (Vercel is case-sensitive).
- No music: the file must be at `music/song.mp3`. Music begins after the first tap on the seal.
- Change the heart-trail or petal look: see the "Canvas" section in `js/script.js`.

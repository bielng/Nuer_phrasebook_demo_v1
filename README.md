# Nuer Phrasebook

A simple React (Vite) website for browsing the Nuer (Thok Naath) dictionary —
search, filter by word category and dialect, a built-in Thok Naath keyboard
for typing special characters, and pronunciation audio playback.

Trimmed down from the original Nuer AI Studio project: no machine
translation, TTS, LLM chat, or ASR — just the phrasebook, blog, and
about/team pages.

## Run locally

**Prerequisites:** Node.js 18+

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Adding audio

Drop your `.mp3` recordings into `public/audio/`, matching the filenames
already listed in `src/data/entries.json` (e.g. `ID1_nom_sg_02.mp3`). See
`public/audio/README.md` for details. Entries without an audio file simply
won't show a speaker button — nothing else to configure.

## Updating dictionary content

All 401 entries live in `src/data/entries.json`. Add, edit, or remove
entries there and the phrasebook (search, filters, cards) updates
automatically — no other code changes required.

## Build for production

```bash
npm run build
npm run preview
```

`dist/` is the static build you can deploy anywhere (Vercel, Netlify, GitHub
Pages, etc.) — just make sure `public/audio/` ships alongside it.

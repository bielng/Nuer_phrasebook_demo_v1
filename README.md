# Nuer Phrasebook

A React (Vite) website for the Nuer (Thok Naath) language project —
a searchable dictionary (filter by word category and dialect, a built-in
Thok Naath keyboard for typing special characters, pronunciation audio
playback), an English ⇄ Nuer machine translator, plus blog and
about/team pages.

## Translator

The **Translate** tab calls the `dayomtechnologies/English_to_Nuer_Translator`
Hugging Face Space (a fine-tuned NLLB-600M model) via `@gradio/client`. See
`src/services/translate.js` for the request logic and
`src/components/TranslatorView.jsx` for the UI. No API key is needed since
Gradio Spaces are called directly from the browser — just note that a
sleeping Space can take 30–90s to spin back up on the first request.

## Run locally

**Prerequisites:** Node.js 18+

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Adding audio

Drop the `.mp3` recordings into `public/audio/`, matching the filenames
already listed in `src/data/entries.json` (e.g. `ID1_nom_sg_02.mp3`). See
`public/audio/README.md` for details. Entries without an audio file simply
won't show a speaker button — nothing else to configure.

## Updating dictionary content

All 401 entries live in `src/data/entries.json`. Add, edit, or remove
entries there and the phrasebook (search, filters, cards) updates
automatically — no other code changes required.


## Data source and citation

The Nuer Lexicon data used in this project is based on the work of the Nuer Lexicon project, developed as part of an Arts and Humanities Research Council (AHRC) funded research project investigating the wordforms of the Nuer language.

The project was a collaboration between researchers at the University of Surrey and the University of Edinburgh and was hosted by the Surrey Morphology Group. The project team included Matthew Baerman, Oliver Bond, Irina Monich, Tatiana Reid, and Bert Remijsen, with contributions from Nuer speakers in South Sudan, Kenya, the UK, and the USA.

Please cite the original resource as:

> Bond, Oliver, Tatiana Reid, Irina Monich and Matthew Baerman. 2020. *Nuer Lexicon*. Available at: https://www.nuerlexicon.com

This project extends the availability of Nuer language resources by providing an interactive Nuer (Thok Naath) phrasebook with searchable entries, dialect filtering, pronunciation support, and audio playback.

## Build for production

```bash
npm run build
npm run preview
```

`dist/` is the static build you can deploy anywhere (Vercel, Netlify, GitHub
Pages, etc.) — just make sure `public/audio/` ships alongside it.


## License

### Software License

The source code of this project is licensed under the MIT License.

Copyright (c) 2026 Dayom Technologies

See the [LICENSE](LICENSE.md) file for the full license text.

# Audio files go here

Drop your recorded `.mp3` clips into this folder. Filenames must match exactly
what's listed in `src/data/entries.json` under each entry's `audio_files`
field, for example:

```
public/audio/ID1_nom_sg_02.mp3
public/audio/ID1_nom_pl_02.mp3
```

The app looks for files at `/audio/<filename>`, which Vite serves directly
from this `public/audio/` folder. Words that don't have a listed audio file simply won't show a
speaker button.

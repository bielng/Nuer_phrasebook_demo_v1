import React, { useMemo, useRef, useState, useCallback } from "react";
import {
  Search,
  Copy,
  Check,
  Keyboard,
  X,
  BookOpen,
  Users,
  FileText,
  Sparkles,
  MapPin,
  CornerDownLeft,
  Delete,
  ChevronDown,
  ArrowRight,
  Volume2,
  VolumeX,
} from "lucide-react";
import RAW_ENTRIES from "./data/entries.json";
import TranslatorView from "./components/TranslatorView";
import ChatView from "./components/ChatView";
import VoiceView from "./components/VoiceView";
import TTSView from "./components/TTSView";
import Dock from "./components/Dock";
import ArticleModal from "./components/ArticleModal";

// --- Full 401-entry Nuer (Thok Naath) dictionary dataset ---

const POS_TO_CATEGORY = {
  noun: "Noun",
  "prop. noun": "Noun",
  "loc. noun": "Noun",
  "tr. verb": "Verb",
  "intr. verb": "Verb",
  "adj. verb": "Verb",
  gerund: "Verb",
  "pron.": "Pronoun",
  "dem. pron.": "Pronoun",
  "num.": "Number",
  "num. classifier": "Number",
  adverb: "Adverb",
  "cop.": "Other",
  "exclam.": "Other",
};
const toCategory = (pos) => (pos ? (POS_TO_CATEGORY[pos] ?? "Other") : "Other");

const DICTIONARY = RAW_ENTRIES.map((e) => ({
  id: e.id,
  nuer: e.nuer,
  ipa: e.ipa,
  partOfSpeech: e.part_of_speech,
  category: toCategory(e.part_of_speech),
  pluralInfo: e.plural_info,
  senses: e.senses ?? [],
  senseInfo: e.sense_info,
  examples: e.examples ?? [],
  audioFiles: e.audio_files ?? [],
  dialect: e.dialect,
}));

const WORD_CATEGORIES = [
  "Noun",
  "Verb",
  "Pronoun",
  "Number",
  "Adverb",
  "Other",
];
const DIALECTS = Array.from(
  new Set(DICTIONARY.map((e) => e.dialect).filter(Boolean)),
).sort();

// Samsung-style Nuer (Thok Naath) keyboard layout
const NUER_KEYBOARD_ROWS = [
  ["ŋ", "w", "e", "e̠", "ë", "r", "t", "y", "u", "i", "i̠", "o", "p"],
  ["a", "a̠", "ä", "ɛ", "ɛ̈", "ɛ̱", "d", "ɣ", "g", "h", "j", "k", "l"],
  ["ɔ", "ɔ̱", "c", "b", "n", "o̱", "ö", "m"],
];

const TEAM_MEMBERS = [
  {
    id: "t1",
    name: "Taban",
    role: "CO-FOUNDER & DATA SCIENTIST",
    bio: "Visionary leader driving the intersection of AI, Nuer language technology, and community development.",
  },
  {
    id: "t2",
    name: "Gatmach",
    role: "CO-FOUNDER & MACHINE LEARNING ENGINEER",
    bio: "Co-founder leading machine learning engineering, model training, and Nuer language model architectures.",
  },
  {
    id: "t3",
    name: "Bhang",
    role: "CO-FOUNDER & FOUNDING SOFTWARE ENGINEER",
    bio: "Co-founder and founding software engineer building platform infrastructure, APIs, and interfaces.",
  },
  {
    id: "t4",
    name: "Luka",
    role: "CO-FOUNDER & LANGUAGE / NLP EXPERT",
    bio: "Co-founder, writer, language expert, and NLP specialist preserving Nuer linguistic accuracy and cultural nuance.",
  },
];

const BLOG_POSTS = [
  {
    id: "b1",
    tag: "MODEL RELEASE",
    date: "July 2026",
    readTime: "4 min read",
    title:
      "Announcing dayomtechnologies/nllb-600m-english-nuer on Hugging Face",
    summary:
      "We are open-sourcing our bidirectional NLLB-600M English–Nuer (Thok Naath) neural translation model.",
    authors: "By Gatmach & Taban",
    content: `
At Dayom AI, our mission is to harness state-of-the-art Natural Language Processing to preserve and digitize Indigenous East African languages. Today marks a major milestone: we are open-sourcing our fine-tuned bidirectional NLLB-600M translation model for English ↔ Nuer (Thok Naath).

### Why Thok Naath Matters
Nuer is spoken by millions of people across South Sudan, Western Ethiopia, and the global diaspora. Despite its rich oral heritage and linguistic depth, digital language tools for Nuer have historically been non-existent.

### Model Architecture & Training Data
- Base Architecture: Meta's No Language Left Behind (NLLB-600M).
- Corpus: Parallel sentence pairs collected and verified with native speakers.
- Goal: Bring real digital translation access to a language long left out of NLP tooling.

### Open Access on Hugging Face
The model weights are freely available at \`dayomtechnologies/nllb-600m-english-nuer\`. Developers and researchers can integrate our translation engine into web, mobile, and humanitarian applications worldwide.
    `,
  },
  {
    id: "b2",
    tag: "LANGUAGE PRESERVATION",
    date: "June 2026",
    readTime: "5 min read",
    title:
      "Preserving Thok Naath: Digital Datasets & Community Pipelines in Juba",
    summary:
      "How Dayom AI is building native parallel corpora, proverb collections, and audio datasets with elders and linguists in South Sudan.",
    authors: "By Bhang & Luka",
    content: `
Building AI for low-resource languages requires much more than scraping the web — it requires active ground-level community partnership.

### Community-Centric Data Collection
We work alongside community members, storytellers, and language contributors to gather oral phrases, proverbs, and modern domain terminology in both Nuer and Dinka.

### Overcoming Dialectal Nuances
Nuer exhibits rich dialectal variations across regions. Our approach builds a standardized phonetic alignment layer that preserves local dialectal beauty while providing consistent orthographic representations for AI model training.
    `,
  },
  {
    id: "b3",
    tag: "VOICE SYNTHESIS",
    date: "May 2026",
    readTime: "6 min read",
    title:
      "Challenges in Tonality & Phonetics for East African Nilotic Speech Models",
    summary:
      "Architecting models capable of capturing Nuer vowel length and breathy phonation.",
    authors: "By Gatmach",
    content: `
Nuer features a complex phonological system involving contrastive vowel length, tonality, and breathy versus voiced vowel quality. Conventional Text-To-Speech (TTS) pipelines trained on Indo-European languages struggle to reproduce these subtle linguistic markers.

### Building on Meta's MMS
Rather than training from zero, we adapted Meta's Massively Multilingual Speech (MMS) VITS-based checkpoint for Nuer, tuning it to better reflect the breathy vowels (ä, ë, ï, ö) native speakers rely on for meaning.

### What's Next
Our next step is extending this synthesis work to Dinka and integrating it directly into a real-time chat experience.
    `,
  },
];

// ---------------- Audio playback hook ----------------
// Drop your recorded clips into /public/audio/ using the same filenames
// referenced in src/data/entries.json (e.g. audio/ID1_nom_sg_02.mp3).
function useAudioPlayer() {
  const audioRef = useRef(null);
  const [playingPath, setPlayingPath] = useState(null);
  const [missingPath, setMissingPath] = useState(null);

  const play = useCallback((path) => {
    if (!path) return;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    const audio = new Audio(`/${path}`);
    audioRef.current = audio;
    setMissingPath(null);
    setPlayingPath(path);
    audio.play().catch(() => {
      setPlayingPath(null);
      setMissingPath(path);
    });
    audio.onended = () => setPlayingPath(null);
    audio.onerror = () => {
      setPlayingPath(null);
      setMissingPath(path);
    };
  }, []);

  return { play, playingPath, missingPath };
}

function AudioButton({ path, playingPath, missingPath, onPlay, size = "md" }) {
  if (!path) return null;
  const isPlaying = playingPath === path;
  const isMissing = missingPath === path;
  const dim = size === "sm" ? "p-1.5" : "p-2.5 sm:p-3";
  const icon = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4 sm:w-4.5 sm:h-4.5";
  return (
    <button
      type='button'
      onClick={() => onPlay(path)}
      title={
        isMissing
          ? "Audio file not found yet — add it to public/audio/"
          : "Play pronunciation"
      }
      className={`shrink-0 rounded-full border transition-all cursor-pointer ${dim} ${
        isMissing
          ? "bg-[#F1E7D4] border-[#E3D2B0] text-[#C9BCA3]"
          : isPlaying
            ? "bg-[#BD5A26] border-[#BD5A26] text-white"
            : "bg-[#EDE0C4] border-[#DFC9A4] text-[#9C5A22] hover:bg-[#E4D2A9]"
      }`}
    >
      {isMissing ? <VolumeX className={icon} /> : <Volume2 className={icon} />}
    </button>
  );
}

// ---------------- Nuer Keyboard ----------------
function NuerKeyboard({ onKeyPress, onBackspace, onSpace, onEnter, onClose }) {
  const holdFocus = (e) => e.preventDefault();
  const [rowFirst, rowSecond, rowThird] = NUER_KEYBOARD_ROWS;
  const KEY_BASE =
    "flex items-center justify-center select-none cursor-pointer rounded-lg sm:rounded-xl bg-[#FFFCF6] border border-[#DFC9A4] text-[#3A332C] shadow-sm text-[13px] sm:text-base font-normal h-9 sm:h-11 active:scale-90 active:bg-[#EDE0C4] active:border-[#BD5A26]/40 transition-transform duration-75";

  return (
    <div className='w-full bg-[#EDE0C4]/90 backdrop-blur-md border border-[#D9C098] rounded-2xl sm:rounded-3xl p-2 sm:p-3 shadow-lg animate-[fadeIn_0.2s_ease-out]'>
      <div className='flex items-center justify-between px-1.5 pb-1.5 sm:pb-2'>
        <span className='text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#9C5A22]'>
          Thok Naath Keyboard
        </span>
        <button
          onMouseDown={holdFocus}
          onClick={onClose}
          className='p-1 rounded-full text-[#8A7D68] hover:text-[#3A332C] hover:bg-[#E4D2A9] transition-colors cursor-pointer'
        >
          <ChevronDown className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
        </button>
      </div>
      <div className='flex gap-1 sm:gap-1.5 mb-1 sm:mb-1.5'>
        {rowFirst.map((k) => (
          <button
            key={k}
            onMouseDown={holdFocus}
            onClick={() => onKeyPress(k)}
            className={`${KEY_BASE} flex-1 min-w-0`}
          >
            {k}
          </button>
        ))}
      </div>
      <div className='flex gap-1 sm:gap-1.5 mb-1 sm:mb-1.5 px-2 sm:px-3'>
        {rowSecond.map((k) => (
          <button
            key={k}
            onMouseDown={holdFocus}
            onClick={() => onKeyPress(k)}
            className={`${KEY_BASE} flex-1 min-w-0`}
          >
            {k}
          </button>
        ))}
      </div>
      <div className='flex gap-1 sm:gap-1.5 mb-1 sm:mb-1.5'>
        <button
          onMouseDown={holdFocus}
          onClick={onEnter}
          className={`${KEY_BASE} basis-[13%] bg-[#EDE0C4] text-[#9C5A22]`}
        >
          <CornerDownLeft className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
        </button>
        {rowThird.map((k) => (
          <button
            key={k}
            onMouseDown={holdFocus}
            onClick={() => onKeyPress(k)}
            className={`${KEY_BASE} flex-1 min-w-0`}
          >
            {k}
          </button>
        ))}
        <button
          onMouseDown={holdFocus}
          onClick={onBackspace}
          className={`${KEY_BASE} basis-[13%] bg-[#EDE0C4] text-[#9C5A22]`}
        >
          <Delete className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
        </button>
      </div>
      <div className='flex gap-1 sm:gap-1.5'>
        <button
          onMouseDown={holdFocus}
          onClick={onSpace}
          className={`${KEY_BASE} flex-1 text-[11px] sm:text-xs font-medium tracking-wide text-[#8A7D68]`}
        >
          Thok Naath
        </button>
      </div>
    </div>
  );
}

// ---------------- Phrasebook View ----------------
function PhrasebookView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDialect, setSelectedDialect] = useState("All");
  const [copiedId, setCopiedId] = useState(null);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const inputRef = useRef(null);
  const { play, playingPath, missingPath } = useAudioPlayer();

  const categories = ["All", ...WORD_CATEGORIES];

  const filteredEntries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return DICTIONARY.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesDialect =
        selectedDialect === "All" || item.dialect === selectedDialect;
      if (!q) return matchesCategory && matchesDialect;
      const matchesSearch =
        item.nuer.toLowerCase().includes(q) ||
        (item.ipa ?? "").toLowerCase().includes(q) ||
        item.senses.some((s) => s.toLowerCase().includes(q)) ||
        item.examples.some(
          (ex) =>
            ex.nuer.toLowerCase().includes(q) ||
            ex.english.toLowerCase().includes(q),
        );
      return matchesCategory && matchesDialect && matchesSearch;
    });
  }, [searchQuery, selectedCategory, selectedDialect]);

  const handleCopy = (item) => {
    navigator.clipboard.writeText(`${item.nuer} — ${item.senses.join(", ")}`);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const insertAtCursor = (text) => {
    const el = inputRef.current;
    const start = el?.selectionStart ?? searchQuery.length;
    const end = el?.selectionEnd ?? searchQuery.length;
    const nextValue =
      searchQuery.slice(0, start) + text + searchQuery.slice(end);
    setSearchQuery(nextValue);
    requestAnimationFrame(() => {
      el?.focus();
      const pos = start + text.length;
      el?.setSelectionRange(pos, pos);
    });
  };

  const handleBackspace = () => {
    const el = inputRef.current;
    const start = el?.selectionStart ?? searchQuery.length;
    const end = el?.selectionEnd ?? searchQuery.length;
    if (start !== end) {
      setSearchQuery(searchQuery.slice(0, start) + searchQuery.slice(end));
      requestAnimationFrame(() => {
        el?.focus();
        el?.setSelectionRange(start, start);
      });
      return;
    }
    if (start === 0) return;
    setSearchQuery(searchQuery.slice(0, start - 1) + searchQuery.slice(start));
    requestAnimationFrame(() => {
      el?.focus();
      el?.setSelectionRange(start - 1, start - 1);
    });
  };

  return (
    <div className='w-full max-w-3xl mx-auto flex flex-col items-center'>
      <div className='text-center mb-4'>
        <h1 className='text-2xl sm:text-3xl font-bold text-[#2B2723] tracking-tight'>
          Nuer Phrasebook
        </h1>
        <p className='text-xs sm:text-sm text-[#8A7D68] mt-1'>
          Explore all {DICTIONARY.length} words with pronunciation, meanings,
          and examples in Thok Naath.
        </p>
      </div>

      <div className='w-full bg-[#F2E6CE]/80 backdrop-blur-md rounded-3xl p-4 sm:p-7 border border-[#E3D2B0] shadow-xl flex flex-col gap-4'>
        <div className='flex items-center gap-2'>
          <div className='relative flex-1'>
            <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A79880]' />
            <input
              ref={inputRef}
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search Nuer or English words...'
              className='w-full bg-[#FFFCF6] rounded-full pl-10 pr-9 py-2.5 sm:py-3 text-[#2B2723] placeholder:text-[#A79880] text-sm border border-[#DFC9A4] focus:outline-none focus:ring-2 focus:ring-[#BD5A26]/40'
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className='absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-[#A79880] hover:text-[#4A4038] cursor-pointer'
              >
                <X className='w-4 h-4' />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowKeyboard((v) => !v)}
            className={`shrink-0 p-2.5 sm:p-3 rounded-full border transition-all cursor-pointer ${showKeyboard ? "bg-[#BD5A26] border-[#BD5A26] text-white" : "bg-[#FFFCF6] border-[#DFC9A4] text-[#4A4038] hover:bg-[#EDE0C4]"}`}
          >
            <Keyboard className='w-4 h-4' />
          </button>
        </div>

        {showKeyboard && (
          <NuerKeyboard
            onKeyPress={insertAtCursor}
            onBackspace={handleBackspace}
            onSpace={() => insertAtCursor(" ")}
            onEnter={() => setShowKeyboard(false)}
            onClose={() => setShowKeyboard(false)}
          />
        )}

        <div className='flex flex-wrap items-center gap-1.5 sm:gap-2'>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium transition-all cursor-pointer ${selectedCategory === cat ? "bg-[#BD5A26] text-white" : "bg-[#FFFCF6] text-[#4A4038] hover:bg-[#EDE0C4] border border-[#DFC9A4]"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className='flex flex-wrap items-center gap-1.5 -mt-2'>
          <span className='text-[10px] sm:text-[11px] text-[#8A7D68] font-medium'>
            Dialect:
          </span>
          <button
            onClick={() => setSelectedDialect("All")}
            className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium cursor-pointer ${selectedDialect === "All" ? "bg-[#9C5A22] text-white" : "bg-transparent text-[#8A7D68] border border-[#DFC9A4]"}`}
          >
            All
          </button>
          {DIALECTS.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDialect(d)}
              className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium cursor-pointer ${selectedDialect === d ? "bg-[#9C5A22] text-white" : "bg-transparent text-[#8A7D68] border border-[#DFC9A4]"}`}
            >
              {d.replace(" dialect", "")}
            </button>
          ))}
        </div>

        <p className='text-[10px] sm:text-[11px] text-[#A79880] -mt-1'>
          {filteredEntries.length} of {DICTIONARY.length} words
        </p>

        <div className='max-h-[420px] overflow-y-auto pr-1 space-y-3'>
          {filteredEntries.length > 0 ? (
            filteredEntries.map((item) => (
              <div
                key={item.id}
                className='bg-[#FFFCF6] rounded-2xl p-3.5 sm:p-4 border border-[#DFC9A4] flex items-start justify-between gap-3 hover:border-[#BD5A26]/30 transition-colors animate-[fadeIn_0.15s_ease-out]'
              >
                <div className='space-y-1.5 flex-1 min-w-0'>
                  <div className='flex flex-wrap items-center gap-1.5'>
                    <h3 className='text-base sm:text-xl font-bold text-[#2B2723]'>
                      {item.nuer}
                    </h3>
                    <AudioButton
                      path={item.audioFiles[0]}
                      playingPath={playingPath}
                      missingPath={missingPath}
                      onPlay={play}
                      size='sm'
                    />
                    <span className='text-[9px] sm:text-[10px] px-2 py-0.2 rounded-full font-semibold bg-[#EDE0C4] text-[#9C5A22] border border-[#D9C098]'>
                      {item.category}
                    </span>
                    {item.dialect && (
                      <span className='text-[9px] sm:text-[10px] px-2 py-0.2 rounded-full font-medium bg-[#F1E7D4] text-[#8A7D68] border border-[#E3D2B0]'>
                        {item.dialect.replace(" dialect", "")}
                      </span>
                    )}
                  </div>
                  {item.senses.length > 0 && (
                    <p className='text-xs sm:text-sm text-[#4A4038] font-medium'>
                      {item.senses.join(", ")}
                    </p>
                  )}
                  {item.ipa && (
                    <p className='text-[11px] sm:text-xs text-[#A79880] font-mono'>
                      Pronunciation: {item.ipa}
                    </p>
                  )}
                  {item.pluralInfo && (
                    <p className='text-[11px] sm:text-xs text-[#8A7D68]'>
                      Plural:{" "}
                      <span className='font-mono'>
                        {item.pluralInfo.replace(/^ŋuan:/, "")}
                      </span>
                    </p>
                  )}
                  {item.examples.length > 0 && (
                    <div className='mt-1.5 bg-[#F2E6CE]/70 border border-[#E3D2B0] rounded-lg px-2.5 py-1.5 space-y-1'>
                      {item.examples.map((ex, i) => (
                        <div key={i} className='flex items-center gap-1.5'>
                          <div className='flex-1 min-w-0'>
                            <p className='text-[11px] sm:text-xs text-[#3A332C] italic'>
                              {ex.nuer}
                            </p>
                            <p className='text-[10px] sm:text-[11px] text-[#8A7D68]'>
                              {ex.english}
                            </p>
                          </div>
                          <AudioButton
                            path={item.audioFiles[i]}
                            playingPath={playingPath}
                            missingPath={missingPath}
                            onPlay={play}
                            size='sm'
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleCopy(item)}
                  className='p-2 rounded-full bg-[#EDE0C4] text-[#4A4038] hover:bg-[#E4D2A9] transition-colors cursor-pointer shrink-0'
                >
                  {copiedId === item.id ? (
                    <Check className='w-4 h-4 text-[#5B7A4A]' />
                  ) : (
                    <Copy className='w-4 h-4' />
                  )}
                </button>
              </div>
            ))
          ) : (
            <div className='text-center py-8 text-[#8A7D68] text-sm'>
              No words match your search query.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------- Team View ----------------
function TeamView() {
  return (
    <div className='w-full max-w-3xl mx-auto flex flex-col items-center'>
      <div className='text-center mb-4'>
        <h1 className='text-2xl sm:text-3xl font-bold text-[#2B2723] tracking-tight'>
          Dayom AI Team
        </h1>
        <p className='text-xs sm:text-sm text-[#8A7D68] mt-1'>
          Empowering Nuer language preservation from Juba, South Sudan.
        </p>
      </div>
      <div className='w-full bg-[#F2E6CE]/80 backdrop-blur-md rounded-3xl p-4 sm:p-7 border border-[#E3D2B0] shadow-xl flex flex-col gap-4'>
        <div className='bg-[#FFFCF6] rounded-2xl p-4 sm:p-5 border border-[#DFC9A4] space-y-1.5'>
          <div className='flex items-center gap-1.5 text-[#9C5A22] text-xs font-bold uppercase tracking-wider'>
            <MapPin className='w-4 h-4' />
            <span>Based in Juba, South Sudan</span>
          </div>
          <p className='text-[#3A332C] text-sm sm:text-base leading-relaxed'>
            Dayom AI builds tools to preserve, document, and share Nuer (Thok
            Naath) language for text, community, and global digital access.
          </p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
          {TEAM_MEMBERS.map((m) => (
            <div
              key={m.id}
              className='bg-[#FFFCF6] rounded-2xl p-4 sm:p-5 border border-[#DFC9A4] space-y-2'
            >
              <div className='flex items-start justify-between gap-2'>
                <div>
                  <h3 className='text-base sm:text-lg font-bold text-[#2B2723]'>
                    {m.name}
                  </h3>
                  <p className='text-[10px] sm:text-[11px] font-bold text-[#9C5A22] uppercase tracking-wider mt-0.5'>
                    {m.role}
                  </p>
                </div>
                <span className='w-7 h-7 rounded-full bg-[#EDE0C4] text-[#9C5A22] flex items-center justify-center text-xs font-bold shrink-0'>
                  {m.name.charAt(0)}
                </span>
              </div>
              <p className='text-xs sm:text-sm text-[#5C5245] leading-relaxed pt-1'>
                {m.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------- Blog View ----------------
function BlogView() {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <div className='w-full max-w-3xl mx-auto flex flex-col items-center'>
      <div className='text-center mb-4'>
        <h1 className='text-2xl sm:text-3xl font-bold text-[#2B2723] tracking-tight'>
          Dayom AI Blog
        </h1>
        <p className='text-xs sm:text-sm text-[#8A7D68] mt-1'>
          Updates and language preservation research from South Sudan.
        </p>
      </div>
      <div className='w-full bg-[#F2E6CE]/80 backdrop-blur-md rounded-3xl p-4 sm:p-7 border border-[#E3D2B0] shadow-xl flex flex-col gap-4'>
        <div className='space-y-3 sm:space-y-4'>
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              className='bg-[#FFFCF6] rounded-2xl p-4 sm:p-5 border border-[#DFC9A4] space-y-2.5 hover:border-[#BD5A26]/40 transition-colors'
            >
              <div className='flex flex-wrap items-center justify-between gap-1.5 text-xs'>
                <span className='px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider bg-[#EDE0C4] text-[#9C5A22] border border-[#D9C098] text-[10px]'>
                  {post.tag}
                </span>
                <span className='text-[#A79880] text-xs font-medium'>
                  {post.date} • {post.readTime}
                </span>
              </div>
              <h3 className='text-base sm:text-xl font-bold text-[#2B2723] leading-snug'>
                {post.title}
              </h3>
              <p className='text-xs sm:text-sm text-[#5C5245] leading-relaxed'>
                {post.summary}
              </p>
              <div className='flex items-center justify-between pt-2 border-t border-[#DFC9A4]/60 text-xs'>
                <span className='font-semibold text-[#4A4038]'>
                  {post.authors}
                </span>
                <button
                  onClick={() => setSelectedPost(post)}
                  className='font-bold text-[#9C5A22] hover:text-[#7A4419] flex items-center gap-1 cursor-pointer transition-colors'
                >
                  Read Article <ArrowRight className='w-3.5 h-3.5' />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ArticleModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </div>
  );
}

// ---------------- App ----------------
export default function App() {
  const [mode, setMode] = useState("phrasebook");
  const tabs = [
    { id: "phrasebook", label: "Phrasebook", icon: BookOpen },
    { id: "blog", label: "Blog", icon: FileText },
    { id: "team", label: "About & Team", icon: Users },
  ];

  return (
    <div className='min-h-screen w-full bg-[#FBF7EE] text-[#2B2723] flex flex-col items-center py-6 px-3 sm:px-6'>
      <header className='w-full max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 mb-5'>
        <button
          onClick={() => setMode("phrasebook")}
          className='flex items-baseline gap-1.5 text-xl sm:text-2xl text-[#2B2723] cursor-pointer'
        >
          <span>Nuer</span>
          <Sparkles className='w-4 h-4 text-[#BD5A26]' />
          <span className='ml-1.5 px-2.5 py-0.5 rounded-full text-[11px] bg-[#EDE0C4] text-[#9C5A22] border border-[#D9C098]'>
            Thok Naath AI
          </span>
        </button>
        <nav className='flex items-center gap-1 bg-[#F2E6CE]/70 backdrop-blur-md p-1.5 rounded-full border border-[#E3D2B0]'>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = mode === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setMode(tab.id)}
                className={`relative px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer ${active ? "text-white" : "text-[#4A4038] hover:bg-[#EDE0C4]/60"}`}
              >
                {active && (
                  <div className='absolute inset-0 bg-[#BD5A26] rounded-full transition-all' />
                )}
                <span className='relative z-10 flex items-center gap-1.5'>
                  <Icon className='w-3.5 h-3.5' />
                  {tab.label}
                </span>
              </button>
            );
          })}
        </nav>
      </header>

      <main
        key={mode}
        className='w-full flex-1 animate-[fadeIn_0.25s_ease-out]'
      >
        {mode === "phrasebook" && <PhrasebookView />}
        {mode === "translate" && <TranslatorView />}
        {mode === "voice" && <VoiceView />}
        {mode === "chat" && <ChatView />}
        {mode === "tts" && <TTSView />}
        {mode === "team" && <TeamView />}
        {mode === "blog" && <BlogView />}
      </main>

      {/* Bottom AI tools dock: Translate, Voice, Chat, TTS */}
      <Dock mode={mode} onSelectMode={setMode} />

      <footer className='text-center text-[10px] sm:text-xs text-[#8A7D68] mt-4'>
        Nuer (Thok Naath) Language Preservation Project
      </footer>
    </div>
  );
}

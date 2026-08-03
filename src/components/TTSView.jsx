import React, { useRef, useState } from "react";
import {
  Volume2,
  Play,
  Pause,
  RefreshCw,
  Download,
  AlertCircle,
} from "lucide-react";
import { synthesizeNuerSpeech } from "../services/tts";

const EXAMPLES = [
  "Ɣän cieŋä kä Nai̱röbi̱, Kɛnya",
  "Ɣän ta̱a̱ kɛ määth mi cɔali Kidit.",
  "Cä jɛ nhɔk ɛn ɣöö ŋotdɛ thiɛlɛ dup ti̱ gɔw rɛy juba",
  "Ɣän göörä ɣöö bä ji̱ dhɔarä gui̱l i̱ruun",
];

export default function TTSView() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);

  const handleSynthesize = async () => {
    if (!text.trim() || isLoading) return;
    setIsLoading(true);
    setError(null);
    try {
      const url = await synthesizeNuerSpeech(text.trim());
      setAudioUrl(url);
      // Autoplay once the new source is loaded
      requestAnimationFrame(() => {
        audioRef.current?.play();
        setIsPlaying(true);
      });
    } catch (err) {
      console.error("TTS error:", err);
      setError(
        "Couldn't reach the voice model — the Space may be waking up from sleep. Try again in a moment.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  return (
    <div className='w-full max-w-3xl mx-auto flex flex-col items-center'>
      <div className='text-center mb-4'>
        <h1 className='text-2xl sm:text-3xl font-bold text-[#2B2723] tracking-tight'>
          Text To Speech
        </h1>
        <p className='text-xs sm:text-sm text-[#8A7D68] mt-1'>
          {/*Natural Nuer speech synthesis, powered by our fine-tuned Meta MMS
          model.*/}
        </p>
      </div>

      <div className='w-full bg-[#F2E6CE]/80 backdrop-blur-md rounded-3xl p-4 sm:p-7 border border-[#E3D2B0] shadow-xl flex flex-col gap-4'>
        <div>
          <label className='block text-[11px] sm:text-xs font-bold text-[#9C5A22] uppercase tracking-wider mb-1.5'>
            Nuer Text
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Enter text in Nuer to synthesize speech...'
            rows={3}
            className='w-full bg-[#FFFCF6] rounded-2xl p-3.5 sm:p-4 text-sm sm:text-base text-[#2B2723] placeholder:text-[#A79880] resize-none border border-[#DFC9A4] focus:outline-none focus:ring-2 focus:ring-[#BD5A26]/40'
          />
        </div>

        <div className='flex flex-wrap items-center gap-1.5 sm:gap-2'>
          <span className='text-[11px] sm:text-xs text-[#8A7D68] font-medium'>
            Try example:
          </span>
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => setText(ex)}
              className='text-[11px] sm:text-xs bg-[#EDE0C4] hover:bg-[#E4D2A9] text-[#4A4038] px-2.5 sm:px-3 py-1 rounded-full border border-[#D9C098] transition-colors cursor-pointer'
            >
              {ex}
            </button>
          ))}
        </div>

        <div className='flex justify-center'>
          <button
            onClick={handleSynthesize}
            disabled={isLoading || !text.trim()}
            className='bg-[#BD5A26] hover:bg-[#A84E20] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm sm:text-base px-6 sm:px-8 py-2.5 sm:py-3 rounded-full shadow-md flex items-center gap-2 cursor-pointer transition-all active:scale-[0.98]'
          >
            {isLoading ? (
              <>
                <RefreshCw className='w-4 h-4 animate-spin' />
                Synthesizing...
              </>
            ) : (
              <>
                <Volume2 className='w-4 h-4' />
                Generate Speech
              </>
            )}
          </button>
        </div>

        {/* Audio player */}
        <div className='w-full bg-[#FFFCF6] rounded-2xl p-4 sm:p-5 border border-[#DFC9A4] flex flex-col items-center justify-center gap-3 text-center'>
          {audioUrl ? (
            <>
              <button
                onClick={handlePlayPause}
                className='w-12 h-12 rounded-full bg-[#BD5A26] hover:bg-[#A84E20] text-white flex items-center justify-center cursor-pointer transition-colors'
              >
                {isPlaying ? (
                  <Pause className='w-5 h-5' />
                ) : (
                  <Play className='w-5 h-5 ml-0.5' />
                )}
              </button>
              <audio
                ref={audioRef}
                src={audioUrl}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                className='w-full max-w-xs'
                controls
              />
              <a
                href={audioUrl}
                download='nuer-speech.wav'
                className='text-xs font-semibold text-[#9C5A22] hover:text-[#7A4419] flex items-center gap-1'
              >
                <Download className='w-3.5 h-3.5' />
                Download WAV
              </a>
            </>
          ) : (
            <p className='text-[#A79880] text-xs sm:text-sm italic'>
              Audio will play here...
            </p>
          )}
        </div>

        {error && (
          <div className='flex items-start gap-2 bg-[#F1E7D4] border border-[#E3D2B0] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-[#9C5A22]'>
            <AlertCircle className='w-4 h-4 shrink-0 mt-0.5' />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
}

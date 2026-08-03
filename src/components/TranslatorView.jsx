import React, { useState } from "react";
import {
  ArrowLeftRight,
  Sparkles,
  Copy,
  Check,
  Volume2,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { translateText } from "../services/translate";

const SAMPLE_INPUTS = [
  "",
  "Many people make a living by herding cattle and farming",
  "I wanna go to Kenya",
  "It contains the Sudd, which is one of the biggest wetlands in the entire world.",
  "Ɣän cieŋä kä Kenya",
];

export default function TranslatorView() {
  const [direction, setDirection] = useState("en-to-nus"); // 'en-to-nus' | 'nus-to-en'
  const [inputText, setInputText] = useState("");
  const [translationResult, setTranslationResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const sourceLabel =
    direction === "en-to-nus" ? "English" : "Nuer (Thok Naath)";
  const targetLabel =
    direction === "en-to-nus" ? "Nuer (Thok Naath)" : "English";
  const placeholder =
    direction === "en-to-nus"
      ? "Enter English text to translate..."
      : "Enter Nuer (Thok Naath) text to translate...";

  const handleTranslate = async () => {
    if (!inputText.trim() || isLoading) return;
    setIsLoading(true);
    setError(null);
    setTranslationResult("");
    try {
      const translated = await translateText(inputText.trim(), direction);
      setTranslationResult(translated);
    } catch (err) {
      console.error("Translation error:", err);
      setError(
        "Couldn't reach the translator — the model may be waking up from sleep. Try again in a moment.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleDirection = () => {
    setDirection((prev) => (prev === "en-to-nus" ? "nus-to-en" : "en-to-nus"));
    // Swap input/output if there's already a result, mirroring the prior translation
    if (translationResult) {
      setInputText(translationResult);
      setTranslationResult(inputText);
    }
    setError(null);
  };

  const handleCopy = () => {
    if (!translationResult) return;
    navigator.clipboard.writeText(translationResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    if (!translationResult) return;
    setIsSpeaking(true);
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(translationResult);
      utterance.rate = 0.9;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsSpeaking(false), 1500);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleTranslate();
  };

  return (
    <div className='w-full max-w-3xl mx-auto flex flex-col items-center'>
      <div className='text-center mb-4'>
        <h1 className='text-2xl sm:text-3xl font-bold text-[#2B2723] tracking-tight'>
          Translation Engine
        </h1>
        <p className='text-xs sm:text-sm text-[#8A7D68] mt-1 max-w-lg mx-auto'>
          {/*Bidirectional model hosted on Hugging Face for English ↔ Nuer.*/}
        </p>
      </div>

      <div className='w-full bg-[#F2E6CE]/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-[#E3D2B0] shadow-xl flex flex-col gap-4 sm:gap-5'>
        {/* Source header */}
        <div className='flex items-center justify-between px-1'>
          <span className='text-[11px] sm:text-xs font-bold text-[#9C5A22] uppercase tracking-wider'>
            {sourceLabel}
          </span>
          <button
            onClick={handleToggleDirection}
            className='flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#9C5A22] hover:text-[#7A4419] px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#EDE0C4] hover:bg-[#E4D2A9] border border-[#D9C098] transition-colors cursor-pointer'
          >
            <ArrowLeftRight className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
            Switch Direction
          </button>
        </div>

        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={3}
          className='w-full bg-[#FFFCF6] rounded-xl sm:rounded-2xl p-3 sm:p-3.5 text-sm sm:text-base text-[#2B2723] placeholder:text-[#A79880] resize-none border border-[#DFC9A4] focus:outline-none focus:ring-2 focus:ring-[#BD5A26]/40'
        />

        {/* Example chips */}
        <div className='flex flex-wrap items-center gap-1.5 sm:gap-2'>
          <span className='text-[11px] sm:text-xs text-[#8A7D68] font-medium'>
            Try example:
          </span>
          {SAMPLE_INPUTS.map((sample) => (
            <button
              key={sample}
              onClick={() => setInputText(sample)}
              className='text-[11px] sm:text-xs bg-[#EDE0C4] hover:bg-[#E4D2A9] text-[#4A4038] px-2.5 sm:px-3 py-1 rounded-full border border-[#D9C098] transition-colors cursor-pointer'
            >
              {sample}
            </button>
          ))}
        </div>

        {/* Translate button */}
        <div className='flex justify-center my-0.5 sm:my-1'>
          <button
            onClick={handleTranslate}
            disabled={isLoading || !inputText.trim()}
            className='bg-[#BD5A26] hover:bg-[#A84E20] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm sm:text-base px-6 sm:px-7 py-2 sm:py-2.5 rounded-full shadow-md shadow-amber-900/15 flex items-center gap-2 cursor-pointer transition-all active:scale-[0.98]'
          >
            {isLoading ? (
              <>
                <RefreshCw className='w-4 h-4 animate-spin' />
                Translating...
              </>
            ) : (
              <>
                <Sparkles className='w-4 h-4' />
                Translate
              </>
            )}
          </button>
        </div>

        {/* Target header */}
        <div className='flex items-center justify-between px-1'>
          <span className='text-[11px] sm:text-xs font-bold text-[#9C5A22] uppercase tracking-wider'>
            {targetLabel}
          </span>
          {translationResult && (
            <div className='flex items-center gap-1.5 sm:gap-2'>
              <button
                onClick={handleSpeak}
                disabled={isSpeaking}
                className='text-xs text-[#4A4038] hover:text-[#2B2723] flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full bg-[#EDE0C4] hover:bg-[#E4D2A9] cursor-pointer'
              >
                <Volume2
                  className={`w-3.5 h-3.5 ${isSpeaking ? "animate-pulse text-[#BD5A26]" : ""}`}
                />
                Speak
              </button>
              <button
                onClick={handleCopy}
                className='text-xs text-[#4A4038] hover:text-[#2B2723] flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full bg-[#EDE0C4] hover:bg-[#E4D2A9] cursor-pointer'
              >
                {copied ? (
                  <Check className='w-3.5 h-3.5 text-emerald-600' />
                ) : (
                  <Copy className='w-3.5 h-3.5' />
                )}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          )}
        </div>

        {/* Output */}
        <div className='min-h-[6rem] sm:min-h-[6.5rem] bg-[#FFFCF6] rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border border-[#DFC9A4] text-[#2B2723] text-sm sm:text-lg flex items-center justify-start'>
          {translationResult ? (
            <div className='w-full font-medium animate-[fadeIn_0.2s_ease-out]'>
              {translationResult}
            </div>
          ) : (
            <span className='text-[#A79880] font-normal text-xs sm:text-base'>
              Translation result will appear here...
            </span>
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

import React from 'react';
import { Mic } from 'lucide-react';

export default function VoiceView() {
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#2B2723] tracking-tight">
            Voice Transcribe
          </h1>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#EDE0C4] text-[#9C5A22] border border-[#D9C098]">
            Coming Soon
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#8A7D68] mt-1">
          Speak in Nuer or English and get an instant transcript and translation.
        </p>
      </div>

      <div className="w-full bg-[#F2E6CE]/80 backdrop-blur-md rounded-3xl p-4 sm:p-7 border border-[#E3D2B0] shadow-xl flex flex-col gap-4">
        <div className="w-full bg-[#FFFCF6]/90 rounded-full py-2 px-3.5 border border-[#DFC9A4] text-[11px] sm:text-sm text-[#4A4038] font-medium flex items-center justify-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-[#BD5A26] text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shrink-0">
            Coming Soon
          </span>
          <span>Our Nuer speech-recognition model is currently in training.</span>
        </div>

        <div className="min-h-[260px] flex flex-col items-center justify-center gap-4 text-center py-8">
          <button
            disabled
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#EDE0C4] border-4 border-[#DFC9A4] flex items-center justify-center cursor-not-allowed opacity-70"
          >
            <Mic className="w-8 h-8 sm:w-9 sm:h-9 text-[#9C5A22]" />
          </button>
          <p className="text-sm text-[#8A7D68] max-w-sm">
            Voice Transcribe will let you speak in Nuer or English and see a live
            transcript, powered by our own speech models — no third-party recognition.
          </p>
        </div>
      </div>
    </div>
  );
}

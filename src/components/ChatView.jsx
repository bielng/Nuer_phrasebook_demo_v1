import React from "react";
import { MessageSquare, Sparkles } from "lucide-react";

const SAMPLE_SUGGESTIONS = [
  "Gɔ̱ri̱ ruac mi ciɛk ciɛk kɛ kui̱ Thɔth Thuda̱n .",
  "Kämni ɣä random verse rɛy baibola",
  "How do you say thank you in Nuer?",
];

export default function ChatView() {
  return (
    <div className='w-full max-w-3xl mx-auto flex flex-col items-center'>
      <div className='text-center mb-4'>
        <div className='flex items-center justify-center gap-2'>
          <h1 className='text-2xl sm:text-3xl font-bold text-[#2B2723] tracking-tight'>
            Chat Studio
          </h1>
          <span className='px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#EDE0C4] text-[#9C5A22] border border-[#D9C098]'>
            Coming Soon
          </span>
        </div>
        <p className='text-xs sm:text-sm text-[#8A7D68] mt-1'>
          Interactive AI conversational assistant for Nuer (Thok Naath).
        </p>
      </div>

      <div className='w-full bg-[#F2E6CE]/80 backdrop-blur-md rounded-3xl p-4 sm:p-7 border border-[#E3D2B0] shadow-xl flex flex-col gap-4'>
        <div className='w-full bg-[#FFFCF6]/90 rounded-full py-2 px-3.5 border border-[#DFC9A4] text-[11px] sm:text-sm text-[#4A4038] font-medium flex items-center justify-center gap-2'>
          <span className='px-2 py-0.5 rounded-full bg-[#BD5A26] text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shrink-0'>
            Coming Soon
          </span>
          <span>
            We're building a Nuer-speaking chat assistant. Check back soon!
          </span>
        </div>

        <div className='min-h-[220px] flex flex-col items-center justify-center gap-3 text-center py-8'>
          <div className='w-14 h-14 rounded-full bg-[#EDE0C4] flex items-center justify-center'>
            <MessageSquare className='w-6 h-6 text-[#9C5A22]' />
          </div>
          <p className='text-sm text-[#8A7D68] max-w-sm'>
            Chat Studio will let you have full conversations in Thok Naath,
            powered by our translation pipeline. In the meantime, try the
            Translate tab.
          </p>
        </div>

        <div className='flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-2 border-t border-[#DFC9A4]/60'>
          {SAMPLE_SUGGESTIONS.map((s) => (
            <span
              key={s}
              className='text-[11px] sm:text-xs bg-[#FFFCF6] text-[#4A4038] px-2.5 sm:px-3 py-1 rounded-full border border-[#DFC9A4] opacity-70'
            >
              {s}
            </span>
          ))}
        </div>

        <div className='flex items-center justify-center gap-1.5 text-[11px] text-[#A79880]'>
          <Sparkles className='w-3.5 h-3.5' />
          Sample phrases the assistant will support at launch
        </div>
      </div>
    </div>
  );
}

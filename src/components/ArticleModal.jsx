import React from 'react';
import { X, Calendar, Clock, ArrowLeft } from 'lucide-react';

export default function ArticleModal({ post, onClose }) {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B2723]/40 backdrop-blur-sm">
      <div className="bg-[#FFFCF6] border border-[#DFC9A4] rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative animate-[fadeIn_0.2s_ease-out]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#EDE0C4] text-[#4A4038] hover:bg-[#E4D2A9] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-3 pr-8">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#EDE0C4] text-[#9C5A22] border border-[#D9C098]">
              {post.tag}
            </span>
            <span className="text-xs text-[#8A7D68] font-medium flex items-center gap-1">
              <Calendar className="w-3 h-3 inline" /> {post.date} •{' '}
              <Clock className="w-3 h-3 inline" /> {post.readTime}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#2B2723] leading-snug">
            {post.title}
          </h2>

          <p className="text-xs font-semibold text-[#9C5A22]">{post.authors}</p>
        </div>

        <hr className="my-6 border-[#DFC9A4]" />

        <div className="prose max-w-none text-[#5C5245] text-sm sm:text-base leading-relaxed space-y-4">
          {post.content.split('\n\n').filter(Boolean).map((paragraph, idx) => {
            const trimmed = paragraph.trim();
            if (trimmed.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-lg font-bold text-[#2B2723] pt-2">
                  {trimmed.replace('### ', '')}
                </h3>
              );
            }
            return <p key={idx}>{trimmed}</p>;
          })}
        </div>

        <div className="mt-8 pt-4 border-t border-[#DFC9A4] flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#BD5A26] hover:bg-[#A84E20] text-white font-semibold text-xs px-5 py-2 rounded-full shadow-sm flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog
          </button>
        </div>
      </div>
    </div>
  );
}

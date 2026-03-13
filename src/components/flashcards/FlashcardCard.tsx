"use client";
import { Question } from "@/data/types";
import { useFlashcardStore } from "@/hooks/useFlashcardStore";
import { cn } from "@/lib/utils";

interface Props {
  card: Question;
}

export function FlashcardCard({ card }: Props) {
  const { isFlipped, flip } = useFlashcardStore();

  return (
    <div
      className="relative w-full cursor-pointer"
      style={{ perspective: "1200px", height: "280px" }}
      onClick={flip}
    >
      <div
        className={cn(
          "relative w-full h-full transition-transform duration-500",
          "preserve-3d"
        )}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-6 backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-emerald-800/40 shadow-2xl" />
          <div className="relative z-10 text-center">
            <p className="text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-4">Сұрақ</p>
            <p className="text-white text-xl font-bold leading-relaxed">{card.question}</p>
            <p className="text-gray-500 text-sm mt-6">Жауапты көру үшін басыңыз</p>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-6"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-900 to-gray-900 border border-emerald-600/50 shadow-2xl" />
          <div className="relative z-10 text-center">
            <p className="text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-4">Жауап</p>
            <p className="text-white text-xl font-bold leading-relaxed">{card.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

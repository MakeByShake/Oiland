"use client";
import { Question } from "@/data/types";
import { useFlashcardStore } from "@/hooks/useFlashcardStore";

interface Props {
  card: Question;
}

const hiddenFace: React.CSSProperties = {
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
};

export function FlashcardCard({ card }: Props) {
  const { isFlipped, flip } = useFlashcardStore();

  return (
    <div
      className="relative w-full cursor-pointer"
      style={{
        perspective: "1200px",
        WebkitPerspective: "1200px",
        height: "280px",
      }}
      onClick={flip}
    >
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          WebkitTransformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          WebkitTransform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition:
            "transform 0.5s cubic-bezier(0.4,0,0.2,1), -webkit-transform 0.5s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-emerald-800/40 shadow-2xl flex flex-col items-center justify-center p-6"
          style={hiddenFace}
        >
          <p className="text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-4">Сұрақ</p>
          <p className="text-white text-xl font-bold leading-relaxed text-center">{card.question}</p>
          <p className="text-gray-500 text-sm mt-6">Жауапты көру үшін басыңыз</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-900 to-gray-900 border border-emerald-600/50 shadow-2xl flex flex-col items-center justify-center p-6"
          style={{
            ...hiddenFace,
            transform: "rotateY(180deg)",
            WebkitTransform: "rotateY(180deg)",
          }}
        >
          <p className="text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-4">Жауап</p>
          <p className="text-white text-xl font-bold leading-relaxed text-center">{card.answer}</p>
        </div>
      </div>
    </div>
  );
}

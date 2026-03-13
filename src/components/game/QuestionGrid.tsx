"use client";
import { cn } from "@/lib/utils";

interface Props {
  total: number;
  usedIds: string[];
  onSelect: (index: number) => void;
}

export function QuestionGrid({ total, usedIds, onSelect }: Props) {
  return (
    <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
      {Array.from({ length: total }, (_, i) => {
        const id = `q${i + 1}`;
        const used = usedIds.includes(id);
        return (
          <button
            key={id}
            onClick={() => onSelect(i)}
            className={cn(
              "aspect-square flex items-center justify-center rounded-2xl border font-bold text-lg",
              "transition-all duration-200 active:scale-95",
              used
                ? "bg-gray-900/40 border-gray-800 text-gray-600 cursor-default"
                : "bg-gray-800/60 border-gray-700 text-white hover:border-emerald-500 hover:bg-emerald-900/30"
            )}
            disabled={used}
          >
            {i + 1}
          </button>
        );
      })}
    </div>
  );
}

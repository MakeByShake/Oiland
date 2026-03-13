"use client";
import { Topic } from "@/data/types";
import { cn } from "@/lib/utils";

interface Props {
  topics: Topic[];
  onSelect: (topic: Topic) => void;
}

export function TopicGrid({ topics, onSelect }: Props) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
      {topics.map((topic, idx) => (
        <button
          key={topic.id}
          onClick={() => onSelect(topic)}
          className={cn(
            "aspect-square flex flex-col items-center justify-center rounded-2xl border",
            "bg-gray-800/60 border-gray-700 hover:border-emerald-500 hover:bg-emerald-900/30",
            "transition-all duration-200 active:scale-95 p-2 gap-1"
          )}
        >
          <span className="text-emerald-400 font-bold text-lg">{idx + 1}</span>
          <span className="text-gray-300 text-xs text-center leading-tight line-clamp-2">{topic.title}</span>
        </button>
      ))}
    </div>
  );
}

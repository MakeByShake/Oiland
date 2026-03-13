"use client";
import { Topic } from "@/data/types";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

interface Props {
  topics: Topic[];
  selected: string[];
  onToggle: (id: string) => void;
}

export function TopicSelector({ topics, selected, onToggle }: Props) {
  return (
    <div className="grid grid-cols-1 gap-3">
      {topics.map((topic, idx) => {
        const isSelected = selected.includes(topic.id);
        return (
          <button
            key={topic.id}
            onClick={() => onToggle(topic.id)}
            className={cn(
              "flex items-center gap-4 w-full p-4 rounded-xl border text-left transition-all duration-200",
              isSelected
                ? "bg-emerald-900/40 border-emerald-500 shadow-lg shadow-emerald-900/20"
                : "bg-gray-800/50 border-gray-700 hover:border-gray-500"
            )}
          >
            <span
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0",
                isSelected ? "bg-emerald-600 text-white" : "bg-gray-700 text-gray-400"
              )}
            >
              {idx + 1}
            </span>
            <span className={cn("font-medium flex-1", isSelected ? "text-white" : "text-gray-300")}>
              {topic.title}
            </span>
            {isSelected && <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
          </button>
        );
      })}
    </div>
  );
}

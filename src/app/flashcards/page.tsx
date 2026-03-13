"use client";
import Link from "next/link";
import { ArrowLeft, BookOpen, Calculator, Atom } from "lucide-react";
import { subjects } from "@/data/subjects";
import { cn } from "@/lib/utils";

const subjectIcons: Record<string, React.ElementType> = {
  informatika: BookOpen,
  matematika: Calculator,
  fizika: Atom,
};

const subjectColors: Record<string, { bg: string; border: string; icon: string }> = {
  informatika: { bg: "from-emerald-900/30 to-gray-900", border: "border-emerald-700/40", icon: "text-emerald-400" },
  matematika: { bg: "from-blue-900/30 to-gray-900", border: "border-blue-700/40", icon: "text-blue-400" },
  fizika: { bg: "from-orange-900/30 to-gray-900", border: "border-orange-700/40", icon: "text-orange-400" },
};

export default function FlashcardsPage() {
  return (
    <main className="min-h-screen bg-gray-950 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-emerald-900/15 blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative z-10 sticky top-0 bg-gray-950/90 backdrop-blur-md border-b border-gray-800/60">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors rounded-xl p-2 hover:bg-gray-800/60"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Артқа</span>
          </Link>
          <h1 className="text-lg font-bold text-white">Флэшкарталар</h1>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8 space-y-4">
        <p className="text-gray-400 text-sm mb-6">Пәнді таңдаңыз</p>
        {subjects.map((subject) => {
          const Icon = subjectIcons[subject.id] ?? BookOpen;
          const colors = subjectColors[subject.id] ?? subjectColors.informatika;
          return (
            <Link key={subject.id} href={`/flashcards/${subject.id}`}>
              <div
                className={cn(
                  "flex items-center gap-5 p-5 rounded-2xl border bg-gradient-to-r",
                  colors.bg, colors.border,
                  "hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer",
                  "shadow-lg hover:shadow-xl"
                )}
              >
                <div className={cn("w-14 h-14 rounded-2xl bg-gray-800/80 flex items-center justify-center flex-shrink-0", colors.icon)}>
                  <Icon className="w-7 h-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-white font-bold text-xl">{subject.title}</h2>
                  <p className="text-gray-400 text-sm mt-0.5">
                    {subject.author} · {subject.year}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">{subject.topics.length} тақырып</p>
                </div>
                <ArrowLeft className="w-5 h-5 text-gray-600 rotate-180 flex-shrink-0" />
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}

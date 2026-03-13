"use client";
import { use, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, X, Check } from "lucide-react";
import { getSubjectById } from "@/data/subjects";
import { useFlashcardStore } from "@/hooks/useFlashcardStore";
import { FlashcardCard } from "@/components/flashcards/FlashcardCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export default function LearnPage({ params }: { params: Promise<{ subjectId: string }> }) {
  const { subjectId } = use(params);
  const searchParams = useSearchParams();
  const router = useRouter();
  const topicIds = searchParams.get("topics")?.split(",") ?? [];

  const subject = getSubjectById(subjectId);
  const { activeCards, memorizedIds, currentIndex, isFinished, initSession, markMemorized, markNotMemorized } =
    useFlashcardStore();

  useEffect(() => {
    if (!subject) return;
    const allQuestions = subject.topics
      .filter((t) => topicIds.includes(t.id))
      .flatMap((t) => t.questions);
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    initSession(shuffled);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectId]);

  useEffect(() => {
    if (isFinished) {
      const t = setTimeout(() => router.push("/"), 1500);
      return () => clearTimeout(t);
    }
  }, [isFinished, router]);

  if (!subject) return null;

  const total = activeCards.length + memorizedIds.size;
  const memorizedCount = memorizedIds.size;
  const progress = total > 0 ? (memorizedCount / total) * 100 : 0;
  const currentCard = activeCards[currentIndex];

  if (isFinished) {
    return (
      <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center gap-6 p-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-2xl shadow-emerald-900/50">
          <Check className="w-12 h-12 text-white" />
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Керемет!</h2>
          <p className="text-gray-400">Барлық карточкалар есте сақталды</p>
        </div>
      </main>
    );
  }

  if (!currentCard) return null;

  return (
    <main className="min-h-screen bg-gray-950 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gray-950/90 backdrop-blur-md border-b border-gray-800/60">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => router.push(`/flashcards/${subjectId}`)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors rounded-xl p-2 hover:bg-gray-800/60"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Артқа</span>
          </button>
          <div className="flex-1 space-y-1">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Есте сақталды: {memorizedCount}/{total}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-gray-800" />
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-2xl mx-auto w-full gap-8">
        <div className="w-full">
          <FlashcardCard card={currentCard} />
        </div>

        {/* Counter */}
        <p className="text-gray-500 text-sm">
          {activeCards.length} карточка қалды
        </p>

        {/* Buttons */}
        <div className="flex gap-4 w-full max-w-sm">
          <Button
            onClick={markNotMemorized}
            variant="outline"
            className={cn(
              "flex-1 h-16 rounded-2xl border-2 border-red-800/60 bg-red-950/20",
              "hover:border-red-600 hover:bg-red-900/30 text-white transition-all",
              "flex items-center justify-center gap-2 font-semibold text-base"
            )}
          >
            <X className="w-6 h-6 text-red-400" />
            <span>Білмедім</span>
          </Button>
          <Button
            onClick={markMemorized}
            className={cn(
              "flex-1 h-16 rounded-2xl border-2 border-emerald-700/60 bg-emerald-950/30",
              "hover:border-emerald-500 hover:bg-emerald-900/40 text-white transition-all",
              "flex items-center justify-center gap-2 font-semibold text-base"
            )}
          >
            <Check className="w-6 h-6 text-emerald-400" />
            <span>Білдім</span>
          </Button>
        </div>
      </div>
    </main>
  );
}

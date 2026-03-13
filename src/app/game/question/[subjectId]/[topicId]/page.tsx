"use client";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Shuffle, Eye } from "lucide-react";
import { getSubjectById } from "@/data/subjects";
import { useGameStore } from "@/hooks/useGameStore";
import { QuestionGrid } from "@/components/game/QuestionGrid";
import { Question } from "@/data/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type PageParams = { subjectId: string; topicId: string };

export default function QuestionPage({ params }: { params: Promise<PageParams> }) {
  const { subjectId, topicId } = use(params);
  const router = useRouter();
  const { getUsedQuestions, markQuestionUsed, nextPlayer } = useGameStore();

  const subject = getSubjectById(subjectId);
  const topic = subject?.topics.find((t) => t.id === topicId);

  const [openQuestion, setOpenQuestion] = useState<Question | null>(null);
  const [answerRevealed, setAnswerRevealed] = useState(false);

  const usedIds = getUsedQuestions(topicId);

  const openCard = (idx: number) => {
    if (!topic) return;
    const q = topic.questions[idx];
    const allUsed = topic.questions.every((q) => usedIds.includes(q.id));
    if (allUsed) {
      // reset
      topic.questions.forEach((q) => {
        const list = getUsedQuestions(topicId);
        if (!list.includes(q.id)) return;
      });
    }
    setOpenQuestion(q);
    setAnswerRevealed(false);
    markQuestionUsed(topicId, q.id);
  };

  const openRandom = () => {
    if (!topic) return;
    const allUsed = usedIds.length >= topic.questions.length;
    const pool = allUsed ? topic.questions : topic.questions.filter((q) => !usedIds.includes(q.id));
    const q = pool[Math.floor(Math.random() * pool.length)];
    setOpenQuestion(q);
    setAnswerRevealed(false);
    markQuestionUsed(topicId, q.id);
  };

  const handleEvaluate = () => {
    setOpenQuestion(null);
    setAnswerRevealed(false);
    nextPlayer();
    router.back();
  };

  if (!topic || !subject) {
    return (
      <main className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-gray-400">Тақырып табылмады</p>
      </main>
    );
  }

  // Question view
  if (openQuestion) {
    return (
      <main className="min-h-screen bg-gray-950 flex flex-col">
        <div className="sticky top-0 z-10 bg-gray-950/90 backdrop-blur-md border-b border-gray-800/60">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
            <button
              onClick={() => { setOpenQuestion(null); setAnswerRevealed(false); }}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors rounded-xl p-2 hover:bg-gray-800/60"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Артқа</span>
            </button>
            <h2 className="text-white font-semibold truncate">{topic.title}</h2>
          </div>
        </div>

        <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 py-6 gap-4">
          {/* Question */}
          <div className="flex-1 flex flex-col">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6 flex flex-col justify-center min-h-[200px]">
              <p className="text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-3">Сұрақ</p>
              <p className="text-white text-2xl font-bold leading-relaxed">{openQuestion.question}</p>
            </div>

            {/* Answer card */}
            <div
              className={cn(
                "mt-4 rounded-2xl border p-6 min-h-[160px] flex flex-col justify-center transition-all duration-300 cursor-pointer",
                answerRevealed
                  ? "bg-gradient-to-br from-emerald-900/50 to-gray-900 border-emerald-600/50"
                  : "bg-gray-800/30 border-gray-700/50 hover:border-gray-600"
              )}
              onClick={() => !answerRevealed && setAnswerRevealed(true)}
            >
              {answerRevealed ? (
                <>
                  <p className="text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-3">Жауап</p>
                  <p className="text-white text-xl font-bold leading-relaxed">{openQuestion.answer}</p>
                </>
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-500">
                  <Eye className="w-8 h-8" />
                  <p className="text-sm">Жауапты ашу үшін басыңыз</p>
                </div>
              )}
            </div>
          </div>

          {/* Evaluate buttons (show only after answer revealed) */}
          {answerRevealed && (
            <div className="flex gap-4">
              <Button
                onClick={handleEvaluate}
                variant="outline"
                className="flex-1 h-14 rounded-2xl border-2 border-red-800/60 bg-red-950/20 hover:border-red-600 hover:bg-red-900/30 text-white font-bold text-base"
              >
                Жоқ
              </Button>
              <Button
                onClick={handleEvaluate}
                className="flex-1 h-14 rounded-2xl border-2 border-emerald-700/60 bg-emerald-950/30 hover:border-emerald-500 hover:bg-emerald-900/40 text-white font-bold text-base"
              >
                Иә
              </Button>
            </div>
          )}
        </div>
      </main>
    );
  }

  // Question grid view
  return (
    <main className="min-h-screen bg-gray-950 flex flex-col">
      <div className="sticky top-0 z-10 bg-gray-950/90 backdrop-blur-md border-b border-gray-800/60">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors rounded-xl p-2 hover:bg-gray-800/60"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium hidden sm:block">Артқа</span>
          </button>
          <h2 className="text-white font-bold text-base flex-1 text-center">{topic.title}</h2>
          <button
            onClick={openRandom}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-violet-900/40 border border-violet-700/50 text-violet-400 hover:bg-violet-800/40 transition-all"
          >
            <Shuffle className="w-4 h-4" />
            <span className="text-sm font-semibold hidden sm:block">Кездейсоқ</span>
          </button>
        </div>
      </div>

      <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 space-y-4">
        <p className="text-gray-400 text-sm">
          Сұрақты таңдаңыз ·{" "}
          <span className="text-gray-500">{usedIds.length}/{topic.questions.length} пайдаланылды</span>
        </p>
        <QuestionGrid
          total={topic.questions.length}
          usedIds={usedIds}
          onSelect={openCard}
        />
      </div>
    </main>
  );
}

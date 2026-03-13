"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Home, Gift, ChevronRight } from "lucide-react";
import { useGameStore } from "@/hooks/useGameStore";
import { getSubjectById } from "@/data/subjects";
import { TopicGrid } from "@/components/game/TopicGrid";
import { BonusModal } from "@/components/shared/BonusModal";
import { ConfirmModal } from "@/components/shared/ConfirmModal";
import { Topic } from "@/data/types";

export default function GamePlayPage() {
  const router = useRouter();
  const { players, currentPlayerIndex, nextPlayer } = useGameStore();
  const [showBonus, setShowBonus] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const currentPlayer = players[currentPlayerIndex];
  const subject = currentPlayer ? getSubjectById(currentPlayer.subjectId) : null;

  const handleTopicSelect = (topic: Topic) => {
    router.push(`/game/question/${currentPlayer.subjectId}/${topic.id}`);
  };

  const handleBonus = () => setShowBonus(true);

  const handleBonusClose = () => {
    setShowBonus(false);
    nextPlayer();
  };

  const handleHomeConfirm = () => {
    router.push("/");
  };

  if (!currentPlayer || !subject) {
    return (
      <main className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-gray-400">Ойыншы табылмады</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-gray-950/90 backdrop-blur-md border-b border-gray-800/60">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <button
            onClick={() => setShowConfirm(true)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors rounded-xl p-2 hover:bg-gray-800/60"
          >
            <Home className="w-5 h-5" />
            <span className="text-sm font-medium hidden sm:block">Басты бет</span>
          </button>

          <div className="flex items-center gap-2 flex-1 justify-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
              {currentPlayerIndex + 1}
            </div>
            <div className="text-center">
              <p className="text-white font-bold text-base leading-tight">{currentPlayer.name}</p>
              <p className="text-gray-500 text-xs">{subject.title}</p>
            </div>
          </div>

          <button
            onClick={handleBonus}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-900/40 border border-amber-700/50 text-amber-400 hover:bg-amber-800/40 transition-all"
          >
            <Gift className="w-4 h-4" />
            <span className="text-sm font-semibold hidden sm:block">Бонус</span>
          </button>
        </div>

        {/* Player turn indicator */}
        <div className="max-w-3xl mx-auto px-4 pb-3">
          <div className="flex gap-1.5">
            {players.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  i === currentPlayerIndex ? "bg-violet-500" : "bg-gray-800"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Topics */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 space-y-4">
        <div className="flex items-center gap-2">
          <p className="text-gray-400 text-sm">Тақырып таңдаңыз</p>
          <ChevronRight className="w-4 h-4 text-gray-600" />
          <p className="text-white text-sm font-medium">{subject.title}</p>
        </div>
        <TopicGrid topics={subject.topics} onSelect={handleTopicSelect} />
      </div>

      <BonusModal open={showBonus} onClose={handleBonusClose} />
      <ConfirmModal
        open={showConfirm}
        title="Ойынды аяқтағыңыз келе ме?"
        onConfirm={handleHomeConfirm}
        onCancel={() => setShowConfirm(false)}
      />
    </main>
  );
}

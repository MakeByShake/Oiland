"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Loader2 } from "lucide-react";
import { v4 as uuid } from "uuid";
import { Player } from "@/data/types";
import { PlayerCard } from "@/components/game/PlayerCard";
import { useGameStore } from "@/hooks/useGameStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function createPlayer(): Player {
  return { id: uuid(), name: "", subjectId: "informatika" };
}

export default function GameRegisterPage() {
  const [players, setPlayers] = useState<Player[]>([createPlayer(), createPlayer()]);
  const [loading, setLoading] = useState(false);
  const { setPlayers: storePlayers } = useGameStore();
  const router = useRouter();

  const addPlayer = () => setPlayers((p) => [...p, createPlayer()]);

  const removePlayer = (id: string) => setPlayers((p) => p.filter((x) => x.id !== id));

  const updatePlayer = (id: string, field: keyof Player, value: string) =>
    setPlayers((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));

  const handleStart = () => {
    const unnamed = players.findIndex((p) => !p.name.trim());
    if (unnamed !== -1) {
      toast.error(`${unnamed + 1}-ші ойыншының атын енгізіңіз`);
      return;
    }
    setLoading(true);
    storePlayers(players);
    router.push("/game/play");
  };

  return (
    <main className="min-h-screen bg-gray-950 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-violet-900/15 blur-3xl" />
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
          <h1 className="text-lg font-bold text-white">Ойыншылар</h1>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-6 pb-36 space-y-4">
        <p className="text-gray-400 text-sm">Ойыншыларды қосыңыз (кем дегенде 2)</p>

        {players.map((player, idx) => (
          <PlayerCard
            key={player.id}
            player={player}
            index={idx}
            canRemove={players.length > 2}
            onChange={updatePlayer}
            onRemove={removePlayer}
          />
        ))}

        <button
          onClick={addPlayer}
          className="w-full h-14 flex items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-700 hover:border-violet-600 hover:bg-violet-900/10 text-gray-400 hover:text-white transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Ойыншы қосу</span>
        </button>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-gray-950 via-gray-950/90 to-transparent">
        <div className="max-w-2xl mx-auto">
          <Button
            onClick={handleStart}
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-bold text-lg shadow-lg shadow-purple-900/40 transition-all disabled:opacity-70"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Жүктелуде...
              </span>
            ) : "Бастау"}
          </Button>
        </div>
      </div>
    </main>
  );
}

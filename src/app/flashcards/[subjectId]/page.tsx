"use client";
import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { getSubjectById } from "@/data/subjects";
import { TopicSelector } from "@/components/flashcards/TopicSelector";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SubjectTopicsPage({ params }: { params: Promise<{ subjectId: string }> }) {
  const { subjectId } = use(params);
  const subject = getSubjectById(subjectId);
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  if (!subject) {
    return (
      <main className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-gray-400">Пән табылмады</p>
      </main>
    );
  }

  const toggleTopic = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const handleStart = () => {
    if (selected.length === 0) {
      toast.error("Кем дегенде бір тақырып таңдаңыз");
      return;
    }
    setLoading(true);
    const ids = selected.join(",");
    router.push(`/flashcards/${subjectId}/learn?topics=${ids}`);
  };

  return (
    <main className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gray-950/90 backdrop-blur-md border-b border-gray-800/60">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            href="/flashcards"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors rounded-xl p-2 hover:bg-gray-800/60"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Артқа</span>
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-white truncate">{subject.title}</h1>
          </div>
          {selected.length > 0 && (
            <span className="px-2.5 py-1 rounded-full bg-emerald-900/60 border border-emerald-600/50 text-emerald-400 text-xs font-bold">
              {selected.length}
            </span>
          )}
        </div>
      </div>

      {/* Topics */}
      <div className="max-w-2xl mx-auto px-4 py-6 pb-32">
        <p className="text-gray-400 text-sm mb-4">Тақырыптарды таңдаңыз</p>
        <TopicSelector topics={subject.topics} selected={selected} onToggle={toggleTopic} />
      </div>

      {/* Bottom button */}
      <div className="fixed bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-gray-950 via-gray-950/90 to-transparent">
        <div className="max-w-2xl mx-auto">
          <Button
            onClick={handleStart}
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-lg shadow-lg shadow-emerald-900/40 transition-all disabled:opacity-70"
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

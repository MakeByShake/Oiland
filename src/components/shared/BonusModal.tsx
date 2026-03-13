"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Gift } from "lucide-react";

const BONUSES = [
  "30 секунд дәптерге қарауға болады",
  "Кабинеттегі бір адамнан сұрауға болады",
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export function BonusModal({ open, onClose }: Props) {
  const [bonus, setBonus] = useState("");

  useEffect(() => {
    if (open) {
      setBonus(BONUSES[Math.floor(Math.random() * BONUSES.length)]);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="bg-gray-900 border border-emerald-700 text-white max-w-sm mx-4 text-center">
        <div className="flex flex-col items-center gap-6 py-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-900/50">
            <Gift className="w-10 h-10 text-white" />
          </div>
          <div>
            <p className="text-emerald-400 text-sm font-medium uppercase tracking-widest mb-2">Бонус!</p>
            <p className="text-white text-xl font-bold leading-snug">{bonus}</p>
          </div>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
          >
            Жабу
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";
import { Player } from "@/data/types";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X, User } from "lucide-react";
import { subjects } from "@/data/subjects";

interface Props {
  player: Player;
  index: number;
  canRemove: boolean;
  onChange: (id: string, field: keyof Player, value: string) => void;
  onRemove: (id: string) => void;
}

export function PlayerCard({ player, index, canRemove, onChange, onRemove }: Props) {
  return (
    <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-md">
            <User className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-semibold">{index + 1}-ші ойыншы</span>
        </div>
        {canRemove && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(player.id)}
            className="text-gray-500 hover:text-red-400 hover:bg-red-900/20 rounded-lg w-8 h-8"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <Input
        placeholder="Аты-жөні"
        value={player.name}
        onChange={(e) => onChange(player.id, "name", e.target.value)}
        className="bg-gray-900/60 border-gray-600 text-white placeholder:text-gray-500 focus:border-emerald-500 rounded-xl h-11"
      />

      <Select
        value={player.subjectId}
        onValueChange={(v) => v && onChange(player.id, "subjectId", v)}
      >
        <SelectTrigger className="bg-gray-900/60 border-gray-600 text-white rounded-xl h-11 focus:ring-emerald-500">
          <SelectValue placeholder="Пән таңдаңыз" />
        </SelectTrigger>
        <SelectContent className="bg-gray-900 border-gray-700 text-white">
          {subjects.map((s) => (
            <SelectItem key={s.id} value={s.id} className="focus:bg-emerald-900/40 focus:text-white">
              {s.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

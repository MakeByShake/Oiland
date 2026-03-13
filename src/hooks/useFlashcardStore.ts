"use client";
import { create } from "zustand";
import { Question } from "@/data/types";

interface FlashcardStore {
  activeCards: Question[];
  memorizedIds: Set<string>;
  currentIndex: number;
  isFlipped: boolean;
  isFinished: boolean;

  initSession: (questions: Question[]) => void;
  flip: () => void;
  markMemorized: () => void;
  markNotMemorized: () => void;
  reset: () => void;
}

export const useFlashcardStore = create<FlashcardStore>((set, get) => ({
  activeCards: [],
  memorizedIds: new Set(),
  currentIndex: 0,
  isFlipped: false,
  isFinished: false,

  initSession: (questions) =>
    set({
      activeCards: [...questions],
      memorizedIds: new Set(),
      currentIndex: 0,
      isFlipped: false,
      isFinished: false,
    }),

  flip: () => set((s) => ({ isFlipped: !s.isFlipped })),

  markMemorized: () => {
    const { activeCards, currentIndex, memorizedIds } = get();
    const card = activeCards[currentIndex];
    const newMemorized = new Set(memorizedIds);
    newMemorized.add(card.id);
    const remaining = activeCards.filter((c) => !newMemorized.has(c.id));
    if (remaining.length === 0) {
      set({ isFinished: true, memorizedIds: newMemorized });
      return;
    }
    const nextIndex = currentIndex % remaining.length;
    set({ activeCards: remaining, memorizedIds: newMemorized, currentIndex: nextIndex, isFlipped: false });
  },

  markNotMemorized: () => {
    const { activeCards, currentIndex } = get();
    const nextIndex = (currentIndex + 1) % activeCards.length;
    set({ currentIndex: nextIndex, isFlipped: false });
  },

  reset: () =>
    set({ activeCards: [], memorizedIds: new Set(), currentIndex: 0, isFlipped: false, isFinished: false }),
}));

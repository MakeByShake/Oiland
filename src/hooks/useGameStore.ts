"use client";
import { create } from "zustand";
import { Player } from "@/data/types";

interface GameStore {
  players: Player[];
  currentPlayerIndex: number;
  usedQuestions: Record<string, string[]>; // topicId -> questionIds
  setPlayers: (players: Player[]) => void;
  nextPlayer: () => void;
  markQuestionUsed: (topicId: string, questionId: string) => void;
  getUsedQuestions: (topicId: string) => string[];
  resetGame: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  players: [],
  currentPlayerIndex: 0,
  usedQuestions: {},

  setPlayers: (players) => set({ players, currentPlayerIndex: 0, usedQuestions: {} }),

  nextPlayer: () =>
    set((state) => ({
      currentPlayerIndex: (state.currentPlayerIndex + 1) % state.players.length,
    })),

  markQuestionUsed: (topicId, questionId) =>
    set((state) => {
      const existing = state.usedQuestions[topicId] ?? [];
      return {
        usedQuestions: {
          ...state.usedQuestions,
          [topicId]: [...existing, questionId],
        },
      };
    }),

  getUsedQuestions: (topicId) => get().usedQuestions[topicId] ?? [],

  resetGame: () =>
    set({ players: [], currentPlayerIndex: 0, usedQuestions: {} }),
}));

import { useState, useCallback } from "react";
import { submitGuess } from "@/server/guess";
import type { GameState, GuessResult } from "@/types";

const STORAGE_KEY = "geodle-state";
const MAX_GUESSES = 6;

function loadState(puzzleNumber: number): GameState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return freshState(puzzleNumber);
    const saved = JSON.parse(raw) as GameState;
    if (saved.puzzle_number !== puzzleNumber) return freshState(puzzleNumber);
    return saved;
  } catch {
    return freshState(puzzleNumber);
  }
}

function freshState(puzzleNumber: number): GameState {
  return { puzzle_number: puzzleNumber, guesses: [], status: "playing" };
}

function persist(state: GameState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useGameState(puzzleNumber: number) {
  const [state, setState] = useState<GameState>(() => loadState(puzzleNumber));

  const guess = useCallback(
    async (code: string) => {
      if (state.status !== "playing") return;

      const guessNumber = state.guesses.length + 1;
      const response = await submitGuess({
        data: { code, puzzle_number: puzzleNumber, guess_number: guessNumber },
      });

      const result: GuessResult = {
        code,
        name: response.guess_name,
        correct: response.correct,
        distance_km: response.distance_km,
        direction: response.direction,
        bearing: response.bearing,
      };

      setState((prev) => {
        const guesses = [...prev.guesses, result];
        const status = response.correct
          ? "won"
          : guesses.length >= MAX_GUESSES
            ? "lost"
            : "playing";
        const next: GameState = { ...prev, guesses, status };
        persist(next);
        return next;
      });

      return response;
    },
    [state.status, state.guesses.length, puzzleNumber],
  );

  return { ...state, guess };
}

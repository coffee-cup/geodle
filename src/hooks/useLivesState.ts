import { useState, useCallback } from "react";
import { submitLivesGuess } from "@/server/lives";
import type { LivesGameState, LivesSessionData, GuessResult, SilhouetteData } from "@/types";

const MAX_LIVES = 10;
const MAX_ROUND_GUESSES = 3;

function initState(session: LivesSessionData): LivesGameState {
  return {
    seed: session.seed,
    round: session.round,
    lives: MAX_LIVES,
    score: 0,
    currentGuesses: [],
    roundStatus: "guessing",
    status: "playing",
    silhouette: session.silhouette,
  };
}

export function useLivesState(session: LivesSessionData) {
  const [state, setState] = useState<LivesGameState>(() => initState(session));
  const [nextSilhouette, setNextSilhouette] = useState<SilhouetteData | null>(null);
  const [nextRound, setNextRound] = useState<number | null>(null);

  const guess = useCallback(
    async (code: string) => {
      if (state.status !== "playing" || state.roundStatus !== "guessing") return;

      const guessNumber = state.currentGuesses.length + 1;
      const response = await submitLivesGuess({
        data: {
          seed: state.seed,
          round: state.round,
          code,
          guess_number: guessNumber,
        },
      });

      const result: GuessResult = {
        code,
        name: response.guess_name,
        correct: response.correct,
        distance_km: response.distance_km,
        direction: response.direction,
        bearing: response.bearing,
      };

      if (response.next_silhouette) {
        setNextSilhouette(response.next_silhouette);
        setNextRound(response.next_round ?? null);
      }

      setState((prev) => {
        const currentGuesses = [...prev.currentGuesses, result];
        const livesLost = response.round_over && !response.correct ? 1 : 0;
        const lives = prev.lives - livesLost;
        const score = response.correct ? prev.score + 1 : prev.score;
        const gameover = response.round_over && lives <= 0;

        return {
          ...prev,
          currentGuesses,
          lives,
          score,
          roundStatus: response.round_over ? "revealed" : "guessing",
          status: gameover ? "gameover" : "playing",
          answerName: response.round_over ? response.answer_name : prev.answerName,
        };
      });

      return response;
    },
    [state.status, state.roundStatus, state.currentGuesses.length, state.seed, state.round],
  );

  const advanceRound = useCallback(() => {
    if (!nextSilhouette || nextRound === null) return;
    const sil = nextSilhouette;
    const rnd = nextRound;
    setNextSilhouette(null);
    setNextRound(null);
    setState((prev) => ({
      ...prev,
      round: rnd,
      currentGuesses: [],
      roundStatus: "guessing",
      answerName: undefined,
      silhouette: sil,
    }));
  }, [nextSilhouette, nextRound]);

  const restart = useCallback((newSession: LivesSessionData) => {
    setNextSilhouette(null);
    setNextRound(null);
    setState(initState(newSession));
  }, []);

  return {
    ...state,
    maxRoundGuesses: MAX_ROUND_GUESSES,
    guess,
    advanceRound,
    restart,
  };
}

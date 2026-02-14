import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Silhouette } from "@/components/Silhouette";
import { GuessInput } from "@/components/GuessInput";
import { GuessList } from "@/components/GuessList";
import { LivesIndicator } from "@/components/LivesIndicator";
import { useLivesState } from "@/hooks/useLivesState";
import { startLivesSession } from "@/server/lives";
import type { Difficulty, LivesSessionData } from "@/types";

export const Route = createFileRoute("/lives")({
  component: LivesPage,
});

const DIFFICULTIES: { value: Difficulty; label: string }[] = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];
const LIVES_OPTIONS = [3, 5, 10];

function LivesPage() {
  const [session, setSession] = useState<LivesSessionData | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [maxLives, setMaxLives] = useState(5);
  const [starting, setStarting] = useState(false);

  const handleStart = async () => {
    setStarting(true);
    try {
      const s = await startLivesSession({ data: { difficulty } });
      setSession(s);
    } finally {
      setStarting(false);
    }
  };

  if (session) {
    return (
      <LivesGame
        key={session.seed}
        session={session}
        maxLives={maxLives}
        onBack={() => setSession(null)}
      />
    );
  }

  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="sketch-border bg-paper border border-border p-8 max-w-sm w-full space-y-6 text-center -rotate-[0.3deg]">
          <h2 className="text-2xl font-serif font-bold text-ink text-balance">
            Lives Mode
          </h2>

          <fieldset className="space-y-2">
            <legend className="text-sm font-semibold text-ink-muted uppercase tracking-wide">
              Difficulty
            </legend>
            <div className="flex sketch-border overflow-hidden mx-auto w-fit">
              {DIFFICULTIES.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setDifficulty(opt.value)}
                  className={`px-4 py-1.5 text-sm font-semibold transition-colors
                    ${opt.value === difficulty
                      ? "bg-accent text-white"
                      : "bg-paper text-ink-muted hover:text-ink"
                    }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="space-y-2">
            <legend className="text-sm font-semibold text-ink-muted uppercase tracking-wide">
              Lives
            </legend>
            <div className="flex sketch-border overflow-hidden mx-auto w-fit">
              {LIVES_OPTIONS.map((n) => (
                <button
                  key={n}
                  onClick={() => setMaxLives(n)}
                  className={`px-4 py-1.5 text-sm font-semibold transition-colors tabular-nums
                    ${n === maxLives
                      ? "bg-accent text-white"
                      : "bg-paper text-ink-muted hover:text-ink"
                    }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </fieldset>

          <button
            onClick={handleStart}
            disabled={starting}
            className="sketch-border px-8 py-2.5 bg-accent text-white font-semibold
              hover:bg-accent-hover active:bg-accent-hover/90 transition-colors
              disabled:opacity-50"
          >
            {starting ? "Starting\u2026" : "Start"}
          </button>
        </div>
      </main>
    </div>
  );
}

function LivesGame({
  session,
  maxLives,
  onBack,
}: {
  session: LivesSessionData;
  maxLives: number;
  onBack: () => void;
}) {
  const game = useLivesState(session, maxLives);

  const handleGuess = async (code: string) => {
    await game.guess(code);
  };

  const canAdvance = game.roundStatus === "revealed" && game.status === "playing";

  const inputDisabled = game.status === "gameover";

  const inputPlaceholder =
    game.status === "gameover" ? "Game over" :
    game.roundStatus === "revealed" ? "Round over" :
    undefined;

  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center gap-6 px-4 py-8 max-w-lg mx-auto w-full">
        <LivesIndicator
          lives={game.lives}
          maxLives={maxLives}
          score={game.score}
          round={game.round}
        />

        <Silhouette svg={game.silhouette.svg} />

        <GuessInput
          onSubmit={handleGuess}
          disabled={inputDisabled}
          disabledPlaceholder={inputPlaceholder}
          onEnterIdle={canAdvance ? game.advanceRound : undefined}
        />

        <GuessList
          guesses={game.currentGuesses}
          maxGuesses={game.maxRoundGuesses}
        />

        {game.roundStatus === "revealed" && game.status === "playing" && (
          <div className="text-center space-y-3">
            <p className="text-ink-muted text-pretty">
              {game.currentGuesses.some((g) => g.correct)
                ? "Correct!"
                : <>The answer was <strong className="text-ink">{game.answerName}</strong></>}
            </p>
            <button
              onClick={game.advanceRound}
              className="sketch-border px-6 py-2.5 bg-accent text-white font-semibold
                hover:bg-accent-hover active:bg-accent-hover/90 transition-colors"
            >
              Next country
            </button>
          </div>
        )}

        {game.status === "gameover" && (
          <div className="sketch-border bg-paper border border-border p-8 max-w-md w-full space-y-4 text-center -rotate-[0.3deg]">
            <h2 className="text-2xl font-bold text-ink text-balance">
              Game Over
            </h2>
            <p className="text-ink-muted text-pretty">
              {game.answerName && !game.currentGuesses.some((g) => g.correct) && (
                <>The answer was <strong className="text-ink">{game.answerName}</strong>. </>
              )}
              Final score: <strong className="text-ink">{game.score}</strong> countries
            </p>
            <button
              onClick={onBack}
              className="sketch-border px-6 py-2.5 bg-accent text-white font-semibold
                hover:bg-accent-hover active:bg-accent-hover/90 transition-colors"
            >
              Play again
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

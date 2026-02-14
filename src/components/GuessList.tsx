import { directionArrow } from "@/lib/geo";
import type { GuessResult } from "@/types";

interface GuessListProps {
  guesses: GuessResult[];
  maxGuesses: number;
}

export function GuessList({ guesses, maxGuesses }: GuessListProps) {
  return (
    <div className="w-full max-w-sm mx-auto space-y-2">
      {guesses.map((guess, i) => (
        <div
          key={i}
          className={`sketch-border flex items-center justify-between px-4 py-3 border
            ${
              guess.correct
                ? "bg-correct-light border-correct/30"
                : "bg-surface/60 border-border"
            }`}
        >
          <span className="text-ink font-medium">
            {guess.name}
          </span>
          <div className="flex items-center gap-3 text-sm">
            {guess.correct ? (
              <span className="text-correct font-semibold">Correct!</span>
            ) : (
              <>
                <span className="text-ink-muted font-mono tabular-nums">
                  {guess.distance_km.toLocaleString()} km
                </span>
                <span className="text-lg" title={guess.direction}>
                  {directionArrow(guess.direction)}
                </span>
              </>
            )}
          </div>
        </div>
      ))}

      {Array.from({ length: maxGuesses - guesses.length }).map((_, i) => (
        <div
          key={`empty-${i}`}
          className="sketch-border flex items-center px-4 py-3 min-h-[54px] border border-dashed border-border"
        >
          <span className="text-ink-muted/40">
            Guess {guesses.length + i + 1}
          </span>
        </div>
      ))}
    </div>
  );
}

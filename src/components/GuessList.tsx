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
          className={`flex items-center justify-between px-4 py-3 rounded-lg border
            ${
              guess.correct
                ? "bg-green-50 border-green-300"
                : "bg-white/60 border-stone-200"
            }`}
        >
          <span className="font-serif text-stone-800 font-medium">
            {guess.name}
          </span>
          <div className="flex items-center gap-3 text-sm">
            {guess.correct ? (
              <span className="text-green-600 font-semibold">Correct!</span>
            ) : (
              <>
                <span className="text-stone-500 font-mono">
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

      {/* Empty slots */}
      {Array.from({ length: maxGuesses - guesses.length }).map((_, i) => (
        <div
          key={`empty-${i}`}
          className="flex items-center px-4 py-3 rounded-lg border border-dashed border-stone-200"
        >
          <span className="text-stone-300 font-serif">
            Guess {guesses.length + i + 1}
          </span>
        </div>
      ))}
    </div>
  );
}

import type { GuessResult } from "@/types";

const DISTANCE_THRESHOLDS = [500, 1500, 3000, 6000, 12000];

function guessToEmoji(guess: GuessResult): string {
  if (guess.correct) return "🟩";
  const idx = DISTANCE_THRESHOLDS.findIndex((t) => guess.distance_km <= t);
  if (idx === -1) return "⬛";
  return ["🟩", "🟨", "🟧", "🟥", "🟫"][idx];
}

export function buildShareText(
  guesses: GuessResult[],
  puzzleNumber: number,
  won: boolean,
): string {
  const score = won ? `${guesses.length}/6` : "X/6";
  const grid = guesses.map(guessToEmoji).join("");
  return `Geodle #${puzzleNumber} ${score}\n${grid}`;
}

interface ShareGridProps {
  guesses: GuessResult[];
  puzzleNumber: number;
  won: boolean;
}

export function ShareGrid({ guesses, puzzleNumber, won }: ShareGridProps) {
  const text = buildShareText(guesses, puzzleNumber, won);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <div className="text-center space-y-3">
      <pre className="font-mono text-lg leading-relaxed">{text}</pre>
      <button
        onClick={handleCopy}
        className="px-6 py-2 bg-amber-600 text-white rounded-lg font-serif
          hover:bg-amber-700 active:bg-amber-800 transition-colors"
      >
        Copy to clipboard
      </button>
    </div>
  );
}

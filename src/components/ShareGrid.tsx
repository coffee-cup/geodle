import { useState } from "react";
import type { GuessResult } from "@/types";

const DISTANCE_THRESHOLDS = [1000, 3000];

function guessToEmoji(guess: GuessResult): string {
  if (guess.correct) return "🟩";
  const idx = DISTANCE_THRESHOLDS.findIndex((t) => guess.distance_km <= t);
  if (idx === -1) return "🟥";
  return ["🟨", "🟧"][idx];
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
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="text-center space-y-3">
      <pre className="font-mono text-lg leading-relaxed">{text}</pre>
      <button
        onClick={handleCopy}
        className="sketch-border px-6 py-2.5 bg-accent text-white font-semibold
          hover:bg-accent-hover active:bg-accent-hover/90 transition-colors"
      >
        {copied ? "Copied!" : "Copy to clipboard"}
      </button>
    </div>
  );
}

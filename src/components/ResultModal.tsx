import { useEffect, useState } from "react";
import { ShareGrid } from "./ShareGrid";
import type { GuessResult } from "@/types";

interface ResultModalProps {
  open: boolean;
  won: boolean;
  answerName?: string;
  guesses: GuessResult[];
  puzzleNumber: number;
  onClose: () => void;
}

function getNextPuzzleCountdown(): string {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setUTCHours(24, 0, 0, 0);
  const diff = tomorrow.getTime() - now.getTime();

  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return `${h}h ${m}m ${s}s`;
}

export function ResultModal({
  open,
  won,
  answerName,
  guesses,
  puzzleNumber,
  onClose,
}: ResultModalProps) {
  const [countdown, setCountdown] = useState(getNextPuzzleCountdown());

  useEffect(() => {
    if (!open) return;
    const id = setInterval(() => setCountdown(getNextPuzzleCountdown()), 1000);
    return () => clearInterval(id);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="sketch-border bg-paper border border-border p-8 mx-4 max-w-md w-full space-y-6 -rotate-[0.3deg]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-ink text-center text-balance">
          {won ? "Well done!" : "Not this time"}
        </h2>

        {!won && answerName && (
          <p className="text-center text-ink-muted text-pretty">
            The answer was <strong className="text-ink">{answerName}</strong>
          </p>
        )}

        <ShareGrid guesses={guesses} puzzleNumber={puzzleNumber} won={won} />

        <p className="text-center text-ink-muted text-sm tabular-nums">
          Next puzzle in {countdown}
        </p>

        <button
          onClick={onClose}
          className="w-full py-2 text-ink-muted hover:text-ink transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}

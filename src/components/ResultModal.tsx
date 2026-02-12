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
        className="bg-[#f5f0e8] rounded-2xl shadow-2xl p-8 mx-4 max-w-md w-full space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-serif font-bold text-stone-800 text-center">
          {won ? "Well done!" : "Not this time"}
        </h2>

        {!won && answerName && (
          <p className="text-center text-stone-600 font-serif">
            The answer was <strong className="text-stone-800">{answerName}</strong>
          </p>
        )}

        <ShareGrid guesses={guesses} puzzleNumber={puzzleNumber} won={won} />

        <p className="text-center text-stone-500 text-sm">
          Next puzzle in {countdown}
        </p>

        <button
          onClick={onClose}
          className="w-full py-2 text-stone-500 hover:text-stone-700 font-serif transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { RESET_HOUR_UTC } from "@/lib/puzzle";

function getNextPuzzleCountdown(): string {
  const now = new Date();
  const target = new Date(now);
  target.setUTCHours(RESET_HOUR_UTC, 0, 0, 0);
  if (target.getTime() <= now.getTime()) {
    target.setUTCDate(target.getUTCDate() + 1);
  }
  const diff = target.getTime() - now.getTime();

  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return `${h}h ${m}m ${s}s`;
}

export function Countdown({ className }: { className?: string }) {
  const [countdown, setCountdown] = useState(getNextPuzzleCountdown());

  useEffect(() => {
    const id = setInterval(() => setCountdown(getNextPuzzleCountdown()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className={`text-ink-muted text-sm tabular-nums ${className ?? ""}`}>
      Next puzzle in {countdown}
    </p>
  );
}

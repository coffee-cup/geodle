interface LivesIndicatorProps {
  lives: number;
  maxLives: number;
  score: number;
  round: number;
}

export function LivesIndicator({ lives, maxLives, score, round }: LivesIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-6 text-sm font-medium text-ink-muted">
      <span className="tabular-nums">
        <span className="text-red-500">{"♥".repeat(lives)}</span>
        <span className="text-ink-muted/30">{"♥".repeat(Math.max(0, maxLives - lives))}</span>
      </span>
      <span className="tabular-nums">
        Score: <span className="text-ink font-semibold">{score}</span>
      </span>
      <span className="tabular-nums">
        Round {round + 1}
      </span>
    </div>
  );
}

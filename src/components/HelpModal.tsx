interface HelpModalProps {
  open: boolean;
  onClose: () => void;
}

export function HelpModal({ open, onClose }: HelpModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="sketch-border bg-paper border border-border p-8 mx-4 max-w-md w-full space-y-4 -rotate-[0.3deg]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-ink text-balance">
          How to Play
        </h2>

        <div className="space-y-3 text-ink-muted leading-relaxed text-pretty">
          <p>Guess the country from its silhouette in 6 tries.</p>
          <p>
            After each guess, you&apos;ll see how far away your guess is and in
            which direction the answer lies.
          </p>
          <div className="space-y-1 text-sm">
            <p>
              <span className="inline-block w-6">🟩</span> Very close (under 500 km)
            </p>
            <p>
              <span className="inline-block w-6">🟨</span> Close (under 1,500 km)
            </p>
            <p>
              <span className="inline-block w-6">🟧</span> Moderate (under 3,000 km)
            </p>
            <p>
              <span className="inline-block w-6">🟥</span> Far (under 6,000 km)
            </p>
            <p>
              <span className="inline-block w-6">⬛</span> Very far
            </p>
          </div>
          <p>A new puzzle is available every day at midnight UTC.</p>
        </div>

        <button
          onClick={onClose}
          className="sketch-border w-full py-2.5 bg-accent text-white font-semibold
            hover:bg-accent-hover transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

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
        className="bg-[#f5f0e8] rounded-2xl shadow-2xl p-8 mx-4 max-w-md w-full space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-serif font-bold text-stone-800">
          How to Play
        </h2>

        <div className="space-y-3 text-stone-600 font-serif leading-relaxed">
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
          className="w-full py-2 bg-amber-600 text-white rounded-lg font-serif
            hover:bg-amber-700 transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";

export const Route = createFileRoute("/help")({
  component: HelpPage,
});

function HelpPage() {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center px-4 py-8 max-w-lg mx-auto w-full">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-ink text-balance">
              How to Play
            </h2>
            <p className="mt-2 text-ink-muted leading-relaxed text-pretty">
              Guess the country from its silhouette in 6 tries. A new puzzle
              is available every day at midnight UTC.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-ink">Hints</h3>
            <p className="text-ink-muted text-pretty">
              After each guess, you&apos;ll see the distance to the answer and
              an arrow pointing in its direction.
            </p>
            <div className="space-y-1 text-sm">
              <div className="sketch-border flex items-center justify-between px-4 py-3 border border-border bg-surface/60">
                <span className="text-ink font-medium">Brazil</span>
                <span className="flex items-center gap-3">
                  <span className="text-ink-muted font-mono tabular-nums">4,230 km</span>
                  <span className="text-lg">↗️</span>
                </span>
              </div>
              <p className="text-ink-muted text-pretty px-1 py-1">
                The answer is 4,230 km northeast of Brazil.
              </p>
              <div className="sketch-border flex items-center justify-between px-4 py-3 border border-border bg-surface/60">
                <span className="text-ink font-medium">Spain</span>
                <span className="flex items-center gap-3">
                  <span className="text-ink-muted font-mono tabular-nums">1,120 km</span>
                  <span className="text-lg">⬇️</span>
                </span>
              </div>
              <p className="text-ink-muted text-pretty px-1 py-1">
                Getting warmer — the answer is 1,120 km south of Spain.
              </p>
              <div className="sketch-border flex items-center justify-between px-4 py-3 border border-correct/30 bg-correct-light">
                <span className="text-ink font-medium">Morocco</span>
                <span className="text-correct font-semibold">Correct!</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-ink">Scoring</h3>
            <p className="text-ink-muted text-pretty">
              Distance is measured between country centers. The color indicates
              how close your guess is.
            </p>
            <div className="space-y-1 text-sm text-ink-muted">
              <p><span className="inline-block w-6">🟩</span> Correct</p>
              <p><span className="inline-block w-6">🟨</span> Under 1,000 km</p>
              <p><span className="inline-block w-6">🟧</span> Under 3,000 km</p>
              <p><span className="inline-block w-6">🟥</span> 3,000+ km</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Silhouette } from "@/components/Silhouette";
import { GuessInput } from "@/components/GuessInput";
import { GuessList } from "@/components/GuessList";
import { LivesIndicator } from "@/components/LivesIndicator";
import { useLivesState } from "@/hooks/useLivesState";
import { startLivesSession } from "@/server/lives";

export const Route = createFileRoute("/lives")({
  loader: () => startLivesSession(),
  component: LivesPage,
});

function LivesPage() {
  const session = Route.useLoaderData();
  const router = useRouter();
  const game = useLivesState(session);

  const handleGuess = async (code: string) => {
    await game.guess(code);
  };

  const handlePlayAgain = async () => {
    await router.invalidate();
  };

  const inputDisabled =
    game.status === "gameover" || game.roundStatus === "revealed";

  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center gap-6 px-4 py-8 max-w-lg mx-auto w-full">
        <LivesIndicator
          lives={game.lives}
          score={game.score}
          round={game.round}
        />

        <Silhouette svg={game.silhouette.svg} />

        <GuessInput onSubmit={handleGuess} disabled={inputDisabled} />

        <GuessList
          guesses={game.currentGuesses}
          maxGuesses={game.maxRoundGuesses}
        />

        {game.roundStatus === "revealed" && game.status === "playing" && (
          <div className="text-center space-y-3">
            <p className="text-ink-muted text-pretty">
              {game.currentGuesses.some((g) => g.correct)
                ? "Correct!"
                : <>The answer was <strong className="text-ink">{game.answerName}</strong></>}
            </p>
            <button
              onClick={game.advanceRound}
              className="sketch-border px-6 py-2.5 bg-accent text-white font-semibold
                hover:bg-accent-hover active:bg-accent-hover/90 transition-colors"
            >
              Next country
            </button>
          </div>
        )}

        {game.status === "gameover" && (
          <div className="sketch-border bg-paper border border-border p-8 max-w-md w-full space-y-4 text-center -rotate-[0.3deg]">
            <h2 className="text-2xl font-bold text-ink text-balance">
              Game Over
            </h2>
            <p className="text-ink-muted text-pretty">
              {game.answerName && !game.currentGuesses.some((g) => g.correct) && (
                <>The answer was <strong className="text-ink">{game.answerName}</strong>. </>
              )}
              Final score: <strong className="text-ink">{game.score}</strong> countries
            </p>
            <button
              onClick={handlePlayAgain}
              className="sketch-border px-6 py-2.5 bg-accent text-white font-semibold
                hover:bg-accent-hover active:bg-accent-hover/90 transition-colors"
            >
              Play again
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

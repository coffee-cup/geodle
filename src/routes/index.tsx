import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { getDailySilhouette } from "@/server/silhouette";
import { Header } from "@/components/Header";
import { Silhouette } from "@/components/Silhouette";
import { GuessInput } from "@/components/GuessInput";
import { GuessList } from "@/components/GuessList";
import { ResultModal } from "@/components/ResultModal";
import { useGameState } from "@/hooks/useGameState";

export const Route = createFileRoute("/")({
  loader: () => getDailySilhouette(),
  component: GamePage,
});

function GamePage() {
  const { silhouette, puzzleNumber } = Route.useLoaderData();
  const game = useGameState(puzzleNumber);
  const [modalOpen, setModalOpen] = useState(false);
  const [answerName, setAnswerName] = useState<string>();

  const handleGuess = async (code: string) => {
    const response = await game.guess(code);
    if (!response) return;
    if (response.correct || game.guesses.length + 1 >= 6) {
      setAnswerName(response.answer_name);
      setTimeout(() => setModalOpen(true), 600);
    }
  };

  const gameOver = game.status !== "playing";

  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center gap-6 px-4 py-8 max-w-lg mx-auto w-full">
        <Silhouette geometry={silhouette.geometry} />
        <GuessInput onSubmit={handleGuess} disabled={gameOver} />
        <GuessList guesses={game.guesses} maxGuesses={6} />
        {gameOver && !modalOpen && (
          <button
            onClick={() => setModalOpen(true)}
            className="text-accent hover:text-accent-hover font-medium underline underline-offset-2 transition-colors"
          >
            View results
          </button>
        )}
      </main>
      <ResultModal
        open={modalOpen}
        won={game.status === "won"}
        answerName={answerName}
        guesses={game.guesses}
        puzzleNumber={puzzleNumber}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}

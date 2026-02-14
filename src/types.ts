export type Difficulty = "easy" | "medium" | "hard";

export interface CountryMeta {
  code: string;
  name: string;
  aliases: string[];
  centroid: [lon: number, lat: number];
  difficulty: Difficulty;
}

export interface CountryListItem {
  code: string;
  name: string;
}

export interface GuessResult {
  code: string;
  name: string;
  correct: boolean;
  distance_km: number;
  direction: string;
  bearing: number;
}

export interface GameState {
  puzzle_number: number;
  guesses: GuessResult[];
  status: "playing" | "won" | "lost";
}

export interface SilhouetteData {
  svg: string;
}

export interface GuessResponse {
  correct: boolean;
  distance_km: number;
  direction: string;
  bearing: number;
  guess_name: string;
  answer_code?: string;
  answer_name?: string;
}

export interface LivesSessionData {
  seed: string;
  silhouette: SilhouetteData;
  round: number;
  difficulty: Difficulty;
}

export interface LivesGuessResponse extends GuessResponse {
  round_over: boolean;
  next_silhouette?: SilhouetteData;
  next_round?: number;
}

export interface LivesGameState {
  seed: string;
  round: number;
  lives: number;
  score: number;
  difficulty: Difficulty;
  currentGuesses: GuessResult[];
  roundStatus: "guessing" | "revealed";
  status: "playing" | "gameover";
  answerName?: string;
  silhouette: SilhouetteData;
}

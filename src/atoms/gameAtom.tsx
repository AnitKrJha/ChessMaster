import { atom } from "recoil";

export interface GameStateType {
  fen: string | null;
  winner?: "w" | "b" | "d" | null;
  turn?: "w" | "b";
  gameMode: "multiplayer" | "passnplay";
  startingColor: "w" | "b";
  boardOrientation: "w" | "b";
  movesPlayed: number;
  moveNumberView: number;
}

export const defaultGameState: GameStateType = {
  fen: null,
  winner: undefined,
  turn: undefined,
  gameMode: "multiplayer",
  startingColor: "w",
  boardOrientation: "w",
  movesPlayed: 0,
  moveNumberView: 0,
};

export const GameState = atom<GameStateType>({
  default: defaultGameState,
  key: "GameState",
});

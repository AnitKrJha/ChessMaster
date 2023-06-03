import { atom } from "recoil";

export interface GameStateType {
  fen: string | null;
  winner?: "w" | "b" | "d" | null;
  turn?: "w" | "b";
  gameMode: "multiplayer" | "passnplay";
  startingColor: "w" | "b";
  boardOrientation: "white" | "black";
  isSpectator?: boolean;
  movesPlayed: number;
  moveNumberView: number;
}

export const defaultGameState: GameStateType = {
  fen: null,
  winner: undefined,
  turn: "w",
  gameMode: "multiplayer",
  startingColor: "w",
  boardOrientation: "white",
  movesPlayed: 0,
  moveNumberView: 0,
};

export const GameState = atom<GameStateType>({
  default: defaultGameState,
  key: "GameState",
});

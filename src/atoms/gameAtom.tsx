import { atom } from "recoil";

export interface GameStateType {
  fen: string | null;
  winner?: "w" | "b" | "d" | null;
  turn?: "w" | "b";
}

export const defaultGameState: GameStateType = {
  fen: null,
  winner: undefined,
  turn: undefined,
};

export const GameState = atom<GameStateType>({
  default: defaultGameState,
  key: "GameState",
});

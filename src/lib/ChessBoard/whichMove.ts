import { Move } from "chess.js";

export type MoveTypes =
  | "capture"
  | "check"
  | "castle"
  | "normal"
  | "promotion"
  | "illegal"
  | "gameover";

export const whichMove = (move: Move, inCheck: boolean): MoveTypes => {
  if (inCheck) return "check";
  if (move.promotion) return "promotion";
  if (move.captured) return "capture";
  if (move.flags === "q" || move.flags === "k") return "castle";
  return "normal";
};

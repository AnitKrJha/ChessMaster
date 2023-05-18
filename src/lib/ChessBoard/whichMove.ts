import { Chess, Move } from "chess.js";
import { Square } from "react-chessboard/dist/chessboard/types";

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
  if (move.flags === "n" || move.flags === "b") return "normal";
  if (move.flags === "c" || move.flags === "e") return "capture";
  if (move.flags === "p") return "promotion";
  if (move.flags === "pc") return "promotion";
  if (move.flags === "q" || move.flags === "k") return "castle";
  return "normal";
};

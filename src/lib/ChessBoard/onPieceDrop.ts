import { Piece, Square } from "react-chessboard/dist/chessboard/types";
import React, { Dispatch, SetStateAction } from "react";
import { Chess } from "chess.js";
import {
  CaptureSound,
  MoveSound,
  IllegalSound,
  PlayChessBoardSound,
} from "../Sounds/ChessBoardSound";
import { whichMove } from "./whichMove";
import { SetterOrUpdater, useSetRecoilState } from "recoil";
import { ModalStateType } from "@/atoms/modalAtom";

const onPieceDrop = (
  source: Square,
  target: Square,
  piece: Piece,
  game: Chess,
  setPosition: Dispatch<SetStateAction<string | null>>,
  setModalState: SetterOrUpdater<ModalStateType>
): boolean => {
  try {
    // const MOVES = game.moves({ verbose: true });

    //play the move
    const MOVE = game.move({
      from: source,
      to: target,
      promotion: "q",
    });

    //check is gameOver
    if (game.isGameOver()) {
      PlayChessBoardSound("gameover");
      setModalState({ open: true, type: "Gameover" });
    }

    //check king is attacked
    const inCheck = game.inCheck();
    const typeOfMove = whichMove(MOVE, inCheck);

    const turn = game.turn();
    console.table({
      source,
      target,
      piece,
      turn,
      typeOfMove,
    });

    console.log("hello", { MOVE });
    PlayChessBoardSound(typeOfMove);

    setPosition(game.fen());
  } catch (e: any) {
    IllegalSound.play();
    console.log(e.message);
  }
  return true;
};

export default onPieceDrop;

"use client";

import { useRef, useState } from "react";
import { Square } from "chess.js/dist/chess";
import Chessboard from "@/lib/Chessboard";
import { getKingPositions } from "@/lib/GetKingSquare";
import { Chess } from "chess.js";
import {
  MoveSound,
  CaptureSound,
  IllegalSound,
} from "@/lib/Sounds/ChessBoardSound";

import GameOverModal from "@/components/Modals/GameOverModal";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ModalState } from "@/atoms/modalAtom";

//Game Logic -> check isGameOver

export default function Home() {
  const CheckCapture = (pieceColor: string, targetSquare: Square) => {
    return !!game.current.get(targetSquare);
  };

  const setModalState = useSetRecoilState(ModalState);
  const resetGame = () => {
    setFen(null);
    game.current.reset();
  };
  const [fen, setFen] = useState<string | null>(null);
  const game = useRef(new Chess());

  const onDrop = (sourceSquare: any, targetSquare: any, piece: any) => {
    try {
      const MOVES = game.current.moves({ verbose: true });

      const isCapture = CheckCapture(piece[0], targetSquare);

      game.current.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });

      const gameOver = game.current.isGameOver();
      const turn = game.current.turn();
      console.log({ MOVES });
      console.table({
        sourceSquare,
        targetSquare,
        piece,
        gameOver,
        turn,
        isCapture,
      });
      isCapture ? CaptureSound.play() : MoveSound.play();
      setFen(game.current.fen());
      if (game.current.isGameOver())
        setModalState({ open: true, type: "Gameover" });
    } catch (e: any) {
      IllegalSound.play();
      console.log(e.message);
    }
    return true;
  };

  return (
    <main className="min-h-[calc(100dvh_-_64px)] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black pt-8 ">
      <Chessboard onPieceDrop={onDrop} position={fen ?? "start"} />
      <span className="result">
        {game.current.isGameOver() && (
          <GameOverModal resetBoard={resetGame} loser={game.current.turn()} />
        )}
      </span>
    </main>
  );
}

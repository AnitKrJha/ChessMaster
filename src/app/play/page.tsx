"use client";

import { useRef, useState } from "react";
import { Square } from "chess.js/dist/chess";
import Chessboard from "@/lib/ChessBoard/Chessboard";
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
import onPieceDrop from "@/lib/ChessBoard/onPieceDrop";

//Game Logic -> check isGameOver

export default function Home() {
  const setModalState = useSetRecoilState(ModalState);
  const resetGame = () => {
    setFen(null);
    game.current.reset();
  };
  const [fen, setFen] = useState<string | null>(null);
  const game = useRef(new Chess());

  const onDrop = (sourceSquare: any, targetSquare: any, piece: any) => {
    return onPieceDrop(
      sourceSquare,
      targetSquare,
      piece,
      game.current,
      setFen,
      setModalState
    );
  };

  return (
    <main className="min-h-[calc(100dvh_-_64px)] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black pt-8 ">
      {/*chessBoard*/}

      <Chessboard onPieceDrop={onDrop} position={fen ?? "start"} />

      {game.current.isGameOver() && (
        <GameOverModal resetBoard={resetGame} loser={game.current.turn()} />
      )}
    </main>
  );
}

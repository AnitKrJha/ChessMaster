"use client";

import { useRef, useState } from "react";
import Chessboard from "@/lib/Chessboard";
import { getKingPositions } from "@/lib/GetKingSquare";
import { Chess } from "chess.js";

export default function Home() {
  const [fen, setFen] = useState<string | null>(null);

  const game = useRef(new Chess());

  return (
    <main className="min-h-[calc(100dvh_-_64px)] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black pt-8">
      <Chessboard
        onDrop={(move: any) => {
          try {
            const MOVE = game.current.moves({ verbose: true });
            const moves = game.current.move({
              from: move.sourceSquare,
              to: move.targetSquare,
              promotion: "q",
            });
            if (game.current.isCheck()) {
              const b: any = getKingPositions(
                game.current.fen(),
                game.current.turn()
              );
            }
            console.log({ MOVE, move });
            setFen(game.current.fen());
          } catch (e: any) {
            console.log(e.message);
          }
        }}
        position={fen ?? "start"}
      />
    </main>
  );
}

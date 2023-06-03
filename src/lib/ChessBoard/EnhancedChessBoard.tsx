"use client";

import { GameState, defaultGameState } from "@/atoms/gameAtom";
import { ModalState } from "@/atoms/modalAtom";
import BoardNavButtons from "@/components/BoardControls/navbuttons";
import GameOverModal from "@/components/Modals/GameOverModal";
import React, { Ref, createRef } from "react";
import { Chessboard } from "react-chessboard";
import { ChessboardProps } from "react-chessboard/dist/chessboard/types";
import { ClearPremoves } from "react-chessboard/dist/index";
import { useRecoilState, useSetRecoilState } from "recoil";
import { game } from "../ChessLogic/Game";
import useScreenWidth from "../utils/useScreenWidth";
import onPieceDrop from "./onPieceDrop";
import { RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "@supabase/auth-ui-shared";
import { useSupabase } from "../Supabase/Providers";

interface ChessboardWrapperProps extends ChessboardProps {
  channel: RealtimeChannel | null;
  gid: string;
}

const ChessBoard: React.FC<ChessboardWrapperProps> = ({
  channel,
  gid,
  ...otherProps
}) => {
  const ref: Ref<ClearPremoves> = createRef<ClearPremoves>();

  const screenWidth = useScreenWidth();
  const { supabase } = useSupabase();
  const setModalState = useSetRecoilState(ModalState);
  const [gameState, setGameState] = useRecoilState(GameState);
  const resetGame = () => {
    setGameState(defaultGameState);
    game.reset();
  };

  const onDrop = (sourceSquare: any, targetSquare: any, piece: any) => {
    return onPieceDrop(
      sourceSquare,
      targetSquare,
      piece,
      game,
      true,
      channel,
      setGameState,
      setModalState,
      gid,
      supabase
    );
  };

  return (
    <div className="max-w-2xl m-auto">
      <Chessboard
        onPieceDrop={onDrop}
        position={gameState.fen ?? "start"}
        // areArrowsAllowed={false}
        boardOrientation={gameState.boardOrientation}
        arePiecesDraggable={game.turn() === gameState.boardOrientation.at(0)}
        customDropSquareStyle={{
          background:
            "linear-gradient(to left,rgba(70, 141, 139,0.8), rgba(15, 85, 99,0.5))",
        }}
        boardWidth={Math.min(screenWidth - 40, 600)}
        customBoardStyle={{
          margin: "auto",

          overflow: "hidden",
        }}
        customDarkSquareStyle={{
          background: "linear-gradient(rgb(27, 69, 89), rgb(65, 85, 99))",
        }}
        customLightSquareStyle={{
          background:
            "linear-gradient(to right, rgb(243, 244, 246), rgb(209, 213, 219))",
        }}
        {...otherProps}
        ref={ref}
      />
      <BoardNavButtons />
      {game.isGameOver() && (
        <GameOverModal resetBoard={resetGame} loser={game.turn()} />
      )}
    </div>
  );
};

export default ChessBoard;

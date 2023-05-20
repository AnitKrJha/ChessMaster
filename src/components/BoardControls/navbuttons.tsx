"use client";

import { GameState } from "@/atoms/gameAtom";
import ChakraButton from "@/lib/Chakra/button";
import Button from "@/lib/Chakra/button";
import { game } from "@/lib/ChessLogic/Game";

import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { before } from "node:test";
import { useRecoilState } from "recoil";

type Props = {};

const STARTING_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

const BoardNavButtons = (props: Props) => {
  const handleChangePosition = (dir: "prev" | "next" | "end" | "start") => {
    let desiredPos: string | undefined;
    const curentIndex = gameState.moveNumberView - 1;

    if (dir === "prev") {
      desiredPos = game.history({ verbose: true }).at(curentIndex)?.before;
      setGameState((p) => ({
        ...p,
        fen: desiredPos as string,
        moveNumberView: p.moveNumberView - 1,
      }));
    } else if (dir === "next") {
      desiredPos = game.history({ verbose: true }).at(curentIndex + 1)?.after;
      setGameState((p) => ({
        ...p,
        fen: desiredPos as string,
        moveNumberView: p.moveNumberView + 1,
      }));
    } else if (dir === "end") {
      setGameState((p) => ({
        ...p,
        fen: game.fen(),
        moveNumberView: p.movesPlayed,
      }));
    } else {
      setGameState((p) => ({
        ...p,
        fen: STARTING_FEN,
        moveNumberView: 0,
      }));
    }
  };

  const [gameState, setGameState] = useRecoilState(GameState);

  return (
    <div className="w-full justify-center text-white px-5 flex gap-2 my-3">
      <ChakraButton
        variant="outline"
        _hover={{ bg: "gray.800" }}
        isDisabled={gameState.moveNumberView === 0}
        onClick={() => {
          handleChangePosition("start");
        }}
      >
        <ChevronsLeft />
      </ChakraButton>

      <ChakraButton
        variant="outline"
        bg="gray.900"
        _hover={{ bg: "gray.800" }}
        isDisabled={gameState.moveNumberView === 0}
        onClick={() => {
          handleChangePosition("prev");
        }}
      >
        <ChevronLeft />
      </ChakraButton>
      <ChakraButton
        variant="outline"
        _hover={{ bg: "gray.800" }}
        isDisabled={gameState.moveNumberView === gameState.movesPlayed}
        onClick={() => {
          handleChangePosition("next");
        }}
      >
        <ChevronRight />
      </ChakraButton>

      <ChakraButton
        variant="outline"
        _hover={{ bg: "gray.800" }}
        isDisabled={gameState.moveNumberView === gameState.movesPlayed}
        onClick={() => {
          handleChangePosition("end");
        }}
      >
        <ChevronsRight />
      </ChakraButton>
    </div>
  );
};

export default BoardNavButtons;

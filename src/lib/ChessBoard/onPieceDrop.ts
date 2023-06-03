import { GameStateType } from "@/atoms/gameAtom";
import { ModalStateType } from "@/atoms/modalAtom";
import { Chess } from "chess.js";
import { Piece, Square } from "react-chessboard/dist/chessboard/types";
import { SetterOrUpdater } from "recoil";
import { IllegalSound, PlayChessBoardSound } from "../Sounds/ChessBoardSound";
import { whichMove } from "./whichMove";
import {
  RealtimeChannel,
  Session,
  SupabaseClient,
  createClient,
} from "@supabase/supabase-js";
import { useSupabase } from "../Supabase/Providers";
import { game } from "../ChessLogic/Game";
import { supabase } from "@supabase/auth-ui-shared";
import { UUID } from "crypto";

const onPieceDrop = (
  source: Square,
  target: Square,
  piece: Piece,
  game: Chess,
  sendMoveToServer: boolean,
  channel: RealtimeChannel | null,
  gameState: GameStateType,
  setGame: SetterOrUpdater<GameStateType>,
  setModalState: SetterOrUpdater<ModalStateType>,
  gid: string,
  supabase: SupabaseClient,
  session: any
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
      if (gameState.boardOrientation.at(0) !== game.turn()) {
        if (game.isDraw()) {
          gameOver(supabase, gid, null);
        } else if (game.isCheckmate()) {
          gameOver(supabase, gid, session?.user.id);
        }
      }
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

    console.table({ ...MOVE });
    PlayChessBoardSound(typeOfMove);

    setGame((prev) => ({
      ...prev,
      fen: game.fen(),
      turn: prev.turn === "w" ? "b" : "w",
      movesPlayed: prev.movesPlayed + 1,
      moveNumberView: prev.movesPlayed + 1,
    }));

    if (channel && sendMoveToServer) {
      channel.send({
        type: "broadcast",
        event: "pieceMove",
        source: source,
        target: target,
        piece: piece,
      });
      sendPGN(supabase, gid);
    }
  } catch (e: any) {
    IllegalSound.play();
    console.log(e.message);
  }
  return true;
};

const sendPGN = async (supabase: SupabaseClient, gid: string) => {
  await supabase.from("games").update({ pgn: game.pgn() }).eq("id", gid);
};
const gameOver = async (
  supabase: SupabaseClient,
  gid: string,
  winner: string | null
) => {
  await supabase
    .from("games")
    .update({ status: "ended", winner: winner })
    .eq("id", gid);
};
export default onPieceDrop;

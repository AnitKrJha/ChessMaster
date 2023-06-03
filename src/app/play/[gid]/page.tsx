"use client";

import { useSupabase } from "@/lib/Supabase/Providers";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import LinkIsInvalid from "./linkisinvalid";
import GamesIsComplete from "./gameiscomplete";
import CheckingLink from "./checkingLink";
import ComingSoon from "./comingsoon";
import EnhancedChessboard from "@/lib/ChessBoard/EnhancedChessBoard";
import { RealtimeChannel } from "@supabase/supabase-js";
import { Button } from "@chakra-ui/react";
import onPieceDrop from "@/lib/ChessBoard/onPieceDrop";
import { game } from "@/lib/ChessLogic/Game";
import { GameState } from "@/atoms/gameAtom";
import { ModalState } from "@/atoms/modalAtom";
import { useSetRecoilState, useRecoilState } from "recoil";

type Props = {
  params: { gid: string };
};

type LinkStatusType = "invalid" | "ended" | "valid";

const PlayGame = ({ params: { gid } }: Props) => {
  const { supabase, session } = useSupabase();
  const [LinkStatus, setLinkStatus] = useState<LinkStatusType>("invalid");
  const [chekingLink, setChekingLink] = useState(true);
  const channel = useRef<RealtimeChannel | null>(null);

  const setModalState = useSetRecoilState(ModalState);
  const [gameState, setGameState] = useRecoilState(GameState);
  const checkGameStatus = async () => {
    //get game data
    try {
      const { data, error } = await supabase
        .from("games")
        .select("*")
        .eq("id", gid);
      if (error) throw new Error(error.message);

      if (data.length !== 0) {
        try {
          const gamestatus = data?.[0].status;
          const creator = data?.[0].player1;
          const opponent = data?.[0].player2;
          const creatorColor = data?.[0].player1color;
          const pgn = data?.[0].pgn;

          if (gamestatus === "ended") {
            setLinkStatus("ended");
            return;
          } else if (opponent === null && session?.user.id !== creator) {
            //popuplate player 2 field and change the status to ongoing

            const { error } = await supabase
              .from("games")
              .update({
                status: "ongoing",
                player2: session?.user.id,
                player2name: session?.user.user_metadata.name,
                player2pic: session?.user.user_metadata.avatar_url,
                player2color: creatorColor === "white" ? "black" : "white",
              })
              .eq("id", gid);

            setGameState((prev) => ({
              ...prev,
              fen: game.fen(),
              moveNumberView: game.moveNumber() + 2,
              movesPlayed: game.moveNumber() + 2,

              boardOrientation: creatorColor === "white" ? "black" : "white",
            }));
            setLinkStatus("valid");
          }
          if (session?.user.id === creator || session?.user.id === opponent) {
            //load the game from the database and
            game.loadPgn(pgn ?? "");
            if (session?.user.id === creator) {
              setGameState((prev) => ({
                ...prev,
                fen: game.fen(),
                moveNumberView: game.moveNumber() + 2,
                movesPlayed: game.moveNumber() + 2,
                boardOrientation: creatorColor,
              }));
            } else {
              setGameState((prev) => ({
                ...prev,
                fen: game.fen(),
                moveNumberView: game.moveNumber() + 2,
                movesPlayed: game.moveNumber() + 2,

                boardOrientation: creatorColor === "white" ? "black" : "white",
              }));
            }
            console.log("jhell");
            setLinkStatus("valid");
          } else if (gamestatus === "ongoing") {
            // join as spectator
            game.loadPgn(pgn ?? "");
            toast.success("Hello Spectator");
            setGameState((prev) => ({
              ...prev,
              fen: game.fen(),
              moveNumberView: game.moveNumber() + 2,
              movesPlayed: game.moveNumber() + 2,
              isSpectator: true,
            }));
            setLinkStatus("valid");
          }
        } catch (e: any) {
          toast.error(e.message);
        }
      }
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setChekingLink(false);
    }
  };

  useEffect(() => {
    checkGameStatus();

    channel.current = supabase.channel(gid);
    channel.current.subscribe();
    channel.current.on("broadcast", { event: "pieceMove" }, (payload) => {
      console.log(payload);
      onPieceDrop(
        payload.source,
        payload.target,
        payload.piece,
        game,
        false,
        null,
        gameState,
        setGameState,
        setModalState,
        gid,
        supabase,
        session
      );
    });
  }, []);

  //--------------------------------------------

  if (chekingLink) {
    return <CheckingLink />;
  }

  if (LinkStatus === "invalid") {
    return <LinkIsInvalid />;
  }

  if (LinkStatus === "ended") {
    return <GamesIsComplete />;
  }

  return (
    <>
      {game.turn() === gameState.boardOrientation.at(0) ? (
        <div className="h-7 py-1 px-1">Your Turn</div>
      ) : (
        <div className="h-7 py-1 px-1">Opponent Turn</div>
      )}
      <EnhancedChessboard channel={channel.current} gid={gid} />
    </>
  );
};

export default PlayGame;

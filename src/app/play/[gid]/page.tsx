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

            setLinkStatus("valid");
          }
          if (session?.user.id === creator || session?.user.id === opponent) {
            game.loadPgn(pgn ?? undefined);
            if (session?.user.id === creator) {
              setGameState((prev) => ({
                ...prev,
                fen: game.fen(),
                boardOrientation: creatorColor,
              }));
            } else {
              setGameState((prev) => ({
                ...prev,
                fen: game.fen(),

                boardOrientation: creatorColor === "white" ? "black" : "white",
              }));
            }
            //load the game from the database and

            setLinkStatus("valid");
          } else if (gamestatus === "ongoing") {
            // join as spectator
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
        setGameState,
        setModalState,
        gid,
        supabase
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
    <main className="min-h-[calc(100dvh_-_64px)] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black pt-8 ">
      {/*chessBoard*/}

      <EnhancedChessboard channel={channel.current} gid={gid} />
    </main>
  );
};

export default PlayGame;

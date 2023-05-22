"use client";

import React, { useEffect, useState } from "react";
import Profile from "@/components/Dashboard/Profile";
import CreateRoom from "@/components/Dashboard/CreateRoom";
import PastGames from "@/components/Dashboard/pastgames";
import { PastGameType } from "@/components/Dashboard/PastGameItem";
import { useSupabase } from "@/lib/Supabase/Providers";

type Props = {};

const DashboardPage = (props: Props) => {
  const { supabase, session } = useSupabase();

  const formatGames = (data: any[]) => {
    const pastgames = data.map<PastGameType>((item, index) => {
      console.log(item);
      const player1isme = session?.user.id === item.player1;
      let result: string;
      if (item.winner === null) {
        result = "draw";
      } else if (item.winner === session?.user.id) {
        result = "win";
      } else {
        result = "lose";
      }

      return {
        date: new Date(item.created_at),
        index: index,
        opponentName: player1isme ? item.player2name : item.player1name,
        opponentPic: player1isme ? item.player2pic : item.player1pic,
        result: result,
      };
    });
    setGamesPlayed(pastgames.length);
    return pastgames;
  };

  const getPastGames = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("games")
        .select("*")
        .or(`player1.eq.${session?.user.id},player2.eq.${session?.user.id}`)
        .neq("status", "incomplete");

      if (error) throw new Error(error.message);

      setPastGames(formatGames(data));
    } catch (e: any) {
      console.log("error in getting games");
    } finally {
      console.log(pastGames);
      setLoading(false);
    }
  };

  const [loading, setLoading] = useState(true);
  const [pastGames, setPastGames] = useState<PastGameType[]>([]);
  const [gamesPlayed, setGamesPlayed] = useState<number>(0);

  useEffect(() => {
    getPastGames();
  }, []);

  return (
    <div className="max-w-5xl w-full">
      <div className="w-full flex gap-4 flex-col md:flex-row items-start">
        <Profile loading={loading} gamesPlayed={gamesPlayed} />
        <CreateRoom />
      </div>
      <PastGames loading={loading} pastGames={pastGames} />
    </div>
  );
};

export default DashboardPage;

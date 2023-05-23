"use client";

import { useSupabase } from "@/lib/Supabase/Providers";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LinkIsInvalid from "./linkisinvalid";
import GamesIsComplete from "./gameiscomplete";
import CheckingLink from "./checkingLink";
import ComingSoon from "./comingsoon";

type Props = {
  params: { gid: string };
};

const PlayGame = ({ params: { gid } }: Props) => {
  const { supabase } = useSupabase();

  const [LinkStatus, setLinkStatus] = useState<
    "invalid" | "complete" | "valid"
  >("invalid");
  const [chekingLink, setChekingLink] = useState(false);

  useEffect(() => {
    const checkLink = async () => {
      try {
        const { data, error } = await supabase
          .from("games")
          .select("*")
          .eq("id", gid);

        if (data?.length !== 0) {
          data!.at(0)!.status === "incomplete"
            ? setLinkStatus("valid")
            : setLinkStatus("complete");
        }

        if (error) {
          throw new Error(error.message);
        }
      } catch (e: any) {
        toast.error(e.message);
      } finally {
        setChekingLink(false);
      }
    };
    checkLink();
  }, []);

  if (chekingLink) {
    return <CheckingLink />;
  }

  if (LinkStatus === "invalid") {
    return <LinkIsInvalid />;
  }

  if (LinkStatus === "complete") {
    return <GamesIsComplete />;
  }

  return (
    <div onClick={() => toast.error(LinkStatus)}>
      <ComingSoon />
    </div>
  );
};

export default PlayGame;

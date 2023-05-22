"use client";

import { Bebas_Neue } from "next/font/google";
const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });
import ChakraButton from "@/lib/Chakra/button";
import Link from "next/link";
import React, { useState } from "react";
import { useSupabase } from "@/lib/Supabase/Providers";
import { clearTimeout } from "timers";

export function HeaderButton({}) {
  const { supabase, session } = useSupabase();

  const [loading, setLoading] = useState(false);

  const handleSignOut = async (e: React.PointerEvent<HTMLButtonElement>) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw new Error(error.message);
    } catch (e: any) {
      console.log(e);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  return (
    <div className="flex gap-2">
      <Link
        href={session ? "/dashboard" : "/login"}
        className={`tracking-wider text-white ${bebas.className}`}
      >
        <ChakraButton
          variant={"outline"}
          className=" font-normal"
          _hover={{
            bg: "rgba(255,255,255,0.13)",
          }}
        >
          {session ? "Dashboard" : "Login"}
        </ChakraButton>
      </Link>

      {session && (
        <ChakraButton
          variant={"solid"}
          className={` font-normal text-black ${bebas.className}`}
          _hover={{
            bg: "rgba(255,255,255,0.83)",
          }}
          isLoading={loading}
          onClick={handleSignOut}
        >
          Logout
        </ChakraButton>
      )}
    </div>
  );
}

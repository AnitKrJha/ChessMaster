"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  Session,
  User,
  createBrowserSupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import type { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { AuthChangeEvent } from "@supabase/supabase-js";

type MaybeSession = Session | null;

type SupabaseContext = {
  supabase: SupabaseClient;
  session: MaybeSession;
  user?: User | null;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({
  children,
  session,
  user,
}: {
  children: React.ReactNode;
  session: MaybeSession;
  user?: User | null;
}) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const router = useRouter();

  const Event = useRef<AuthChangeEvent | undefined>(undefined);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event: AuthChangeEvent) => {
      if (event !== Event.current) {
        console.log(Event, "gf", event);
        Event.current = event;
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  return (
    <Context.Provider value={{ supabase, session, user }}>
      <>{children}</>
    </Context.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider");
  }

  return context;
};

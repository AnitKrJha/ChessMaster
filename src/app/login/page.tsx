"use client";
import { useSupabase } from "@/lib/Supabase/Providers";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import React from "react";

type Props = {};

const LoginPage = (props: Props) => {
  const { supabase } = useSupabase();

  return (
    <div>
      <Auth
        theme="dark"
        appearance={{
          extend: true,
          theme: ThemeSupa,
          className: {
            button: "bg-opacity-10 bg-red-400",
            input: "border border-gray-200",
          },
          style: {
            button: {
              background:
                "linear-gradient(to right, rgb(29, 78, 116), rgb(3, 4, 15), rgb(17, 24, 39))",
              border: "none",
            },
            input: {
              background:
                "linear-gradient(to right, rgb(205, 228, 230,0.3), rgb(204, 251, 241,0.3))",
            },
          },
        }}
        supabaseClient={supabase}
        // view={}
        socialLayout="horizontal"
        providers={["google"]}
      />
    </div>
  );
};

export default LoginPage;

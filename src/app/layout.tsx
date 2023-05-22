import RecoilProviders from "@/lib/Recoil/RecoilProviders";
import "./globals.css";
import { headers, cookies } from "next/headers";

import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import SupabaseProvider from "@/lib/Supabase/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ChessMaster",
  description:
    "This  is a chess game application designed to provide an immersive and enjoyable chess experience for players of all levels.",
  icons: {
    icon: "/ChessMasterLogo3.svg",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentSupabaseClient({
    cookies: cookies,
    headers: headers,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log({ sess: session?.expires_at });

  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider session={session}>
          <RecoilProviders>
            <Header />
            {children}
          </RecoilProviders>
        </SupabaseProvider>
      </body>
    </html>
  );
}

import RecoilProviders from "@/lib/Recoil/RecoilProviders";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ChessMaster",
  description:
    "This  is a chess game application designed to provide an immersive and enjoyable chess experience for players of all levels.",
  icons: {
    icon: "/ChessMasterLogo3.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <RecoilProviders>
        <body className={inter.className}>{children}</body>
      </RecoilProviders>
    </html>
  );
}

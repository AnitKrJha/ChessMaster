import { CallToAction } from "@/components/CallToAction";
import AnimatedSpan from "@/components/animatedspan";
import { Bebas_Neue, Montserrat } from "next/font/google";
import { Header } from "../components/Header";
const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });
const monst = Montserrat({ subsets: ["latin"], weight: ["300", "400"] });
import Lottie from "@/lib/ClientLottie";

export default function Home() {
  return (
    <>
      <main
        className={`w-full px-4 pt-4 pb-8 sm:pt-16 min-h-[calc(100dvh_-_64px)] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black`}
      >
        <h1 className=" m-auto text-6xl sm:text-7xl lg:text-8xl text-center pt-12 md:pt-20 lg:pt-20 max-w-3xl md:max-w-7xl">
          <AnimatedSpan content="Welcome to Chessmaster" />
        </h1>
        <div
          className={`brief max-w-lg lg:max-w-3xl my-3  m-auto px-4 text-gray-300 text-center ${monst.className} `}
        >
          Ignite your strategic genius and dive into the adrenaline-fueled
          battles of chess. Unleash calculated moves, anticipate your opponent's
          every tactic, and experience the exhilaration of mind games on the
          chessboard.
        </div>
        <CallToAction />
      </main>
    </>
  );
}

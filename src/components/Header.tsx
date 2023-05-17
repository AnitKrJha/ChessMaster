import Link from "next/link";
import { Bebas_Neue } from "next/font/google";
import { Providers } from "@/lib/Chakra/Providers";
import ChakraButton from "../lib/Chakra/button";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });

export function Header() {
  return (
    <header className=" w-screen bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black">
      <div className="container flex justify-between max-w-7xl m-auto px-4  rounded backdrop-blur-sm h-16 items-center ">
        <div
          className={`text-white chesslogo ${bebas.className} font-bold text-2xl sm:text-3xl`}
        >
          <Link href={"/"} className="">
            CHESSMASTER.
          </Link>
        </div>

        <Link
          href={"/play"}
          className={`tracking-wider text-white ${bebas.className}`}
        >
          <ChakraButton
            variant={"outline"}
            className=" font-normal"
            _hover={{ bg: "rgba(255,255,255,0.13)" }}
          >
            Play Chess
          </ChakraButton>
        </Link>
      </div>
    </header>
  );
}

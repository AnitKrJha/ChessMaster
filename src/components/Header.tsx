import Link from "next/link";
import { Bebas_Neue } from "next/font/google";
import { Providers } from "@/lib/Chakra/Providers";
// import * as ChessMasterLogo from "./../../public/ChessMasterLogo3.svg";
import ChakraButton from "../lib/Chakra/button";
import Image from "next/image";
import { HeaderButton } from "./HeaderButton";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });

export function Header() {
  return (
    <header className=" max-w-screen bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black">
      <div className="container flex justify-between max-w-7xl m-auto px-4  rounded backdrop-blur-sm h-16 items-center ">
        <div
          className={`text-white chesslogo ${bebas.className} font-bold text-xl sm:text-2xl`}
        >
          <Link href={"/"} className="flex items-end">
            <Image
              src={"/ChessMasterLogo3.svg"}
              alt="website logo"
              className="h-7 sm:h-10 mb-2 w-fit"
              width={30}
              height={30}
              quality={10}
              priority
            />
            <span className="h-fit tracking-wider">ChessMaster.</span>
          </Link>
        </div>

        <HeaderButton />
      </div>
    </header>
  );
}

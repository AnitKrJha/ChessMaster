import React from "react";
import { Bebas_Neue, Montserrat } from "next/font/google";
import { AlertOctagon, ArrowLeft, PartyPopper } from "lucide-react";
import ChakraButton from "@/lib/Chakra/button";
import Link from "next/link";

const monst = Montserrat({ subsets: ["latin"], weight: ["400", "600"] });
const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });

type Props = {};

const ComingSoon = (props: Props) => {
  return (
    <div
      className={`${monst.className} pt-12 text-center text-base font-semibold  sm:text-lg `}
    >
      <PartyPopper className=" text-center m-auto mb-14" size="60" />
      <span className="text-blue-500">Coming soon!</span> <br /> We're working
      on adding this exciting functionality. <br /> Stay tuned for updates and
      get ready to experience even more chessmaster awesomeness!
      <Link href={"/dashboard"} className={`mt-6 block ${bebas.className}`}>
        <ChakraButton
          variant={"outline"}
          className=" font-normal"
          leftIcon={<ArrowLeft />}
          _hover={{
            bg: "rgba(255,255,255,0.1)",
          }}
        >
          Go to Dashboard
        </ChakraButton>
      </Link>
    </div>
  );
};

export default ComingSoon;

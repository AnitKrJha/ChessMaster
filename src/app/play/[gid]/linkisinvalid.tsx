import React from "react";
import { Bebas_Neue, Montserrat } from "next/font/google";
import { AlertOctagon, ArrowLeft } from "lucide-react";
import ChakraButton from "@/lib/Chakra/button";
import Link from "next/link";

const monst = Montserrat({ subsets: ["latin"], weight: ["400", "600"] });
const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });

type Props = {};

const LinkIsInvalid = (props: Props) => {
  return (
    <div
      className={`${monst.className} pt-12 text-center text-base font-semibold  sm:text-lg `}
    >
      <AlertOctagon
        className="text-red-500 text-center m-auto mb-14"
        size="60"
      />
      Oops! The link you provided is{" "}
      <span className="text-red-500">invalid !</span> <br /> Please double-check
      the link or contact the game creator for help.
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

export default LinkIsInvalid;

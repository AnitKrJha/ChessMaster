import ChakraButton from "@/lib/Chakra/button";
import Link from "next/link";
import React from "react";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });
export function CallToAction({}) {
  return (
    <div className="call-to-action z-10">
      <div
        className={` text-white subheading  max-w-lg my-8  m-auto px-4  text-center text-2xl ${bebas.className} z-10`}
      >
        Are You ready to seize the challenge?
      </div>

      <div className="btn-group flex gap-4 m-auto justify-center">
        <Link href={"/dashboard"} className={` text-white ${bebas.className}`}>
          <ChakraButton
            className="font-normal z-10"
            variant={"outline"}
            _hover={{
              bg: "rgba(255,255,255,0.13)",
            }}
          >
            Play Chess
          </ChakraButton>
        </Link>
        {/* <Link href={"/choose"}  className={`${bebas.className}`}> */}
        <ChakraButton
          isDisabled
          variant={"solid"}
          className=" font-normal z-10 bg-white text-black"
        >
          Play Offline
        </ChakraButton>
        {/* </Link> */}
      </div>
    </div>
  );
}

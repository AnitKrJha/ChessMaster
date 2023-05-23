import React from "react";
import { Bebas_Neue, Montserrat } from "next/font/google";
import { Clock10, ArrowLeft } from "lucide-react";
import ChakraButton from "@/lib/Chakra/button";
import Link from "next/link";

const monst = Montserrat({ subsets: ["latin"], weight: ["400", "600"] });
const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });

type Props = {};

const CheckingLink = (props: Props) => {
  return (
    <div
      className={`${monst.className} pt-12 text-center text-base font-semibold  sm:text-lg `}
    >
      <Clock10 className="text-amber-500 text-center m-auto mb-14" size="60" />
      <span className="text-amber-500">Sorry!</span> The game associated with
      this link has already ended. <br /> Feel free to start a new game or
      explore other ongoing games.
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

export default CheckingLink;

import React from "react";
import { Bebas_Neue, Montserrat } from "next/font/google";
import { Loader2 } from "lucide-react";

const monst = Montserrat({ subsets: ["latin"], weight: ["400", "600"] });

type Props = {};

const CheckingLink = (props: Props) => {
  return (
    <div
      className={`${monst.className} pt-8 text-center text-base font-semibold  sm:text-lg `}
    >
      While we verify the link,{" "}
      <span className="bg-gradient-to-r from-purple-400 to-yellow-400 text-transparent bg-clip-text animate-text">
        please wait a moment...
      </span>
      <Loader2 className="animate-spin text-center m-auto mt-12" size="40" />
    </div>
  );
};

export default CheckingLink;

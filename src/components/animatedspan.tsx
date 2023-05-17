import React from "react";
import { Bebas_Neue } from "next/font/google";
const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });
type Props = {
  content: string;
  linebreak?: boolean;
};

const AnimatedSpan = (props: Props) => {
  return (
    <>
      <span
        className={`animated-gradient ${bebas.className} inline-block py-2 bg-gradient-to-tr from-gray-100 to-slate-300 text-transparent bg-clip-text`}
      >
        {props.content + " "}
      </span>
      {props.linebreak && <br />}
    </>
  );
};

export default AnimatedSpan;

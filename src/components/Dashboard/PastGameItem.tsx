import { Tr, Td, Avatar } from "@chakra-ui/react";
import { Montserrat } from "next/font/google";
import React from "react";

export interface PastGameType {
  opponentName: string;
  opponentPic: string;
  date: Date;
  result: string;
  index: number;
}

const monst = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const PastGameItem = (props: PastGameType) => {
  return (
    <Tr
      className={`px-2 bg-black bg-opacity-30 backdrop-hue-rotate-30 rounded shadow-sm shadow-[#3b5fce] my-1 ${monst.className} text-sm my-2`}
    >
      <Td>{props.index + 1}</Td>
      <Td className="flex items-center gap-1">
        <Avatar src={props.opponentPic} name={props.opponentName} size="xs" />
        {props.opponentName}
      </Td>
      <Td>{props.date.toLocaleString()}</Td>
      <Td>{props.result}</Td>
    </Tr>
  );
};

export default PastGameItem;

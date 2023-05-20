"use client";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import PassNPlay from "./PassNPlay";
import PlayOnline from "./PlayOnline";

type Props = {};

const GameModesChooser = (props: Props) => {
  return (
    <Accordion defaultIndex={[0]}>
      <AccordionItem defaultChecked>
        <PlayOnline />
      </AccordionItem>
      <div className="flex items-center gap-1 ita">
        <div className="h-2 w-full my-4 rounded  animate-text bg-gradient-to-r from-gray-600 via-blue-200 to-slate-900"></div>
        <span className="align-text-bottom italic font-bold">OR</span>
        <div className="h-2 w-full my-4 rounded  animate-text bg-gradient-to-r from-gray-600 via-blue-200 to-slate-900"></div>
      </div>
      <AccordionItem>
        <PassNPlay />
      </AccordionItem>
    </Accordion>
  );
};

export default GameModesChooser;

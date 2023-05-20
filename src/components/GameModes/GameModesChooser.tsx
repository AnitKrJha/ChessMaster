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
    <Accordion>
      <AccordionItem>
        <PlayOnline />
      </AccordionItem>
      <div className="h-2 w-full my-4 rounded  animate-text bg-gradient-to-r from-gray-600 via-blue-200 to-slate-900"></div>
      <AccordionItem>
        <PassNPlay />
      </AccordionItem>
    </Accordion>
  );
};

export default GameModesChooser;

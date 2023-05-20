import GameModesChooser from "@/components/GameModes/GameModesChooser";
import React from "react";

type Props = {};

const Choose = (props: Props) => {
  return (
    <div className="pt-4 text-white">
      <GameModesChooser></GameModesChooser>
    </div>
  );
};

export default Choose;

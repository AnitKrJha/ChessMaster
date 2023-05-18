"use client";

import React, { Ref, Suspense, createRef } from "react";
import { ChessboardProps } from "react-chessboard/dist/chessboard/types";
import { Chessboard } from "react-chessboard";
import { ClearPremoves } from "react-chessboard/dist/index";
import useScreenWidth from "./utils/useScreenWidth";

interface ChessboardWrapperProps extends ChessboardProps {
  additionalProp?: string;
  // Add other additional props as needed
}

const ChessBoard: React.FC<ChessboardWrapperProps> = ({
  additionalProp,
  ...otherProps
}) => {
  // Create a ref of type Ref<ClearPremoves>
  const ref: Ref<ClearPremoves> = createRef<ClearPremoves>();

  // Additional logic and rendering for your wrapper component

  const screenWidth = useScreenWidth();

  return (
    <>
      <Chessboard
        // areArrowsAllowed={false}
        customDropSquareStyle={{
          background:
            "linear-gradient(to left,rgba(70, 141, 139,0.8), rgba(15, 85, 99,0.5))",
        }}
        boardWidth={Math.min(screenWidth - 40, 600)}
        customBoardStyle={{
          margin: "auto",

          overflow: "hidden",
        }}
        customDarkSquareStyle={{
          background: "linear-gradient(rgb(27, 69, 89), rgb(65, 85, 99))",
        }}
        customLightSquareStyle={{
          background:
            "linear-gradient(to right, rgb(243, 244, 246), rgb(209, 213, 219))",
        }}
        {...otherProps}
        ref={ref}
      />
    </>
  );
};

export default ChessBoard;

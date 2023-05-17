"use client";

import Chessboard, { ChessboardProps } from "chessboardjsx";

import React from "react";
interface Props extends ChessboardProps {}

const ChessBoard = (props: Props) => {
  return (
    <Chessboard
      //   pieces={{
      //     wK: function ({
      //       isDragging,
      //       squareWidth,
      //       droppedPiece,
      //       targetSquare,
      //       sourceSquare,
      //     }) {
      //       console.log({ droppedPiece });
      //       return <div className="text-white">king</div>;
      //     },
      //   }}
      dropSquareStyle={{
        background:
          "linear-gradient(to left,rgba(70, 141, 139,0.8), rgba(15, 85, 99,0.5))",
      }}
      boardStyle={{ margin: "auto" }}
      calcWidth={({ screenHeight, screenWidth }) =>
        Math.min(screenWidth - 20, 560)
      }
      darkSquareStyle={{
        background: "linear-gradient(rgb(27, 69, 89), rgb(65, 85, 99))",
      }}
      lightSquareStyle={{
        background:
          "linear-gradient(to right, rgb(243, 244, 246), rgb(209, 213, 219))",
      }}
      {...props}
    />
  );
};

export default ChessBoard;

import { Howl, Howler } from "howler";

import { MoveTypes } from "../ChessBoard/whichMove";

// Setup the new Howl.
export const CaptureSound = new Howl({
  src: ["/sounds/capture-piece.mp3"],
});
export const MoveSound = new Howl({
  src: ["/sounds/move-piece.mp3"],
});
export const CastleSound = new Howl({
  src: ["/sounds/castle.mp3"],
});
export const IllegalSound = new Howl({
  src: ["/sounds/illegal-move.mp3"],
});
export const CheckSound = new Howl({
  src: ["/sounds/move-check.mp3"],
});
export const PromoteSound = new Howl({
  src: ["/sounds/promote.mp3"],
});

export const GameoverSound = new Howl({
  src: ["/sounds/gameover.webm"],
});

export const PlayChessBoardSound = (move: MoveTypes) => {
  switch (move) {
    case "capture":
      CaptureSound.play();
      break;
    case "check":
      CheckSound.play();
      break;
    case "castle":
      CastleSound.play();
      break;
    case "illegal":
      IllegalSound.play();
      break;
    case "promotion":
      PromoteSound.play();
      break;
    case "gameover":
      GameoverSound.play();
      break;
    default:
      MoveSound.play();
      break;
  }
};

import { Howl, Howler } from "howler";

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
  src: ["/sounds/check.mp3"],
});
export const PromoteSound = new Howl({
  src: ["/sounds/promote.mp3"],
});

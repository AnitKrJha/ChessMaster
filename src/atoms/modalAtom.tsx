import { atom } from "recoil";

interface ModalState {
  open: boolean;
  type: "Gameover";
}

const defaultModalState: ModalState = {
  open: false,
  type: "Gameover",
};

export const ModalState = atom<ModalState>({
  key: "ModalStateAtom",
  default: defaultModalState,
});

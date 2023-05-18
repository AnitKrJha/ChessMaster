import { atom } from "recoil";

export interface ModalStateType {
  open: boolean;
  type: "Gameover";
}

const defaultModalState: ModalStateType = {
  open: false,
  type: "Gameover",
};

export const ModalState = atom<ModalStateType>({
  key: "ModalStateAtom",
  default: defaultModalState,
});

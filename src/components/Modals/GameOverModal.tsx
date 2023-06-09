"use client";

import { Bebas_Neue } from "next/font/google";
import { Montserrat } from "next/font/google";
import { ModalState } from "@/atoms/modalAtom";
import { Providers } from "@/lib/Chakra/Providers";
import * as ChessImage from "./../../../public/Images/chessToken.png";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import Image from "next/image";
import { GameState } from "@/atoms/gameAtom";
import { useRouter } from "next/navigation";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });
const monst = Montserrat({ subsets: ["latin"], weight: ["400"] });

type Props = {
  loser: "w" | "b";
  resetBoard: () => void;
};

const GameOverModal = (props: Props) => {
  const [modalState, setModalState] = useRecoilState(ModalState);
  const [gameState, setGameState] = useRecoilState(GameState);
  const router = useRouter();
  const handleModalClose = () => {
    setModalState((prev) => ({ ...prev, open: false }));
    props.resetBoard();
    router.push("/dashboard");
  };

  return (
    <>
      <Providers>
        <Modal
          isOpen={modalState.open}
          onClose={handleModalClose}
          isCentered
          closeOnOverlayClick={false}
        >
          <ModalOverlay backdropFilter={"blur(10px) hue-rotate(46deg)"} />
          <ModalContent
            background={
              "radial-gradient(at center top, rgb(55, 65, 81), rgb(17, 24, 39), rgb(0, 0, 0))"
            }
            className={`${bebas.className} `}
          >
            <ModalHeader className="text-white text-4xl font-normal">
              {gameState.boardOrientation.at(0) === props.loser
                ? "😭 Loss!"
                : "🎉 Victory"}
            </ModalHeader>

            <ModalBody className={`${monst.className} text-gray-200 `}>
              <div className="image text-center m-auto">
                <Image
                  src={ChessImage}
                  alt="Chess Image"
                  className="m-auto mb-4"
                  width={100}
                  height={100}
                  priority
                  quality={10}
                />
              </div>
              {gameState.boardOrientation.at(0) === props.loser
                ? "Better Luck Next Time! 👏 Keep it up! 💪"
                : "Congratulations, Chessmaster! You have emerged victorious. Well played! 🏆"}
            </ModalBody>

            <ModalFooter>
              <Button
                size={"sm"}
                variant="outline"
                color={"gray.100"}
                className="text-slate-200 font-normal text-md"
                onClick={handleModalClose}
                _hover={{ bg: "rgba(0,0,0,0.2)" }}
              >
                Go to Dashboard
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Providers>
    </>
  );
};

export default GameOverModal;

/* 
Modal Heading (Win): 

Modal Message (Win): Congratulations, Chessmaster! You have emerged victorious. Well played! 🏆

Modal Call to Action Buttons (Win):
1. Play Again 🔄
2. Share your triumph 📲

Modal Heading (Loss): 😔 Defeat!

Modal Message (Loss): Tough luck, Chessmaster. Your opponent outplayed you this time. Keep practicing and come back stronger! 💪

Modal Call to Action Buttons (Loss):
1. Play Again 🔄
2. Analyze your game 🔍

Note: The emojis used here are just examples. You can choose different emojis that best fit your game's style and atmosphere.

*/

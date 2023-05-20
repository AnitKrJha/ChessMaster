import ChakraButton from "@/lib/Chakra/button";
import { AccordionButton, AccordionPanel, Icon } from "@chakra-ui/react";
import { Crown, ChevronDown } from "lucide-react";
import { Bebas_Neue, Montserrat } from "next/font/google";

const monst = Montserrat({ subsets: ["latin"], weight: ["300", "400"] });
const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });

type Props = {};

const PassNPlay = (props: Props) => {
  return (
    <>
      <AccordionButton
        className={`${bebas.className} py-3 text-4xl sm:text-5xl flex flex-col gap-1 items-start text-left`}
      >
        <span className="underline">Online Multiplayer</span>
        <p
          className={`${bebas.className} text-base tracking-widest text-gray-200`}
        >
          The ultimate chess showdown awaits!
        </p>
        <ChevronDown className="animate-bounce" />
      </AccordionButton>
      <AccordionPanel
        className={`${monst.className}  text-gray-200 backdrop-hue-rotate-[280deg] p-2 rounded`}
        pb={4}
      >
        Unleash your competitive spirit and challenge your friends in a battle
        of wits. Pass n Play mode: Where chess transcends the board!
        <div className="divider bg-gray-400 h-0.5 mt-4 rounded"></div>
        <div className={`py-4 ${bebas.className} text-center text-3xl`}>
          Play AS:
        </div>
        <div className=" button-group my-4 flex gap-4 justify-around">
          <ChakraButton
            aspectRatio={1}
            variant={"outline"}
            _hover={{ bg: "rgba(255,255,255,0.13)" }}
            height={"100px"}
            className="flex flex-col "
          >
            <Crown stroke="white" fill="white" size={60} />
            <p className={`${bebas.className} text-xl tracking-wider`}>White</p>
          </ChakraButton>

          <ChakraButton
            aspectRatio={1}
            variant={"solid"}
            height={"100px"}
            className="flex flex-col text-black"
          >
            <Crown stroke="black" fill="black" size={60} />
            <p className={`${bebas.className} text-xl tracking-wider`}>Black</p>
          </ChakraButton>
        </div>
      </AccordionPanel>
    </>
  );
};

export default PassNPlay;

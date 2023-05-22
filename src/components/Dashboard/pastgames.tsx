import { Providers } from "@/lib/Chakra/Providers";
import {
  TableContainer,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Table,
  Divider,
} from "@chakra-ui/react";
import { Shield } from "lucide-react";
import { Bebas_Neue, Montserrat } from "next/font/google";
import { useState } from "react";
import PastGameItem, { PastGameType } from "./PastGameItem";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });
const monst = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

type Props = {};

const PastGames = (props: Props) => {
  const [pastGames, setPastGames] = useState<PastGameType[]>([
    {
      opponentName: "John Doe",
      opponentPic: "https://example.com/johndoe.jpg",
      date: new Date(),
      result: "Win",
      index: 1,
    },
    {
      opponentName: "Jane Smith",
      opponentPic: "https://example.com/janesmith.jpg",
      date: new Date(),
      result: "Loss",
      index: 2,
    },
    {
      opponentName: "John Doe",
      opponentPic: "https://example.com/johndoe.jpg",
      date: new Date(),
      result: "Win",
      index: 1,
    },
    {
      opponentName: "Jane Smith",
      opponentPic: "https://example.com/janesmith.jpg",
      date: new Date(),
      result: "Loss",
      index: 2,
    },
    {
      opponentName: "John Doe",
      opponentPic: "https://example.com/johndoe.jpg",
      date: new Date(),
      result: "Win",
      index: 1,
    },
    {
      opponentName: "Jane Smith",
      opponentPic: "https://example.com/janesmith.jpg",
      date: new Date(),
      result: "Loss",
      index: 2,
    },
  ]);

  return (
    <Providers>
      <div className="w-full flex-grow-1  px-4 py-2 pb-4 flex flex-col bg-black bg-opacity-10 backdrop-blur-md rounded shadow-sm shadow-gray-500 my-4">
        <h1
          className={`${bebas.className} flex gap-2 items-center  text-3xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500  mb-2 text-transparent bg-clip-text animate-text`}
        >
          Past Battles
          <Shield
            className="animate -mt-1 text-black invert rounded-full p-1 bg-opacity-25"
            size={30}
          />
        </h1>

        <Divider my="2" />
        <TableContainer>
          <Table variant="unstyled">
            <Thead>
              <Tr>
                <Th className={`${bebas.className} text-red-500`}>S NO.</Th>
                <Th className={`${bebas.className}`}>Opponent</Th>
                <Th className={`${bebas.className}`}>Date</Th>
                <Th className={`${bebas.className}`}>Result</Th>
              </Tr>
            </Thead>
            <Tbody>
              {pastGames.map((item, index) => {
                return (
                  <PastGameItem
                    date={item.date}
                    opponentName={item.opponentName}
                    opponentPic={item.opponentPic}
                    result={item.result}
                    key={index}
                    index={index}
                  />
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </Providers>
  );
};

export default PastGames;

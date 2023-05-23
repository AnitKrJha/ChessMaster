"use client";

import { Providers } from "@/lib/Chakra/Providers";
import { useSupabase } from "@/lib/Supabase/Providers";
import { Box, Button, Divider } from "@chakra-ui/react";
import {
  ArrowRight,
  ArrowRightFromLine,
  Copy,
  Link,
  Swords,
} from "lucide-react";
import { Bebas_Neue, Montserrat } from "next/font/google";
import { useRouter } from "next/navigation";

import { useRef, useState } from "react";
import toast from "react-hot-toast";
import CopyText from "../CopySninnet";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });
const monst = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
type Props = {};

const CreateRoom = (props: Props) => {
  const { supabase, session } = useSupabase();
  const geneRatedLink = useRef<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const handleCreateRoom = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("games")
        .insert([
          {
            player1: session?.user.id,
            player1name: session?.user.user_metadata.name,
            player1pic: session?.user.user_metadata.avatar_url,
            status: "incomplete",
          },
        ])
        .select();

      geneRatedLink.current = `${process.env.NEXT_PUBLIC_BASE_URL}/play/${
        data!.at(0)!.id
      }`;

      if (error) throw new Error(error.message);
      console.log(data);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const router = useRouter();

  //======================================================================================

  return (
    <div className="w-full flex-grow-1  px-4 py-2 flex flex-col bg-black bg-opacity-10 backdrop-blur-md rounded shadow-sm shadow-gray-500">
      <h1
        className={`${bebas.className} flex gap-2 items-center text-3xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500  mb-2 text-transparent bg-clip-text animate-text`}
      >
        Create Room
        <Link
          className="animate- text-black invert rounded-full p-1 bg-opacity-25"
          size={35}
        />
      </h1>
      <Providers>
        <Divider my={2} />
        <div
          className={`flex items-center gap-3 ${monst.className}   text-sm text-gray-300`}
        >
          <div className="name mb-4 leading-loose">
            Take your chess battles to the next level with Online Mode!
            Challenge friends worldwide and{" "}
            <code className="text-bold px-2 uppercase bg-orange-800">
              {`'`}share the link {`'`}
            </code>{" "}
            to join the virtual arena. Let the chess showdowns begin! ♟️🌍
          </div>
        </div>

        <div
          className={` rounded px-1 flex-col flex gap-3 py-5 data-grid ${bebas.className} bg-black bg-opacity-40 font-normal text-xl`}
        >
          <div className="flex flex-row-reverse">
            <Button
              variant={"outline"}
              _hover={{
                bg: "rgba(255,255,255,0.13)",
              }}
              w="full"
              fontWeight={"normal"}
              fontSize={"medium"}
              className="flex items-center gap-2 basis-1/3 font-normal text-xl"
              onClick={handleCreateRoom}
              isLoading={loading}
            >
              Create Link
              <ArrowRight size={17} />
            </Button>

            <CopyText
              text={geneRatedLink.current ? geneRatedLink.current : ""}
            />
          </div>

          <Button
            variant={"solid"}
            _hover={{
              bg: "rgba(255,255,255,0.83)",
            }}
            w="full"
            fontWeight={"normal"}
            fontSize={"xl"}
            className="flex items-center gap-2 text-black font-normal text-xl"
            onClick={(e) => {
              if (geneRatedLink) router.push(geneRatedLink.current as string);
            }}
          >
            Play Now
            <Swords />
          </Button>
        </div>
      </Providers>
    </div>
  );
};

export default CreateRoom;

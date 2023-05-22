"use client";
import { Providers } from "@/lib/Chakra/Providers";
import { useSupabase } from "@/lib/Supabase/Providers";
import { waitForFiveSeconds } from "@/lib/utils/wait5seconds";
import { Avatar, Divider } from "@chakra-ui/react";
import {
  ChevronRight,
  CreditCard,
  Icon,
  Medal,
  SquareEqual,
  Swords,
  TrendingDown,
} from "lucide-react";
import { Bebas_Neue, Montserrat } from "next/font/google";
import { useEffect, useState } from "react";
import { Cardloading } from "../cardloading";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });
const monst = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600"],
});
type Props = {
  gamesPlayed: number;
  loading: boolean;
};

const Profile = (props: Props) => {
  const { session } = useSupabase();
  const [loading, setLoading] = useState(true);
  const [player, setPlayer] = useState<any>({
    gamesPlayed: props.gamesPlayed,
    gamesWon: props.gamesPlayed,
    gamesLost: props.gamesPlayed,
  });

  if (props.loading) {
    return <Cardloading />;
  }

  return (
    <div className="w-full md:max-w-sm m-auto px-4 py-2 flex flex-col bg-black bg-opacity-10 backdrop-blur-md rounded shadow-sm shadow-gray-500">
      <h1
        className={`${bebas.className} flex gap-2 items-center text-2xl mb-2 text-[#5ac7ee]`}
      >
        Masters Card
        <CreditCard color="white" />
      </h1>
      <Providers>
        <Divider my={2} />
        <div className={`flex items-center gap-3 ${bebas.className}   text-xl`}>
          <Avatar
            name={session?.user.user_metadata.name}
            src={session?.user.user_metadata.avatar_url}
            className="mb-2"
          />
          <div className="name">{session?.user.user_metadata.name}</div>
        </div>

        <div className=" rounded px-1 data-grid grid py-2 grid-cols-2 bg-black bg-opacity-40 ">
          <ProfileRow
            value={player.gamesPlayed}
            title="Games Played"
            Icon={Swords}
          />
          <ProfileRow
            value={player.gamesPlayed}
            title="Games Won"
            Icon={Medal}
          />
          <ProfileRow
            value={player.gamesPlayed}
            title="Games Lost"
            Icon={TrendingDown}
          />
          <ProfileRow
            value={player.gamesPlayed}
            title="Games Draw"
            Icon={SquareEqual}
          />
        </div>
      </Providers>
    </div>
  );
};

export default Profile;

function ProfileRow({
  Icon,
  title,
  value,
}: {
  Icon: Icon;
  title: string;
  value: string | number;
}) {
  return (
    <>
      <div className={`${bebas.className} flex gap-2  my-2 items-center`}>
        {title}
        <Icon size={18} />
      </div>
      <div
        className={`${monst.className} text-white font-medium  my-2 flex gap-2 items-center`}
      >
        <ChevronRight color="gray" size={15} strokeWidth={4} />
        <span className="pl-5">{value}</span>
      </div>
    </>
  );
}

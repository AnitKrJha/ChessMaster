import { GameState } from "@/atoms/gameAtom";
import EnhancedChessboard from "@/lib/ChessBoard/EnhancedChessBoard";
import { useRecoilState } from "recoil";

export default function Home() {
  return (
    <main className="min-h-[calc(100dvh_-_64px)] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black pt-8 ">
      {/*chessBoard*/}

      <EnhancedChessboard />
    </main>
  );
}

export function getKingPositions(
  fenString: string,
  color: "w" | "b"
): string | null {
  const fenParts = fenString.split(" ");
  const fenBoard = fenParts[0];
  const ranks = fenBoard.split("/");

  let whiteKingPosition = "";
  let blackKingPosition = "";

  for (let i = 0; i < ranks.length; i++) {
    let fileIndex = 0;
    const rank = ranks[i];

    for (let j = 0; j < rank.length; j++) {
      const char = rank[j];

      if (char === "k") {
        blackKingPosition = String.fromCharCode(97 + fileIndex) + (8 - i);
      } else if (char === "K") {
        whiteKingPosition = String.fromCharCode(97 + fileIndex) + (8 - i);
      }

      if (isNaN(Number(char))) {
        fileIndex++;
      } else {
        fileIndex += Number(char);
      }
    }
  }

  if (whiteKingPosition === "" || blackKingPosition === "") {
    return null; // Invalid FEN string or kings not found
  }

  return color === "w" ? whiteKingPosition : blackKingPosition;
}

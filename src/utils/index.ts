const chunkArray = (
  myArray: string[] | null,
  chunk_size: number
): string[][] => {
  const results: string[][] = [];
  while (myArray?.length) {
    results.push(myArray?.splice(0, chunk_size));
  }
  return results;
};

const minesweeper = (grid: string[]): string[] => {
  const chunked = chunkArray(grid, 5);
  const pointed = chunked
    .map((chunk: string[], i: number): string[] =>
      chunk.map((cell: string, index: number): string => {
        const adjacentCell = [
          chunk[index - 1] || "",
          chunk[index + 1] || "",
          chunked[i - 1]?.[index] || "",
          chunked[i + 1]?.[index] || "",
          chunked[i - 1]?.[index - 1] || "",
          chunked[i - 1]?.[index + 1] || "",
          chunked[i + 1]?.[index - 1] || "",
          chunked[i + 1]?.[index + 1] || "",
        ];
        let score: string | number = cell;
        if (cell === "-") {
          score = adjacentCell.reduce(
            (acc: number, curr: string): number =>
              curr === "X" ? acc + 1 : acc,
            0
          );
        }
        return score.toString();
      })
    )
    .flat();
  return pointed;
};

export { chunkArray, minesweeper };

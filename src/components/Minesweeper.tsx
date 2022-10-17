import React, { useState } from "react";
import "../styles/minesweeper.scss";
import flag from "../assets/flag.png";
import GameOver from "./GameOver";
import Timer from "./Timer";
import Win from "./Win";
import StartAgain from "./StartAgain";
import Grid from "./Grid";

interface MinesweeperProps {
  grid: null | string[][];
  setGrid: React.Dispatch<React.SetStateAction<string[][] | null>>;
}

function Minesweeper({ grid, setGrid }: MinesweeperProps) {
  const countPieces = (
    arr: string[][] | null,
    operator: string
  ): number | undefined =>
    arr?.reduce((accumulator, item) => {
      const operations: any = {
        "=": (acc: number, cell: string): number =>
          cell === "X" ? acc + 1 : acc,
        "!": (acc: number, cell: string): number =>
          cell !== "X" ? acc + 1 : acc,
      };
      const partialSum: number = item.reduce(operations[operator], 0);
      return accumulator + partialSum;
    }, 0);

  const [flagged, setFlagged] = useState<string[]>([]);
  const [totalMines, setTotalMines] = useState(countPieces(grid, "="));
  const totalEmpty = countPieces(grid, "!");
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isFirstMove, setIsFirstMove] = useState(true);
  const [selectedCells, setSelectedCells] = useState<string[]>([]);
  const [won, setWin] = useState(false);
  const gameOver = () => {
    setIsGameOver(true);
    setTimeout(() => {
      setIsOpen(true);
    }, 3000);
  };

  const setPerimeter = (id: string) => {
    console.log("SELECTED", selectedCells);
    let outerIndex = Number(id[0]);
    let innerIndex = Number(id[1]);

    let firstCellOccurrence = selectedCells.filter((x) => x === id).length;

    // while (firstCellOccurrence < 2) {
    //   console.log("HERE");

    //   const adjacent = [
    //     grid?.[outerIndex][innerIndex] || "",
    //     grid?.[outerIndex][innerIndex + 1] || "",
    //     grid?.[outerIndex - 1][innerIndex] || "",
    //     grid?.[outerIndex + 1][innerIndex] || "",
    //   ];
    //   // adjacent.forEach((cell) => {
    //   //   outerIndex = outerIndex + 1;
    //   //   innerIndex = innerIndex + 1;
    //   //   if (cell !== "X" && cell !== "") {
    //   //     setSelectedCells([...selectedCells, `${outerIndex}${innerIndex}`]);
    //   //   }
    //   // });
    //   console.log(firstCellOccurrence);
    //   firstCellOccurrence = selectedCells.filter((x) => x === id).length;
    // }

    setIsFirstMove(false);
  };
  const checkWin = (): void => {
    console.log(selectedCells.length, totalEmpty);
    if (selectedCells.length === totalEmpty) {
      setWin(true);
    }
  };
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log("SELECTED", selectedCells);

    const cell = e.currentTarget.dataset.value;
    const id = e.currentTarget.dataset.id;
    if (cell === "X") {
      gameOver();
    } else if (isFirstMove && id) {
      console.log(id);
      setSelectedCells([id]);
      setPerimeter(id);
    } else if (id) {
      if (flagged.includes(id)) {
        return;
      } else {
        setSelectedCells([...selectedCells, id]);
        console.log(grid);
        checkWin();
      }
    }
  };
  const handleRightClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const id = e.currentTarget.dataset.id;
    if (id && totalMines) {
      if (selectedCells.includes(id)) {
        return;
      }
      if (flagged.includes(id)) {
        const updatedFlagged = flagged.filter((c) => c !== id);
        setFlagged(updatedFlagged);
        setTotalMines(totalMines + 1);
      } else {
        setFlagged([...flagged, id]);
        setTotalMines(totalMines - 1);
      }
    }
  };

  return (
    <div>
      {modalIsOpen ? (
        <GameOver
          setIsOpen={setIsOpen}
          modalIsOpen={modalIsOpen}
          setGrid={setGrid}
        />
      ) : won ? (
        <Win setGrid={setGrid} />
      ) : (
        <div>
          <div className="info-wrapper">
            <div className="mine-count">
              <img alt="flag" className="flag-icon" src={flag} />
              {totalMines}
            </div>
            <Timer />
          </div>
          <Grid
            isGameOver={isGameOver}
            flagged={flagged}
            handleClick={handleClick}
            handleRightClick={handleRightClick}
            selectedCells={selectedCells}
            grid={grid}
          />
          <StartAgain
            onClick={() => {
              setGrid(null);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Minesweeper;

import React, { useState } from "react";
import "../styles/minesweeper.scss";
import flag from "../assets/flag.png";
import bomb from "../assets/bomb.png";
import GameOver from "./GameOver";
import Timer from "./Timer";
import Win from "./Win";
import StartAgain from "./StartAgain";

interface MinesweeperProps {
  grid: null | string[][];
  setGrid: React.Dispatch<React.SetStateAction<string[][] | null>>;
}

function Minesweeper({ grid, setGrid }: MinesweeperProps) {
  const countPieces = (
    arr: string[][] | null,
    piece: string
  ): number | undefined =>
    arr?.reduce((accumulator, item) => {
      const partialSum: number = item.reduce(
        (acc, cell) => (cell === piece ? acc + 1 : acc),
        0
      );
      return accumulator + partialSum;
    }, 0);

  const [flagged, setFlagged] = useState<string[]>([]);
  const [totalMines, setTotalMines] = useState(countPieces(grid, "X"));
  const [totalEmpty, setTotalEmpty] = useState(countPieces(grid, "-"));
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

  const setPerimeter = (grid: string[][] | null, id: string) => {
    setSelectedCells([...selectedCells, id]);

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
    if (selectedCells.length === totalEmpty) setWin(true);
  };
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const cell = e.currentTarget.dataset.value;
    const id = e.currentTarget.dataset.id;
    console.log(cell);
    if (isFirstMove && id) {
      if (cell === "X") {
        const i = grid![0].indexOf("-");
        grid![0][i] = "X";
      }
      setPerimeter(grid, id);
    } else if (cell === "X") {
      gameOver();
    } else if (id) {
      if (flagged.includes(id)) {
        return;
      }
      setSelectedCells([...selectedCells, id]);
      setTotalEmpty(totalEmpty! - 1);
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
        checkWin();
      }
    }
  };
  const tdSize =
    grid?.length === 5 ? "easy" : grid?.length === 8 ? "medium" : "hard";
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
          <table>
            <tbody>
              {grid?.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, index) => {
                    const id = `${i}${index}`;
                    return (
                      <td
                        onContextMenu={handleRightClick}
                        className={tdSize}
                        onClick={handleClick}
                        data-value={cell}
                        data-id={id}
                        key={index}
                      >
                        {flagged.includes(id) && !isGameOver && (
                          <img alt="flag" className="flag" src={flag} />
                        )}
                        {cell === "X" && isGameOver && (
                          <img alt="bomb" className="bomb" src={bomb} />
                        )}
                        {selectedCells.includes(id) && !isGameOver && (
                          <p>{cell}</p>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
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

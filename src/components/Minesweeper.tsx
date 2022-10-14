import React, { useState } from "react";
import "../styles/minesweeper.scss";
import flag from "../assets/flag.png";
import bomb from "../assets/bomb.png";
import GameOver from "./GameOver";
import Timer from "./Timer";
interface MinesweeperProps {
  grid: null | string[][];
  setGrid: React.Dispatch<React.SetStateAction<string[][] | null>>;
}

function Minesweeper({ grid, setGrid }: MinesweeperProps) {
  const countMines = (arr: string[][] | null): number | undefined =>
    arr?.reduce((accumulator, item) => {
      const partialSum: number = item.reduce(
        (acc, cell) => (cell === "X" ? acc + 1 : acc),
        0
      );
      return accumulator + partialSum;
    }, 0);
  const [flagged, setFlagged] = useState<string[]>([]);
  const [totalMines, setTotalMines] = useState(countMines(grid));
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isFirstMove, setIsFirstMove] = useState(true);
  const [selectedCells, setSelectedCells] = useState<string[]>([]);
  const gameOver = () => {
    setIsGameOver(true);
    setTimeout(() => {
      setIsOpen(true);
    }, 4000);
  };
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const cell = e.currentTarget.dataset.value;
    const id = e.currentTarget.dataset.id;
    console.log(cell);
    if (cell === "X") {
      gameOver();
    } else if (isFirstMove) {
      console.log("do something");
      setIsFirstMove(false);
    } else if (id) {
      if (flagged.includes(id)) {
        return;
      }
      setSelectedCells([...selectedCells, id]);
    }
  };
  const handleRightClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const id = e.currentTarget.dataset.id;

    if (id) {
      if (selectedCells.includes(id)) {
        return;
      }
      if (flagged.includes(id)) {
        const updatedFlagged = flagged.filter((c) => c !== id);
        setFlagged(updatedFlagged);
      } else {
        setFlagged([...flagged, id]);
        if (totalMines) {
          setTotalMines(totalMines - 1);
        }
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
      ) : (
        <div>
          <div className="info-wrapper">
            <h1 className="mine-count">
              <img alt="flag" className="flag-icon" src={flag} />
              {totalMines}
            </h1>
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
          <button
            onClick={() => {
              setGrid(null);
            }}
            className="start-again"
          >
            Start again
          </button>
        </div>
      )}
    </div>
  );
}

export default Minesweeper;

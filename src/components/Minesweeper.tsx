import React, { useState } from "react";
import "../styles/minesweeper.scss";
import flag from "../assets/flag.png";

interface MinesweeperProps {
  grid: null | string[][];
}

function Minesweeper({ grid }: MinesweeperProps) {
  const [flagged, setFlagged] = useState<string[]>([]);
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e.currentTarget.dataset.value);
    const id = e.currentTarget.dataset.id;
  };
  const handleRightClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const id = e.currentTarget.dataset.id;
    if (id) {
      setFlagged([...flagged, id]);
    }
  };
  const tdSize =
    grid?.length === 5 ? "easy" : grid?.length === 8 ? "medium" : "hard";
  return (
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
                  {flagged.includes(id) && (
                    <img alt="flag" className="flag" src={flag} />
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Minesweeper;

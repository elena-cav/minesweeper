import React from "react";
import flag from "../assets/flag.png";
import bomb from "../assets/bomb.png";

interface GridProps {
  grid: string[][] | null;
  isGameOver: boolean;
  flagged: string[];
  selectedCells: string[];
  handleClick: React.MouseEventHandler;
  handleRightClick: React.MouseEventHandler;
}

function Grid({
  grid,
  isGameOver,
  flagged,
  handleClick,
  handleRightClick,
  selectedCells,
}: GridProps) {
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
                  {flagged.includes(id) && !isGameOver && (
                    <img alt="flag" className="flag" src={flag} />
                  )}
                  {cell === "X" && isGameOver && (
                    <img alt="bomb" className="bomb" src={bomb} />
                  )}
                  {selectedCells.includes(id) && !isGameOver && <p>{cell}</p>}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Grid;

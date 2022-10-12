import React from "react";

import "../styles/minesweeper.scss";

interface MinesweeperProps {
  grid: null | string[][];
}

function Minesweeper({ grid }: MinesweeperProps) {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e.currentTarget.dataset.value);
  };
  return (
    <table>
      <tbody>
        {grid?.map((row, i) => (
          <tr key={i}>
            {row.map((cell, index) => (
              <td onClick={handleClick} data-value={cell} key={index}></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Minesweeper;

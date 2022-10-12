import React from "react";
import { chunkArray } from "../utils/index";
import "../styles/minesweeper.scss";

const example = ["0", "0", "1", "X", "1", "0", "0", "1", "1", "1"];
const chunked = chunkArray(example, 5);
console.log(chunked);

interface Props {}

function Minesweeper(props: Props) {
  const {} = props;
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e.currentTarget.dataset.value);
  };
  return (
    <table>
      <tbody>
        {chunked.map((row, i) => (
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

import React from "react";
import generateGrid from "../utils/gridGenerator";
export default function Levels() {
  const handleClick = (size: number) => {
    const generatedGrid = generateGrid(size);
    console.log(generatedGrid);
  };
  return (
    <div>
      <button onClick={() => handleClick(5)}>Easy (5 x 5)</button>
      <button onClick={() => handleClick(8)}>Easy (8 x 8)</button>
      <button onClick={() => handleClick(12)}>Intermediate (12 x 12)</button>
    </div>
  );
}

import React from "react";
import "../styles/levels.scss";

interface LevelProps {
  handleClick(size: number): void;
}
export default function Levels({ handleClick }: LevelProps) {
  return (
    <div className="levels-wrapper">
      <h2>Pick a level to start the game</h2>
      <div className="buttons-wrapper">
        <button onClick={() => handleClick(5)}>Easy (5 x 5)</button>
        <button onClick={() => handleClick(8)}>Intermediate (8 x 8)</button>
        <button onClick={() => handleClick(12)}>Hard (12 x 12)</button>
      </div>
    </div>
  );
}

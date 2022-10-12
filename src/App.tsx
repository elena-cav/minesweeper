import "./App.scss";
import { useState } from "react";
import Minesweeper from "./components/Minesweeper";
import Levels from "./components/Levels";
import generateGrid from "./utils/gridGenerator";
import { chunkArray } from "./utils/index";

function App() {
  const [grid, setGrid] = useState<null | string[][]>(null);
  // const [size, setSize] = useState(0);
  const handleLevelsClick = (gridSize: number) => {
    console.log("in handle click");
    const generatedGrid = generateGrid(gridSize);
    const chunked = chunkArray(generatedGrid, gridSize);
    console.log(chunked);
    setGrid(chunked);
  };
  console.log(grid);
  return (
    <div className="App">
      <h1>Minesweeper</h1>
      {grid ? (
        <Minesweeper grid={grid} />
      ) : (
        <Levels handleClick={handleLevelsClick} />
      )}
    </div>
  );
}

export default App;

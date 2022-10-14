import "./App.scss";
import { useState } from "react";
import Minesweeper from "./components/Minesweeper";
import Levels from "./components/Levels";
import GameOver from "./components/GameOver";
import generateGrid from "./utils/gridGenerator";
import { minesweeper, chunkArray } from "./utils/index";
function App() {
  const [grid, setGrid] = useState<null | string[][]>(null);
  const handleLevelsClick = (gridSize: number) => {
    const generatedGrid = generateGrid(gridSize);
    const chunked = chunkArray(minesweeper(generatedGrid, gridSize), gridSize);
    setGrid(chunked);
  };
  return (
    <div className="App">
      <h1>Minesweeper</h1>
      {grid ? (
        <div>
          <Minesweeper setGrid={setGrid} grid={grid} />
        </div>
      ) : (
        <Levels handleClick={handleLevelsClick} />
      )}
    </div>
  );
}

export default App;

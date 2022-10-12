import React from "react";
import "./App.scss";
import Minesweeper from "./components/Minesweeper";
import Levels from "./components/Levels";
function App() {
  return (
    <div className="App">
      <Minesweeper />
      <Levels />
    </div>
  );
}

export default App;

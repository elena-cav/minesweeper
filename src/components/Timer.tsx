import { useState, useEffect } from "react";
import stopwatch from "../assets/stopwatch.png";

function Timer() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setTimeout(() => setCounter(counter + 1), 1000);
  }, [counter]);

  return (
    <div style={{ fontSize: "1.5rem" }}>
      <img
        style={{ height: "1.5rem", paddingRight: "0.3rem" }}
        alt="stopwatch"
        className="stopwatch"
        src={stopwatch}
      />
      {counter}
    </div>
  );
}

export default Timer;

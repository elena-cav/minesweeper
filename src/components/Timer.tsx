import { useState, useEffect } from "react";
import stopwatch from "../assets/stopwatch.png";

interface Props {}

function Timer(props: Props) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setTimeout(() => setCounter(counter + 1), 1000);
  }, [counter]);

  return (
    <div style={{}}>
      <img
        style={{ height: "1.5rem" }}
        alt="stopwatch"
        className="stopwatch"
        src={stopwatch}
      />
      {counter}
    </div>
  );
}

export default Timer;

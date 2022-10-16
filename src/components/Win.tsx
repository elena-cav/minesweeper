import React, { useEffect } from "react";
import { useReward } from "react-rewards";
import StartAgain from "./StartAgain";
import "../styles/win.scss";

interface Props {
  setGrid: React.Dispatch<React.SetStateAction<string[][] | null>>;
}

function Win({ setGrid }: Props) {
  const { reward: balloonsReward } = useReward("balloonsReward", "balloons");
  useEffect(() => {
    balloonsReward();
  }, []);
  return (
    <div className="win-wrapper">
      <h1>Congratulations!</h1>
      <h1>You have won this game</h1>
      <StartAgain
        onClick={() => {
          setGrid(null);
        }}
      />
      <span id="balloonsReward" />
    </div>
  );
}

export default Win;

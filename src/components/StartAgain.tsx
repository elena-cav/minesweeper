import React from "react";
import "../styles/startagain.scss";

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

function StartAgain({ onClick }: Props) {
  return <button onClick={onClick}>Start again</button>;
}
export default StartAgain;

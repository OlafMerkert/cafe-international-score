import type { Component } from "solid-js";
import Button from "./design/Button";

interface ResetGameProps {
  resetScores: () => void;
}

const ResetGame: Component<ResetGameProps> = (props) => {
  return (
    <div class="m-2">
      <Button onClick={() => props.resetScores()}>reset scores</Button>
    </div>
  );
};

export default ResetGame;

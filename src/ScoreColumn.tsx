import { sum } from "lodash-es";
import { For, Show, createSignal, type Component } from "solid-js";
import Button from "./design/Button";

interface ShowScoreProps {
  showScore: () => boolean;
}

const ScoreColumn: Component<ShowScoreProps> = ({ showScore }) => {
  const [nextScore, setNextScore] = createSignal("");
  const [isInputValid, setIsInputValid] = createSignal(true);
  const [allScores, setAllScores] = createSignal<number[]>([]);

  const handleAddScore = () => {
    const parsedScore = parseInt(nextScore(), 10);

    if (!isNaN(parsedScore)) {
      setAllScores([parsedScore, ...allScores()]);
      setNextScore("");
    } else {
      setIsInputValid(false);
    }
  };

  const handleRemoveLast = () => {
    const [_lastScore, ...newScores] = allScores();
    setAllScores(newScores);
  };

  const totalScore = () => sum(allScores());

  const handleScoreInput = (event: any) => {
    setNextScore(event.currentTarget.value);
    setIsInputValid(true);
  };

  const handleScoreInputEnter = (event: any) => {
    if (event.key === "Enter") {
      handleAddScore();
    }
  };

  return (
    <div class="space-x-1 mt-2">
      <input
        data-testid="score-input"
        name="score"
        class="border border-black p-1 text-right w-20"
        classList={{ "bg-red-200": !isInputValid() }}
        type="text"
        value={nextScore()}
        onChange={handleScoreInput}
        onKeyDown={handleScoreInputEnter}
      />

      <Button onClick={handleAddScore}>add</Button>

      <Show when={showScore()}>
        <div class="text-xl font-bold mt-2">Total Score: {totalScore()}</div>
      </Show>

      <div class="mt-3">
        <Button onClick={handleRemoveLast}>remove last</Button>
      </div>

      <For each={allScores()}>
        {(score) => <div data-testid="score-item">{score}</div>}
      </For>
    </div>
  );
};

export default ScoreColumn;

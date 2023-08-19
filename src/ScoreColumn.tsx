import { sum } from "lodash-es";
import { For, Show, createSignal, type Component } from "solid-js";
import Button from "./design/Button";
import { getScoreInputId } from "./inputIds";

interface ShowScoreProps {
  playerCount: () => number;
  playerIndex: number;
  showScore: () => boolean;
}

const ScoreColumn: Component<ShowScoreProps> = (props) => {
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
    const [, ...newScores] = allScores();
    setAllScores(newScores);
  };

  const totalScore = () => sum(allScores());

  const handleScoreInput = (
    event: Event & {
      target: HTMLInputElement;
      currentTarget: HTMLInputElement;
    },
  ) => {
    setNextScore(event.currentTarget.value);
    setIsInputValid(true);
  };

  const handleScoreInputEnter = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      handleAddScore();
    }
  };

  const handleScoreInputTab = (event: KeyboardEvent) => {
    if (event.key === "Tab") {
      event.preventDefault();
      const nextInput = document.getElementById(
        getScoreInputId((props.playerIndex + 1) % props.playerCount()),
      );
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  return (
    <div class="space-x-1 mt-2">
      <input
        id={getScoreInputId(props.playerIndex)}
        data-testid="score-input"
        name="score"
        class="border border-black p-1 text-right w-20"
        classList={{ "bg-red-200": !isInputValid() }}
        type="text"
        value={nextScore()}
        onChange={handleScoreInput}
        onKeyUp={handleScoreInputEnter}
        onKeyDown={handleScoreInputTab}
      />

      <Button onClick={handleAddScore}>add</Button>

      <Show when={props.showScore()}>
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

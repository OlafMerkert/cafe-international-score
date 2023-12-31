import { sum } from "lodash-es";
import { For, Show, createSignal, type Component } from "solid-js";
import Button from "./design/Button";
import { getScoreInputId } from "./inputIds";

interface ShowScoreProps {
  playerCount: () => number;
  playerIndex: number;
  showScore: () => boolean;
  allScores: () => number[];
  addScore: (score: number) => void;
  removeLastScore: () => void;
}

const ScoreColumn: Component<ShowScoreProps> = (props) => {
  const [nextScore, setNextScore] = createSignal("");
  const [isInputValid, setIsInputValid] = createSignal(true);

  const handleAddScore = () => {
    const parsedScore = parseInt(nextScore(), 10);

    if (!isNaN(parsedScore)) {
      props.addScore(parsedScore);
      setNextScore("");
    } else {
      setIsInputValid(false);
    }
  };

  const totalScore = () => sum(props.allScores());

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
      <Show when={props.showScore()}>
        <div class="text-xl font-bold my-2 text-orange-700">
          Score: {totalScore()}
        </div>
      </Show>

      <Show when={!props.showScore()}>
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

        <div class="mt-3">
          <Button onClick={() => props.removeLastScore()}>remove last</Button>
        </div>
      </Show>

      <For each={props.allScores()}>
        {(score) => <div data-testid="score-item">{score}</div>}
      </For>
    </div>
  );
};

export default ScoreColumn;

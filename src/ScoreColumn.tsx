import { sum } from "lodash-es";
import { createSignal, type Component, For, Show } from "solid-js";

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
      setAllScores([...allScores(), parsedScore]);
      setNextScore("");
    } else {
      setIsInputValid(false);
    }
  };

  const handleRemoveLast = () => {
    const newScores = [...allScores()];
    newScores.pop();
    setAllScores(newScores);
  };

  const totalScore = () => sum(allScores());

  const handleScoreInput = (event: any) => {
    setNextScore(event.currentTarget.value);
    setIsInputValid(true);
  };

  return (
    <div class="space-x-1 mt-2">
      <input
        class="border border-black p-1 text-right w-32"
        classList={{ "bg-red-200": !isInputValid() }}
        type="text"
        value={nextScore()}
        onChange={handleScoreInput}
      />
      <button
        class="border border-black bg-gray-200 rounded-md px-2 py-1"
        type="button"
        onClick={handleAddScore}
      >
        Record
      </button>

      <Show when={showScore()}>
        <div class="text-xl font-bold mt-2">Total Score: {totalScore()}</div>
      </Show>

      <For each={allScores()}>{(score) => <div>{score}</div>}</For>

      <div class="mt-3">
        <button
          class="border border-black bg-gray-200 rounded-md px-2 py-1"
          type="button"
          onClick={handleRemoveLast}
        >
          Remove Last
        </button>
      </div>
    </div>
  );
};

export default ScoreColumn;

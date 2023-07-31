import { sum } from "lodash-es";
import { createSignal, type Component, For } from "solid-js";

const ScoreColumn: Component = () => {
  const [nextScore, setNextScore] = createSignal("");
  const [allScores, setAllScores] = createSignal([]);

  const handleAddScore = () => {
    setAllScores([...allScores(), parseInt(nextScore(), 10)]);
    setNextScore("");
  };

  const handleRemoveLast = () => {
    const newScores = [...allScores()];
    newScores.pop();
    setAllScores(newScores);
  };

  const totalScore = () => sum(allScores());

  return (
    <div class="space-x-1 mt-2">
      <input
        class="border border-black p-1 text-right w-32"
        type="text"
        value={nextScore()}
        onChange={(event) => setNextScore(event.currentTarget.value)}
      />
      <button
        class="border border-black bg-gray-200 rounded-md px-2 py-1"
        type="button"
        onClick={handleAddScore}
      >
        Record
      </button>

      <div class="text-large font-bold">Total Score: {totalScore()}</div>

      <For each={allScores()}>{(score) => <div>{score}</div>}</For>

      <button
        class="border border-black bg-gray-200 rounded-md px-2 py-1"
        type="button"
        onClick={handleRemoveLast}
      >
        Remove Last
      </button>
    </div>
  );
};

export default ScoreColumn;

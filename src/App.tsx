import { range } from "lodash-es";
import { createSignal, type Component, For } from "solid-js";
import PlayerCount from "./PlayerCount";
import PlayerName from "./PlayerName";
import ScoreColumn from "./ScoreColumn";

const App: Component = () => {
  const [playerCount, setPlayerCount] = createSignal(2);
  const players = () => range(0, playerCount());

  const [showScore, setShowScore] = createSignal(false);

  return (
    <div>
      <header>
        <h1 class="text-xl font-bold text-center">
          Cafe International Score Keeping
        </h1>
      </header>

      <PlayerCount count={playerCount} setCount={setPlayerCount} />

      <div>
        <label>Show Score?</label>
        <input
          type="checkbox"
          value={showScore() ? "checked" : undefined}
          onChange={(event) => setShowScore(!!event.currentTarget.checked)}
        />
      </div>

      <div class="flex flex-row">
        <For each={players()}>
          {(_player) => (
            <div class="m-1 border border-blue-800 p-2">
              <PlayerName />

              <ScoreColumn showScore={showScore} />
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default App;

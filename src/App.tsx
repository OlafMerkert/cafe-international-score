import { range } from "lodash-es";
import { createSignal, type Component, For } from "solid-js";
import PlayerCount from "./PlayerCount";
import PlayerName from "./PlayerName";

const App: Component = () => {
  const [playerCount, setPlayerCount] = createSignal(2);
  const players = () => range(0, playerCount());

  return (
    <div>
      <header>
        <h1 class="text-xl font-bold text-center">
          Cafe International Score Keeping
        </h1>
      </header>

      <PlayerCount count={playerCount} setCount={setPlayerCount} />

      <div class="flex flex-row">
        <For each={players()}>
          {(_player) => (
            <div class="m-1 border border-blue-800 p-2">
              <PlayerName />
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default App;

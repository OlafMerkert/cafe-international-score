import { range } from "lodash-es";
import { For, createSignal, type Component } from "solid-js";
import PlayerCount from "./PlayerCount";
import PlayerName from "./PlayerName";
import ScoreColumn from "./ScoreColumn";
import ShowScoreSetting from "./ShowScoreSetting";

const App: Component = () => {
  const [playerCount, setPlayerCount] = createSignal(2);
  const players = () => range(0, playerCount());

  const [showScore, setShowScore] = createSignal(false);

  return (
    <div>
      <header>
        <h1 class="text-xl font-bold px-8">Cafe International Score Keeping</h1>
      </header>

      <PlayerCount count={playerCount} setCount={setPlayerCount} />

      <ShowScoreSetting showScore={showScore} setShowScore={setShowScore} />

      <div class="flex flex-row">
        <For each={players()}>
          {(_player) => {
            return (
              <div
                class="m-1 border border-blue-800 p-2"
                data-testid="player-column"
              >
                <PlayerName />

                <ScoreColumn showScore={showScore} />
              </div>
            );
          }}
        </For>
      </div>
    </div>
  );
};

export default App;

import { For, createSignal, type Component, createEffect } from "solid-js";
import PlayerCount from "./PlayerCount";
import PlayerName from "./PlayerName";
import ScoreColumn from "./ScoreColumn";
import ShowScoreSetting from "./ShowScoreSetting";
import { createPlayerStore } from "./playerStore";
import ResetGame from "./ResetGame";
import {
  loadApplicationState,
  saveApplicationState,
} from "./persistentStorage";

const App: Component = () => {
  const {
    store,
    playerCount,
    setPlayerCount,
    setPlayerName,
    addScore,
    removeLastScore,
    resetScores,
  } = createPlayerStore(2, loadApplicationState());

  createEffect(() => {
    saveApplicationState(store);
  });

  const [showScore, setShowScore] = createSignal(false);

  return (
    <div class="flex flex-col items-center py-4 bg-gray-200">
      <div class="flex-initial bg-white rounded-lg p-2">
        <header>
          <h1 class="text-xl font-bold px-8">
            Cafe International Score Keeping
          </h1>
        </header>

        <PlayerCount count={playerCount} setCount={setPlayerCount} />

        <ShowScoreSetting showScore={showScore} setShowScore={setShowScore} />

        <div class="flex flex-row">
          <For each={store.players}>
            {(player, playerIndex) => {
              return (
                <div
                  class="m-1 border border-yellow-700 p-2 bg-yellow-50 rounded drop-shadow-md w-38"
                  data-testid="player-column"
                >
                  <PlayerName
                    playerIndex={playerIndex()}
                    playerName={() => player.playerName}
                    setPlayerName={(name) => setPlayerName(playerIndex(), name)}
                  />

                  <ScoreColumn
                    showScore={showScore}
                    playerIndex={playerIndex()}
                    playerCount={playerCount}
                    allScores={() => player.playerScore}
                    addScore={(score) => addScore(playerIndex(), score)}
                    removeLastScore={() => removeLastScore(playerIndex())}
                  />
                </div>
              );
            }}
          </For>
        </div>

        <ResetGame resetScores={resetScores} />
      </div>
    </div>
  );
};

export default App;

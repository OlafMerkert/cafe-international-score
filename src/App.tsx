import { For, createSignal, type Component } from "solid-js";
import PlayerCount from "./PlayerCount";
import PlayerName from "./PlayerName";
import ScoreColumn from "./ScoreColumn";
import ShowScoreSetting from "./ShowScoreSetting";
import { createPlayerStore } from "./playerStore";

const App: Component = () => {
  const {
    store,
    playerCount,
    setPlayerCount,
    setPlayerName,
    addScore,
    removeLastScore,
  } = createPlayerStore(2);

  const [showScore, setShowScore] = createSignal(false);

  return (
    <div>
      <header>
        <h1 class="text-xl font-bold px-8">Cafe International Score Keeping</h1>
      </header>

      <PlayerCount count={playerCount} setCount={setPlayerCount} />

      <ShowScoreSetting showScore={showScore} setShowScore={setShowScore} />

      <div class="flex flex-row">
        <For each={store.players}>
          {(player, playerIndex) => {
            return (
              <div
                class="m-1 border border-blue-800 p-2"
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
    </div>
  );
};

export default App;

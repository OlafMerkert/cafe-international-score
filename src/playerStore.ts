import { range } from "lodash-es";
import { createStore } from "solid-js/store";

interface PlayerState {
  playerName: string;
  playerScore: number[];
}

export interface StoreState {
  players: PlayerState[];
}

function playerTemplate(playerIndex: number): PlayerState {
  return {
    playerName: `Player ${playerIndex + 1}`,
    playerScore: [],
  };
}

export function createPlayerStore(
  initialPlayerCount: number,
  savedState?: unknown,
) {
  // TODO validate and sanitize savedState
  const initialState: StoreState = (savedState as StoreState) ?? {
    players: range(initialPlayerCount).map(playerTemplate),
  };
  const [store, setStore] = createStore(initialState);

  function setPlayerCount(playerCount: number | ((prev: number) => number)) {
    setStore("players", (players) => {
      const newPlayerCount =
        typeof playerCount === "function"
          ? playerCount(players.length)
          : playerCount;

      if (newPlayerCount <= players.length) {
        return players.slice(0, newPlayerCount);
      } else {
        const additionalPlayerCount = newPlayerCount - players.length;
        return [
          ...players,
          ...range(additionalPlayerCount)
            .map((index) => players.length + index)
            .map(playerTemplate),
        ];
      }
    });
  }

  const playerCount = () => store.players.length;

  function setPlayerName(playerIndex: number, playerName: string) {
    setStore("players", playerIndex, (player) => ({ ...player, playerName }));
  }

  function addScore(playerIndex: number, score: number) {
    setStore("players", playerIndex, "playerScore", (scores) => [
      score,
      ...scores,
    ]);
  }

  function removeLastScore(playerIndex: number) {
    setStore("players", playerIndex, "playerScore", (scores) =>
      scores.slice(1),
    );
  }

  function resetScores() {
    setStore("players", (players) =>
      players.map((player) => ({ ...player, playerScore: [] })),
    );
  }

  return {
    store,
    playerCount,
    setPlayerCount,
    setPlayerName,
    addScore,
    removeLastScore,
    resetScores,
  };
}

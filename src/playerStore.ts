import { range } from "lodash-es";
import { createStore } from "solid-js/store";

interface PlayerState {
  playerName: string;
  playerScore: number[];
}

interface StoreState {
  players: PlayerState[];
}

function playerTemplate(playerIndex: number): PlayerState {
  return {
    playerName: `Player ${playerIndex + 1}`,
    playerScore: [],
  };
}

export function createPlayerStore(initialPlayerCount: number) {
  const initialState: StoreState = {
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

  return { store, playerCount, setPlayerCount, setPlayerName };
}

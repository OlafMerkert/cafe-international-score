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
    playerName: `Player ${playerIndex}`,
    playerScore: [],
  };
}

export function createPlayerStore(initialPlayerCount: number) {
  const initialState: StoreState = {
    players: range(initialPlayerCount).map(playerTemplate),
  };
  const [store, setStore] = createStore(initialState);

  function setPlayerCount(playerCount: number | ((prev: number) => number)) {
    console.log("setPlayerCount", playerCount);
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
          ...range(additionalPlayerCount).map(playerTemplate),
        ];
      }
    });
  }

  const playerCount = () => store.players.length;

  return { store, playerCount, setPlayerCount };
}

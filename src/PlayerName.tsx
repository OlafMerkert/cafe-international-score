import { createSignal, type Component } from "solid-js";

interface PlayerNameProps {
  playerIndex: number;
}

const PlayerName: Component<PlayerNameProps> = (props) => {
  const [playerName, setPlayerName] = createSignal(
    /* eslint-disable-next-line solid/reactivity */
    `Player ${props.playerIndex + 1}`,
  );

  return (
    <div class="">
      <input
        name="player-name"
        data-testid="player-name"
        class="px-2 py-1 border border-black w-32"
        type="text"
        value={playerName()}
        onChange={(e) => setPlayerName(e.currentTarget.value)}
      />
    </div>
  );
};

export default PlayerName;

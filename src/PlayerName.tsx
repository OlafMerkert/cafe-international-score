import { createSignal, type Component } from "solid-js";
import { getPlayerNameInputId, getScoreInputId } from "./inputIds";

interface PlayerNameProps {
  playerIndex: number;
}

const PlayerName: Component<PlayerNameProps> = (props) => {
  const [playerName, setPlayerName] = createSignal(
    /* eslint-disable-next-line solid/reactivity */
    `Player ${props.playerIndex + 1}`,
  );

  const handlePlayerNameInputTab = (event: KeyboardEvent) => {
    if (event.key === "Tab") {
      event.preventDefault();
      const nextInput = document.getElementById(
        getPlayerNameInputId(props.playerIndex + 1),
      );
      if (nextInput) {
        nextInput.focus();
      } else {
        const firstInput = document.getElementById(getScoreInputId(0));
        if (firstInput) {
          firstInput.focus();
        }
      }
    }
  };

  return (
    <div class="">
      <input
        id={getPlayerNameInputId(props.playerIndex)}
        name="player-name"
        data-testid="player-name"
        class="px-2 py-1 border border-black w-32"
        type="text"
        value={playerName()}
        onChange={(event) => setPlayerName(event.currentTarget.value)}
        onKeyDown={handlePlayerNameInputTab}
      />
    </div>
  );
};

export default PlayerName;

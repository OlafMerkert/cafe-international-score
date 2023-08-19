import { type Component } from "solid-js";
import { getPlayerNameInputId, getScoreInputId } from "./inputIds";

interface PlayerNameProps {
  playerIndex: number;
  playerName: () => string;
  setPlayerName: (playerName: string) => void;
}

const PlayerName: Component<PlayerNameProps> = (props) => {
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
        value={props.playerName()}
        onChange={(event) => props.setPlayerName(event.currentTarget.value)}
        onKeyDown={handlePlayerNameInputTab}
      />
    </div>
  );
};

export default PlayerName;

import { createSignal, type Component } from "solid-js";

const PlayerName: Component = () => {
  const [playerName, setPlayerName] = createSignal("Player ?");

  return (
    <div class="border border-black">
      <input
        type="text"
        value={playerName()}
        onChange={(e) => setPlayerName(e.currentTarget.value)}
      />
    </div>
  );
};

export default PlayerName;

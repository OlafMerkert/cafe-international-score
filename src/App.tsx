import { createSignal, type Component } from "solid-js";
import PlayerCount from "./PlayerCount";

const App: Component = () => {
  const [playerCount, setPlayerCount] = createSignal(2);

  return (
    <div>
      <header>
        <h1 class="text-xl font-bold text-center">
          Cafe International Score Keeping
        </h1>
      </header>

      <PlayerCount count={playerCount} setCount={setPlayerCount} />
    </div>
  );
};

export default App;

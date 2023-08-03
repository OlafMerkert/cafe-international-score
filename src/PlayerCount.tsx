import type { Component } from "solid-js";

interface PlayerCountProps {
  count: () => number;
  setCount: (count: number) => void;
}

const PlayerCount: Component<PlayerCountProps> = ({ count, setCount }) => {
  return (
    <div class="m-2">
      <label class="font-bold mr-10" for="player-count-input">
        Player Count
      </label>
      <input
        id="player-count-input"
        class="border border-black text-right w-16 px-2 py-1"
        type="number"
        value={count()}
        onChange={(event) => setCount(parseInt(event.currentTarget.value, 10))}
      />
      <button
        class="border border-black px-2 py-1 bg-gray-200 rounded-md ml-2"
        type="button"
        onClick={() => setCount((c: number) => c + 1)}
      >
        +
      </button>
    </div>
  );
};

export default PlayerCount;

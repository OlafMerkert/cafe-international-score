import type { Component } from "solid-js";

interface PlayerCountProps {
  count: () => number;
  setCount: (count: number) => void;
}

const PlayerCount: Component<PlayerCountProps> = ({ count, setCount }) => {
  const handleChangeCount = (event: Event) => {
    const target = event.currentTarget as HTMLInputElement;
    const newCount = Math.abs(parseInt(target.value, 10));
    setCount(newCount);
  };
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
        onChange={handleChangeCount}
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

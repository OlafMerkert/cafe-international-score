import type { Component } from "solid-js";
import Button from "./design/Button";

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
    <div class="m-2 space-x-2">
      <label class="font-bold mr-7" for="player-count-input">
        Player Count
      </label>
      <input
        id="player-count-input"
        class="border border-black text-right w-16 px-2 py-1"
        type="number"
        value={count()}
        onChange={handleChangeCount}
      />
      <Button onClick={() => setCount((c: number) => c + 1)}>+</Button>
    </div>
  );
};

export default PlayerCount;

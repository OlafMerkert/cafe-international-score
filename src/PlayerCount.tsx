import type { Component } from "solid-js";

interface PlayerCountProps {
  count: () => number;
  setCount: (count: number) => void;
}

const PlayerCount: Component<PlayerCountProps> = ({ count, setCount }) => {
  return (
    <div class="space-x-10 m-2">
      <span class="font-bold">Player Count</span>
      <input
        class="border border-black text-right w-16"
        type="number"
        value={count()}
        onChange={(event) => setCount(parseInt(event.currentTarget.value, 10))}
      />
    </div>
  );
};

export default PlayerCount;

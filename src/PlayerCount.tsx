import type { Component } from "solid-js";

interface PlayerCountProps {
  count: () => number;
  setCount: (count: number) => void;
}

const PlayerCount: Component<PlayerCountProps> = ({ count, setCount }) => {
  return (
    <div class="flex flex-col items-center justify-center">
      <div class="text-2xl font-bold">Player Count</div>
      <div class="text-6xl font-bold">
        <input
          type="number"
          value={count()}
          onChange={(event) =>
            setCount(parseInt(event.currentTarget.value, 10))
          }
        />
      </div>
    </div>
  );
};

export default PlayerCount;

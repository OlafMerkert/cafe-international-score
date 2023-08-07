import { Component } from "solid-js";

interface ShowScoreSettingProps {
  showScore: () => boolean;
  setShowScore: (showScore: boolean) => void;
}

const ShowScoreSetting: Component<ShowScoreSettingProps> = ({
  showScore,
  setShowScore,
}) => {
  return (
    <div class="m-2">
      <label class="font-bold mr-10" for="show-score-checkbox">
        Show Score?
      </label>
      <input
        id="show-score-checkbox"
        type="checkbox"
        value={showScore() ? "checked" : undefined}
        onChange={(event) => setShowScore(!!event.currentTarget.checked)}
      />
    </div>
  );
};

export default ShowScoreSetting;

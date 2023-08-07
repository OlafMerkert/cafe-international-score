import { cleanup, render, within, screen } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { describe, test } from "vitest";
import App from "../src/App";

const renderApp = () => {
  const user = userEvent.setup();
  const app = render(() => <App />);

  const getPlayerColumns = (): HTMLDivElement[] =>
    app.getAllByTestId("player-column");

  const getPlayerColumnForPlayer = (playerIndex: number) =>
    within(getPlayerColumns()[playerIndex]);

  const enterScore = async (playerIndex: number, score: string) => {
    const playerColumn = getPlayerColumnForPlayer(playerIndex);

    const scoreInput = playerColumn.getByTestId("score-input");

    await user.clear(scoreInput);
    await user.type(scoreInput, score);

    const addButton = playerColumn.getByRole("button", { name: "add" });

    await user.click(addButton);
  };

  const getScoresForPlayer = (playerIndex: number) => {
    const playerColumn = getPlayerColumnForPlayer(playerIndex);

    return playerColumn
      .queryAllByTestId("score-item")
      .map((score) => Number(score.textContent));
  };

  return { enterScore, getScoresForPlayer };
};

describe("recording points during the game for multiple players", () => {
  afterEach(cleanup);

  test("recording a single score for the first player by pressing a button", async () => {
    const { enterScore, getScoresForPlayer } = renderApp();

    await enterScore(0, "8");

    expect(getScoresForPlayer(0)).toEqual([8]);
    expect(getScoresForPlayer(1)).toEqual([]);
  });
});

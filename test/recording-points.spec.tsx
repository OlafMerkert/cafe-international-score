import { cleanup, fireEvent, render, within } from "@solidjs/testing-library";
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

  const enterScoreKeyboard = async (playerIndex: number, score: string) => {
    const playerColumn = getPlayerColumnForPlayer(playerIndex);
    const scoreInput = playerColumn.getByTestId("score-input");

    await user.clear(scoreInput);
    await user.type(scoreInput, score);
    await user.tab();
    fireEvent.keyDown(scoreInput, { key: "Enter", charCode: 13 });
  };

  const getScoresForPlayer = (playerIndex: number) => {
    const playerColumn = getPlayerColumnForPlayer(playerIndex);

    return playerColumn
      .queryAllByTestId("score-item")
      .map((score) => Number(score.textContent));
  };

  return { enterScore, enterScoreKeyboard, getScoresForPlayer };
};

describe("recording points during the game for multiple players", () => {
  afterEach(cleanup);

  test("recording a single score for the first player by pressing a button", async () => {
    const { enterScore, getScoresForPlayer } = renderApp();

    await enterScore(0, "8");

    expect(getScoresForPlayer(0)).toEqual([8]);
    expect(getScoresForPlayer(1)).toEqual([]);
  });

  test("recording a single score for the first player by pressing enter", async () => {
    const { enterScoreKeyboard, getScoresForPlayer } = renderApp();

    await enterScoreKeyboard(0, "12");

    expect(getScoresForPlayer(0)).toEqual([12]);
    expect(getScoresForPlayer(1)).toEqual([]);
  });

  test("recording multiple scores for the second player", async () => {
    const { enterScore, getScoresForPlayer } = renderApp();

    await enterScore(1, "8");
    await enterScore(1, "4");

    expect(getScoresForPlayer(0)).toEqual([]);
    expect(getScoresForPlayer(1)).toEqual([8, 4]);
  });

  test("recording scores for two players", async () => {
    const { enterScore, getScoresForPlayer } = renderApp();

    await enterScore(0, "8");
    await enterScore(1, "3");
    await enterScore(0, "2");

    expect(getScoresForPlayer(0)).toEqual([8, 2]);
    expect(getScoresForPlayer(1)).toEqual([3]);
  });
});

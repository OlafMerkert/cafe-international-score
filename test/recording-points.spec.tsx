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

  const removeLastScore = async (playerIndex: number) => {
    const playerColumn = within(getPlayerColumns()[playerIndex]);
    const removeButton = playerColumn.getByRole("button", {
      name: "remove last",
    });

    await userEvent.click(removeButton);
  };

  const getScoresForPlayer = (playerIndex: number) => {
    const playerColumn = getPlayerColumnForPlayer(playerIndex);

    return playerColumn
      .queryAllByTestId("score-item")
      .map((score) => Number(score.textContent));
  };

  const getTotalScore = (expectedScore: string = "") =>
    app.queryAllByText(new RegExp(`total score:.*${expectedScore}`, "i"));

  const showTotalScore = async () => {
    const totalScoreToggle = app.getByLabelText("Show Score?");
    await user.click(totalScoreToggle);
  };

  return {
    enterScore,
    enterScoreKeyboard,
    removeLastScore,
    getScoresForPlayer,
    getTotalScore,
    showTotalScore,
  };
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

  test("recording negative scores for the first player", async () => {
    const { enterScore, getScoresForPlayer } = renderApp();

    await enterScore(0, "-8");
    await enterScore(0, "-4");

    expect(getScoresForPlayer(0)).toEqual([-4, -8]);
    expect(getScoresForPlayer(1)).toEqual([]);
  });

  test("recording multiple scores for the second player", async () => {
    const { enterScore, getScoresForPlayer } = renderApp();

    await enterScore(1, "8");
    await enterScore(1, "4");

    expect(getScoresForPlayer(0)).toEqual([]);
    expect(getScoresForPlayer(1)).toEqual([4, 8]);
  });

  test("recording scores for two players", async () => {
    const { enterScore, getScoresForPlayer } = renderApp();

    await enterScore(0, "8");
    await enterScore(1, "3");
    await enterScore(0, "2");

    expect(getScoresForPlayer(0)).toEqual([2, 8]);
    expect(getScoresForPlayer(1)).toEqual([3]);
  });

  test("removing the last score", async () => {
    const { enterScore, removeLastScore, getScoresForPlayer } = renderApp();

    await enterScore(0, "8");
    await enterScore(0, "2");
    await enterScore(0, "7");

    await enterScore(1, "3");
    await enterScore(1, "5");

    expect(getScoresForPlayer(0)).toEqual([7, 2, 8]);
    expect(getScoresForPlayer(1)).toEqual([5, 3]);

    await removeLastScore(0);
    await removeLastScore(1);
    await removeLastScore(0);

    expect(getScoresForPlayer(0)).toEqual([8]);
    expect(getScoresForPlayer(1)).toEqual([3]);
  });

  test("the total score is hidden by default", () => {
    const { getTotalScore } = renderApp();
    expect(getTotalScore()).toHaveLength(0);
  });

  test("the total score can be shown", async () => {
    const { showTotalScore, getTotalScore } = renderApp();
    await showTotalScore();
    expect(getTotalScore("0")).toHaveLength(2);
  });

  test("the total score is computed as sum", async () => {
    const { enterScore, showTotalScore, getTotalScore } = renderApp();
    await showTotalScore();
    await enterScore(0, "8");
    await enterScore(0, "2");
    await enterScore(1, "3");
    await enterScore(1, "-5");

    expect(getTotalScore("10")).toHaveLength(1);
    expect(getTotalScore("-2")).toHaveLength(1);
  });
});

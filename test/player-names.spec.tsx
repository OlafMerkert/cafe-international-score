import { cleanup, render } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import App from "../src/App";

const renderApp = () => {
  const user = userEvent.setup();
  const app = render(() => <App />);

  const getPlayerNameInputs = () => app.getAllByTestId("player-name");

  const enterPlayerName = async (playerIndex: number, playerName: string) => {
    const playerNameInputs = getPlayerNameInputs();
    await user.clear(playerNameInputs[playerIndex]);
    await user.type(playerNameInputs[playerIndex], playerName);
  };

  return { getPlayerNameInputs, enterPlayerName };
};

describe("setting the player names", () => {
  afterEach(cleanup);

  test("setting the name of the first player", async () => {
    const { getPlayerNameInputs, enterPlayerName } = renderApp();

    await enterPlayerName(0, "Test Player 1");

    const playerNameInputs = getPlayerNameInputs();

    expect(playerNameInputs[0]).toHaveValue("Test Player 1");
    expect(playerNameInputs[1]).toHaveValue("Player 2");
  });

  test("setting the name of the second player", async () => {
    const { getPlayerNameInputs, enterPlayerName } = renderApp();

    await enterPlayerName(1, "Test Player 2");

    const playerNameInputs = getPlayerNameInputs();

    expect(playerNameInputs[0]).toHaveValue("Player 1");
    expect(playerNameInputs[1]).toHaveValue("Test Player 2");
  });
});

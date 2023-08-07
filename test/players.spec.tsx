import { cleanup, render } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, test } from "vitest";
import App from "../src/App";

const renderApp = () => {
  const user = userEvent.setup();
  const app = render(() => <App />);

  const getPlayerCountInput = (): HTMLInputElement => {
    return app.getByLabelText("Player Count");
  };

  const getPlusButton = (): HTMLButtonElement => {
    return app.getByText("+");
  };

  const clickPlusButton = async () => {
    await user.click(getPlusButton());
  };

  const enterPlayerCount = async (playerNumber: string) => {
    const playerCountInput = getPlayerCountInput();

    await user.clear(playerCountInput);
    await user.type(playerCountInput, playerNumber);
    await user.tab();
  };

  const findPlayerColumns = (): Promise<HTMLDivElement[]> => {
    return app.findAllByTestId("player-column");
  };
  return {
    getPlayerCountInput,
    getPlusButton,
    clickPlusButton,
    enterPlayerCount,
    findPlayerColumns,
  };
};

describe("selecting the number of players", () => {
  afterEach(cleanup);

  test("the default is a two player game", async () => {
    const { getPlayerCountInput, findPlayerColumns } = renderApp();
    expect(getPlayerCountInput().value).toBe("2");
    expect(await findPlayerColumns()).toHaveLength(2);
  });

  test("increases the player count when the plus button is clicked", async () => {
    const { clickPlusButton, getPlayerCountInput, findPlayerColumns } =
      renderApp();
    await clickPlusButton();
    expect(getPlayerCountInput().value).toBe("3");
    expect(await findPlayerColumns()).toHaveLength(3);
  });

  test("updates the player count when a new number is entered", async () => {
    const { enterPlayerCount, getPlayerCountInput, findPlayerColumns } =
      renderApp();
    await enterPlayerCount("5");

    expect(getPlayerCountInput().value).toBe("5");
    expect(await findPlayerColumns()).toHaveLength(5);
  });

  test("prevents a negative player count by taking the absolute value", async () => {
    const { enterPlayerCount, getPlayerCountInput, findPlayerColumns } =
      renderApp();
    await enterPlayerCount("-4");

    expect(getPlayerCountInput().value).toBe("4");
    expect(await findPlayerColumns()).toHaveLength(4);
  });
});

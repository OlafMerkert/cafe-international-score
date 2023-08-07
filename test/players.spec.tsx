import { cleanup, render } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import App from "../src/App";

describe("selecting the number of players", () => {
  let user: ReturnType<typeof userEvent.setup>;
  beforeEach(() => {
    user = userEvent.setup();
  });

  afterEach(cleanup);

  const renderApp = () => {
    const app = render(() => <App />);

    return {
      getPlayerCountInput(): HTMLInputElement {
        return app.getByLabelText("Player Count");
      },
      findPlayerColumns(): Promise<HTMLDivElement[]> {
        return app.findAllByTestId("player-column");
      },
      getPlusButton(): HTMLButtonElement {
        return app.getByText("+");
      },
    };
  };

  test("the default is a two player game", async () => {
    const { getPlayerCountInput, findPlayerColumns } = renderApp();
    expect(getPlayerCountInput().value).toBe("2");
    expect(await findPlayerColumns()).toHaveLength(2);
  });

  test("increases the player count when the plus button is clicked", async () => {
    const { getPlusButton, getPlayerCountInput, findPlayerColumns } =
      renderApp();
    await user.click(getPlusButton());
    expect(getPlayerCountInput().value).toBe("3");
    expect(await findPlayerColumns()).toHaveLength(3);
  });

  test("updates the player count when a new number is entered", async () => {
    const { getPlayerCountInput, findPlayerColumns } = renderApp();
    const playerCountInput = getPlayerCountInput();

    await user.clear(playerCountInput);
    await user.type(playerCountInput, "5");
    await user.tab();

    expect(playerCountInput.value).toBe("5");
    expect(await findPlayerColumns()).toHaveLength(5);
  });

  test("prevents a negative player count by taking the absolute value", async () => {
    const { getPlayerCountInput, findPlayerColumns } = renderApp();
    const playerCountInput = getPlayerCountInput();

    await user.clear(playerCountInput);
    await user.type(playerCountInput, "-4");
    await user.tab();

    expect(playerCountInput.value).toBe("4");
    expect(await findPlayerColumns()).toHaveLength(4);
  });
});

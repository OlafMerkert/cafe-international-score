import { expect, test, describe } from "vitest";
import { render } from "@solidjs/testing-library";
import App from "../src/App";

describe("selecting the number of players", () => {
  test("the default is a two player game", () => {
    const app = render(() => <App />);

    const playerCountInput: HTMLInputElement =
      app.getByLabelText("Player Count");

    expect(playerCountInput.value).toBe("2");
  });

  test("increases the player count when the plus button is clicked", () => {
    const app = render(() => <App />);

    const playerCountInput: HTMLInputElement =
      app.getByLabelText("Player Count");
    const plusButton = app.getByText("+");

    plusButton.click();

    expect(playerCountInput.value).toBe("3");
  });

  test("updates the player count when a new number is entered", () => {
    const app = render(() => <App />);

    const playerCountInput: HTMLInputElement =
      app.getByLabelText("Player Count");

    playerCountInput.value = "4";
    playerCountInput.dispatchEvent(new Event("input"));

    expect(playerCountInput.value).toBe("4");
  });
});

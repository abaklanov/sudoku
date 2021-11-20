import * as React from "react";
import Playfield from "./";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Playfield", () => {
  it("renders 9x9 fields", () => {
    render(<Playfield />);
    expect(screen.getAllByTestId("field").length).toBe(81);
  });
  it("exposes 36 fields for a player initially", () => {
    render(<Playfield />);
    expect(screen.getAllByText(/\d/i).length).toBe(36);
  });
});

import * as React from "react";
import Field from "./";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Field", () => {
  it("renders the value passed in", () => {
    render(<Field value={8} />);
    expect(screen.getByText("8")).toBeInTheDocument();
  });
});

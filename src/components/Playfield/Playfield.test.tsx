import * as React from "react";
import Playfield from "./";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Playfield", () => {
  it("renders 9x9 fields", () => {
    render(<Playfield />);
    expect(screen.getAllByRole("field").length).toBe(81);
  });
  it("exposes 36 fields for a player initially", () => {
    render(<Playfield />);
    expect(screen.getAllByText(/\d/i).length).toBe(36);
  });
  it("selects the field by clicking", () => {
    render(<Playfield />);
    const field = screen.getByTestId("field-1,3");
    fireEvent.click(field);
    expect(field).toHaveClass("selected");
  });
  it("highlights the fields in the same column and the same line when some field is clicking", () => {
    render(<Playfield />);
    const field = screen.getByTestId("field-1,3");
    fireEvent.click(field);
    expect(field).toHaveClass("selected");
    expect(screen.getByTestId("field-1,0")).toHaveClass("highlighted");
    expect(screen.getByTestId("field-1,1")).toHaveClass("highlighted");
    expect(screen.getByTestId("field-1,2")).toHaveClass("highlighted");
    expect(screen.getByTestId("field-1,4")).toHaveClass("highlighted");
    expect(screen.getByTestId("field-1,5")).toHaveClass("highlighted");
    expect(screen.getByTestId("field-1,6")).toHaveClass("highlighted");
    expect(screen.getByTestId("field-1,7")).toHaveClass("highlighted");
    expect(screen.getByTestId("field-1,8")).toHaveClass("highlighted");
    expect(screen.getByTestId("field-0,3")).toHaveClass("highlighted");
    expect(screen.getByTestId("field-2,3")).toHaveClass("highlighted");
    expect(screen.getByTestId("field-3,3")).toHaveClass("highlighted");
    expect(screen.getByTestId("field-4,3")).toHaveClass("highlighted");
    expect(screen.getByTestId("field-5,3")).toHaveClass("highlighted");
    expect(screen.getByTestId("field-6,3")).toHaveClass("highlighted");
    expect(screen.getByTestId("field-7,3")).toHaveClass("highlighted");
    expect(screen.getByTestId("field-8,3")).toHaveClass("highlighted");
  });
});

import * as React from "react";
import Field from "./";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Field", () => {
  it("renders the value passed in", () => {
    render(
      <Field value={8} indices={[1, 3]} onClick={jest.fn()} selected={false} />
    );
    expect(screen.getByText("8")).toBeInTheDocument();
  });
  it("shows a field with no selection class", () => {
    render(
      <Field value={8} indices={[1, 3]} onClick={jest.fn()} selected={false} />
    );
    expect(screen.getByText("8")).not.toHaveClass("selected");
  });
  it("shows a field with a different style when it's selected", () => {
    render(
      <Field value={8} indices={[1, 3]} onClick={jest.fn()} selected={true} />
    );
    expect(screen.getByText("8")).toHaveClass("selected");
  });
});

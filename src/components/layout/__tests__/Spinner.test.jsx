import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Spinner from "../Spinner";

describe("Spinner", () => {
  it("renders the loading spinner", () => {
    render(<Spinner />);
    const spinner = screen.getByRole("status", { hidden: true });

    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("animate-spin");
  });
});

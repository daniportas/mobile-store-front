import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ApiError from "../ApiError";
import { MemoryRouter } from "react-router-dom";

describe("ApiError", () => {
  it("renders the error message and the refresh link", () => {
    render(
      <MemoryRouter>
        <ApiError message="Something went wrong" />
      </MemoryRouter>
    );

    // Visible error message
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();

    // Update link
    const link = screen.getByRole("link", { name: /Actualizar/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");

    // SVG icon
    const svg = screen.getByTestId("error-icon");
    expect(svg).toBeInTheDocument();
  });
});

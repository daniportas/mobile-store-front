import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import SmartLink from "../SmartLink";
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("SmartLink", () => {
  beforeEach(() => {
    // Define windows location
    delete window.location;
    window.location = {
      ...window.location,
      pathname: "/same",
      reload: vi.fn(),
    };
  });

  it("renders the link with correct message", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SmartLink to="/about" message="Go to About" />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: /go to about/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/about");
  });

  it("does not reload if navigating to a different path", () => {
    window.location.pathname = "/";

    render(
      <MemoryRouter initialEntries={["/"]}>
        <SmartLink to="/about" message="Go to About" />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: /go to about/i });
    fireEvent.click(link);
    expect(window.location.reload).not.toHaveBeenCalled();
  });

  it("reloads the page if clicking on the current path", () => {
    render(
      <MemoryRouter initialEntries={["/same"]}>
        <Routes>
          <Route
            path="/same"
            element={<SmartLink to="/same" message="Reload this page" />}
          />
        </Routes>
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: /reload this page/i });
    fireEvent.click(link);

    expect(window.location.reload).toHaveBeenCalled();
  });
});

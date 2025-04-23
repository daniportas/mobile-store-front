import { render, screen, fireEvent } from "@testing-library/react";
import ProductTabs from "../ProductTabs";
import { describe, it, expect, vi } from "vitest";

describe("ProductTabs", () => {
  const setActiveTab = vi.fn();

  it("renders all tabs", () => {
    render(<ProductTabs activeTab="general" setActiveTab={setActiveTab} />);

    expect(
      screen.getByRole("button", { name: /general/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /pantalla/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /hardware/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cámara/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /conectividad/i })
    ).toBeInTheDocument();
  });

  it("highlights the active tab", () => {
    render(<ProductTabs activeTab="hardware" setActiveTab={setActiveTab} />);
    const hardwareTab = screen.getByRole("button", { name: /hardware/i });

    expect(hardwareTab).toHaveClass("text-blue-600");
  });

  it("calls setActiveTab on tab click", () => {
    render(<ProductTabs activeTab="general" setActiveTab={setActiveTab} />);
    const tab = screen.getByRole("button", { name: /pantalla/i });

    fireEvent.click(tab);
    expect(setActiveTab).toHaveBeenCalledWith("pantalla");
  });
});

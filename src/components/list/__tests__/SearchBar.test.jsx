import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../SearchBar";

describe("SearchBar", () => {
  it("renders with the correct initial value", () => {
    render(<SearchBar value="Galaxy" onChange={() => {}} />);
    const input = screen.getByPlaceholderText("Busca un producto...");
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("Galaxy");
  });

  it("calls onChange when user types", () => {
    const onChange = vi.fn();
    render(<SearchBar value="" onChange={onChange} />);
    const input = screen.getByPlaceholderText("Busca un producto...");
    fireEvent.change(input, { target: { value: "iPhone" } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("iPhone");
  });
});

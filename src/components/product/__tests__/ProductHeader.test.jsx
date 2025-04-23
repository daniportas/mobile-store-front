import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProductHeader from "../ProductHeader";

describe("ProductHeader", () => {
  const mockSetSearch = vi.fn();
  const mockSetBrandFilter = vi.fn();
  const mockSetSortOption = vi.fn();

  const defaultProps = {
    search: "",
    setSearch: mockSetSearch,
    brandFilter: "",
    setBrandFilter: mockSetBrandFilter,
    sortOption: "",
    setSortOption: mockSetSortOption,
    brands: ["Samsung", "Apple"],
  };

  it("renders the title and SearchBar", () => {
    render(<ProductHeader {...defaultProps} />);

    expect(
      screen.getByRole("heading", { name: /dispositivos móviles/i })
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/busca un producto/i)
    ).toBeInTheDocument();
  });

  it("renders brand filter options", () => {
    render(<ProductHeader {...defaultProps} />);
    const select = screen.getByLabelText(/filtro por marca/i);
    expect(select).toBeInTheDocument();

    expect(screen.getByRole("option", { name: "Samsung" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Apple" })).toBeInTheDocument();
  });

  it("calls setSearch on input change", () => {
    render(<ProductHeader {...defaultProps} />);
    const input = screen.getByPlaceholderText(/busca un producto/i);
    fireEvent.change(input, { target: { value: "iPhone" } });
    expect(mockSetSearch).toHaveBeenCalledWith("iPhone");
  });
});

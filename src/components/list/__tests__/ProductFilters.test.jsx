import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductFilters from "../ProductFilters";

describe("ProductFilters", () => {
  const brands = ["Samsung", "Apple", "Xiaomi"];
  const setBrandFilter = vi.fn();
  const setSortOption = vi.fn();

  const setup = () => {
    render(
      <ProductFilters
        brandFilter=""
        setBrandFilter={setBrandFilter}
        sortOption=""
        setSortOption={setSortOption}
        brands={brands}
      />
    );
  };

  it("renders brand filter and sort options", () => {
    setup();

    expect(screen.getByLabelText(/Filtro por marca/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Ordenado/i)).toBeInTheDocument();
  });

  it("renders only provided brand options plus default", () => {
    render(
      <ProductFilters
        brandFilter=""
        setBrandFilter={() => {}}
        sortOption=""
        setSortOption={() => {}}
        brands={["Samsung", "Apple", "Xiaomi"]}
      />
    );

    const brandSelect = screen.getByLabelText(/Filtro por marca/i);
    const options = brandSelect.querySelectorAll("option");

    expect(options.length).toBe(4); // "Todos" + 3 brands
    expect(Array.from(options).map((o) => o.textContent)).toEqual([
      "Todos",
      "Samsung",
      "Apple",
      "Xiaomi",
    ]);
  });
  it("calls setBrandFilter when brand is selected", () => {
    setup();
    const select = screen.getByLabelText(/Filtro por marca/i);
    fireEvent.change(select, { target: { value: "Apple" } });
    expect(setBrandFilter).toHaveBeenCalledWith("Apple");
  });

  it("calls setSortOption when sort is selected", () => {
    setup();
    const select = screen.getByLabelText(/Ordenado/i);
    fireEvent.change(select, { target: { value: "price_desc" } });
    expect(setSortOption).toHaveBeenCalledWith("price_desc");
  });
});

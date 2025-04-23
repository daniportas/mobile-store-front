import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useProductFiltering } from "../useProductFiltering";

const mockProducts = [
  { brand: "Samsung", model: "Galaxy S21" },
  { brand: "Apple", model: "iPhone 13" },
  { brand: "Samsung", model: "Galaxy A12" },
];

describe("useProductFiltering", () => {
  it("returns all products if no filters are applied", () => {
    const { result } = renderHook(() =>
      useProductFiltering({
        products: mockProducts,
        search: "",
        brandFilter: "",
      })
    );
    expect(result.current).toHaveLength(3);
  });

  it("filters by brand", () => {
    const { result } = renderHook(() =>
      useProductFiltering({
        products: mockProducts,
        search: "",
        brandFilter: "Samsung",
      })
    );
    expect(result.current).toHaveLength(2);
    expect(result.current.every((p) => p.brand === "Samsung")).toBe(true);
  });

  it("filters by search", () => {
    const { result } = renderHook(() =>
      useProductFiltering({
        products: mockProducts,
        search: "iphone",
        brandFilter: "",
      })
    );
    expect(result.current).toHaveLength(1);
    expect(result.current[0].model).toBe("iPhone 13");
  });

  it("filters by both brand and search", () => {
    const { result } = renderHook(() =>
      useProductFiltering({
        products: mockProducts,
        search: "galaxy",
        brandFilter: "Samsung",
      })
    );
    expect(result.current).toHaveLength(2);
  });
});

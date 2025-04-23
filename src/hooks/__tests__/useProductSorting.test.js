import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useProductSorting } from "../useProductSorting";

const mockProducts = [
  { model: "Galaxy S21", price: "799" },
  { model: "iPhone 13", price: "999" },
  { model: "Pixel 6", price: "599" },
];

describe("useProductSorting", () => {
  it("returns products as-is if no sort option is provided", () => {
    const { result } = renderHook(() =>
      useProductSorting({ products: mockProducts, sortOption: "" })
    );
    expect(result.current).toEqual(mockProducts);
  });

  it("sorts by ascending price", () => {
    const { result } = renderHook(() =>
      useProductSorting({ products: mockProducts, sortOption: "price_asc" })
    );
    expect(result.current.map((p) => p.price)).toEqual(["599", "799", "999"]);
  });

  it("sorts by descending price", () => {
    const { result } = renderHook(() =>
      useProductSorting({ products: mockProducts, sortOption: "price_desc" })
    );
    expect(result.current.map((p) => p.price)).toEqual(["999", "799", "599"]);
  });

  it("sorts by model name ascending", () => {
    const { result } = renderHook(() =>
      useProductSorting({ products: mockProducts, sortOption: "name_asc" })
    );
    expect(result.current.map((p) => p.model)).toEqual([
      "Galaxy S21",
      "iPhone 13",
      "Pixel 6",
    ]);
  });

  it("sorts by model name descending", () => {
    const { result } = renderHook(() =>
      useProductSorting({ products: mockProducts, sortOption: "name_desc" })
    );
    expect(result.current.map((p) => p.model)).toEqual([
      "Pixel 6",
      "iPhone 13",
      "Galaxy S21",
    ]);
  });
});

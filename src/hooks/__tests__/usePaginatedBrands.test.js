import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useProductBrands } from "../useProductBrands";

const mockProducts = [
  { brand: "Samsung", model: "Galaxy A12" },
  { brand: "Apple", model: "iPhone 13" },
  { brand: "Samsung", model: "Galaxy S21" },
  { brand: "Xiaomi", model: "Redmi Note" },
];

describe("useProductBrands", () => {
  it("returns unique brand names from product list", () => {
    const { result } = renderHook(() => useProductBrands(mockProducts));
    expect(result.current).toContain("Samsung");
    expect(result.current).toContain("Apple");
    expect(result.current).toContain("Xiaomi");
    expect(result.current.length).toBe(3);
  });

  it("returns an empty array if products list is empty", () => {
    const { result } = renderHook(() => useProductBrands([]));
    expect(result.current).toEqual([]);
  });
});

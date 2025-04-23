import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { usePaginatedProducts } from "../usePaginatedProducts";

const mockProducts = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  model: `Product ${i + 1}`,
}));

describe("usePaginatedProducts", () => {
  it("returns the correct slice for the first page", () => {
    const { result } = renderHook(() =>
      usePaginatedProducts({
        products: mockProducts,
        currentPage: 1,
        perPage: 10,
      })
    );
    expect(result.current).toHaveLength(10);
    expect(result.current[0].model).toBe("Product 1");
    expect(result.current[9].model).toBe("Product 10");
  });

  it("returns the correct slice for the second page", () => {
    const { result } = renderHook(() =>
      usePaginatedProducts({
        products: mockProducts,
        currentPage: 2,
        perPage: 10,
      })
    );
    expect(result.current[0].model).toBe("Product 11");
    expect(result.current[9].model).toBe("Product 20");
  });

  it("returns the remaining items on the last page if not full", () => {
    const { result } = renderHook(() =>
      usePaginatedProducts({
        products: mockProducts,
        currentPage: 5,
        perPage: 12,
      })
    );
    expect(result.current).toHaveLength(2);
    expect(result.current[0].model).toBe("Product 49");
    expect(result.current[1].model).toBe("Product 50");
  });

  it("returns an empty array if currentPage exceeds total", () => {
    const { result } = renderHook(() =>
      usePaginatedProducts({
        products: mockProducts,
        currentPage: 10,
        perPage: 10,
      })
    );
    expect(result.current).toHaveLength(0);
  });
});

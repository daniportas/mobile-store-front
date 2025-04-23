import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useFilteredProducts } from "../useFilteredProducts";
import * as api from "../../api/products";

// Mock API data
const mockProducts = [
  { id: "1", brand: "Samsung", model: "Galaxy A12", price: "200" },
  { id: "2", brand: "Apple", model: "iPhone 13", price: "900" },
  { id: "3", brand: "Samsung", model: "Galaxy S21", price: "800" },
];

// Mock fetchProductList
vi.mock("../../api/products", () => ({
  fetchProductList: vi.fn(),
}));

describe("useFilteredProducts", () => {
  beforeEach(() => {
    api.fetchProductList.mockReset();
  });

  it("fetches products and returns filtered/sorted/paginated data", async () => {
    api.fetchProductList.mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useFilteredProducts());

    // Wait for loading to finish
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Check basic states
    expect(result.current.error).toBe(null);
    expect(result.current.currentItems.length).toBeGreaterThan(0);
    expect(result.current.totalItems).toBe(3);
    expect(result.current.totalPages).toBe(1);
    expect(result.current.brands).toContain("Samsung");
    expect(result.current.brands).toContain("Apple");
  });

  it("handles API error", async () => {
    api.fetchProductList.mockRejectedValue(new Error("API failure"));

    const { result } = renderHook(() => useFilteredProducts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Error al cargar los productos");
    expect(result.current.currentItems.length).toBe(0);
  });
});

import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import useProductDetail from "../useProductDetail";
import { CartProvider } from "../../context/CartContext";
import { ProductProvider } from "../../context/ProductContext";
import * as api from "../../api/products";

// Mock the API module
vi.mock("../../api/products");

const mockProduct = {
  id: "123",
  model: "Test Phone",
  brand: "Test Brand",
  options: {
    colors: [{ code: "c1", name: "Red" }],
    storages: [{ code: "s1", name: "64GB" }],
  },
};

describe("useProductDetail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches product details and initializes state", async () => {
    api.fetchProductDetail.mockResolvedValue(mockProduct);

    const wrapper = ({ children }) =>
      React.createElement(
        CartProvider,
        null,
        React.createElement(ProductProvider, null, children)
      );

    const { result } = renderHook(() => useProductDetail("123"), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.product).toEqual(mockProduct);
    expect(result.current.selectedColor).toBe("c1");
    expect(result.current.selectedStorage).toBe("s1");
    expect(result.current.error).toBeNull();
  });

  it("sets error state on fetch failure", async () => {
    api.fetchProductDetail.mockRejectedValue(new Error("API Error"));

    const wrapper = ({ children }) =>
      React.createElement(
        CartProvider,
        null,
        React.createElement(ProductProvider, null, children)
      );

    const { result } = renderHook(() => useProductDetail("123"), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toMatch(/Error al cargar el producto/i);
  });

  it("returns error if productId is not defined", () => {
    const wrapper = ({ children }) =>
      React.createElement(
        CartProvider,
        null,
        React.createElement(ProductProvider, null, children)
      );

    const { result } = renderHook(() => useProductDetail(undefined), {
      wrapper,
    });

    expect(result.current.error).toBe("Invalid product ID");
    expect(result.current.loading).toBe(false);
  });
});

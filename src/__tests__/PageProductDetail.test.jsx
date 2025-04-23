import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import * as api from "../api/products";
import { CartProvider } from "../context/CartContext";
import { ProductProvider } from "../context/ProductContext";
import PageProductDetail from "../pages/PageProductDetail";

const mockProduct = {
  id: "1",
  brand: "Samsung",
  model: "Galaxy S21",
  imgUrl: "/img/s21.jpg",
  price: "800",
  options: {
    colors: [{ code: "1", name: "Black" }],
    storages: [{ code: "2", name: "128GB" }],
  },
};
const mockCartResponse = { count: 1 };

vi.mock("../api/products");

const renderWithProviders = (ui) => {
  return render(
    <MemoryRouter initialEntries={["/product/1"]}>
      <CartProvider>
        <ProductProvider>
          <Routes>
            <Route path="/product/:id" element={ui} />
          </Routes>
        </ProductProvider>
      </CartProvider>
    </MemoryRouter>
  );
};

describe("PageProductDetail", () => {
  beforeEach(() => {
    api.fetchProductDetail.mockResolvedValue(mockProduct);
    api.postAddToCart.mockResolvedValue(mockCartResponse);

  });

  it("renders product detail correctly", async () => {
    renderWithProviders(<PageProductDetail />);

    await waitFor(() =>
      expect(screen.getByText(/Samsung Galaxy S21/i)).toBeInTheDocument()
    );

    expect(screen.getByAltText(/Galaxy S21/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Color Black/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Almacenamiento 128GB/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Añadir al carrito/i })
    ).toBeInTheDocument();
  });

  it("shows error when product fetch fails", async () => {
    api.fetchProductDetail.mockRejectedValue(new Error("API Error"));

    renderWithProviders(<PageProductDetail />);

    await waitFor(() => {
      expect(
        screen.getByText(/Error al cargar el producto/i)
      ).toBeInTheDocument();
    });
  });

  it("shows error if product ID is missing", async () => {
    render(
      <MemoryRouter initialEntries={["/product/"]}>
        <CartProvider>
          <ProductProvider>
            <Routes>
              <Route path="/product" element={<PageProductDetail />} />
            </Routes>
          </ProductProvider>
        </CartProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/producto no encontrado/i)).toBeInTheDocument();
  });

  it("allows adding product to cart", async () => {
    renderWithProviders(<PageProductDetail />);

    // Wait for the product to be rendered
    await screen.findByText(/Samsung Galaxy S21/i);

    const addButton = screen.getByRole("button", {
      name: /Añadir al carrito/i,
    });

    // Click
    fireEvent.click(addButton);

    // Wait for the button to change
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: /Añadiendo.../i })
      ).toBeInTheDocument()
    );

    // Wait for the button to change
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: /Añadir al carrito/i })
      ).toBeInTheDocument()
    );
  });

});

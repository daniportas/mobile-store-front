import { render, screen, fireEvent } from "@testing-library/react";
import ProductRight from "../ProductRight";
import { describe, it, expect, vi } from "vitest";

const mockProduct = {
  brand: "Samsung",
  model: "Galaxy S21",
  price: "800",
  options: {
    colors: [{ code: "1", name: "Negro" }],
    storages: [{ code: "A", name: "64 GB" }],
  },
  battery: "4000 mAh",
  dimentions: "151.7 x 71.2 x 7.9 mm",
  weight: "169g",
  sim: "Dual SIM",
};

describe("ProductRight", () => {
  const setSelectedColor = vi.fn();
  const setSelectedStorage = vi.fn();
  const handleAddToCart = vi.fn();

  it("renders product title and all child components", () => {
    render(
      <ProductRight
        product={mockProduct}
        selectedColor="1"
        setSelectedColor={setSelectedColor}
        selectedStorage="A"
        setSelectedStorage={setSelectedStorage}
        isAdding={false}
        handleAddToCart={handleAddToCart}
      />
    );

    // Check title
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Samsung Galaxy S21"
    );

    // Check tab buttons exist
    expect(
      screen.getByRole("button", { name: /general/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /pantalla/i })
    ).toBeInTheDocument();

    // Check options and add to cart button
    expect(screen.getByLabelText(/color/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/almacenamiento/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /añadir al carrito/i })
    ).toBeInTheDocument();
  });

  it("changes tab on click", () => {
    render(
      <ProductRight
        product={mockProduct}
        selectedColor="1"
        setSelectedColor={setSelectedColor}
        selectedStorage="A"
        setSelectedStorage={setSelectedStorage}
        isAdding={false}
        handleAddToCart={handleAddToCart}
      />
    );

    const tabButton = screen.getByRole("button", { name: /pantalla/i });
    fireEvent.click(tabButton);

    // Confirm that the active tab changed (optional: based on tab content presence)
    expect(tabButton).toHaveClass("text-blue-600");
  });
});

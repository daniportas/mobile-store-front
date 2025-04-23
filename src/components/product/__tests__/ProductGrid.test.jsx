import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProductGrid from "../ProductGrid";

// Mock ProductCard so we don't test its internal logic here
vi.mock("../ProductCard", () => ({
  default: ({ product }) => (
    <div data-testid="product-card">{product.model}</div>
  ),
}));

describe("ProductGrid", () => {
  it("renders message when there are no products", () => {
    render(<ProductGrid currentItems={[]} />);
    expect(
      screen.getByText(/no se encontraron productos/i)
    ).toBeInTheDocument();
  });

  it("renders a grid of ProductCards when products exist", () => {
    const mockProducts = [
      { id: "1", model: "Galaxy S21" },
      { id: "2", model: "iPhone 13" },
    ];

    render(<ProductGrid currentItems={mockProducts} />);

    const cards = screen.getAllByTestId("product-card");
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent("Galaxy S21");
    expect(cards[1]).toHaveTextContent("iPhone 13");
  });
});

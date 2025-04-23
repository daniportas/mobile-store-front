import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ProductCard from "../ProductCard";

const mockProduct = {
  id: "abc123",
  model: "iPhone 13",
  brand: "Apple",
  price: "999",
  imgUrl: "https://example.com/iphone.jpg",
};

describe("ProductCard", () => {
  it("renders product information correctly", () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} />
      </MemoryRouter>
    );

    const card = screen.getByTestId("product-card");

    expect(card).toHaveAttribute("href", "/product/abc123");
    expect(screen.getByAltText("iPhone 13")).toHaveAttribute(
      "src",
      mockProduct.imgUrl
    );
    expect(screen.getByText("iPhone 13")).toBeInTheDocument();
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("999 €")).toBeInTheDocument();
  });

  it("shows 'No disponible' if product has no price", () => {
    const productWithoutPrice = { ...mockProduct, price: "" };

    render(
      <MemoryRouter>
        <ProductCard product={productWithoutPrice} />
      </MemoryRouter>
    );

    expect(screen.getByText(/no disponible/i)).toBeInTheDocument();
  });
});

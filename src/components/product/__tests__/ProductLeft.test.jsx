import { render, screen } from "@testing-library/react";
import ProductLeft from "../ProductLeft";
import { describe, it, expect } from "vitest";

describe("ProductLeft", () => {
  const mockProduct = {
    imgUrl: "/path/to/image.jpg",
    model: "Galaxy S21",
  };

  it("renders product image with correct src and alt", () => {
    render(<ProductLeft product={mockProduct} />);

    const image = screen.getByAltText("Galaxy S21");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/path/to/image.jpg");
  });
});

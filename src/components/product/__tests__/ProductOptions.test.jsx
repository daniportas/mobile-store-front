import { render, screen, fireEvent } from "@testing-library/react";
import ProductOptions from "../ProductOptions";
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("ProductOptions", () => {
  const mockProduct = {
    price: "800",
    options: {
      colors: [
        { code: "1", name: "Negro" },
        { code: "2", name: "Blanco" },
      ],
      storages: [
        { code: "A", name: "64 GB" },
        { code: "B", name: "128 GB" },
      ],
    },
  };

  const setSelectedColor = vi.fn();
  const setSelectedStorage = vi.fn();
  const handleAddToCart = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders color and storage options", () => {
    render(
      <ProductOptions
        product={mockProduct}
        selectedColor="1"
        selectedStorage="A"
        setSelectedColor={setSelectedColor}
        setSelectedStorage={setSelectedStorage}
        isAdding={false}
        handleAddToCart={handleAddToCart}
      />
    );

    expect(screen.getByLabelText("Color Negro")).toBeInTheDocument();
    expect(screen.getByLabelText("Color Blanco")).toBeInTheDocument();
    expect(screen.getByLabelText("Almacenamiento 64 GB")).toBeInTheDocument();
    expect(screen.getByLabelText("Almacenamiento 128 GB")).toBeInTheDocument();
  });

  it("calls setSelectedColor and setSelectedStorage when buttons clicked", () => {
    render(
      <ProductOptions
        product={mockProduct}
        selectedColor="1"
        selectedStorage="A"
        setSelectedColor={setSelectedColor}
        setSelectedStorage={setSelectedStorage}
        isAdding={false}
        handleAddToCart={handleAddToCart}
      />
    );

    fireEvent.click(screen.getByLabelText("Color Blanco"));
    fireEvent.click(screen.getByLabelText("Almacenamiento 128 GB"));

    expect(setSelectedColor).toHaveBeenCalledWith("2");
    expect(setSelectedStorage).toHaveBeenCalledWith("B");
  });

  it("calls handleAddToCart when button clicked", () => {
    render(
      <ProductOptions
        product={mockProduct}
        selectedColor="1"
        selectedStorage="A"
        setSelectedColor={setSelectedColor}
        setSelectedStorage={setSelectedStorage}
        isAdding={false}
        handleAddToCart={handleAddToCart}
      />
    );

    const button = screen.getByRole("button", { name: /añadir al carrito/i });
    fireEvent.click(button);
    expect(handleAddToCart).toHaveBeenCalled();
  });

  it("disables the button and shows loading text when isAdding is true", () => {
    render(
      <ProductOptions
        product={mockProduct}
        selectedColor="1"
        selectedStorage="A"
        setSelectedColor={setSelectedColor}
        setSelectedStorage={setSelectedStorage}
        isAdding={true}
        handleAddToCart={handleAddToCart}
      />
    );

    const button = screen.getByRole("button", { name: /añadiendo/i });
    expect(button).toBeDisabled();
  });
});

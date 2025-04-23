import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../Header";
import { describe, it, expect } from "vitest";
import { CartProvider } from "../../../context/CartContext";

// Wrapper helper: adds Cart and Router context
const renderWithProviders = (ui) => {
  return render(
    <CartProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </CartProvider>
  );
};

describe("Header", () => {
  it("renders the logo and links to home", () => {
    renderWithProviders(<Header />);
    const logo = screen.getByText(/Mobile Store/i);
    expect(logo).toBeInTheDocument();
    expect(logo.closest("a")).toHaveAttribute("href", "/");
  });

  it("renders cart icon and counter", () => {
    renderWithProviders(<Header />);
    const cartIcon = screen.getByText("🛒");
    const cartCount = screen.getByTestId("cart-count");

    expect(cartIcon).toBeInTheDocument();
    expect(cartCount).toBeInTheDocument();
    expect(cartCount).toHaveTextContent("0"); // initial count from context
  });
});

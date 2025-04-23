import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../Header";
import { describe, it, expect } from "vitest";

// Helper for Router wrapping
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("Header", () => {
  it("renders the logo and links to home", () => {
    renderWithRouter(<Header />);
    const logo = screen.getByText(/Mobile Store/i);
    expect(logo).toBeInTheDocument();
    expect(logo.closest("a")).toHaveAttribute("href", "/");
  });

  it("renders cart icon and counter", () => {
    renderWithRouter(<Header />);
    const cartIcon = screen.getByText("🛒");
    const cartCount = screen.getByTestId("cart-count");

    expect(cartIcon).toBeInTheDocument();
    expect(cartCount).toBeInTheDocument();
    expect(cartCount).toHaveTextContent("0");
  });
});

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Breadcrumb from "../Breadcrumb";
import { ProductContext } from "../../../context/ProductContext";

const renderWithRouterAndContext = (
  ui,
  { route = "/product/123", product = null } = {}
) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <ProductContext.Provider value={{ product }}>
        <Routes>
          <Route path="/product/:id" element={ui} />
        </Routes>
      </ProductContext.Provider>
    </MemoryRouter>
  );
};

describe("Breadcrumb", () => {
  it("renders breadcrumb with product info", () => {
    const mockProduct = { brand: "Samsung", model: "Galaxy S21" };
    renderWithRouterAndContext(<Breadcrumb />, { product: mockProduct });

    expect(screen.getByText("Dispositivos móviles")).toBeInTheDocument();
    expect(screen.getByText("Samsung Galaxy S21")).toBeInTheDocument();
  });

  it("renders fallback if product not loaded", () => {
    renderWithRouterAndContext(<Breadcrumb />, { product: null });

    expect(screen.getByText("Dispositivos móviles")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
  });

  it("renders nothing if not on product detail route", () => {
    const { container } = renderWithRouterAndContext(<Breadcrumb />, {
      route: "/other-page",
    });
    expect(container.innerHTML).toBe("");
  });
});

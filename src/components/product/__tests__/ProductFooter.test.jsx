import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProductFooter from "../ProductFooter";

// Mock the Pagination component to simplify testing
vi.mock("../../list/Pagination", () => ({
  default: ({ currentPage, totalPages, perPage, totalItems }) => (
    <div data-testid="pagination">
      Page: {currentPage}, Total: {totalPages}, PerPage: {perPage}, Items:{" "}
      {totalItems}
    </div>
  ),
}));

describe("ProductFooter", () => {
  it("renders Pagination with correct props", () => {
    render(
      <ProductFooter
        currentPage={2}
        totalPages={5}
        setCurrentPage={() => {}}
        perPage={20}
        totalItems={100}
      />
    );

    const pagination = screen.getByTestId("pagination");
    expect(pagination).toHaveTextContent("Page: 2");
    expect(pagination).toHaveTextContent("Total: 5");
    expect(pagination).toHaveTextContent("PerPage: 20");
    expect(pagination).toHaveTextContent("Items: 100");
  });
});

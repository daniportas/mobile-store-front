import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../Pagination";

describe("Pagination", () => {
  const defaultProps = {
    currentPage: 2,
    totalPages: 5,
    onChange: vi.fn(),
    perPage: 20,
    onPerPageChange: vi.fn(),
    totalItems: 100,
  };

  it("renders pagination info correctly", () => {
    render(<Pagination {...defaultProps} />);
    expect(
      screen.getByText("Mostrando 21–40 de 100 productos")
    ).toBeInTheDocument();
  });

  it("disables previous button on first page", () => {
    render(<Pagination {...defaultProps} currentPage={1} />);
    const prevBtn = screen.getByLabelText("Anterior");
    expect(prevBtn).toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(<Pagination {...defaultProps} currentPage={5} />);
    const nextBtn = screen.getByLabelText("Siguiente");
    expect(nextBtn).toBeDisabled();
  });

  it("calls onChange when a page number is clicked", () => {
    render(<Pagination {...defaultProps} />);
    const page3 = screen.getByRole("button", { name: "3" });
    fireEvent.click(page3);
    expect(defaultProps.onChange).toHaveBeenCalledWith(3);
  });

  it("calls onPerPageChange when per page select is changed", () => {
    render(<Pagination {...defaultProps} />);
    const select = screen.getByLabelText(/productos por página/i);
    fireEvent.change(select, { target: { value: "50" } });
    expect(defaultProps.onPerPageChange).toHaveBeenCalledWith(50);
  });
});

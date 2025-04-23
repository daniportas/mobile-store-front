import { useMemo } from "react";

/**
 * Returns the list of products for the current page.
 * @param {Array} products - The sorted list of products.
 * @param {number} currentPage - Current page number.
 * @param {number} perPage - Number of products per page.
 * @returns {Array} Paginated list of products.
 */
export const usePaginatedProducts = ({ products, currentPage, perPage }) => {
  return useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return products.slice(start, start + perPage);
  }, [products, currentPage, perPage]);
};

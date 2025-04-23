import { useMemo } from "react";

/**
 * Sorts the product list according to the selected sort option.
 * @param {Array} products - The filtered list of products.
 * @param {string} sortOption - Selected sorting criteria (price/name ascending/descending).
 * @returns {Array} Sorted list of products.
 */
export const useProductSorting = ({ products, sortOption }) => {
  return useMemo(() => {
    const sorted = [...products];

    switch (sortOption) {
      case "price_asc":
        sorted.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "price_desc":
        sorted.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "name_asc":
        sorted.sort((a, b) => a.model.localeCompare(b.model));
        break;
      case "name_desc":
        sorted.sort((a, b) => b.model.localeCompare(a.model));
        break;
      default:
        break; // No sorting applied
    }

    return sorted;
  }, [products, sortOption]);
};

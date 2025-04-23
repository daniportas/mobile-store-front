import { useMemo } from "react";

/**
 * Sorts the product list according to the selected sort option.
 * @param {Array} products - The filtered list of products.
 * @param {string} sortOption - Selected sorting criteria (price/name/brand ascending/descending).
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
      case "model_asc":
        sorted.sort((a, b) => a.model.localeCompare(b.model));
        break;
      case "model_desc":
        sorted.sort((a, b) => b.model.localeCompare(a.model));
        break;
      case "brand_asc":
        sorted.sort((a, b) => a.brand.localeCompare(b.brand));
        break;
      case "brand_desc":
        sorted.sort((a, b) => b.brand.localeCompare(a.brand));
        break;
      default:
        break; // No sorting applied
    }

    return sorted;
  }, [products, sortOption]);
};

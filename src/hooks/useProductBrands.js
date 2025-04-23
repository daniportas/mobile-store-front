import { useMemo } from "react";

/**
 * Extracts a list of unique brands from the product list.
 * @param {Array} products - The full list of products.
 * @returns {Array} Array of unique brand names.
 */
export const useProductBrands = (products) => {
  return useMemo(() => {
    const brandSet = new Set(products.map((p) => p.brand));
    return [...brandSet];
  }, [products]);
};

import { useMemo } from "react";

/**
 * Filters the product list by brand and search keyword.
 * @param {Array} products - The full list of products.
 * @param {string} search - The search string to match brand or model.
 * @param {string} brandFilter - The selected brand to filter by.
 * @returns {Array} Filtered list of products.
 */
export const useProductFiltering = ({ products, search, brandFilter }) => {
  return useMemo(() => {
    return products.filter((product) => {
      // Check if product matches selected brand (if any)
      const matchesBrand = brandFilter ? product.brand === brandFilter : true;

      // Check if product matches search keyword (brand + model)
      const matchesSearch = search
        ? `${product.brand} ${product.model}`
            .toLowerCase()
            .includes(search.toLowerCase())
        : true;

      return matchesBrand && matchesSearch;
    });
  }, [products, brandFilter, search]);
};


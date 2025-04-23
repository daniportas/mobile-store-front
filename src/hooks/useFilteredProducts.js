import { useEffect, useState } from "react";
import { fetchProductList } from "../api/products";
import {
  useProductFiltering
} from "./useProductFiltering";
import { useProductSorting } from "./useProductSorting";
import { usePaginatedProducts } from "./usePaginatedProducts";
import { useProductBrands } from "./useProductBrands";

// Number of products to display per page
const ITEMS_PER_PAGE = 20;

/**
 * Custom hook to manage the state and derived data for the product list view.
 * Handles loading, filtering, sorting, pagination and error states.
 */
export const useFilteredProducts = () => {
  // Raw product list fetched from the API
  const [products, setProducts] = useState([]);

  // UI states for filtering, sorting, pagination
  const [search, setSearch] = useState(""); // Search query for filtering
  const [brandFilter, setBrandFilter] = useState(""); // Selected brand to filter by
  const [sortOption, setSortOption] = useState(""); // Selected sort option
  const [currentPage, setCurrentPage] = useState(1); // Current pagination page
  const [perPage, setPerPage] = useState(20);

  // Loading and error states for the API call
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products on mount
  useEffect(() => {
    setLoading(true);
    fetchProductList()
      .then(setProducts)
      .catch(() => setError("Error al cargar los productos"))
      .finally(() => setLoading(false));
  }, []);

  // Reset to first page when search or brand filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, brandFilter, perPage]);

  // Derived data using custom hooks
  const filtered = useProductFiltering({ products, search, brandFilter }); // Filtered products
  const sorted = useProductSorting({ products: filtered, sortOption }); // Sorted products
  const brands = useProductBrands(products); // List of unique brands
  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE); // Total pages available
  const currentItems = usePaginatedProducts({
    products: sorted,
    currentPage,
    perPage,
  });
  // Return state and derived values to be consumed in the component
  return {
    currentItems, // Products to display on current page
    search,
    setSearch,
    brandFilter,
    setBrandFilter,
    sortOption,
    setSortOption,
    currentPage,
    setCurrentPage,
    totalPages, // Total number of pages based on result length
    brands, // Unique brands for filter dropdown
    loading,
    error,
    totalItems: sorted.length, // Used for showing total number of filtered/sorted products
    perPage, // Products per page constant
    setPerPage,
  };
};

import ApiError from "../components/error/ApiError";
import Spinner from "../components/layout/Spinner";
import ProductFooter from "../components/product/ProductFooter";
import ProductGrid from "../components/product/ProductGrid";
import ProductHeader from "../components/product/ProductHeader";
import { useFilteredProducts } from "../hooks/useFilteredProducts";

const ProductList = () => {
  const {
    currentItems,
    search,
    setSearch,
    brandFilter,
    setBrandFilter,
    sortOption,
    setSortOption,
    currentPage,
    setCurrentPage,
    totalPages,
    brands,
    loading,
    error,
    totalItems,
    perPage,
  } = useFilteredProducts();

  if (loading) return <Spinner />;
  if (error) return <ApiError message={error} to={"/"} />;

  return (
    <div className="max-w-6xl mx-auto px-4">
      <ProductHeader
        search={search}
        setSearch={setSearch}
        brandFilter={brandFilter}
        setBrandFilter={setBrandFilter}
        sortOption={sortOption}
        setSortOption={setSortOption}
        brands={brands}
      />
      <ProductGrid currentItems={currentItems} />

      <ProductFooter
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        perPage={perPage}
        totalItems={totalItems}
      />
    </div>
  );
};

export default ProductList;

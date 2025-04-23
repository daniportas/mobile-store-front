import React from "react";
import SearchBar from "../list/SearchBar";
import ProductFilters from "../list/ProductFilters";

const ProductHeader = ({ search, setSearch, brandFilter, setBrandFilter, sortOption, setSortOption, brands }) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <h1 className="text-2xl font-semibold">Dispositivos móviles</h1>
        <div className="w-full sm:w-80">
          <SearchBar value={search} onChange={setSearch} />
        </div>
      </div>

      <ProductFilters
        brandFilter={brandFilter}
        setBrandFilter={setBrandFilter}
        sortOption={sortOption}
        setSortOption={setSortOption}
        brands={brands}
      />
    </>
  );
};

export default ProductHeader;

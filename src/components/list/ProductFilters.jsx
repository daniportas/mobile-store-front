import React from "react";

const ProductFilters = ({
  brandFilter,
  setBrandFilter,
  sortOption,
  setSortOption,
  brands,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
      <div className="flex items-center gap-2">
        <label htmlFor="brandFilter" className="text-sm font-medium">
          Filtro por marca:
        </label>
        <select
          id="brandFilter"
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">Todos</option>
          {brands?.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="sortOption" className="text-sm font-medium">
          Ordenado:
        </label>
        <select
          id="sortOption"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">Por defecto</option>
          <option value="brand_asc">Marca (A-Z)</option>
          <option value="brand_desc">Marca (Z-A)</option>
          <option value="model_asc">Modelo (A-Z)</option>
          <option value="model_desc">Modelo (Z-A)</option>
          <option value="price_asc">Precio (Menor a mayor)</option>
          <option value="price_desc">Precio (Mayor a menor)</option>
        </select>
      </div>
    </div>
  );
};

export default ProductFilters;

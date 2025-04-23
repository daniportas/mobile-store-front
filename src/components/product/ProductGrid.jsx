import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ currentItems }) => {
  return (
    <>
      {currentItems.length === 0 ? (
        <p className="text-gray-500">No se encontraron productos.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProductGrid;

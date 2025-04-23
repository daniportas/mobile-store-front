import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      data-testid="product-card"
      className="border border-gray-200 rounded-xl p-4 bg-white flex flex-col items-center text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-transform duration-200 ease-in-out"
    >
      <img
        width={228}
        height={192}
        src={product.imgUrl}
        alt={product.model}
        className="w-full h-48 object-contain mb-4"
      />
      <h3 className="font-semibold text-lg">{product.model}</h3>
      <p className="text-gray-600">{product.brand}</p>
      <p className="mt-2 font-bold text-blue-600">
        {product.price ? `${product.price} €` : "No disponible"}
      </p>
    </Link>
  );
};

export default ProductCard;

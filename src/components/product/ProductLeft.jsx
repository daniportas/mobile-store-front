import React from "react";

const ProductLeft = ({ product }) => {
  return (
    <div className="col-span-1">
        <img
            src={product.imgUrl}
            alt={product.model}
            className="w-full h-auto object-contain"
        />
    </div>
  );
};

export default ProductLeft;

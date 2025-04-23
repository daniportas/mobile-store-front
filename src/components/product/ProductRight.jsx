import React, { useState } from "react";
import ProductTabs from "./ProductTabs";
import ProductTabContent from "./ProductTabContent";
import ProductOptions from "./ProductOptions";

const ProductRight = ({ product, selectedColor, setSelectedColor, selectedStorage, setSelectedStorage, isAdding, handleAddToCart }) => {
    const [activeTab, setActiveTab] = useState("general");
  return (
    <div className="col-span-2 space-y-6">
      <h2 className="text-2xl font-bold">
        {product.brand} {product.model}
      </h2>
      <ProductTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <ProductTabContent product={product} activeTab={activeTab} />
      <hr className="my-6 border-t" />
      <ProductOptions
        product={product}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        selectedStorage={selectedStorage}
        setSelectedStorage={setSelectedStorage}
        isAdding={isAdding}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ProductRight;

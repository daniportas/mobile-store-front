import React from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/layout/Spinner";
import ApiError from "../components/error/ApiError";
import ProductLeft from "../components/product/ProductLeft";
import ProductRight from "../components/product/ProductRight";
import useProductDetail from "../hooks/useProductDetail";

const PageProductDetail = () => {
  const { id } = useParams();
  const {
    product,
    loading,
    error,
    selectedColor,
    setSelectedColor,
    selectedStorage,
    setSelectedStorage,
    isAdding,
    handleAddToCart,
  } = useProductDetail(id);

  if (!id) {
    return <ApiError message="Producto no encontrado" to="/" />;
  }

  if (loading) return <Spinner />;
  if (error) return <ApiError message={error} to="/" />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <ProductLeft product={product} />
      <ProductRight
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

export default PageProductDetail;

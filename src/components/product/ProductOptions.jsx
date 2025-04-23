import React from "react";

const ProductOptions = React.memo(
  ({
    product,
    selectedColor,
    setSelectedColor,
    selectedStorage,
    setSelectedStorage,
    isAdding,
    handleAddToCart,
  }) => {
    return (
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Color:</label>
          <div className="flex flex-wrap gap-2">
            {product.options.colors.map((color) => {
              const isSelected = color.code === selectedColor;
              return (
                <button
                  key={color.code}
                  className={`cursor-pointer px-3 py-1 rounded border ${
                    isSelected
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-800"
                  }`}
                  onClick={() => !isSelected && setSelectedColor(color.code)}
                  aria-pressed={isSelected}
                  aria-label={`Color ${color.name}`}
                >
                  {color.name}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Almacenamiento:
          </label>
          <div className="flex flex-wrap gap-2">
            {product.options.storages.map((storage) => {
              const isSelected = storage.code === selectedStorage;
              return (
                <button
                  key={storage.code}
                  className={`cursor-pointer px-3 py-1 rounded border ${
                    isSelected
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-800"
                  }`}
                  onClick={() =>
                    !isSelected && setSelectedStorage(storage.code)
                  }
                  aria-pressed={isSelected}
                  aria-label={`Almacenamiento ${storage.name}`}
                >
                  {storage.name}
                </button>
              );
            })}
          </div>
        </div>

        <button
          disabled={isAdding || product.price.length === 0}
          className={`cursor-pointer w-full sm:w-auto mt-4 px-4 py-2 rounded text-white transition-colors ${
            isAdding || product.price.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
          onClick={handleAddToCart}
          aria-busy={isAdding}
        >
          {isAdding ? "Añadiendo..." : "Añadir al carrito"}
        </button>
      </div>
    );
  }
);

export default ProductOptions;

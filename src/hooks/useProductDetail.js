import { useEffect, useState } from "react";
import { fetchProductDetail, postAddToCart } from "../api/products";
import { toast } from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { useProduct } from "../context/ProductContext";

/**
 * Custom hook to handle product detail logic:
 * - Fetch product detail from the API
 * - Manage selected color and storage
 * - Handle add-to-cart logic
 */
const useProductDetail = (productId) => {
  // Access cart context to update the global cart state
  const { addToCart } = useCart();

  // Access product context to share the current product
  const { setProduct: setSharedProduct } = useProduct();

  // Local state for product data and UI state
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  // Fetch product detail when the productId changes
  useEffect(() => {
    if (!productId) {
      setError("Invalid product ID");
      setLoading(false);
      return;
    }

    setLoading(true);

    fetchProductDetail(productId)
      .then((data) => {
        setProduct(data); // Save locally
        setSharedProduct(data); // Share via context
        setSelectedColor(data.options.colors[0]?.code || null); // Select default color
        setSelectedStorage(data.options.storages[0]?.code || null); // Select default storage
      })
      .catch((err) => {
        console.error(err);
        setError("Error al cargar el producto");
      })
      .finally(() => setLoading(false));
  }, [productId]);

  // Add product to cart with selected options
  const handleAddToCart = async () => {
    if (!selectedColor || !selectedStorage) return;

    try {
      setIsAdding(true);
      const data = await postAddToCart({
        id: product.id,
        colorCode: selectedColor,
        storageCode: selectedStorage,
      });

      addToCart(data); // Update cart state
      toast.success("Producto añadido al carrito");
    } catch (err) {
      console.error(err);
      toast.error("Ha habido un error al añadir el producto al carrito");
    } finally {
      setIsAdding(false);
    }
  };

  // Return everything needed by the component
  return {
    product,
    loading,
    error,
    selectedColor,
    setSelectedColor,
    selectedStorage,
    setSelectedStorage,
    isAdding,
    handleAddToCart,
  };
};

export default useProductDetail;

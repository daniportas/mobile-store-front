import { useLocation, Link } from "react-router-dom";
import { useProduct } from "../../context/ProductContext";

const Breadcrumb = () => {
  const location = useLocation();
  const match = location.pathname.match(/^\/product\/([^/]+)$/);
  const id = match?.[1];
  const { product } = useProduct();

  if (!id) return null;

  return (
    <nav className="bg-gray-50 border-t border-b border-gray-200 py-2">
      <div className="max-w-6xl mx-auto px-4 text-sm text-gray-600 flex items-center space-x-1">
        <Link to="/" className="hover:underline text-blue-600 font-medium">
          Dispositivos móviles
        </Link>
        <span>/</span>
        {product ? (
          <span className="text-gray-800">
            {product.brand} {product.model}
          </span>
        ) : (
          <span>-</span>
        )}
      </div>
    </nav>
  );
};

export default Breadcrumb;

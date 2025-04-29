import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import { useCart } from "../../hooks/useCart";

const Header = () => {
  const { count, clearCart } = useCart();
  const location = useLocation();
  const isDetailPage = /^\/product\/[^/]+$/.test(location.pathname);
  const [hovering, setHovering] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setHovering(true);
  };

  const handleMouseLeave = () => {
    // delay para permitir mover el ratón al popover sin cerrarse
    timeoutRef.current = setTimeout(() => {
      setHovering(false);
    }, 200);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <header className="bg-blue-500 text-white px-6 py-4 flex justify-between items-center shadow-md relative">
        <Link to="/" className="text-xl font-bold">
          📱 Mobile Store
        </Link>

        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="text-sm flex items-center gap-1 cursor-pointer">
            🛒{" "}
            <span data-testid="cart-count" className="font-semibold">
              {count}
            </span>
          </div>

          {hovering && (
            <div className="absolute top-full mt-2 right-0 bg-white text-black p-4 rounded shadow-lg min-w-[180px] z-50">
              <p className="text-sm mb-2">Productos en carrito: {count}</p>
              <button
                onClick={clearCart}
                className="w-full px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm cursor-pointer"
              >
                Vaciar carrito
              </button>
            </div>
          )}
        </div>
      </header>
      {isDetailPage && <Breadcrumb />}
    </div>
  );
};

export default Header;

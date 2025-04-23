import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <header className="bg-blue-500 text-white px-6 py-4 flex justify-between items-center shadow-md relative">
        <Link to="/" className="text-xl font-bold">
          📱 Mobile Store
        </Link>

        <div className="text-sm flex items-center gap-1 cursor-pointer">
          🛒{" "}
          <span data-testid="cart-count" className="font-semibold">
            0
          </span>
        </div>
      </header>
    </div>
  );
};

export default Header;

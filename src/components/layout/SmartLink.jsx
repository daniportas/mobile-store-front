import React from "react";
import { Link, useLocation } from "react-router-dom";

const SmartLink = ({ to, message }) => {
  const location = useLocation();

  const handleClick = (e) => {
    if (location.pathname === to) {
      e.preventDefault();
      window.location.reload();
    }
  };

  return (
    <Link
      to={to}
      onClick={handleClick}
      className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
    >
      {message}
    </Link>
  );
};

export default SmartLink;

import React from "react";

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Busca un producto..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
    />
  );
};

export default SearchBar;
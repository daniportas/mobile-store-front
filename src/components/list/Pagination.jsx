import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  onChange,
  perPage,
  onPerPageChange,
  totalItems,
}) => {
  const start = (currentPage - 1) * perPage + 1;
  const end = Math.min(start + perPage - 1, totalItems);

  return (
    <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
      {/* Info */}
      <span className="text-sm text-gray-600">
        Mostrando {start}–{end} de {totalItems} productos
      </span>

      {totalPages > 1 ? (
        <div className="flex items-center gap-2">
          <button
            aria-label="Anterior"
            disabled={currentPage === 1}
            onClick={() => onChange(currentPage - 1)}
            className="p-2 border rounded disabled:opacity-50 cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onChange(page)}
              className={`px-3 py-1 rounded border text-sm cursor-pointer ${
                page === currentPage
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            aria-label="Siguiente"
            disabled={currentPage === totalPages}
            onClick={() => onChange(currentPage + 1)}
            className="p-2 border rounded disabled:opacity-50 cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      ) : (
        <div />
      )}

      <div className="flex items-center gap-2 text-sm">
        <label htmlFor="perPage" className="text-sm">
          Productos por página:
        </label>
        <select
          id="perPage"
          value={perPage}
          onChange={(e) => onPerPageChange(Number(e.target.value))}
          className="border rounded px-2 py-1"
        >
          {[20, 50, 100].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;

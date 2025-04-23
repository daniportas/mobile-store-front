import React from "react";
import Pagination from "../list/Pagination";

const ProductFooter = ({
  currentPage,
  totalPages,
  setCurrentPage,
  perPage,
  totalItems,
  onPerPageChange,
}) => {
  return (
    <div className="mt-10">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={setCurrentPage}
        perPage={perPage}
        totalItems={totalItems}
        setCurrentPage={setCurrentPage}
        onPerPageChange={onPerPageChange}
      />
    </div>
  );
};

export default ProductFooter;

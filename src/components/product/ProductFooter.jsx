import React from "react";
import Pagination from "../list/Pagination";

const ProductFooter = ({
  currentPage,
  totalPages,
  setCurrentPage,
  perPage,
  totalItems,
}) => {
  return (
    <div className="mt-10">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={setCurrentPage}
        perPage={perPage}
        totalItems={totalItems}
      />
    </div>
  );
};

export default ProductFooter;

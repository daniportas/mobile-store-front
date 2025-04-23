export const filterProducts = (products, search, brand) => {
  let filtered = products.filter((p) =>
    (p.brand + " " + p.model).toLowerCase().includes(search.toLowerCase())
  );
  if (brand) {
    filtered = filtered.filter((p) => p.brand === brand);
  }
  return filtered;
};

export const sortProducts = (products, sortOption) => {
  if (!sortOption) return products;

  const [field, direction] = sortOption.split("_");

  return [...products].sort((a, b) => {
    let valueA = a[field];
    let valueB = b[field];

    if (field === "price") {
      valueA = Number(valueA);
      valueB = Number(valueB);
    } else {
      valueA = valueA.toString().toLowerCase();
      valueB = valueB.toString().toLowerCase();
    }

    if (valueA < valueB) return direction === "asc" ? -1 : 1;
    if (valueA > valueB) return direction === "asc" ? 1 : -1;
    return 0;
  });
};

export const paginate = (items, currentPage, perPage) => {
  const start = (currentPage - 1) * perPage;
  return items.slice(start, start + perPage);
};
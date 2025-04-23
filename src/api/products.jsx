const API_BASE_URL = "https://itx-frontend-test.onrender.com/api";
const CACHE_TTL = 1000 * 60 * 60; // 1 hour in miliseconds

export const fetchProductList = async () => {
  const CACHE_KEY = "mobile-store:product-list";
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    const now = Date.now();

    if (now - timestamp < CACHE_TTL) {
      return data; // Return cache data
    }
  }

  // Get from API
  const response = await fetch(`${API_BASE_URL}/product`);
  if (!response.ok) {
    throw new Error("Error fetching product list");
  }

  const data = await response.json();

  // Save cache
  localStorage.setItem(
    CACHE_KEY,
    JSON.stringify({ data, timestamp: Date.now() })
  );

  return data;
};



export const fetchProductDetail = async (id) => {
  const CACHE_KEY = `mobile-store:product-detail:${id}`;

  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_TTL) {
      return data;
    }
  }

  const response = await fetch(`${API_BASE_URL}/product/${id}`);
  if (!response.ok) {
    throw new Error("Error fetching product detail");
  }

  const data = await response.json();

  localStorage.setItem(
    CACHE_KEY,
    JSON.stringify({ data, timestamp: Date.now() })
  );

  return data;
};

export const postAddToCart = async ({ id, colorCode, storageCode }) => {
  const response = await fetch(`${API_BASE_URL}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, colorCode, storageCode }),
  });

  if (!response.ok) throw new Error("Error al añadir al carrito");

  return response.json();
};

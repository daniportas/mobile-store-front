import { test, expect } from "@playwright/test";

test("full user flow: list -> detail -> add to cart -> return", async ({
  page,
}) => {
  // Go to home (product list)
  await page.goto("/");

  // Wait for the page title
  await expect(
    page.getByRole("heading", { name: /dispositivos móviles/i })
  ).toBeVisible();

  // Get initial cart count
  const initialCartCountText = await page
    .getByTestId("cart-count")
    .textContent();
  const initialCartCount = Number(initialCartCountText);

  // Search for a product
  await page.getByPlaceholder("Busca un producto...").fill("iconia");

  // Click the first matching product card
  const productCard = await page
    .getByTestId("product-card")
    .filter({ hasText: "Iconia" })
    .first();
  await productCard.click();

  // Wait for detail to load
  await expect(page.getByRole("heading", { name: /iconia/i })).toBeVisible();

  // Add to cart
  const addButton = page.getByRole("button", { name: /añadir al carrito/i });
  await expect(addButton).toBeEnabled();
  await addButton.click();

  // Wait for toast message
  await expect(page.getByRole("status")).toHaveText(/añadido/i);

  // Go back to the product list
  await page.goBack();

  // Verify the cart count increased by 1
  const updatedCartCountText = await page
    .getByTestId("cart-count")
    .textContent();
  const updatedCartCount = Number(updatedCartCountText);

  expect(updatedCartCount).toBe(initialCartCount + 1);
});

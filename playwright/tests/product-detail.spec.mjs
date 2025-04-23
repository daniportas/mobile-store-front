import { test, expect } from "@playwright/test";

test.describe("Product Detail Page", () => {
  test("should display product detail and allow interaction", async ({
    page,
  }) => {
    // Navigate directly to a product detail page (make sure this ID exists in your mock or backend)
    await page.goto("/product/ZmGrkLRPXOTpxsU4jjAcv");

    // Verify the product heading (brand and model) is visible
    await expect(page.getByRole("heading", { name: /Iconia/i })).toBeVisible();

    // Verify the product image is visible
    await expect(page.getByRole("img", { name: /Iconia/i })).toBeVisible();

    // Check color selection button
    await expect(
      page.getByRole("button", { name: /Color Black/i })
    ).toBeVisible();

    // Check storage selection button
    await expect(
      page.getByRole("button", { name: /Almacenamiento 16 GB/i })
    ).toBeVisible();

    // Check "Add to cart" button
    const addToCartBtn = page.getByRole("button", {
      name: /añadir al carrito/i,
    });
    await expect(addToCartBtn).toBeVisible();

    // Simulate click on "Add to cart"
    await addToCartBtn.click();

    // Wait for the toast notification to appear
    await expect(page.getByRole("status")).toHaveText(/añadido/i);
  });
});

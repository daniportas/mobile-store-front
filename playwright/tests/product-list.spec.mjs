import { test, expect } from "@playwright/test";

test.describe("Product List Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should render the product list title", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /dispositivos móviles/i })
    ).toBeVisible();
  });

  test("should allow searching for a product", async ({ page }) => {
    await page.getByPlaceholder("Busca un producto...").fill("iconia");
    const matchingCard = await page
      .getByTestId("product-card")
      .filter({ hasText: "Iconia" })
      .first();
    await expect(matchingCard).toBeVisible();
  });

  test("should filter products by brand", async ({ page }) => {
    await page.getByLabel("Filtro por marca:").selectOption("Acer");

    const cards = await page.getByTestId("product-card").all();
    for (const card of cards) {
      await expect(card).toContainText(/acer/i);
    }
  });

  test("should paginate when clicking next page", async ({ page }) => {
    const page2Button = page.getByRole("button", { name: "2" });
    await page2Button.click();

    await expect(page2Button).toHaveClass(/bg-blue-600/);
  });
});

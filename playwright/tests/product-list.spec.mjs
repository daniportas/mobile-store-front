import { test, expect } from "@playwright/test";

test.describe("Product List Page", () => {
  // Navigate to the homepage before each test
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  // Check that the main heading for the product list is visible
  test("should render the product list title", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /dispositivos móviles/i })
    ).toBeVisible();
  });

  // Simulate searching for a product and validate the result
  test("should allow searching for a product", async ({ page }) => {
    // Type "iconia" into the search input
    await page.getByPlaceholder("Busca un producto...").fill("iconia");

    // Get the first product card that matches the text "Iconia"
    const matchingCard = await page
      .getByTestId("product-card")
      .filter({ hasText: "Iconia" })
      .first();

    // Ensure the matching product card is visible
    await expect(matchingCard).toBeVisible();
  });

  // Filter the product list by brand and validate results
  test("should filter products by brand", async ({ page }) => {
    // Select brand "Acer" from the brand filter dropdown
    await page.getByLabel("Filtro por marca:").selectOption("Acer");

    // All visible product cards should contain "Acer"
    const cards = await page.getByTestId("product-card").all();
    for (const card of cards) {
      await expect(card).toContainText(/acer/i);
    }
  });

  // Test pagination functionality by navigating to page 2
  test("should paginate when clicking next page", async ({ page }) => {
    // Click the button labeled "2" to go to the second page
    const page2Button = page.getByRole("button", { name: "2" });
    await page2Button.click();

    // Verify that page 2 is now active by checking the class
    await expect(page2Button).toHaveClass(/bg-blue-600/);
  });
});

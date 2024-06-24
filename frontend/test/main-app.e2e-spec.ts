import { test, expect } from "@playwright/test";

test.describe("Complete application", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByRole("textbox").click();
    await page.getByRole("textbox").setInputFiles("./frontend/test/data.csv");
    // await page
    //   .getByRole("textbox")
    //   .setInputFiles("./frontend/e2e-tests/data.csv");
    const uploadButton = await page.getByRole("button", {
      name: "Upload file",
    });
    await uploadButton.click();
  });

  test("should display the name when loaded", async ({ page }) => {
    await expect(
      page.getByPlaceholder("Search for a user by name or")
    ).toBeEmpty();
    await expect(page.locator("tbody")).toContainText("john.doe@example.com");
  });

  test("should display user table and search bar after successful upload", async ({
    page,
  }) => {
    await expect(page.getByRole("table")).toBeVisible();
    await expect(page.getByPlaceholder(/search for a user/i)).toBeVisible();
  });

  test("should search for a value in searchbar", async ({ page }) => {
    await page.getByPlaceholder(/search for a user/i).click();
    await page.getByPlaceholder(/search for a user/i).fill("john");

    await expect(page.locator("tbody")).toContainText("john.doe@example.com");
    await expect(page.locator("tbody")).toContainText("John Doe");
  });

  test("should return not found", async ({ page }) => {
    await page.getByPlaceholder(/search for a user/i).click();
    await page.getByPlaceholder(/search for a user/i).fill("asdqwe");

    await expect(page.getByText("No results found.")).toBeVisible();
  });

  test("should load more users as the user scrolls", async ({ page }) => {
    await page.mouse.wheel(0, 1000);
    await expect(page.locator("tbody tr")).toHaveCount(9);
  });
});

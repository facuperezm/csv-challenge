import { test, expect } from "@playwright/test";

test.describe("Complete application", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByRole("textbox").click();
    // await page
    //   .getByRole("textbox")
    //   .setInputFiles("./frontend/e2e-tests/data.csv");
    await page.setInputFiles('input[type="file"]', "./frontend/test/data.csv");
    const uploadButton = await page.getByRole("button", {
      name: "Upload file",
    });
    await uploadButton.click();
  });

  test("should show searchbar and all entries should be displayed", async ({
    page,
  }) => {
    await expect(
      page.getByPlaceholder("Search for a user by name or")
    ).toBeEmpty();
    await expect(page.locator("tbody")).toContainText("john.doe@example.com");
  });

  test("should search for a value in searchbar", async ({ page }) => {
    await page.getByPlaceholder(/search for a user/i).click();
    await page.getByPlaceholder(/search for a user/i).fill("john");

    await expect("/john.doe@example.com/i").toBeDefined();
    await expect(page.locator("tbody")).toContainText("john.doe@example.com");
    await expect(page.locator("tbody")).toContainText("John Doe");
  });

  test("should return not found", async ({ page }) => {
    await page.getByPlaceholder(/search for a user/i).click();
    await page.getByPlaceholder(/search for a user/i).fill("asdqwe");

    await expect(page.getByText("No results found.")).toBeVisible();
  });
});

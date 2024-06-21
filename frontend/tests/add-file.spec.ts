import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:4000/");
  await page.setInputFiles('input[type="file"]', "./data.csv");
  await page.getByRole("button", { name: "Upload file" }).click();
  await expect(
    page.getByPlaceholder("Search for a user by name or")
  ).toBeEmpty();
  await expect(page.locator("tbody")).toContainText("john.doe@example.com");
});

import Search from "./search";
import { renderWithClient } from "@/lib/helper";
import { screen } from "@testing-library/react";

describe("Search component", () => {
  it("should render correctly", async () => {
    renderWithClient(<Search />);
    expect(await screen.findByText(/loading/i)).toBeDefined();
  });
});

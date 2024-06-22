import Search from "./search";
import { renderWithClient } from "@/lib/helper";

describe("Search component", () => {
  it("should render correctly", async () => {
    renderWithClient(<Search />);

    expect(/loading/i).toBeDefined();
  });

  it("should load the table correctly", () => {
    renderWithClient(<Search />);
  });
});

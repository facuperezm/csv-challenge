import Search from "./search";
import { renderWithClient } from "@/lib/helper";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Search component", () => {
  it("should render correctly", async () => {
    const wrapper = renderWithClient(<Search />);
    expect(await wrapper.findByText(/loading/i)).toBeDefined();
  });

  it("should display 'no results found' when search yields no results", async () => {
    renderWithClient(<Search />);
    userEvent.type(screen.getByRole("textbox"), "Nonexistent User");
    expect(await screen.findByText(/no results found/i)).toBeInTheDocument();
  });
});

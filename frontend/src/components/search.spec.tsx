import { render, screen } from "@testing-library/react";
import Search from "./search";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
describe("SearchComponent", () => {
  it("should render correctly", () => {
    <QueryClientProvider client={queryClient}>
      render(
      <Search />
      );
    </QueryClientProvider>;
    screen.debug();

    // debug
  });
});

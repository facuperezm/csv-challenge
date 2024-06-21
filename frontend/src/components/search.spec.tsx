import { render, screen, waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react";
import Search from "./search";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";

export function useCustomHook() {
  return useQuery({ queryKey: ["customHook"], queryFn: () => "Hello" });
}

const createWrapper = () => {
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("SearchComponent", () => {
  it("should render correctly", async () => {
    const { result } = renderHook(() => useCustomHook(), {
      wrapper: createWrapper(),
    });
    await waitFor(() => {
      expect(result.current.data).toBe("Hello");
    });
  });
});

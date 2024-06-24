import React from "react";
import { searchFiles } from "../server/search";
import { useDebounce } from "@uidotdev/usehooks";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import { useQuery } from "@tanstack/react-query";

export default function Search() {
  const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebounce(search, 300);

  async function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    setSearch(input);
  }

  React.useEffect(() => {
    const newPathname =
      debouncedSearch === ""
        ? window.location.pathname
        : `?q=${debouncedSearch}`;
    window.history.replaceState({}, "", newPathname);
  }, [debouncedSearch]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["search", debouncedSearch],
    queryFn: () => searchFiles(debouncedSearch),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <>
      <Input
        name="search"
        value={search}
        placeholder="Search for a user by name or email"
        onChange={handleSearch}
        className="mb-4"
      />

      <Table>
        {isLoading && <TableCaption>Loading...</TableCaption>}
        {error && <TableCaption>Error: {error.message}</TableCaption>}
        {Array.isArray(data) && data.length === 0 && (
          <TableCaption>No results found.</TableCaption>
        )}
        {data && (
          <>
            <TableHeader>
              <TableRow>
                {data.length > 0 &&
                  Object.keys(data[0]).map((header) => (
                    <TableHead className="text-center" key={header}>
                      {header}
                    </TableHead>
                  ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {Object.values(row).map((value, cellIndex) => (
                    <TableCell className="text-center" key={cellIndex}>
                      {String(value)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </>
        )}
      </Table>
    </>
  );
}

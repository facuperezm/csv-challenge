import React from "react";
import { searchFiles } from "../server/search";
import { type Data } from "../types";
import { toast } from "sonner";
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

export default function Search({ initialData }: { initialData: Data | null }) {
  const [search, setSearch] = React.useState("");
  const [data, setData] = React.useState<Data | null>(initialData);

  async function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;

    setSearch(input);
  }
  // updating the URL with the search query
  React.useEffect(() => {
    if (search === "") {
      window.history.pushState({}, "", window.location.pathname);
      return;
    }
    const url = new URL(window.location.href);
    url.searchParams.set("q", search);
    window.history.pushState({}, "", url.toString());
  }, [search]);

  // fetching the data
  React.useEffect(() => {
    async function fetch() {
      if (search === "") {
        return;
      }
      const res = await searchFiles(search);
      if (res instanceof Error) {
        toast.error(res.message);
        return;
      }
      setData(res);
    }
    fetch();
  }, [search]);

  console.log({ data }, "data");
  return (
    <>
      <Input
        name="search"
        value={search}
        placeholder="Search for a user by name or email"
        onChange={handleSearch}
      />
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Telephone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((row) => {
            return (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell className="text-right">{row.telephone}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}

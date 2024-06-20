import { type ApiSearchResponse, type Data } from "../types";
import { API_HOST } from "../config";

export const searchFiles = async (search: string): Promise<Data> => {
  const res = await fetch(`${API_HOST}/api/users?q=${search}`);
  const json = (await res.json()) as ApiSearchResponse;
  return json.data ?? [];
};

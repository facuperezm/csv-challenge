import { type ApiSearchResponse, type Data } from "../types";
import { API_HOST } from "../config";

export const searchFiles = async (search: string): Promise<Data | Error> => {
  try {
    const res = await fetch(`${API_HOST}/api/users?q=${search}`);

    if (!res.ok) {
      return new Error("The search failed");
    }
    const json = (await res.json()) as ApiSearchResponse;
    return json.data ?? [];
  } catch (error) {
    return error instanceof Error
      ? error
      : new Error("An error occurred during search");
  }
};

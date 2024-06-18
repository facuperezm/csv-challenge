import { API_HOST } from "../config";
import { ApiResponseData, type Data } from "../types";

export const uploadFiles = async (file: File): Promise<Data | Error> => {
  const fd = new FormData();
  fd.append("file", file);

  try {
    const res = await fetch(`${API_HOST}/api/files`, {
      method: "POST",
      body: fd,
    });

    if (!res.ok) {
      return new Error("The file was not uploaded");
    }

    const json = (await res.json()) as ApiResponseData;

    return json.data;
  } catch (error) {
    return error instanceof Error
      ? error
      : new Error("An error occurred during file upload");
  }
};

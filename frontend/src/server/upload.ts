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
      const message = await res.text().catch(() => "The file was not uploaded");
      throw new Error(message);
    }

    const json = (await res.json()) as ApiResponseData;
    return json.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("An unknown error occurred during file upload");
    }
  }
};

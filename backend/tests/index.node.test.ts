import { beforeEach, describe, expect, it } from "vitest";
import app from "../index";
import supertest from "supertest";
import path from "path";

const api = supertest(app);
const postUrl = "/api/files";

describe("API Tests", () => {
  describe("POST /api/files", () => {
    it("should upload a file and return a success message", async () => {
      const res = await api
        .post(postUrl)
        .attach("file", path.resolve(__dirname, "data.csv"));

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("The file was uploaded successfully");
    });

    it("should return an error if the file is missing", async () => {
      const res = await api.post(postUrl);

      expect(res.status).toBe(500);
      expect(res.body.message).toBe("The file was missing");
    });

    it("should return an error if the file is not a .csv file", async () => {
      const res = await api
        .post(postUrl)
        .attach("file", path.resolve(__dirname, "data.json"));

      expect(res.status).toBe(500);
      expect(res.body.message).toBe("The file must be a .csv file");
    });
  });
  describe("GET /api/users", () => {
    beforeEach(async () => {
      await api
        .post(postUrl)
        .attach("file", path.resolve(__dirname, "data.csv"));
    });

    it("should return the correct number of records after uploading a file", async () => {
      const fileUploaded = await api.get("/api/users/?q="); // empty query
      const response = fileUploaded.body.data;

      expect(fileUploaded.status).toBe(200);
      expect(response).toBeDefined();
      expect(response).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: "John Doe",
          }),
        ])
      );
    });
    it("should return the correct record when searching by name", async () => {
      const fileUploaded = await api.get("/api/users/?q=john");
      expect(fileUploaded.status).toBe(200);
      expect(fileUploaded.body.data.length).toBeGreaterThan(0);
      expect(fileUploaded.body.data).toEqual([
        {
          id: "1",
          email: "john.doe@example.com",
          name: "John Doe",
          telephone: "555-1234",
        },
      ]);
    });

    it("should return an error when searching by invalid ID", async () => {
      const emptySearch = await api.get("/api/users/?q=asdasd123");
      expect(emptySearch.status).toBe(200);
      expect(emptySearch.body.data).toStrictEqual([]);
    });

    it("should return all records when no query is provided", async () => {
      const response = await api.get("/api/users/");
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBeGreaterThan(0);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data[0]).toHaveProperty("id");
      expect(response.body.data[0]).toHaveProperty("email");
      expect(response.body.data[0]).toHaveProperty("name");
      expect(response.body.data[0]).toHaveProperty("telephone");
    });
  });
});

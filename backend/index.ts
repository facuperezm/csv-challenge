import express, { Express } from "express";
import cors from "cors";
import multer from "multer";
import { parse, ParseResult } from "papaparse";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

let data: Array<Record<string, string>> = [];

app.post("/api/files", upload.single("file"), async (req, res) => {
  const { file } = req;

  if (!file) {
    return res.status(500).json({ message: "The file was missing" });
  }

  if (file.mimetype !== "text/csv") {
    return res.status(500).json({ message: "The file must be a .csv file" });
  }

  // Parse the CSV file to JSON
  let finalJson: Array<Record<string, string>> = [];
  try {
    const csv = Buffer.from(file.buffer).toString("utf-8");

    // Parse the CSV and assert the type of the data property
    const parseResult: ParseResult<unknown> = parse(csv, { header: true });
    finalJson = parseResult.data as Array<Record<string, string>>;
  } catch (error) {
    return res.status(500).json({ message: "Error parsing the file" });
  }
  data = finalJson;
  return res
    .status(200)
    .json({ data: finalJson, message: "The file was uploaded successfully" });
});

app.get("/api/users", async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(200).json({ data: data });
  }

  if (Array.isArray(q)) {
    return res.status(500).json({ message: "The query shouldnt be an array" });
  }

  const search = q.toString().toLowerCase();

  // filter from 'db'
  const filteredData = data.filter((row) => {
    return Object.values(row).some((value) =>
      value.toLowerCase().includes(search)
    );
  });

  return res.status(200).json({ data: filteredData });
});

app.listen(port, () => {
  console.log(`🔥 Backend server running on http://localhost:${port}`);
});

export default app;

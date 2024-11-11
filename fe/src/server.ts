import express from "express";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, "../dist/public")));

let currentPdfData: any = null;

app.post("/render", (req, res) => {
  console.log("FE received POST render request with data:", req.body);
  currentPdfData = { ...req.body, shouldRenderPdf: true };
  res.sendFile(path.join(__dirname, "../dist/public/index.html"));
});

app.get("/render", (req, res) => {
  console.log("FE received GET render request");
  res.sendFile(path.join(__dirname, "../dist/public/index.html"));
});

app.get("/current-pdf-data", (req, res) => {
  console.log("Sending current PDF data:", currentPdfData);
  res.json(currentPdfData);
});

app.use((req, res, next) => {
  console.log("FE request:", req.method, req.url);
  next();
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Frontend server is running on port ${port}`);
});

import express from "express";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, "../dist/public")));

app.post("/render", (req, res) => {
  console.log("Step: 2/5 - Frontend received render request");
  const script = `
    window.postMessage(${JSON.stringify({
      ...req.body,
      shouldRenderPdf: true,
    })}, "*");
  `;
  res.json({ script });
});

app.get("/render", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/public/index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Frontend server running on port ${port}`);
});

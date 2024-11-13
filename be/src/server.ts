import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { generateMergedPdf } from "./utils/pdfUtils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
const previewPort = process.env.PREVIEW_PORT || 3002;

app.use(cors());
app.use(express.json());
app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
app.post("/render-pdf", async (req, res) => {
  try {
    console.log("Step: 1/6 - Backend received PDF generation request");
    const mergedPdfBuffer = await generateMergedPdf(req.body);

    console.log("Step: 6/6 - Sending combined PDF");
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename=${req.body.policy_number.replace(/\s+/g, "_")}.pdf`
    );
    res.send(Buffer.from(mergedPdfBuffer));
  } catch (error) {
    console.error("PDF generation error:", error);
    res.status(500).send("Error generating PDF");
  }
});

/**
 * Preview server for local dev that will match how we generate the pdf
 * in production, for quicker turnaround times.
 */
if (process.env.NODE_ENV === "development") {
  const previewApp = express();
  previewApp.listen(previewPort, () => {
    console.log(`Preview server running on port ${previewPort}`);
  });
  previewApp.use(express.static(path.join(__dirname, "preview")));
  previewApp.use(cors());
  previewApp.use(express.json());

  previewApp.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "preview", "index.html"));
  });
  previewApp.post("/render-pdf", async (req, res) => {
    try {
      console.log("Step: 1/6 - Backend received PDF generation request");
      const mergedPdfBuffer = await generateMergedPdf(req.body);

      console.log("Step: 6/6 - Sending combined PDF");
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `inline; filename=${req.body.policy_number.replace(/\s+/g, "_")}.pdf`
      );
      res.send(Buffer.from(mergedPdfBuffer));
    } catch (error) {
      console.error("PDF generation error:", error);
      res.status(500).send("Error generating PDF");
    }
  });
}

export default app;

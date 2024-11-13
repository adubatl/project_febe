import express from "express";
import cors from "cors";
import { renderToStream } from "@react-pdf/renderer";
import React from "react";
import path from "path";
import { PdfDocument } from "./fe/PdfDocument.js";

const app = express();
const port = process.env.PORT || 5000;
const previewPort = process.env.PREVIEW_PORT || 3001;

app.use(cors());
app.use(express.json());
app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});

// PDF Generation endpoint
app.post("/render-pdf", async (req, res) => {
  try {
    console.log("Step: 1/4 - Backend received PDF generation request");
    const { title, author, date, body } = req.body;

    console.log("Step: 2/4 - Generating PDF");
    const document = React.createElement(PdfDocument, {
      title,
      author,
      date,
      body,
    });
    console.log("Step: 3/4 - Rendering PDF");
    const stream = await renderToStream(document);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename=${title.replace(/\s+/g, "_")}.pdf`
    );
    console.log("Step: 4/4 - Streaming PDF");
    stream.pipe(res);
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
  previewApp.use(express.static(path.join(__dirname, "preview")));

  previewApp.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "preview", "index.html"));
  });

  previewApp.listen(previewPort, () => {
    console.log(`Preview server running on port ${previewPort}`);
  });
}

export default app;

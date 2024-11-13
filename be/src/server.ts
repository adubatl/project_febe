import express from "express";
import cors from "cors";
import { renderToStream } from "@react-pdf/renderer";
import React from "react";
import path from "path";
import PdfDocument from "./fe/PdfDocument";

const app = express();
const port = process.env.PORT || 5000;
const previewPort = process.env.PREVIEW_PORT || 3001;

app.use(cors());
app.use(express.json());

// PDF Generation endpoint
app.post("/render-pdf", async (req, res) => {
  try {
    console.log("Step: 1/2 - Backend received PDF generation request");
    const { title, author, date, body } = req.body;

    console.log("Step: 2/2 - Generating PDF");
    const document = React.createElement(PdfDocument, {
      title,
      author,
      date,
      body,
    });

    const stream = await renderToStream(document);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename=${title.replace(/\s+/g, "_")}.pdf`
    );

    stream.pipe(res);
  } catch (error) {
    console.error("PDF generation error:", error);
    res.status(500).send("Error generating PDF");
  }
});

// Only start preview server in development
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

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});

export default app;

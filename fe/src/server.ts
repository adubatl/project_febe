import express from "express";
import React from "react";
import ReactPDF from "@react-pdf/renderer";
import ServerPDFDocument from "./ServerPDFDocument";

const app = express();
app.use(express.json());

let pdfBuffer: Buffer | null = null;

app.post("/generate-pdf", async (req, res) => {
  try {
    // Render the PDF document to a buffer
    const pdfDoc = await ServerPDFDocument();
    console.log("PDF document generated", pdfDoc);
    pdfBuffer = await ReactPDF.renderToBuffer(pdfDoc);
    res.status(200).send("PDF generated");
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF");
  }
});

app.get("/pdf", (req, res) => {
  if (pdfBuffer) {
    console.log("PDF buffer found", pdfBuffer);
    res.setHeader("Content-Type", "application/pdf");
    res.send(pdfBuffer);
  } else {
    res.status(404).send("PDF not found");
  }
});

app.listen(3001, () => {
  console.log("Frontend server is running on port 3001");
});

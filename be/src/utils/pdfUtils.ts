import { renderToStream } from "@react-pdf/renderer";
import { PDFDocument } from "pdf-lib";
import React from "react";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import { streamToBuffer } from "./streamUtils.js";
import { PdfDocument } from "../fe/PdfDocument.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generateMergedPdf(requestData: any) {
  // Generate the dynamic PDF
  console.log("Step: 2/6 - Generating dynamic PDF");
  const document = React.createElement(PdfDocument, requestData);

  // Get the dynamic PDF as a buffer
  console.log("Step: 3/6 - Converting dynamic PDF to buffer");
  const pdfStream = await renderToStream(document);
  const dynamicPdfBuffer = await streamToBuffer(pdfStream);

  // Read the static PDF
  console.log("Step: 4/6 - Reading static PDF");
  const staticPdfPath = path.join(
    __dirname,
    process.env.NODE_ENV === "development"
      ? "../staticPdfs/testPDF.pdf"
      : "../../staticPdfs/testPDF.pdf"
  );
  const staticPdfBuffer = await fs.readFile(staticPdfPath);

  // Combine PDFs
  console.log("Step: 5/6 - Combining PDFs");
  const mergedPdf = await PDFDocument.create();
  const dynamicPdfDoc = await PDFDocument.load(dynamicPdfBuffer);
  const staticPdfDoc = await PDFDocument.load(staticPdfBuffer);

  const dynamicPages = await mergedPdf.copyPages(
    dynamicPdfDoc,
    dynamicPdfDoc.getPageIndices()
  );
  const staticPages = await mergedPdf.copyPages(
    staticPdfDoc,
    staticPdfDoc.getPageIndices()
  );

  dynamicPages.forEach((page) => mergedPdf.addPage(page));
  staticPages.forEach((page) => mergedPdf.addPage(page));

  return await mergedPdf.save();
}

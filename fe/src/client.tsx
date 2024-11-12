import React from "react";
import { createRoot } from "react-dom/client";
import ServerPDFDocument from "./ServerPDFDocument";
import { PDFContent } from "./types";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find root element!");

const root = createRoot(container);

// Function to render PDF content
const renderPDF = (content: PDFContent) => {
  console.log("Rendering PDF with content:", JSON.stringify(content, null, 2));
  root.render(<ServerPDFDocument content={content} />);
};

// Initial render with default content
const defaultContent: PDFContent = {
  shouldRenderPdf: true,
  title: "Test Document",
  author: "Local Test",
  date: new Date().toLocaleDateString(),
  body: "This is a test document for local development.",
};

renderPDF(defaultContent);

// Listen for postMessage events from the parent window
window.addEventListener("message", (event) => {
  if (event.data?.shouldRenderPdf === true) {
    renderPDF(event.data);
  }
});

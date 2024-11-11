import React from "react";
import { createRoot } from "react-dom/client";
import ServerPDFDocument from "./ServerPDFDocument";
import { PDFContent } from "./types";

const defaultContent: PDFContent = {
  shouldRenderPdf: true,
  title: "Test Document",
  author: "Local Test",
  date: new Date().toLocaleDateString(),
  body: "This is a test document for local development.",
};

console.log("Client initializing with default content:", defaultContent);

const container = document.getElementById("root");
if (!container) {
  console.error("Failed to find root element!");
} else {
  console.log("Root element found, creating React root");
}

const root = createRoot(container!);

// Initial render with default content
console.log("Performing initial render with default content");
root.render(<ServerPDFDocument content={defaultContent} />);

// Listen only for PDF content messages
console.log("Setting up message listener for PDF content");
window.addEventListener("message", (event) => {
  console.log("Message received, checking content:", event.data);
  if (event.data?.shouldRenderPdf === true) {
    console.log("Valid PDF content received, rendering");
    root.render(<ServerPDFDocument content={event.data} />);
  } else {
    console.log("Ignoring non-PDF content message");
  }
});

console.log("Client initialization complete");

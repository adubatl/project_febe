import React from "react";
import { createRoot } from "react-dom/client";
import ServerPDFDocument from "./ServerPDFDocument";

// Initialize with empty content, will be updated when data arrives
const container = document.getElementById("root");
const root = createRoot(container!);

// Listen for messages from the parent window
window.addEventListener("message", (event) => {
  const content = event.data;
  root.render(<ServerPDFDocument content={content} />);
});

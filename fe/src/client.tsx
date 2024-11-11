import React from "react";
import { createRoot } from "react-dom/client";
import ServerPDFDocument from "./ServerPDFDocument";

const content = window.__INITIAL_DATA__;
const container = document.getElementById("root");
const root = createRoot(container!);

root.render(<ServerPDFDocument content={content} isClient={true} />);

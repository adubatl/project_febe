import React from "react";
import ReactDOMServer from "react-dom/server";
import ServerPDFDocument from "./ServerPDFDocument";
import { PDFContent } from "./types";

export function renderApp(content: PDFContent) {
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <ServerPDFDocument content={content} />
    </React.StrictMode>
  );
}

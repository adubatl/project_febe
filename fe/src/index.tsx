import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./ServerPDFDocument";

export function renderApp() {
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

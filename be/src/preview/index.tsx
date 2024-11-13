import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { usePDF } from "@react-pdf/renderer";
import { pdfjs, Document, Page } from "react-pdf";
import { PdfDocument } from "../fe/PdfDocument";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PreviewApp = () => {
  const [currentTheme, setCurrentTheme] = useState<"themeA" | "themeB">(
    "themeA"
  );

  const sampleData = {
    title: "Sample Document",
    author: "Bogle Bogle",
    date: new Date().toLocaleDateString(),
    body: "This is a sample PDF document generated with dynamic content.",
    clientTheme: currentTheme,
  };

  const [instance, updateInstance] = usePDF({
    document: <PdfDocument {...sampleData} />,
  });

  const toggleTheme = () => {
    setCurrentTheme((prev) => (prev === "themeA" ? "themeB" : "themeA"));
  };

  if (instance.loading) {
    return <div>Loading...</div>;
  }
  if (instance.error) {
    return <div>Error: {instance.error}</div>;
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <div
        style={{
          padding: "1em",
          display: "flex",
          justifyContent: "center",
          gap: "1em",
          alignItems: "center",
        }}
      >
        <span>Current Theme: {currentTheme}</span>
        <button
          onClick={() => {
            toggleTheme();
            updateInstance();
          }}
          style={{
            padding: "0.5em 1em",
            backgroundColor:
              currentTheme === "themeA" ? "rebeccapurple" : "navy",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Switch to {currentTheme === "themeA" ? "Theme B" : "Theme A"}
        </button>
      </div>
      <div
        style={{
          flex: 1,
          padding: "1em",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Document file={instance.url}>
          <Page width={595} height={842} pageNumber={1} />
        </Document>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <PreviewApp />
  </React.StrictMode>
);

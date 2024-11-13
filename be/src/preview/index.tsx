import React from "react";
import ReactDOM from "react-dom/client";
import { usePDF } from "@react-pdf/renderer";
import { pdfjs, Document, Page } from "react-pdf";
import { PdfDocument } from "../fe/PdfDocument";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const sampleData = {
  title: "Sample Document",
  author: "Bogle Bogle",
  date: new Date().toLocaleDateString(),
  body: "This is a sample PDF document generated with dynamic content.",
};

const PreviewApp = () => {
  const [instance, _updateInstance] = usePDF({
    document: <PdfDocument {...sampleData} />,
  });

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
      }}
    >
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

root.render(<PreviewApp />);

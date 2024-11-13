import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { usePDF } from "@react-pdf/renderer";
import { pdfjs, Document, Page } from "react-pdf";
import { PdfDocument } from "../fe/PdfDocument";
import axios from "axios";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { sampleData } from "../sampleData";
import { CarrierTheme } from "../fe/styles";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PreviewApp = () => {
  const [carrier, setCarrier] = useState<CarrierTheme>("Toggle");

  const handleCarrierChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCarrier = event.target.value as CarrierTheme;
    setCarrier(newCarrier);
    updateInstance(<PdfDocument {...sampleData} carrier={newCarrier} />);
  };

  const [instance, updateInstance] = usePDF({
    document: <PdfDocument {...sampleData} carrier={carrier} />,
  });

  const generatePdf = () => {
    if (instance.url) {
      window.open(instance.url);
    }
  };

  const generateMergedPdf = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/render-pdf",
        { ...sampleData, carrier },
        { responseType: "blob" }
      );

      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl);
    } catch (error) {
      console.error("Error generating merged PDF:", error);
    }
  };

  if (instance.loading) return <div>Loading...</div>;
  if (instance.error) return <div>Error: {instance.error}</div>;

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
          padding: "1em",
          display: "flex",
          justifyContent: "center",
          gap: "1em",
        }}
      >
        <select
          value={carrier}
          onChange={handleCarrierChange}
          style={{
            padding: "0.5em 1em",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          <option value="Toggle">Toggle</option>
          <option value="Toyota">Toyota</option>
          <option value="Uber">Uber</option>
          <option value="StateFarm">State Farm</option>
        </select>

        <button
          onClick={generatePdf}
          style={{
            padding: "0.5em 1em",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Generate PDF
        </button>
        <button
          onClick={generateMergedPdf}
          style={{
            padding: "0.5em 1em",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Generate Merged PDF
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

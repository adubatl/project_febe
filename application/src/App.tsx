import React from "react";
import axios from "axios";
import "./App.css";
import { sampleData } from "./sampleData";

function App() {
  const handleButtonClick = async () => {
    try {
      const pdfContent = sampleData;

      const response = await axios.post(
        `${process.env.REACT_APP_BE_URL}/render-pdf`,
        pdfContent,
        { responseType: "blob" }
      );

      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>PDF Generation Test</h1>
        <button onClick={handleButtonClick}>Generate PDF</button>
      </div>
    </div>
  );
}

export default App;

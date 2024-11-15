import React from "react";
import axios from "axios";

function App() {
  const handleButtonClick = async () => {
    try {
      const pdfContent = {
        shouldRenderPdf: true,
        title: "Sample Document",
        author: "Test User",
        date: new Date().toLocaleDateString(),
        body: "This is a sample PDF document generated with dynamic content.",
      };

      const response = await axios.post(
        `${process.env.REACT_APP_BE_URL}/render-pdf`,
        pdfContent
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
      <header className="App-header">
        <h1>PDF Generation Test</h1>
        <button onClick={handleButtonClick}>Generate PDF</button>
      </header>
    </div>
  );
}

export default App;

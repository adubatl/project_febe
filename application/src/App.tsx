import React from "react";
import axios from "axios";

function App() {
  const handleButtonClick = async () => {
    try {
      const response = await axios.post("http://localhost:3000/render-pdf", {
        message: "Generate PDF",
      });
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

import React from "react";
import axios from "axios";
import "./App.css";

function App() {
  const handleButtonClick = async () => {
    try {
      const pdfContent = {
        title: "Sample Document",
        author: "Bogle Bogle",
        date: new Date().toLocaleDateString(),
        body: "This is a sample PDF document generated with dynamic content.",
      };

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

import express from "express";
import cors from "cors";
import axios from "axios";
import puppeteer from "puppeteer";

const app = express();
const port = process.env.PORT || 3000;
const frontendUrl = "http://localhost:3001";

app.use(cors());
app.use(express.json());

app.get("/render", async (req, res) => {
  try {
    // Send data to frontend
    const data = {
      message: "Hello from backend!",
      timestamp: new Date().toISOString(),
    };
    await axios.post(`${frontendUrl}/generate-pdf`, data);

    // Wait a bit for the frontend to update
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Render the page
    const browser = await puppeteer.launch({
      executablePath: "/usr/bin/google-chrome",
    });
    const page = await browser.newPage();
    await page.goto(frontendUrl);

    // Wait for content to load
    await page.waitForSelector("pre");

    const content = await page.content();

    await browser.close();

    res.send(content);
  } catch (error) {
    console.error("Rendering error:", error);
    res.status(500).send("Error rendering the page");
  }
});

app.post("/render-pdf", async (req, res) => {
  try {
    const data = req.body;
    await axios.post(`${frontendUrl}/generate-pdf`, data);

    // Wait for the frontend to generate the PDF
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Fetch the generated PDF
    const pdfResponse = await axios.get(`${frontendUrl}/pdf`, {
      responseType: "arraybuffer",
    });

    res.setHeader("Content-Type", "application/pdf");
    res.send(pdfResponse.data);
  } catch (error) {
    console.error("PDF generation error:", error);
    res.status(500).send("Error generating PDF");
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});

export default app;

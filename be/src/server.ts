import express from "express";
import cors from "cors";
import axios from "axios";
import puppeteer from "puppeteer";

const app = express();
const port = process.env.PORT || 5000;
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3001";

app.use(cors());
app.use(express.json());

app.post("/render-pdf", async (req, res) => {
  try {
    const data = req.body;
    console.log("BE received data:", data);

    // Send data to frontend for rendering
    console.log("BE sending data to FE at:", frontendUrl);
    await axios.post(`${frontendUrl}/render`, data);
    console.log("BE successfully sent data to FEBE");

    // Launch Puppeteer and generate PDF
    console.log(
      "BE launching Puppeteer with executable:",
      process.env.PUPPETEER_EXECUTABLE_PATH
    );
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    console.log("BE navigating to FE render page");
    await page.on("console", (msg) =>
      console.log("Browser console:", msg.text())
    );
    await page.on("error", (err) => console.error("Browser error:", err));
    await page.goto(`${frontendUrl}/render`, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    console.log("BE generating PDF");
    const pdf = await page.pdf({
      format: "a4",
      printBackground: true,
    });

    await browser.close();
    console.log("BE successfully generated PDF");

    res.setHeader("Content-Type", "application/pdf");
    res.send(pdf);
  } catch (error: any) {
    console.error("PDF generation error:", error);
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
    }
    res.status(500).send("Error generating PDF");
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});

export default app;

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
    console.log("Step: 1/5 - Backend received PDF generation request");

    const response = await axios.post(`${frontendUrl}/render`, req.body);

    console.log("Step: 4/5 - Launching puppeteer");
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto(`${frontendUrl}/render`, {
      waitUntil: ["networkidle0"],
      timeout: 30000,
    });

    await page.evaluate((script) => {
      eval(script);
    }, response.data.script);

    await page.waitForSelector("#root");
    await page.waitForTimeout(1000);

    console.log("Step: 5/5 - Generating PDF");
    const pdfBuffer = await page.pdf({
      format: "a4",
      printBackground: true,
      margin: {
        top: "30px",
        right: "30px",
        bottom: "30px",
        left: "30px",
      },
    });

    await browser.close();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=document.pdf");
    res.send(pdfBuffer);
  } catch (error) {
    console.error("PDF generation error:", error);
    res.status(500).send("Error generating PDF");
  }
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});

export default app;

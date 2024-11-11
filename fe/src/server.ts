import express from "express";
import * as dotenv from "dotenv";
import { PDFContent } from "./types";
import path from "path";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Serve webpack-built files from the dist/public directory
app.use(express.static(path.join(__dirname, "../dist/public")));
app.use(express.json());

app.post("/render", async (req, res) => {
  try {
    console.log("FE server received render request");
    const content: PDFContent = req.body;
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${content.title || "PDF Document"}</title>
          <style>
            body { margin: 0; padding: 0; }
            #root { width: 100%; height: 100vh; }
          </style>
        </head>
        <body>
          <div id="root"></div>
          <script>
            window.__INITIAL_DATA__ = ${JSON.stringify(content)};
          </script>
          <script src="/bundle.js"></script>
        </body>
      </html>
    `;
    console.log("FE server sending HTML response");
    res.send(html);
  } catch (error) {
    console.error("Render error:", error);
    res.status(500).send("Error rendering content");
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Frontend server is running on port ${port}`);
});

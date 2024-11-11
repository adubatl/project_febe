import express from "express";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, "../dist/public")));

app.post("/render", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/public/index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Frontend server is running on port ${port}`);
});

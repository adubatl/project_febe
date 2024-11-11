const fs = require("fs");
const path = require("path");

const sourceDir = path.join(__dirname, "public");
const targetDir = path.join(__dirname, "dist/public");

// Create target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Copy index.html
fs.copyFileSync(
  path.join(sourceDir, "index.html"),
  path.join(targetDir, "index.html")
);

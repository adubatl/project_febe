import express from "express";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const port = process.env.FE_PORT || 3001;

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.json());

// Endpoint to receive data from backend
app.post("/setData", (req, res) => {
  const data = req.body;
  io.emit("newData", data); // Emit data to all connected clients
  res.sendStatus(200);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

httpServer.listen(port, () => {
  console.log(`Frontend server is running on port ${port}`);
});

export default app;

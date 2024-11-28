// server.js
const express = require("express");
const cors = require("cors");
const videoRoutes = require("./Routes/videoRoutes");

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Use the video routes
app.use("/api", videoRoutes);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));

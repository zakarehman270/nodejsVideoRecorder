// routes/videoRoutes.js
const express = require("express");
const multer = require("multer");
const videoController = require("../Controllers/videoController");
const questionController = require("../Controllers/questionController");

const upload = multer();
const router = express.Router();

// POST route for streaming video chunks
router.post("/stream", upload.single("videoChunk"), videoController.streamVideo);

// New routes for questions
router.post("/questions", questionController.createQuestions);
router.get("/questions", questionController.getQuestions);

module.exports = router;

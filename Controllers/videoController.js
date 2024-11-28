const { getBucket } = require("../config/db");
const { Readable } = require("stream");
const crypto = require("crypto");

let currentVideoId = null;

exports.streamVideo = async (req, res) => {
  try {
    const bucket = await getBucket(); // Ensure bucket is initialized

    const { buffer } = req.file;
    if (!currentVideoId) {
      currentVideoId = crypto.randomUUID(); // Generate unique ID
      console.log(`Starting new video stream with ID: ${currentVideoId}`);
    }

    const readableStream = new Readable();
    readableStream.push(buffer);
    readableStream.push(null);

    const uploadStream = bucket.openUploadStream(`${currentVideoId}-chunk`, {
      metadata: { contentType: "video/webm", videoId: currentVideoId },
    });

    readableStream
      .pipe(uploadStream)
      .on("finish", () => {
        console.log("Chunk uploaded successfully");
        res.status(200).send({ success: "Chunk uploaded" });
      })
      .on("error", (err) => {
        console.error("Upload error:", err);
        res.status(500).send("Upload error");
      });
  } catch (error) {
    console.error("Error in streamVideo:", error);
    res.status(500).send("Server error");
  }
};

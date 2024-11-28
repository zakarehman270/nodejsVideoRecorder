// helpers/fileHelper.js
const { Readable } = require("stream");
const { bucket } = require("../config/db");

// Function to handle file upload to MongoDB
exports.uploadFileToGridFS = (buffer, videoId) => {
  const readableStream = new Readable();
  readableStream.push(buffer);
  readableStream.push(null);

  return bucket.openUploadStream(`${videoId}-chunk`, {
    metadata: { contentType: "video/webm", videoId: videoId },
  });
};

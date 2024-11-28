const { MongoClient, GridFSBucket } = require("mongodb");

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017";
const dbName = "VideosRecorder";

let db, bucket;

const connectToDatabase = async () => {
  if (!db) {
    try {
      const client = await MongoClient.connect(mongoURI, { useUnifiedTopology: true });
      db = client.db(dbName);
      bucket = new GridFSBucket(db, { bucketName: "VideoChunks" });
      console.log("Connected to MongoDB");
    } catch (err) {
      console.error("MongoDB Connection Error:", err);
      throw new Error("Failed to connect to MongoDB");
    }
  }
  return { db, bucket };
};

const getBucket = async () => {
  if (!bucket) {
    await connectToDatabase(); // Ensure connection
  }
  return bucket;
};

module.exports = { connectToDatabase, getBucket };

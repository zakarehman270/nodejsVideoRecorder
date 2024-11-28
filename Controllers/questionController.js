// Controllers/questionController.js
const { connectToDatabase } = require("../config/db");

// Controller for creating a question
exports.createQuestions = async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).send({ error: "Question is required" });
  }

  try {
    const { db } = await connectToDatabase(); // Ensure database is initialized
    const collection = db.collection("Questions");
    const result = await collection.insertOne({ question });
    res.status(201).send({ success: true, id: result.insertedId });
  } catch (err) {
    console.error("Error creating question:", err);
    res.status(500).send({ error: "Failed to create question" });
  }
};

// Controller for retrieving all questions
exports.getQuestions = async (req, res) => {
  try {
    const { db } = await connectToDatabase(); // Ensure database is initialized
    const collection = db.collection("Questions");
    const questions = await collection.find().toArray();
    res.status(200).send(questions);
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).send({ error: "Failed to fetch questions" });
  }
};

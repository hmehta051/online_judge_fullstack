const express = require("express");
const router = express.Router();
const Question = require("../models/questions.model");

let newQuestion = {
  title: "Your Title",
  description: "Your Description",
  difficulty: "Easy",
  constraints: "Your Constraints",
  topic: "Your Topic",
  initialCode: "Your Initial Code",
  boilerPlate: "BOILER PLATE CODE",
  testCase: [
    { input: "Input 1", output: "Output 1" },
    { input: "Input 2", output: "Output 2" },
  ],
};

router.post("/create", async (req, res) => {
  try {
    newQuestion = req.body;
    const question = await Question.create(newQuestion);
    return res.status(201).send({ status: "success", question });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ status: "error", message: error.message });
  }
});
router.get("/all", async (req, res) => {
  try {
    const allQuestions = await Question.find({}).lean().exec();
    return res.status(200).send({ status: "success", questions: allQuestions });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ status: "error", message: error.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).lean().exec();
    if (!question) {
      return res
        .status(404)
        .json({ status: "error", message: "Question not found" });
    }
    return res.status(200).send({ status: "success", question });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ status: "error", message: error.message });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const updatedQuestionData = req.body;
    const questionId = req.params.id;
    if (!updatedQuestionData) {
      return res
        .status(404)
        .json({ status: "error", message: "Question not found" });
    }
    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      updatedQuestionData,
      { new: true }
    );
    return res.status(200).json({ status: "success", updatedQuestion });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ status: "error", message: error.message });
  }
});
// Delete a question
router.delete("/:id", async (req, res) => {
  try {
    const questionId = req.params.id;
    const deletedQuestion = await Question.findByIdAndDelete(questionId);

    if (!deletedQuestion) {
      return res
        .status(404)
        .json({ status: "error", message: "Question not found" });
    }

    res.status(200).json({ status: "success", deletedQuestion });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ status: "error", message: error.message });
  }
});

module.exports = router;

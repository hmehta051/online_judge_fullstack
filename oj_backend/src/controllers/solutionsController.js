const express = require("express");
const SolutionModel = require("../models/solution.model");
const QuestionModel = require("../models/questions.model");
const { generateFile } = require("../helper/generateFile");
const { generateInput } = require("../helper/generateInput");
const { executeCpp } = require("../helper/executeCpp");
const { executeJs } = require("../helper/executeJs");
const { executeJava } = require("../helper/executeJava");
const { executePython } = require("../helper/executePython");
const router = express.Router();

router.post("/run", async (req, res) => {
  try {
    const { language = "cpp", code, input } = req.body;
    if (!code || !input) {
      return res
        .status(400)
        .json({ status: "error", message: "Either Code or input are empty" });
    }

    let filePath, inputPath, output;

    try {
      // Generate file and input paths
      filePath = await generateFile(language, code);
      inputPath = await generateInput(input);

      // Execute code based on language
      switch (language.toLowerCase()) {
        case "cpp":
          output = await executeCpp(filePath, inputPath);
          break;
        case "js":
          output = await executeJs(filePath, inputPath);
          break;
        case "java":
          output = await executeJava(filePath, inputPath);
          break;
        case "python":
          output = await executePython(filePath, inputPath);
          break;
        // Add more cases for other languages as needed
        default:
          return res
            .status(400)
            .json({ status: "error", message: "Unsupported language" });
      }
    } catch (execError) {
      return res
        .status(500)
        .json({
          status: "error",
          message: execError.message,
          details: execError,
        });
    }
    return res.status(200).json({ status: "success", output });
  } catch (error) {
    console.error("Server Error:", error);
    return res
      .status(500)
      .json({
        status: "error",
        message: "Server error",
        details: error.message,
      });
  }
});

router.post("/submit", async (req, res) => {
  try {
    const { userId, questionId, language = "cpp", code } = req.body;

    if (!code) {
      return res
        .status(400)
        .json({ status: "error", message: "Code is empty" });
    }

    // Fetch the question and its test cases
    const question =
      await QuestionModel.findById(questionId).populate("testCase");
    if (!question) {
      return res
        .status(404)
        .json({ status: "error", message: "Question not found" });
    }

    let filePath;
    const testCases = question.testCase;

    try {
      // Execute code based on language
      switch (language.toLowerCase()) {
        case "cpp":
        case "js":
        case "java":
        case "python":
          filePath = await generateFile(language, code);
          break;
        default:
          return res
            .status(400)
            .json({ status: "error", message: "Unsupported language" });
      }

      // Determine the status of the solution
      const solutionDetails = await determineStatus(
        filePath,
        testCases,
        language,
      );
      const status = solutionDetails.message;
      const solution = await SolutionModel.create({
        userId,
        questionId,
        code,
        language,
        solutionDetails,
        status,
        submitted: true,
      });
      return res.status(201).json({ status: "success", solution });
    } catch (execError) {
      return res
        .status(500)
        .json({
          status: "error",
          message: execError.message,
          details: execError,
        });
    }
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ status: "error", message: "Server error" });
  }
});

// Get all solutions
router.get("/submiited-questions", async (req, res) => {
  try {
    const solutions = await SolutionModel.find({});
    res.status(200).send(solutions);
  } catch (error) {
    res.status(500).send(error);
  }
});

async function determineStatus(filePath, testCases, lang) {
  const resultArr = [];
  const startTime = Date.now(); // Start time

  const testCasePromises = testCases.map(async (testCase) => {
    const { input, output: expectedOutput } = testCase;
    const inputPath = await generateInput(input);

    let result;
    switch (lang.toLowerCase()) {
      case "cpp":
        result = await executeCpp(filePath, inputPath);
        break;
      case "js":
        result = await executeJs(filePath, inputPath);
        break;
      case "java":
        result = await executeJava(filePath, inputPath);
        break;
      case "python":
        result = await executePython(filePath, inputPath);
        break;
      // Add more cases for other languages as needed
      default:
        throw new Error("Unsupported language");
    }

    // Ensure result has stdout and timeTaken properties
    resultArr.push({
      output: result.stdout || "",
      expectedOutput,
      timeTaken: result.timeTaken || 0,
    });
  });

  await Promise.all(testCasePromises);
  const endTime = Date.now(); // End time
  let totalTimeTaken = 0;
  // Check results against expected outputs
  for (const { output, expectedOutput, timeTaken } of resultArr) {
    if (output === undefined || output === null) {
      return { status: "error", message: "Compilation or Syntax Error" };
    }
    if (output.trim() !== expectedOutput.trim()) {
      return { status: "error", message: "Wrong Answer" };
    }
    totalTimeTaken += timeTaken;
  }

  const executionTime = endTime - startTime; // Calculate total execution time
  return {
    status: "success",
    message: "Accepted",
    totalTimeTaken,
    executionTime,
  };
}

module.exports = router;

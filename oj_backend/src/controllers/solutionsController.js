// const express = require('express');
// const SolutionModel = require('../models/solution.model'); 

// const router = express.Router();

// // Create a new solution
// router.post("/run", async (req, res) => {
//     try {
//         const { userId, questionId, language = "cpp", code, input } = req.body;
//         if (!code) {
//             return res.status(400).json({ status: "error", message: "code is Empty" })
//         }

//         let filePath, inputPath, output;

//         switch(language.toLowerCase()) {
//             case "cpp":
//                 filePath = await generateFile(language, code);
//                 inputPath = await generateInput(input);
//                 output = await executeCpp(filePath,inputPath);
//                 break;
//             case "js":
//                 filePath = await generateFile(language, code);
//                 inputPath = await generateInput(input);
//                 output = await executeJs(filePath, inputPath);
//                 break;
//             case "java":
//                 filePath = await generateFile(language, code);
//                 inputPath = await generateInput(input);
//                 output = await executeJava(filePath, inputPath);
//                 break;
//             // Add more cases for other languages as needed
//             default:
//                 return res.status(400).json({ status: "error", message: "Unsupported language" });
//         }

//         return res.status(201).json({ filePath, inputPath, output });

//     } catch (error) {
//         return res.status(500).json({ status: "error", message: "Server error" })
//     }
// })

// // Get all solutions
// router.get('/', async (req, res) => {
//   try {
//     const solutions = await SolutionModel.find({});
//     res.status(200).send(solutions);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// // Get a solution by ID
// router.get('/:id', async (req, res) => {
//   const _id = req.params.id;

//   try {
//     const solution = await SolutionModel.findById(_id);

//     if (!solution) {
//       return res.status(404).send();
//     }

//     res.status(200).send(solution);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// // Update a solution by ID
// router.patch('/:id', async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowedUpdates = ['code', 'language', 'status', 'timeTaken'];
//   const isValidOperation = updates.every(update => allowedUpdates.includes(update));

//   if (!isValidOperation) {
//     return res.status(400).send({ error: 'Invalid updates!' });
//   }

//   try {
//     const solution = await SolutionModel.findById(req.params.id);

//     if (!solution) {
//       return res.status(404).send();
//     }

//     updates.forEach(update => solution[update] = req.body[update]);
//     await solution.save();

//     res.status(200).send(solution);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// // Delete a solution by ID
// router.delete('/:id', async (req, res) => {
//   try {
//     const solution = await SolutionModel.findByIdAndDelete(req.params.id);

//     if (!solution) {
//       return res.status(404).send();
//     }

//     res.status(200).send(solution);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// module.exports = router;




const express = require('express');
const SolutionModel = require('../models/solution.model');
const QuestionModel = require('../models/questions.model');
const { generateFile } = require('../helper/generateFile');
const { generateInput } = require('../helper/generateInput');
const { executeCpp } = require('../helper/executeCpp');
const { executeJs } = require('../helper/executeJs');
const { executeJava } = require('../helper/executeJava');
const { executePython } = require('../helper/executePython');
const router = express.Router();

// API to only run the code and display the output
router.post("/run", async (req, res) => {
    try {
        const { language = "cpp", code, input } = req.body;
        if (!code || !input) {
            return res.status(400).json({ status: "error", message: "Either Code or input are empty" });
        }

        let filePath, inputPath, output;

        // Execute code based on language
        switch (language.toLowerCase()) {
            case "cpp":
                filePath = await generateFile(language, code);
                inputPath = await generateInput(input);
                output = await executeCpp(filePath, inputPath);
                break;
            case "js":
                filePath = await generateFile(language, code);
                inputPath = await generateInput(input);
                output = await executeJs(filePath, inputPath);
                break;
            case "java":
                filePath = await generateFile(language, code);
                inputPath = await generateInput(input);
                output = await executeJava(filePath, inputPath);
                break;
            case "python":
                filePath = await generateFile(language, code);
                inputPath = await generateInput(input);
                output = await executePython(filePath, inputPath);
                break;
            // Add more cases for other languages as needed
            default:
                return res.status(400).json({ status: "error", message: "Unsupported language" });
        }

        return res.status(200).json({ output });

    } catch (error) {
        return res.status(500).json({ status: "error", message: "Server error" });
    }
});

router.post("/submit", async (req, res) => {
    try {
        const { userId, questionId, language = "cpp", code } = req.body;

        if (!code) {
            return res.status(400).json({ status: "error", message: "Code is empty" });
        }

        // Fetch the question and its test cases
        const question = await QuestionModel.findById(questionId).populate('testCase');
        if (!question) {
            return res.status(404).json({ status: "error", message: "Question not found" });
        }

        let filePath;
        const testCases = question.testCase;

        // Execute code based on language
        switch (language.toLowerCase()) {
            case "cpp":
            case "js":
            case "java":
            case "python":
                filePath = await generateFile(language, code);
                break;
            default:
                return res.status(400).json({ status: "error", message: "Unsupported language" });
        }

        // Determine the status of the solution
        const solutionDetails = await determineStatus(filePath, testCases, language);
        const status = solutionDetails.message;
        const solution = await SolutionModel.create({
            userId,
            questionId,
            code,
            language,
            solutionDetails,
            status
        });
        return res.status(201).json({ solution });

    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({ status: "error", message: "Server error" });
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
            output: result.stdout || '',
            expectedOutput,
            timeTaken: result.timeTaken || 0
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
    return { status: "success", message: "Accepted", totalTimeTaken, executionTime };
}

module.exports = router;
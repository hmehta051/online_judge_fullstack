const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

const outputDir = path.join(__dirname, "outputs");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// // example.js
// const readline = require('readline');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//     terminal: false
// });
// let input = '';
// rl.on('line', (line) => {
//     input += line;
// });
// rl.on('close', () => {
//     const result = `Hello, ${input.trim()}!`;
//     console.log(result);
// });

const executeJs = async (filePath, inputFilePath) => {
  return new Promise((resolve, reject) => {
    // Construct the command to execute, ensuring proper escaping of file paths
    const command = `node "${filePath}" < "${inputFilePath}"`;

    // Execute the command
    exec(command, (err, stdout, stderr) => {
      if (err) {
        // Reject with detailed error message
        reject(`Execution failed: ${err}`);
        return;
      }
      if (stderr) {
        // Reject with stderr output
        reject(`Execution failed: ${stderr}`);
        return;
      }
      // Resolve with stdout output
      resolve(stdout);
    });
  });
};

module.exports = { executeJs };

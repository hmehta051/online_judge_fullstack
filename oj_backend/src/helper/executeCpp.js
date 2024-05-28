const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath, inputPath) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.out`);

    return new Promise((resolve, reject) => {
        const startTime = process.hrtime(); // Start time measurement

        exec(
            `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out < ${inputPath}`,
            (error, stdout, stderr) => {
                const endTime = process.hrtime(startTime); // End time measurement
                const timeTaken = endTime[0] * 1000 + endTime[1] / 1000000; // Convert to milliseconds
                
                if (error) {
                    reject({ error: error.message, stderr, timeTaken });
                } else if (stderr) {
                    reject({ error: 'Execution error', stderr, timeTaken });
                } else {
                    resolve({ stdout, timeTaken, filepath, inputPath });
                }
            }
        );
    });
};

module.exports = {
    executeCpp,
};

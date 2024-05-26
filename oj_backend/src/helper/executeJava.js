const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeJava = (filePath, inputPath) => {
    const jobId = path.basename(filePath).split(".")[0];
    const className = path.basename(filePath).split(".")[0];
    const outPath = path.join(outputPath, `${className}.class`);

    return new Promise((resolve, reject) => {
        exec(
            `javac ${filePath} -d ${outPath} && cd ${outPath} && java ${className} < ${inputPath}`,
            (error, stdout, stderr) => {
                if (error) {
                    reject({ error, stderr });
                }
                if (stderr) {
                    reject(stderr);
                }
                resolve(stdout);
            }
        );
    });
};

module.exports = {
    executeJava,
};



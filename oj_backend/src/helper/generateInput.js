const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
// codes path (pwd)
const dirInputs = path.join(__dirname, "inputs");
// check if codes folder exits or not
if (!fs.existsSync(dirInputs)) {
  fs.mkdirSync(dirInputs, { recursive: true });
}
const generateInput = async (input) => {
  const uniqueQuesId = uuidv4();
  const inputFileName = `${uniqueQuesId}.txt`;
  const inputFilePath = path.join(dirInputs, inputFileName);

  await fs.writeFileSync(inputFilePath, input);
  return inputFilePath;
};

module.exports = { generateInput };

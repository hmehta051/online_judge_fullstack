const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
// codes path (pwd)
const dirCodes = path.join(__dirname, "codes");
// check if codes folder exits or not
if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}
const generateFile = async (language, code) => {
  const uniqueQuesId = uuidv4();
  const fileName = `${uniqueQuesId}.${language}`;
  const filePath = path.join(dirCodes, fileName);
  await fs.writeFileSync(filePath, code);
  return filePath;
};

module.exports = { generateFile };

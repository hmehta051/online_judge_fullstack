const app = require("./index");
const mongoDBAtlasURL = require("./config/db");
const PORT = process.env.APPLICATION_PORT || 3001;
app.listen(PORT, async () => {
  try {
    await mongoDBAtlasURL();
    console.log("server running on " + PORT + " Docker Port 5174");
  } catch (error) {
    console.error(`Error Message : ${error.message}`);
    process.exit(1);
  }
});

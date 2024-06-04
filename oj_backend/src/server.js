const app = require("./index");
const mongoDBAtlasURL = require("./config/db");
const PORT = process.env.APPLICATION_PORT || 8080;
app.listen(PORT, async () => {
  try {
    await mongoDBAtlasURL();
    console.log("server running on " + PORT + " Docker Port 8080");
  } catch (error) {
    console.error(`Error Message : ${error.message}`);
    process.exit(1);
  }
});

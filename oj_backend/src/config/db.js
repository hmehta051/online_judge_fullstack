const mongoose = require("mongoose");

const dbUrl = process.env.MONGO_URI;

module.exports = () => {
  return mongoose.connect(dbUrl);
};

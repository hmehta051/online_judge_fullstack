const express = require("express");
const dotenv = require('dotenv');
const cors = require('cors')
const authControllers = require("./controllers/authControllers.js");
const questionsControllers = require("./controllers/questionsController.js");
const cookieParser = require('cookie-parser');
const authMiddleware = require("./middlewares/authMiddleware.js");
dotenv.config({ path: '.env' });

const app= express();
app.use(cors())
app.use(express.json());
app.use(cookieParser())

app.use("/api",authControllers);
app.use(authMiddleware)
app.use("/api/questions",questionsControllers);


module.exports=app;

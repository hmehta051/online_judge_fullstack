const express = require("express");
const dotenv = require('dotenv');
const cors = require('cors')
const authControllers = require("./controllers/authControllers.js");
const cookieParser = require('cookie-parser')

// Load environment variables based on NODE_ENV
if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env.production' });
} else {
    dotenv.config({ path: '.env.development' });
}

const app= express();
app.use(cors())
app.use(express.json());
app.use(cookieParser())

app.use("/api",authControllers);


module.exports=app;

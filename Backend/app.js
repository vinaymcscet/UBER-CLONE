const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require('cors');
const cookirParser = require('cookie-parser');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const app = express();

// bcrypt for password hashing, comparing password
connectToDb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookirParser());

app.get("/", (req, res) => {
    res.send("Hello World");
})
app.use('/users', userRoutes);
module.exports = app;
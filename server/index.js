const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConfig");

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", require("./routes/index"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
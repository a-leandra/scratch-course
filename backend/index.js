const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const students = require("./data/students.js");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
dotenv.config({ path: "./config/config.env" });
connectDB();
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running..");
});

app.use(notFound);
app.use(errorHandler);

app.get("/api/students", (req, res) => {
  res.json(students);
});

app.listen(PORT, console.log("Server running on port: " + PORT + "."));

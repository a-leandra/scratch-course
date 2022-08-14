const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });
connectDB();

const app = express();

const PORT = process.env.PORT || 8000;

const exampleRouter = require("./routes/example.routes");
const teacherPanelRouter = require("./routes/teacher.panel.routes");
app.use(express.json());
app.use("/example", exampleRouter);
app.use("/panel-nauczyciela", teacherPanelRouter);

app.listen(PORT, console.log("Server running on port: " + PORT + "."));

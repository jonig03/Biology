const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://joni:qwe@cluster0-dzows.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.on("error", console.error.bind(console, "connection error:"));

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const userRouter = require("./routes/users");

app.use("/users", userRouter);

app.listen(port, () => {
  console.log("App is listening on port " + port);
});

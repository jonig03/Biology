const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const uri =
  "mongodb+srv://joni:qwe@bilologyusers-scsjk.mongodb.net/test?retryWrites=true&w=majority";
const app = express();
const port = process.env.PORT || 5000;
const fileUpload = require("express-fileupload");

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(fileUpload());

mongoose.Promise = global.Promise;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true
  // useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.on("error", console.error.bind(console, "connection error:"));

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const userRouter = require("./routes/users");
const quizRouter = require("./routes/quiz");

app.use("/users", userRouter);
app.use("/quiz", quizRouter);

app.listen(port, () => {
  console.log("App is listening on port " + port);
});

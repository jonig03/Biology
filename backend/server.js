const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;
const fileUpload = require("express-fileupload");
const http = require("http").Server(app);
let User = require("./models/user.model");
const uri =
  "mongodb+srv://joni:qwe@bilologyusers-scsjk.mongodb.net/test?retryWrites=true&w=majority";

var io = require("socket.io")(http);

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

io.on("connection", function(socket) {
  console.log("Socket IO connected...");
  socket.on("join", ({ message }) => {
    console.log("online " + message);
  });
  User.find();

  socket.on("disconnect", () => {
    console.log("User has left");
  });
});

const connection = mongoose.connection;
connection.on("error", console.error.bind(console, "connection error:"));

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const userRouter = require("./routes/users");
const quizRouter = require("./routes/quiz");
const coursesRouter = require("./routes/courses");

app.use("/users", userRouter);
app.use("/quiz", quizRouter);
app.use("/courses", coursesRouter);

http.listen(port, () => {
  console.log("App is listening on port " + port);
});

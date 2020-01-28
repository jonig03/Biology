const router = require("express").Router();
const jwt = require("jsonwebtoken");
let User = require("../models/user.model");
const fs = require("fs");
const path = require("path");

const checkToken = (req, res, next) => {
  const header = req.headers["authorization"];

  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];

    req.token = token;
    next();
  } else {
    //If header is undefined return Forbidden (403)
    res.sendStatus(403);
  }
};

router.get("/", (req, res) => {
  fs.readdir("./courses/", (error, files) => {
    // files.map(file => {
    //   console.log(require("../courses/" + file + "/About.json"));
    //   return require("../courses/" + file + "/About.json");
    // });
    res.send({ courses: files });
  });
});

router.get("/:topicName/:courseName/:stageCourse", checkToken, (req, res) => {
  console.log("asdsadasdasdsadsad");
  const { topicName, courseName, stageCourse } = req.params;
  const randomNumber = Math.ceil(Math.random() * 5);
  console.log(topicName, courseName, stageCourse);
  const pathCourse = path.resolve(
    `courses/${topicName}/${courseName}/${stageCourse}.txt`
  );
  jwt.verify(req.token, "BiologyPen", (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    }
    // Check if such file exists.
    console.log(randomNumber);
    if (randomNumber === 4)
      return res.send(
        "Knock Knock, who's there? A lucky message! refresh the page for the actual course"
      );
    if (!fs.existsSync(pathCourse)) return res.sendStatus(404);
    res.sendFile(pathCourse);
  });
});

router.route("/topics").get((req, res) => {
  fs.readdir("./courses/", (error, files) => res.send(files));
});

module.exports = router;

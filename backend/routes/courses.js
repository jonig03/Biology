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

router
  .route("/")
  .get((req, res) =>
    fs.readdir("./courses/", (error, files) => res.send({ courses: files }))
  );

router.route("/introduction").get((req, res) => {
  // const fileContent = fs.readFileSync(
  //   "./courses/cell/membrane/introduction.txt",
  //   "utf8"
  // );
  // console.log(fileContent);
  // res.send({ intro: fileContent });
  console.log(__dirname);
  res.sendFile(path.resolve("courses/cell/membrane/introduction.txt"));
});

router.route("/topics").get((req, res) => {
  fs.readdir("./courses/", (error, files) => res.send(files));
});

module.exports = router;

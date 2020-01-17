const router = require("express").Router();
const jwt = require("jsonwebtoken");
let User = require("../models/user.model");
const fs = require("fs");

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

router.route("/addQuiz").post(checkToken, (req, res, next) => {
  const quiz = req.body;
  jwt.verify(req.token, "BiologyPen", (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {
      const { _id } = authorizedData;
      console.log(_id);
      //If token is successfully verified, we can generate our file data
      User.findOneAndUpdate({ _id }, { avatar: true });
      User.findOne({ _id }, function(err, user) {
        //If user can't be found, just in case.
        if (!user || user === null) res.sendStatus(403);
        //Add quiz to user database
        user.quizzes.push(quiz);
        user.save();
        //Send a message informing of successfully added quiz
        res.status(200).send({
          message: "successfully added quiz"
        });
      });
    }
  });
});

router.get("/:username/:idQuiz", (req, res) => {
  //Get the param username from client
  const { username, idQuiz } = req.params;
  //Query the user in DB
  User.findOne({ username }, (err, user) => {
    console.log(user);
    //If user can't be found, just in case.
    if (!user || user === null) {
      //If can't find user, send Not Found
      res.sendStatus(404);
    } else {
      //If user is found, found quiz
      const quiz = user.quizzes.filter(quiz => quiz.id === idQuiz);
      res.status(200).json({
        username: user.username,
        quiz
      });
    }
  });
});
router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error " + err));
});

module.exports = router;

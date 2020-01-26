const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
let User = require("../models/user.model");
const fs = require("fs");
var shell = require("shelljs");
const mkdirp = require("mkdirp");

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

const makedir = (path, callback) => {
  mkdirp(path.split(" ").join("_"), function(err) {
    // if any errors then print the errors to our console
    if (err) {
      console.log(err);
    } else {
      callback();
      console.log(
        `Successfully created ${path.split(" ").join("_")} directory`
      );
    }
    // else print a success message.
  });
  return;
};

router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error " + err));
});

router.route("/add").post((req, res, next) => {
  const { firstName, lastName, username, password } = req.body;
  let email = req.body.email.toLowerCase();
  let fullName = `${firstName} ${lastName}`;
  let userData = {
    firstName,
    lastName,
    fullName,
    username,
    email,
    quizzes: [],
    rank: "Noobie",
    // avatar: false,
    tracksLearned: [{ name: "cells", duration: 120 }],
    password
  };
  //Check for white spaces in username. If there is, return an error
  if (userData.username.indexOf(" ") >= 0) {
    res.send({
      message: "Username has spaces."
    });
    return false;
  }

  userData.password = bcryptjs.hashSync(userData.password);
  const newUser = new User(userData);
  newUser
    .save()
    .then(() =>
      res.status(200).send({
        success: true
      })
    )
    .catch(err =>
      res.status(400).send({
        success: false,
        message: "Server error, please try again later.",
        err: err
      })
    );
});

router.route("/sign-in").post((req, res) => {
  const { email, password } = req.body;
  if (email)
    User.findOne({ email }, function(err, user) {
      if (user) {
        const authenticated = bcryptjs.compareSync(password, user.password, 10);
        if (authenticated) {
          const token = jwt.sign({ _id: user._id }, "BiologyPen");
          const responseFromServer = {
            success: true,
            message: "You signed in your account successfully!",
            authToken: token,
            fullName: user.fullName,
            username: user.username
          };
          res.send(responseFromServer);
        } else {
          return res.status(400).send({
            success: false,
            message: "Invalid password... Did you forget it?"
          });
        }
      } else {
        return res.status(400).send({
          success: false,
          message:
            "User not found... If you don't have an user already, feel free to join us!"
        });
      }
    });
});

router.get("/profiles", (req, res) => {
  //Take from all users the username field, later on, also take the image url or path
  User.find({}, { _id: 1, username: 1 })
    .then(data => res.send(data))
    .catch(err => res.sendStatus(400));
});

router.get("/authenticated", checkToken, (req, res) => {
  //verify the JWT token generated for the user
  jwt.verify(req.token, "BiologyPen", (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {
      const { _id } = authorizedData;
      console.log(_id);
      //If token is successfully verified, we can send the autorized data
      User.findOne({ _id }, function(err, user) {
        //If user can't be found, just in case.
        console.log(user === null);
        if (!user || user === null) {
          res.sendStatus(403);
          console.log("Qwe");
        } else {
          //Send back user details
          res.status(200).send({
            fullName: user.fullName,
            username: user.username,
            userID: _id
          });
        }
      });
    }
  });
});

router.get("/profile/:username", checkToken, (req, res) => {
  //get the param username from client
  const username = req.params.username;
  console.log(req.params.username);

  //verify the JWT token generated for the user (sent in body though)
  jwt.verify(req.token, "BiologyPen", (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {
      const { _id } = authorizedData;
      //If token is successfully verified, we can send the autorized data
      console.log({ _id, username });
      //Check in database for a user with the sane ID and username
      User.findOne({ _id, username }, function(err, user) {
        //If user can't be found, just in case.
        if (!user || user === null) {
          res.sendStatus(403);
        } else {
          //Send back user details
          console.log(user);
          res.status(200).json({
            fullName: user.fullName,
            quizzes: user.quizzes,
            userID: user._id
          });
        }
      });
    }
  });
});

router.get("/:username", (req, res) => {
  //Get the param username from client
  const username = req.params.username;
  //Query the user in DB
  User.findOne({ username }, (err, user) => {
    //If user can't be found, just in case.
    if (!user || user === null) {
      //If can't find user, send Not Found
      res.sendStatus(404);
    } else {
      //If user is found, send user details
      res.status(200).json({
        username: user.username,
        rank: user.rank,
        userID: user._id
      });
    }
  });
});

router.post("/uploadAvatar", checkToken, (req, res) => {
  //verify the JWT token generated for the user
  jwt.verify(req.token, "BiologyPen", (err, authorizedData) => {
    if (err) {
      //If error send Forbidden (403)
      console.log("ERROR: Could not connect to the protected route");
      res.sendStatus(403);
    } else {
      const { _id } = authorizedData;
      //If token is successfully verified, we can send the autorized data
      User.findOne({ _id }, function(err, user) {
        //If user can't be found, just in case.
        if (!user || user === null) res.sendStatus(403);
      });
      if (req.files === null) {
        return res.status(400).json({ msg: "No file uploaded" });
      }
      const file = req.files.image;
      console.log(req.files.image);
      const path = `${__dirname}/../../frontend/src/usersMedia/${_id}`;
      const filePath = path + "/Avatar.png";
      makedir(path, () => {
        file.mv(path + "/Avatar.png", err => {
          if (err) {
            console.error(err);
            return res.status(500).send(err);
          }
          User.findOneAndUpdate({ _id }, { avatar: true });
          res.json({
            fileName: file.name,
            filePath
          });
        });
      });
      // console.log(file);
    }
  });
});
module.exports = router;

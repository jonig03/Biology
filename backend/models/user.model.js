const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    fullName: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3
    },
    rank: {
      type: String
    },
    quizzes: Array,
    // avatar: Boolean,
    password: {
      type: String,
      required: true,
      minlength: 3
    }
  },
  {
    timestamps: true
  }
);

// userSchema.pre("save", function(next) {
//   var user = this;
//   const hash = bcryptjs.hashSync(user.password);
//   user.password = hash;
//   next();
// });

const User = mongoose.model("User", userSchema);
module.exports = User;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const moment = require("moment");
const SALT_I = 10;
require("dotenv").config();

const userSchema = new Schema({
  facebookId: String,
  googleId: String,
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 100
  },
  cart: {
    type: Array,
    default: []
  },
  history: {
    type: Array,
    default: []
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  },
  resetToken: {
    type: String
  },
  resetTokenExp: {
    type: Number
  }
});
userSchema.pre("save", function(next) {
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (user.isModified("password")) {
    // generate a salt
    bcrypt.genSalt(SALT_I, function(err, salt) {
      if (err) return next(err);
      // hash the password along with our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        // override the cleartext password with the hashed one
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});
//Login
userSchema.methods.comparePassword = function(canditatePassword, cb) {
  bcrypt.compare(canditatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
userSchema.methods.generateResetToken = function(cb) {
  var user = this;

  crypto.randomBytes(20, function(err, buffer) {
    var token = buffer.toString("hex");
    var today = moment()
      .startOf("day")
      .valueOf();
    var tomorrow = moment(today)
      .endOf("day")
      .valueOf();

    user.resetToken = token;
    user.resetTokenExp = tomorrow;
    user.save(function(err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

// Generate Token
userSchema.methods.generateToken = function(cb) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), process.env.SECRET);

  user.token = token;
  user.save(function(err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};
userSchema.statics.findByToken = function(token, cb) {
  var user = this;
  jwt.verify(token, process.env.SECRET, function(err, decode) {
    user.findOne({ _id: decode, token: token }, function(err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);
module.exports = { User };

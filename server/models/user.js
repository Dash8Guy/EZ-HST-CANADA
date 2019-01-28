const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
// const { EZ_ENV } = require("../config/config");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email"
    }
  },
  paid_Start_Date: {
    type: Date,
    required: true
  },
  paid_End_Date: {
    type: Date,
    required: true
  },
  password: {
    type: String,
    require: true,
    minlength: 8
  },
  tokens: [
    {
      access: {
        type: String,
        require: true
      },
      token: {
        type: String,
        require: true
      }
    }
  ]
});

UserSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();

  return _.pick(userObject, ["_id", "firstName", "lastName", "email"]);
};

UserSchema.methods.generateAuthToken = function () {
  let user = this;
  let access = "auth";
  let token = jwt
    .sign({ _id: user._id.toHexString(), access }, process.env.secret_key)
    .toString();
  //The below line of code is just like pushing to an array but works better with all versions of mongodb
  user.tokens = user.tokens.concat([{ access, token }]);
  return user.save().then(() => {
    return token;
  });
};

UserSchema.statics.findByToken = function (token) {
  let User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.secret_key);
  } catch (e) {
    return Promise.reject("Authentication failed");
  }
  return User.findOne({
    _id: decoded._id,
    "tokens.token": token,
    "tokens.access": "auth"
  });
};

//This function is used to Locate User with Email-Password-Firs and Last Name and send back user
UserSchema.statics.findByCredentials = function (
  firstName,
  lastName,
  email,
  password
) {
  let User = this;
  return User.findOne({ firstName, lastName, email }).then(user => {
    if (!user) {
      return Promise.reject(
        `User ${firstName} ${lastName} with email(${email})  was not Found!`
      );
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject("Password did not Match");
        }
      });
    });
  });
};

UserSchema.methods.removeToken = function (token) {
  let user = this;
  return user.updateOne({
    $pull: {
      tokens: { token }
    }
  });
};


//This is mongoose middleware and is run just before a user is saved in order to hash the password
UserSchema.pre("save", function (next) {
  let user = this;

  //this check if password was just modified. This is done to insure we don't re-hash a saved password.
  //If user logs in to change email, the hashed password should not be re-hashed as it already is.
  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };

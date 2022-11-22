const passport = require("passport");
const express = require("express");
// google oauth with Strategy property
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const User = mongoose.model("User");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      // coming back from google, handle this route and back to our app
      callbackURL: "https://localhost:3000/auth/google/callback",
      // callbackURL: "https://polar-spire-27738.herokuapp.com/auth/google/callback",
      // to use dev or prod callback URI
      proxy: true
      // used async code and handled promises with await lastly, deleted .then functions
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      const existingUser = await User.findOne({ googleId: profile.id });
      // to get profile details
      // console.log('currentUser', profile)
      if (existingUser) {
        // we already have a record with the given profile ID
        User.findOne({ email: profile.emails[0].value }, (err, user) => {
          user.comparePassword("123456789", (err, isMatch) => {
            user.generateToken((err, user) => {});
          });
        });
        return done(null, existingUser);
      } else {
        const user = await new User({
          googleId: profile.id,
          name: profile.name.givenName,
          lastname: profile.name.familyName,
          email: profile.emails[0].value,
          password: "123456789"
        }).save();
        done(null, user);
        User.findOne({ email: profile.emails[0].value }, (err, user) => {
          user.comparePassword("123456789", (err, isMatch) => {
            user.generateToken((err, user) => {});
          });
        });
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: "https://localhost:3000/auth/facebook/callback",
      // callbackURL: "https://polar-spire-27738.herokuapp.com/auth/facebook/callback",
      proxy: true,
      profileFields: ["id", "email", "displayName", "photos"]
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      const existingUser = await User.findOne({ facebookId: profile.id });

      // to get profile details
      // console.log('currentUser', profile)
      if (existingUser) {
        // we already have a record with the given profile ID
        User.findOne({ email: profile.emails[0].value }, (err, user) => {
            console.log('profile.emails',profile.emails);

          user.comparePassword("123456789", (err, isMatch) => {
            user.generateToken((err, user) => {});
          });
        });
        return done(null, existingUser);
      }
      const user = await new User({
        facebookId: profile.id,
        name: profile.displayName,
        lastname: profile.displayName,
        email: profile.emails[0].value,
        password: "123456789"
      }).save();
      done(null, user);
      User.findOne({ email: profile.emails[0].value }, (err, user) => {
        user.comparePassword("123456789", (err, isMatch) => {
          user.generateToken((err, user) => {});
        });
      });
    }
  )
);

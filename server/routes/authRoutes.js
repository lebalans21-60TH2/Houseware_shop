const passport = require("passport");
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
const User = mongoose.model("User");
const { auth } = require("../middleware/auth");
module.exports = app => {
    // when user comes from auth/google, handle passport authentication with google which is actually the GoogleStrategy
    // scope asks google what access we want to have: profile and email
    
    app.get(
        "/auth/google",
        passport.authenticate("google", {
            scope: ["profile", "email"],
            // ask user to log in with a diff account
            // prevent auto-login with previous user
            // https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
            // [ISSUE]using google auth20 shows clientID when logging in google account
            // [SOLVED] http://www.ietf.org/mail-archive/web/oauth/current/msg08181.html
            prompt: "select_account"
        })
    );

    // passport.authenticate is a middleware, a function which authenticates the user, and fetches user profile and details using google strategy
    app.get(
        "/auth/google/callback",
        passport.authenticate("google", { failureRedirect: "/auth/google" }),
        (req, res) => {
            User.findOne({ email: req.user.email }, (err, user) => {
                user.comparePassword("123456789", (err, isMatch) => {
                    user.generateToken((err, user) => {
                        res.cookie("w_auth", user.token).redirect("/user/dashboard");
                    });
                });
            });
        }
    );

    app.get("/api/logout", (req, res) => {
        // sessions will be kept as long as user is logged in with the set amount of time it will expire.
        req.session.destroy(err => {
            if (err) {
                console.log(err);
            } else {
                req.logout();
                res.redirect("/");
            }
        });
    });

    app.get("/api/current_user", (req, res) => {
        res.send(req.user);
    });
    app.get(
        "/auth/facebook",
        passport.authenticate("facebook", { scope: ["email"] })
    );

    app.get(
        "/auth/facebook/callback",
        passport.authenticate("facebook", { failureRedirect: "/auth/facebook" }),
        (req, res) => {
            User.findOne({ email: req.user.email }, (err, user) => {
                user.comparePassword("123456789", (err, isMatch) => {
                    user.generateToken((err, user) => {
                        res.cookie("w_auth", user.token).redirect("/user/dashboard");
                    });
                });
            });
        }
    );
};

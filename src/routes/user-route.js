const express = require("express");
const passport = require('passport');
const sqlQuery = require("../database/mysql_query");
const dbConnection = require("../database/mysql_connect");
const USER_ATTRIBUTE = require("../user/user_model");
const router = express.Router();
const userHandler = require("../user/register_handler");
const user = require("../user/user_handler");
// require("../boot/auth");
require("../user/google_auth");

// passport.use(s);
router.post("/register", userHandler.register);
router.get("/auth/google",
    passport.authenticate('google', { scope: ['email', 'profile']})
);
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

router.post('/user', user.user)

module.exports = router;
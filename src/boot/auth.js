// const passport = require('passport');
// var GoogleStrategy = require('passport-google-oauth20').Strategy;
// const GOOGLE_CLIENT_ID = '532959646794-qlerld3d5gf56s9aqh0ip5i7rn8lq9da.apps.googleusercontent.com';
// const GOOGLE_CLIENT_SECRET = 'EpFFzY-sU-ZubyNEQLYCtjZR';

// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:8080/userForm/auth/google/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//       return cb(null, profile);
//   }
// ));

// passport.serializeUser(function(user, cb) {
//     cb(null, user);
//   });

//   passport.deserializeUser(function(obj, cb) {
//     cb(null, obj);
//   });
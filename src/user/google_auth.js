const passport = require('passport');
const sqlQuery = require("../database/mysql_query");
const dbConnection = require("../database/mysql_connect");
const USER_ATTRIBUTE = require("../user/user_model");

var GoogleStrategy = require('passport-google-oauth20').Strategy;
const GOOGLE_CLIENT_ID = '532959646794-qlerld3d5gf56s9aqh0ip5i7rn8lq9da.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = 'EpFFzY-sU-ZubyNEQLYCtjZR';

// passport.serializeUser(function(profile, done) {
//   done(null, profile.id);
// });

// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, profile) {

//     done(null, profile);
//   });
// });

  passport.use(new GoogleStrategy({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/userForm/auth/google/callback"
    },
    async function(accessToken, refreshToken, profile, done) {
        // var User = dbConnection.model('ModelName', BlogPost);
        // USER_ATTRIBUTE.social_ID.findOrCreate({ social_ID: profile.id }, function (err, user) {
            console.log(profile._json);
            var obj = profile._json;
            try {
                let connection = await dbConnection();
            
                let getSocialIdQuery = `SELECT social_ID FROM google WHERE social_ID = ? `;
                let getSocialId = await sqlQuery(connection, getSocialIdQuery, [obj.sub]);
            
               
                if (getSocialId.length !== 0) {
                  console.log(getSocialId);
                  console.log("")
                  connection.end("Account has already existed");
                  // done(null,'gID');
                  // res.json({
                  //   message: "Account has already existed",
                  // });
                } else {
                  
                        let registerQuery = `INSERT INTO google (${USER_ATTRIBUTE.social_ID},${USER_ATTRIBUTE.photoData},${USER_ATTRIBUTE.userNameG}) 
                        VALUES (?, ?, ?)`;
                        let createUser = await sqlQuery(connection, registerQuery, [
                            obj.sub,
                            obj.picture,
                            obj.name
                        ]);
                          connection.end();
                        console.log("Register successfully");
                        // done(null,'gID'); 
                }
              } catch (error) { 
                console.log(error);
                // res.status(500).json({
                //   message: error,
                // });
              }
          // return cb(null, profile);
        // });
      }
    ));
            
          


const sqlQuery = require("../database/mysql_query");
const dbConnection = require("../database/mysql_connect");
const USER_ATTRIBUTE = require("../user/user_model");
const bcrypt = require('bcrypt');
const saltRounds = 10;



module.exports.register = async (req, res) => {
    const {userName, password} = req.body;
    let encryptedPassword = '';
    try {
      let connection = await dbConnection();
  
      let getUserNameQuery = `SELECT userName FROM users WHERE userName = ? `;
      let getUserName = await sqlQuery(connection, getUserNameQuery, [userName]);
  
     
      if (getUserName.length !== 0) {
        console.log(getUserName);
        connection.end();
        res.json({
          message: "Username has already existed",
        });
      } else {
        bcrypt.hash(encryptedPassword, saltRounds, function(err, hash) {
              encryptedPassword = hash;
              console.log('hash', hash);
              
              let registerQuery = `INSERT INTO users (${USER_ATTRIBUTE.userName},${USER_ATTRIBUTE.password}) 
              VALUES (?, ?)`;
              let createUser = sqlQuery(connection, registerQuery, [
                  userName,
                  encryptedPassword,
              ]);
                connection.end();
              res.json({
                message: "Register Successfully",
              });
                });  
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    }
  };


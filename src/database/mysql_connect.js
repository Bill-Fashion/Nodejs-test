const mysql = require("mysql2");
const dbConfig = {
  user: "root",
  host: "127.0.0.1",
  password: "pirates1201",
  database: "netflix-clone",
};

module.exports = () =>
  new Promise((resolve, reject) => {
    const connection = mysql.createConnection(dbConfig); 

    connection.connect((error) => {
      if (error) {
        reject(error);

        return;
      }
      resolve(connection);
    });
  });
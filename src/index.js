const express = require('express')
const mongoose = require('mongoose');
const app = express()
const PORT = process.env.PORT || 8080;
const routes = require("./routes/index");
const passport = require('passport');
require('passport-google-oauth20');
const connectDb = require('./database/mongodb_connection');
// const { Mongoose } = require('mongoose');
const http = require('http').Server(app);
const io = require('socket.io')(http);
// const { Server } = require("socket.io");
// const io = new Server();
const connectSocket = require('./socket_io/socketio_connect');
// require('../socket_io/socketio_connect');

// console.log("io1.......", io);
app.get("/", (req, res) => res.sendFile(__dirname + '/index.html'));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json()); 
routes(app);
connectDb(); 
connectSocket(io);

http.listen(PORT, () => {
  console.log(`Socket.IO server running at http://localhost:${PORT}/`);
});

// app.listen(PORT, () => {
//   console.log(`Example app listening at http://localhost:${PORT}`)
// })  
const express = require('express');

const router = require('../routes/user-route');
const User = require('./user_schema');
const route = express.Router();
// require('../socket_io/socketio_connect');
// require("../socket_io/socketio_connect");

module.exports.user = async (req, res) => {
    const{firstName, lastName} = req.body;
    let user = {};

    user.firstName = firstName;
    user.lastName = lastName;

    let userModel = new User(user);
    await userModel.save();
    
    res.json(userModel);
}
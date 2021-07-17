const mongoose = require('mongoose');

function connectSocket(io) {
    const connection = mongoose.connection;
    // console.log("io: ", io);
    io.on('connection', (socket) => {
        console.log("user connected");
        
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
        });
    
    connection.once("open", () => {
    console.log("MongoDB database connected");
    
    // console.log("Setting change streams");
    const thoughtChangeStream = connection.collection("User").watch();
    thoughtChangeStream.on("change", (change) => {
        switch (change.operationType) {
        case "insert":
            const thought = {
            _id: change.fullDocument._id,
            firstName: change.fullDocument.firstName,
            lastName: change.fullDocument.lastName
            };
            console.log("inside changeStream insert");
            io.emit('message', thought.firstName + thought.lastName);
            
            
            break;

        case "delete":
            io.emit("deletedThought", change.documentKey._id);
            break;
        }
    });
    });

}
module.exports = connectSocket;
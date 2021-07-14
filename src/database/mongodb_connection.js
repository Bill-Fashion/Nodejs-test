const mongoose = require("mongoose");

const URI = "mongodb+srv://phucmongodb:1234@cluster0.rkmqc.mongodb.net/test"

const connectDb = async() =>{
    try{
        await mongoose.connect(URI,{
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        console.log("connect successfully");
    }
    catch (err){
        console.log(err);
    } 
}

module.exports = connectDb;
const mongoose = require("mongoose");

const connectToMongo = ()=>{
    mongoose.connect("mongodb+srv://admin-tushar:tushar0811@cluster0.kp3mv.mongodb.net/NoteCloudDB?retryWrites=true&w=majority",()=>{
        console.log("Connected to DB");
    });
}

module.exports = connectToMongo;
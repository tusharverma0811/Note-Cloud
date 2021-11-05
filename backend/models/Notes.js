const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    time:{
        type: Date,
        default: Date.now
    }
})

module.exports = new mongoose.model("Note",notesSchema);
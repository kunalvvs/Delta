const mongoose = require("mongoose");
//here are written Schemas
const chatSchema = new mongoose.Schema({

    from:{
        type:String,
        required:true   //constraints
    },
    to:{
        type:String,
        required:true
    },
    msg:{
        type:String,
        maxLength:50
    },
    created_at:{
        type:Date,
        required:true
    }
    

});

const Chat = mongoose.model("Chat",chatSchema);

module.exports = Chat;
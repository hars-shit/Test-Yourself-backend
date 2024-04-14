const { default: mongoose } = require("mongoose");

const notify=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    collab_id:{
        type:String,
        required:true
    },
    room_id:{
        type:Number,
        required:true
    },
    topic:{
        type:String,
        required:true
    },
    questions: [{
        question: {
            type: String
        },
        correct: {
            type: String
        },
        is_correct: {
            type: Number
        }
    }],
    is_accepted:{
        type:Number,
        required:true 
    }
})

const Notification=mongoose.model("Notification",notify);
module.exports=Notification
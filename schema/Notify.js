const { default: mongoose } = require("mongoose");

const notify=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    colllaborator_id:{
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
    host_questions: [{
        question: {
            type: String
        },
        option:[
           String
        ],
        correct: {
            type: String
        },
        is_correct: {
            type: Number
        }
    }],
    colllaborator_questions: [{
        question: {
            type: String
        },
        option:[
           String
        ],
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
},
{timestamps:true}

)

const Notification=mongoose.model("Notification",notify);
module.exports=Notification
const { default: mongoose } = require("mongoose");

const type_Schema=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    topic:{
        type:String,
        required:true
    },
    questions:[{
        question:{
            type:String
        },
        answer:{
            type:String
        },
        marks:{
            type:Number
        },
        user_answer:{
            type:String
        }
    }]
})

const Type=mongoose.model("type",type_Schema)

module.exports=Type
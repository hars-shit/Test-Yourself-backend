const { default: mongoose } = require("mongoose");

const signup=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const Register=mongoose.model("Register",signup)

module.exports=Register
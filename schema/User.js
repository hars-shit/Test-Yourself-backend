const { default: mongoose } = require("mongoose");

const user_schema=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    topic:{
        type:String,
        required:true
    },

})

const User=mongoose.model('user',user_schema);
 module.exports=User;
const { default: mongoose } = require("mongoose");

const response_Schema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    topic:{
        type:String,
        required: true
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
    }]
})

const Response = mongoose.model("response", response_Schema)

module.exports = Response;
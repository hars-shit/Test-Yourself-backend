const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect("mongodb+srv://upadhyayharshit05:harshit05@cluster0.49rswks.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

        console.log("Db connected successfully");
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = connect;

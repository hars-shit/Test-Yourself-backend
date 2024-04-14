const express = require('express')
const connect = require("./databse/db.js");
const User = require('./schema/User.js');
const Response = require('./schema/Response.js');
const cors = require('cors');
const bcrypt=require("bcrypt")
const Type = require('./schema/Type.js');
const Notification = require('./schema/Notify.js');
const Register = require('./schema/Register.js');
const app = express()
app.use(express.json())
connect()
app.use(cors())
const PORT = 2001;


// for login and singup 

app.post("/register",async(req,res)=>{
    const {username,email,password}=req.body;
    try{
        const existing=await Register.findOne({email})
        if(existing){
            return res.status(400).json({ message: 'User already exists' });
        }

        // hash the password 

        const hashedPassword=await bcrypt.hash(password,10);

        const User=new Register({
          username:username,
          email:email,
          password:hashedPassword});
        await User.save();
        res.status(201).json({ message: "New User Registered successfully" });
    }
    catch(error){
        console.error('Error while signing up:', error.message);
        res.status(500).json({ message: error.message });
    }
})

// for login 

app.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await Register.findOne({email});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(401).json({message:'Invalid Password'});
        }
        res.status(200).json({message:"Login Successfull"});
    }
    catch(err){
        res.status(500).json({message:"Internal Server Error"});
    }
}
)
// for user email and topic 
app.post('/user', async (req, res) => {
    try {

        const { email, topic } = req.body;

        const newData = new User({ email, topic });
        await newData.save();
        res.status(201).json({ message: "Added successfully" });
    }
    catch (error) {
        console.error("Error while saving data")
        res.status(500).json({ error: 'Internal Server Error' })
    }
})


// for pushing the data 
app.post('/user/questions', async (req, res) => {
    try {
        const { email, topic, questions } = req.body;
        const newData = new Response({ email, topic, questions });
        await newData.save();
        res.status(201).json(newData);
    }
    catch (error) {
        console.error("Error while saving data")
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

//    for getting data
app.get('/user/questions/get/:email', async (req, res) => {
    // console.log(req.params)
    try {
        const data = await Response.find({ email: req.params.email })
        // const data = await Response.find({email:req.params.email})
        res.status(200).json(data)
    } catch (err) {
        console.log(err)
    }
})



app.get('/user/:id', async (req, res) => {
    try {
        const data = await Response.findById(req.params.id);
        if (!data) {
            res.status(404).json({ message: "Id not found" });
        }
        res.status(200).json(data)
    } catch (err) {
        console.log(err)
    }
})


app.get('/user', async (req, res) => {
    const users = await Response.find();
    res.status(200).json(users)
})


// for updating the questions api 
app.put('/user/questions/:id', async (req, res) => {
    try {
        const data = await Response.findByIdAndUpdate(req.params.id,
            {
                $push: { questions: req.body }
            }, {
            new: true
        }
        )
        if (!data) {
            res.status(404);
            console.log("Error While Updating");
        }
        res.status(200).json(data)
    } catch (err) {
        console.log(err)
    }
})


// for type answer 

app.post('/user/type', async (req, res) => {
    try {
        const { email, topic, questions } = req.body;
        const newData = new Type({ email, topic, questions });
        await newData.save();
        res.status(201).json(newData)
    }
    catch (err) {
        console.error("Error While Saving Type Data");
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

// for updating the post api 

app.put('/user/type/:id', async (req, res) => {
    const { questions } = req.body;
    try {
        const data = await Type.findByIdAndUpdate(req.params.id,
            {
                $push: { questions: questions }
                // $push: { questions: { $each: req.body.questions } }
            }, {
            new: true
        }
        )
        if (!data) {
            res.status(404);
            console.log("Error While Updating");
        }
        res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
    }
})


// for collab 

// for post api data 

app.post("/user/collab", async (req, res) => {
    try {
        const { email, collab_id,room_id, topic, questions, is_accepted } = req.body;
        const newData = new Notification({ email, collab_id,room_id, topic, questions, is_accepted });
        await newData.save()
        res.status(201).json(newData);
    }
    catch (err) {
        console.error("Error while saving data");
        res.status(500).json({ error: "Internal server error" })
    }
})

// put api for is_accepted 

app.put("/user/collab/:id", async (req, res) => {
    try {
        const { is_accepted } = req.body;
        const data = await Notification.findByIdAndUpdate(req.params.id, {
            $set: { is_accepted: is_accepted }
        }, { new: true })
        if (!data) {
            res.status(404);
            console.log("Error While Updating");
        }
        if(is_accepted ===1){

            return res.status(200).json(data) 
        }
        else {
            res.status(404).json("Request Rejected")
        }
         }
    catch (err) {
        console.error("Error while saving data");
        res.status(500).json({ error: "Internal server error" })
    }
})


app.listen(PORT, () => {
    console.log("SERVER STARTED");
})
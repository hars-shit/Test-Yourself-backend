const express=require('express')
const connect=require("./databse/db.js");
const User = require('./schema/User.js');
const Response = require('./schema/Response.js');
const cors=require('cors')
const app=express()
app.use(express.json())
connect()
app.use(cors())
const PORT=2001;

// for user email and topic 
app.post('/user',async(req,res)=>{
    try{

        const {email,topic}=req.body;
        
        const newData=new User({email,topic});
        await newData.save();
        res.status(201).json({message:"Added successfully"});
    }
    catch(error){
        console.error("Error while saving data")
        res.status(500).json({error:'Internal Server Error'}) 
    }
})


// for pushing the data 
app.post('/user/questions',async(req,res)=>{
    try{
        const {email,topic,questions}=req.body;
        const newData=new Response({email,topic,questions});
        await newData.save();
        res.status(201).json(newData);
    }
    catch(error){
        console.error("Error while saving data")
        res.status(500).json({error:'Internal Server Error'}) 
    }
})
 
//    for getting data
app.get('/user/questions/get',async(req,res)=>{
    try{
        const data = await Response.find({email:req.body.email})
        res.status(200).json(data)
    }catch(err){
        console.log(err)
    }
})

// for get using id 

app.get('/user/questions/get/:id',async(req,res)=>{
    try{
        const userId=req.params.id;
        const data=await Response.findById(userId);
        if(!data){
            res.status(404).json({message:"Id not found"});
        }
        res.status(200).json({data})
    }
    catch(err){
        res.status(500).json({message:"Internal Server Error"})
    }
})

// for updating the questions api 
app.put('/user/questions/:id',async(req,res)=>{
    try{
        const data = await Response.findByIdAndUpdate(req.params.id,
            {
                $push : {questions: req.body}
            },{
                new : true
            }
            )
        if(!data){
            res.status(404);
            console.log("Error While Updating");
        }
        res.status(200).json(data)
    }catch(err){
        console.log(err)
    }
})



app.listen(PORT,()=>{
    console.log("SERVER STARTED");
})
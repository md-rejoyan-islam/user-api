const express=require('express')
const app=express()



//environment file
const dotenv = require('dotenv');
dotenv.config()

//port 
const port = process.env.PORT || 5002; 
const hostname=process.env.HOSTNAME || "127.0.2.32"

//routes import
const userRouter = require("./routes/v1/user.routes");

//cross origin problem 
const cors = require("cors");
app.use(cors());
const { log } = require('console');


//form data receive in json format
app.use(express())
app.use(express.json())


//routes declare
app.use('/api/v1',userRouter)
app.use('/',(req,res)=>{
    res.send("API is successfully running");
})


//port listen
app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port} or ${hostname}:${port}`);
})
const express = require("express");
const cors = require("cors");
const connectToMongo = require(__dirname+"/db");
require("dotenv").config();

const app = express();
connectToMongo();

app.use(cors());
app.use(express.json());
//Available Routes
app.get("/",(req,res)=>{
    res.send("Hello User");
})

app.use("/api/auth",require(__dirname+"/routes/auth.js"));

app.use("/api/notes",require(__dirname+"/routes/notes"));

app.listen(5000,()=>{
    console.log("Server Up and running on port 5000");
})
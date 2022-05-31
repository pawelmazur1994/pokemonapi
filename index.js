const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoute = require('./routes/auth');


const app = express();
dotenv.config();

mongoose.connect(
    process.env.MONGO_URL
    ).then(()=>console.log("Connection with MongoDb is successsfull."))
     .catch((error)=>{
         console.log(error);
     });


app.use(express.json());

app.use("/api/auth", authRoute);


app.listen(process.env.PORT , ()=>{
    console.log(`Server start.`);
})
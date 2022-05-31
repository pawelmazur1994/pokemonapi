const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoute = require('./routes/auth');
const trainerRoute = require("./routes/trainer");
const itemRoute = require("./routes/item");
const pokemonRoute = require("./routes/pokemon");



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
app.use("/api/trainers", trainerRoute);
app.use("/api/items", itemRoute);
app.use("/api/pokemons", pokemonRoute);


app.listen(process.env.PORT , ()=>{
    console.log(`Server start.`);
})
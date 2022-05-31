const mongoose = require("mongoose");

const TrainerSchema = new mongoose.Schema(
    {
        username:{type:String, required:true, unique:true},
        password:{type: String, required:true},
        email:{type:String, required:true, unique:true },
        badges:{type:Array},
        howManyPokemons:{type:Number},
        isAdmin:{
            type:Boolean,
            default:false,
        },

    },
    {timestamps:true}
)
module.exports = mongoose.model("Trainer", TrainerSchema); 
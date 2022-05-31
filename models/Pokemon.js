const mongoose = require("mongoose");

const PokemonSchema = new mongoose.Schema(
    {
        name:{type:String, required:true, unique:true},
        types:{type: Array, required:true},
        stats:[{
            total:{type:Number, required:true},
            hp:{type:Number, required:true},
            attack:{type:Number, required:true},
            defense:{type:Number, required:true},
            speedAttack:{type:Number, required:true},
            speedDefanse:{type:Number, required:true},
            speed:{type:Number, required:true},
        }],  
        moves:{type: Array, required:true},
        evolutions:{type: Array, required:true}
    },
    {timestamps:true}
)
module.exports = mongoose.model("Pokemon", PokemonSchema); 
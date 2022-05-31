const mongoose = require("mongoose");

const PokemonSchema = new mongoose.Schema(
    {
        name:{type:String, required:true, unique:true},
        types:{type: Array, required:true},
        stats:[{
            hp:{type:Number, required:true},
            attack:{type:Number, required:true},
            defense:{type:Number, required:true},
            speedAttack:{type:Number, required:true},
            speedDefense:{type:Number, required:true},
            speed:{type:Number, required:true},
        }],  
        moves:{type: Array, required:true},
        evolutions:{type: Array, required:true},
        itemId:{type:String}
    },
    {timestamps:true}
)
module.exports = mongoose.model("Pokemon", PokemonSchema); 
const mongoose = require("mongoose");

const PokedexSchema = new mongoose.Schema(
    {
        trainerId:{type:String, required:true},
        pokemons:[{
            pokemonId:{
                type:String
            },
        }
    ],
    },
    {timestamps:true}
)
module.exports = mongoose.model("Pokedex", PokedexSchema);
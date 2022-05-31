const router = require("express").Router();
const Pokemon = require("../models/Pokemon");
const {verifyTokenAsAnAuthorizedTrainer, verifyTokenAsAdmin} = require("./verifyJwtToken.js");



 //Create pokemon
router.post("/", verifyTokenAsAnAuthorizedTrainer,  async (req,res)=>{
const newPokemon = new Pokemon(req.body)
try {
    const savedHotel = await newPokemon.save();
    res.status(201).json(savedHotel)
} catch (error) {
    res.status(500).json(error)
}
})


 //Update pokemon
router.put("/:id", verifyTokenAsAdmin, async (req, res) => {
  
    try {
      const updatedPokemon= await Pokemon.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedPokemon);
    } catch (error) {
      res.status(500).json(error);
    }
  });


 //Delete pokemon
router.delete("/:id", verifyTokenAsAdmin, async (req, res) => {
    try {
      await Pokemon.findByIdAndDelete(req.params.id);
      res.status(200).json("Pokemon has been deleted.");
    } catch (error) {
      res.status(500).json(error);
    }
  });
  

  //Get pokemon
  router.get("/:id", async (req, res) => {
    try {
      const pokemon = await Pokemon.findById(req.params.id);
      res.status(200).json(pokemon);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  //Get pokemons
  router.get("/",  async (req, res) => {
    const pokemonTypes = req.query.types;
    const pokemonMoves = req.query.moves;
    try {
      let pokemons;
   if(pokemonTypes){
     pokemons = await Pokemon.find({types:{
              $in:[pokemonTypes],
          },
    });
      }
    else if(pokemonMoves){
        pokemons = await Pokemon.find({moves:{
              $in:[pokemonMoves],
          },
    });
      }
    else{
          pokemons = await Pokemon.find();
      }
      res.status(200).json(pokemons);
    } catch (error) {
      res.status(500).json(error);
    }
  });


module.exports = router 
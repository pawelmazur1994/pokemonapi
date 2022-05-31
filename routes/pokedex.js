const router = require("express").Router();
const Pokedex = require("../models/Pokedex");
const {verifyTokenAsAnAuthorizedTrainer, verifyTokenAsAdmin} = require("./verifyJwtToken");


 //Create pokedex

 router.post("/", verifyTokenAsAnAuthorizedTrainer,  async (req,res)=>{
    const newPokedex= new Pokedex(req.body)
    try {
        const savedPokedex = await newPokedex.save();
        res.status(201).json(savedPokedex)
    } catch (error) {
        res.status(500).json(error)
    }
    })
    
    
    //Update pokedex

    router.put("/:id", verifyTokenAsAnAuthorizedTrainer, async (req, res) => {
      
        try {
          const updatedPokedex = await Pokedex.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedPokedex);
        } catch (error) {
          res.status(500).json(error);
        }
      });
    
    
    //Delete pokedex

    router.delete("/:id", verifyTokenAsAnAuthorizedTrainer, async (req, res) => {
        try {
          await Pokedex.findByIdAndDelete(req.params.id);
          res.status(200).json("Pokedex has been deleted.");
        } catch (error) {
          res.status(500).json(error);
        }
      });
      
    
      //Get pokedex

      router.get("/:trainerId", verifyTokenAsAnAuthorizedTrainer , async (req, res) => {
        try {
          const pokedex = await Pokedex.findOne({trainerId: req.params.trainerId});
          res.status(200).json(pokedex);
        } catch (error) {
          res.status(500).json(error);
        }
      });
      
      //Get pokedexs

      router.get("/", verifyTokenAsAdmin, async (req, res) => {
       try {
           const pokedexs = await Pokedex.find();
           res.status(200).json(pokedexs);
       } catch (error) {
           res.status(500).json(error);
       }
      });
      

module.exports = router 
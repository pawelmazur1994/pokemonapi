const Trainer = require("../models/Trainer");
const router = require("express").Router();
const {verifyTokenAsAnAuthorizedTrainer, verifyTokenAsAdmin} = require("./verifyJwtToken.js");



//Update trainer

router.put("/:id", verifyTokenAsAnAuthorizedTrainer, async (req, res) => {

    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASSWORD_SECRET
      ).toString();
    }

    try {
      const updatedTrainer = await Trainer.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedTrainer);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
 //Delete trainer

router.delete("/:id", verifyTokenAsAnAuthorizedTrainer, async (req, res) => {
    try {
      await Trainer.findByIdAndDelete(req.params.id);
      res.status(200).json("Trainer has been deleted.");
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  //Get trainer

  router.get("/:id", verifyTokenAsAdmin, async (req, res) => {
    try {
      const trainer = await Trainer.findById(req.params.id);
      const { password, ...others } = trainer._doc;
      res.status(200).json(others);
    } catch (error) {
      res.status(500).json(error);
    }
  });


    //Get trainers

  router.get("/", verifyTokenAsAdmin, async (req, res) => {
    try {
      const trainers = await Trainer.find();
      res.status(200).json(trainers);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  


module.exports = router
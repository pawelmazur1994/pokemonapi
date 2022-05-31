const router = require("express").Router();
const Trainer = require("../models/Trainer");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


//New trainer

router.post("/register", async (req, res)=>{
    const newTrainer = new Trainer({
        username:req.body.username,
        password:CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET).toString(),
        email:req.body.email,
        badges:req.body.badges,
        howManyPokemons:req.body.howManyPokemons
    });
    try{
        const savedTrainer =  await newTrainer.save()
        res.status(201).json(savedTrainer) 
    }
    catch(error){
        res.status(500).json(error);
    }
   
});

//Login trainer

router.post("/login", async(req,res)=>{
    try{
        const trainer = await Trainer.findOne(
            {
                username: req.body.username
            }
        );

        if(!trainer){
            res.status(401).json("Wrong username.");
        } 

        const descryptedPassword = CryptoJS.AES.decrypt(
            trainer.password,
            process.env.PASSWORD_SECRET
        );

        const password = descryptedPassword.toString(CryptoJS.enc.Utf8)

        if(password!==req.body.password){
            res.status(401).json("Wrong password.");
        }
        const jwtToken = jwt.sign({
            id:trainer._id,
            isAdmin: trainer.isAdmin,
            
        }, process.env.JWT_SECRET,
        {expiresIn:"30min"}
        );


        const {newPassword, ...others}=trainer._doc;
        res.status(200).json({...others, jwtToken});


    }
   
    catch(error){
        res.status(400).json(error)
    }
})


module.exports = router
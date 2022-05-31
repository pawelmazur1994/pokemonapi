const jwt = require("jsonwebtoken");



const verifyJwtToken = (req,res, next)=>{
    const authorizationHeader = req.headers.token;
  if (authorizationHeader) {
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (error, trainer) => {
      if (error) {
          res.status(403).json("Valid token!");
      }
      req.trainer = trainer;   
      next();
      
    });
   
  } else {
  
   res.status(401).json("Unauthorized trainer.");

  }
}


const verifyTokenAsAnAuthorizedTrainer = (req, res, next) => {
    verifyJwtToken(req, res, next, () => {
      if (req.trainer.id === req.params.id || req.trainer.isAdmin) {
        next();
      } else {
        res.status(403).json("You must be logged in to perform this operation.");
      }
    });
  };


const verifyTokenAsAdmin = (req, res, next) => {
    verifyJwtToken(req, res, () => {
      if (req.trainer.isAdmin) {
        next();
      } else {
        res.status(403).json("You must be an admin to perform this operation!");
      }
    });
  };

  

module.exports={verifyJwtToken, verifyTokenAsAnAuthorizedTrainer, verifyTokenAsAdmin };
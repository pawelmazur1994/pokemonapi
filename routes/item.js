const Item = require("../models/Item");
const router = require("express").Router();
const {verifyTokenAsAdmin} = require("./verifyJwtToken");



 //Create item

router.post("/", verifyTokenAsAdmin,  async (req,res)=>{

const newItem = new Item(req.body)

try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem)
} catch (error) {
    res.status(500).json(error)
}
})


 //Update item

router.put("/:id", verifyTokenAsAdmin, async (req, res) => {
  
    try {
      const updatedItem = await Item.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedItem);
    } catch (error) {
      res.status(500).json(error);
    }
  });


 //Delete item

router.delete("/:id", verifyTokenAsAdmin, async (req, res) => {
    try {
      await Item.findByIdAndDelete(req.params.id);
      res.status(200).json("Item has been deleted.");
    } catch (error) {
      res.status(500).json(error);
    }
  });
  

  //Get item

  router.get("/:id", async (req, res) => {
    try {
      const item = await Item.findById(req.params.id);
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  //Get items
  
  router.get("/", verifyTokenAsAdmin, async (req, res) => {
    try {
      const items = await Item.find();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json(error);
    }
  });


module.exports = router 
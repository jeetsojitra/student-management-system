const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// SAVE MESSAGE
router.post("/", async (req,res)=>{
  try{
    const contact = new Contact(req.body);
    await contact.save();
    res.json({message:"Message saved"});
  }catch(err){
    res.status(500).json({error: err.message});
  }
});

// GET ALL MESSAGES (optional for admin)
router.get("/", async (req,res)=>{
  try{
    const messages = await Contact.find();
    res.json(messages);
  }catch(err){
    res.status(500).json({error: err.message});
  }
});

module.exports = router;
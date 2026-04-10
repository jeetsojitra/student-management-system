const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

const auth = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleMiddleware");

// Only admin can delete
router.delete("/:id", auth, checkRole("admin"), async (req,res)=>{
  await Student.findByIdAndDelete(req.params.id);
  res.json({message:"Deleted"});
});

// CREATE
router.post("/", async (req,res)=>{
  try{
    const student = new Student(req.body);
    await student.save();
    res.json(student);
  }catch(err){
    res.status(500).json({error: err.message});
  }
});

// READ
router.get("/", async (req,res)=>{
  try{
    const students = await Student.find();
    res.json(students);
  }catch(err){
    res.status(500).json({error: err.message});
  }
});

// DELETE
router.delete("/:id", async (req,res)=>{
  try{
    await Student.findByIdAndDelete(req.params.id);
    res.json({message:"Deleted"});
  }catch(err){
    res.status(500).json({error: err.message});
  }
});

module.exports = router;
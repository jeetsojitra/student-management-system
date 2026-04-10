const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // ⚠️ Make sure file name is User.js

// ================= REGISTER =================
router.post("/register", async (req, res) => {

  console.log("REGISTER API HIT");

  try {
    const { name, email, password } = req.body;

    console.log("Request Body:", req.body);

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "user"
    });

    await user.save();

    console.log("USER SAVED");

    res.json({ message: "User registered successfully" });

  } catch (err) {
    console.log("REGISTER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {

  console.log("LOGIN API HIT");

  try {
    const { email, password } = req.body;

    console.log("Login Body:", req.body);

    // Check user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Check SECRET
    console.log("SECRET:", process.env.JWT_SECRET);

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("TOKEN:", token);

    res.json({
      token,
      role: user.role,
      message: "Login successful"
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
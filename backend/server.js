require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

const studentRoutes = require("./routes/studentRoutes");

app.use("/api/students", studentRoutes);

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(()=>console.log("MongoDB Connected"))
  .catch(err=>console.log(err));

// Start server
app.listen(process.env.PORT, ()=>{
  console.log(`Server running on port ${process.env.PORT}`);
});
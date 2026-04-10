import React from "react";
import { Link } from "react-router-dom";

function Navbar() {

  return (

    <nav>

      <h2>Student Management</h2>

      <Link to="/">Home</Link>
      <Link to="/students">Students</Link>
      <Link to="/add-student">Add Student</Link>
      <Link to="/admin">Admin</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/about">About</Link>

    </nav>

  );
}

export default Navbar;
import React, { useState } from "react";

function StudentForm() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !course) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, course })
      });

      const data = await res.json();

      console.log(data); // for debugging

      alert("Student Added Successfully");

      // clear form
      setName("");
      setEmail("");
      setCourse("");

    } catch (error) {
      console.error(error);
      alert("Error adding student");
    }
  };

  return (

    <form onSubmit={handleSubmit}>

      <h2>Add Student</h2>

      <input
        type="text"
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="text"
        placeholder="Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />

      <button type="submit">Add Student</button>

    </form>

  );
}

export default StudentForm;
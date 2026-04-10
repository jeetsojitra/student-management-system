import React from "react";

function About(){

  return(

    <div className="container">

      <h1>About Student Management System</h1>

      <p>
        This project is a web-based application developed using React.
        It helps in managing student records efficiently.
      </p>

      <div className="card">

        <h2>Project Features</h2>

        <ul>
          <li>Add new students</li>
          <li>View student list</li>
          <li>Delete student records</li>
          <li>Responsive design</li>
        </ul>

      </div>

      <div className="card">

        <h2>Purpose</h2>

        <p>
          The main goal of this project is to simplify student data management
          and provide a user-friendly interface for administrators.
        </p>

      </div>

    </div>

  )

}

export default About;
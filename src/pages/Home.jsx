import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Home(){

  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(()=>{
    fetch("http://localhost:8000/api/students",{
      headers:{
        "Authorization": localStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(data => setTotalStudents(data.length))
    .catch(err => console.log(err));
  },[]);

  const logout = ()=>{
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return(

    <div className="container">

      <h1>Student Management System</h1>

      <button onClick={logout}>Logout</button>

      <div className="dashboard">

        <div className="card">
          <h2>Total Students</h2>
          <p>{totalStudents}</p>
        </div>

        <div className="card">
          <h2>Manage Students</h2>
          <Link to="/students">
            <button>View Students</button>
          </Link>
        </div>

        <div className="card">
          <h2>Add New Student</h2>
          <Link to="/add-student">
            <button>Add Student</button>
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Home;
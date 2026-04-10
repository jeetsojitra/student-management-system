import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function AdminDashboard(){

  const [students,setStudents] = useState([])

  useEffect(()=>{

    const data = JSON.parse(localStorage.getItem("students")) || []

    setStudents(data)

  },[])

  return(

    <div className="container">

      <h1>Admin Dashboard</h1>
      <p>Control and manage the student database.</p>


      <div className="admin-actions">

        <Link to="/add-student">
          <button>Add New Student</button>
        </Link>
        <br></br>
        <br></br>
        <Link to="/students">
          <button>View All Students</button>
        </Link>

      </div>
    <br></br>

      <div className="stats">

        <div className="stat-card">
          <h3>Total Students</h3>
          <p>{students.length}</p>
        </div>

        <br></br>

        <div className="stat-card">
          <h3>System Status</h3>
          <p>Active</p>
        </div>

      </div>

      <h2 style={{marginTop:"30px"}}>Recent Students</h2>

      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
          </tr>
        </thead>

        <tbody>

          {students.slice(-3).reverse().map((s)=>(
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.course}</td>
            </tr>
          ))}

        </tbody>

      </table>

      <div style={{marginTop:"40px", textAlign:"center"}}>
        <h3>Admin Information</h3>
        <p>Name: Jeet Sojitra</p>
        <p>Role: System Administrator</p>
      </div>

    </div>
  )
}

export default AdminDashboard
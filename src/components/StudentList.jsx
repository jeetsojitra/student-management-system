import React, { useEffect, useState } from "react";

function StudentList(){

  const [search,setSearch] = useState("");
  const [students,setStudents] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:8000/api/students",{
      headers:{
        "Authorization": localStorage.getItem("token")
      }
    })
      .then(res=>res.json())
      .then(data=>setStudents(data))
      .catch(err=>console.log(err));
  },[]);

  const deleteStudent = async (id)=>{
    if(window.confirm("Delete this student?")){

      await fetch(`http://localhost:8000/api/students/${id}`,{
        method:"DELETE",
        headers:{
          "Authorization": localStorage.getItem("token")
        }
      });

      setStudents(students.filter((s)=> s._id !== id));
    }
  };

  return(

    <div>

      <h2>Student List</h2>

      <input
        type="text"
        placeholder="Search student..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
      />

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students
            .filter((s)=> s.name.toLowerCase().includes(search.toLowerCase()))
            .map((s)=>(
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.course}</td>
                <td>
                  <button onClick={()=>deleteStudent(s._id)}>
                    Delete
                  </button>
                </td>
              </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default StudentList;
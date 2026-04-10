import React, { useState, useEffect } from "react";

function Login(){

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Auto redirect if already logged in
  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token){
      window.location.href = "/";
    }
  },[]);

  const login = async (e)=>{
    e.preventDefault();

    if(!email || !password){
      alert("All fields are required");
      return;
    }

    try{

      const res = await fetch("http://localhost:8000/api/auth/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      console.log("LOGIN RESPONSE:", data);

      if(data.token){
        localStorage.setItem("token", data.token);
        alert("Login Successful");
        window.location.href = "/";
      }else{
        alert(data.message || "Login Failed");
      }

    }catch(err){
      console.log(err);
      alert("Error logging in");
    }
  };

  return(

    <div className="container">

      <h1>Login</h1>

      <form onSubmit={login}>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

      </form>

    </div>
  );
}

export default Login;
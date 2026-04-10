import React, { useState } from "react";

function Contact(){

  const [form,setForm] = useState({
    name:"",
    email:"",
    message:""
  })

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

const handleSubmit = async (e)=>{
  e.preventDefault()

  if(!form.name || !form.email || !form.message){
    alert("All fields are required")
    return
  }

  try{

    const res = await fetch("http://localhost:8000/api/contact",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(form)
    });

    await res.json();

    alert("Message Sent Successfully!")

    setForm({
      name:"",
      email:"",
      message:""
    })

  }catch(err){
    console.log(err);
    alert("Error sending message")
  }
}
  return(

    <div className="container">

      <h1>Contact Us</h1>

      <p>If you have any queries or issues, feel free to contact us.</p>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
        />

        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          rows="4"
          style={{width:"100%", padding:"10px", marginTop:"10px"}}
        ></textarea>

        <button type="submit">Send Message</button>

      </form>

    </div>

  )

}

export default Contact;
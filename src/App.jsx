import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import StudentList from "./components/StudentList";
import StudentForm from "./components/StudentForm";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/AdminDashboard";
import Contact from "./pages/Contact";
import About from "./pages/About.jsx";

function App(){

  const token = localStorage.getItem("token");

  return(
    <Router>
            <Navbar />

      <Routes>

        {/* If NOT logged in → always go to login */}
        {!token ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            {/* If logged in → open app */}
            <Route path="/" element={<Home />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/add-student" element={<StudentForm />} />

            {/* Redirect everything to home */}
            <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
          </>
          
        )}

      </Routes>

    </Router>
  );
}

export default App;
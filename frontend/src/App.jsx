import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterNgo from "./components/RegisterNgo";
import RegisterVolunteer from "./components/RegisterVolunteer";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register/ngo" element={<RegisterNgo />} />
    <Route path="/register/volunteer" element={<RegisterVolunteer />} />
      </Routes>
    </Router>
  );
}

export default App;

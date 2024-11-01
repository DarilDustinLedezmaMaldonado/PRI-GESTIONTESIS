import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeStudent from "./pages/HomeStudent";
import About from "./pages/About";
import List from "./pages/List";
import Observation from "./pages/Observation";
import Testing1 from "./pages/Testing1"; // Mantener Testing1 para este componente
import NewUser from "./pages/NewUser"; // Mantener NewUser
import ViewJur from "./pages/ViewJur"; // Cambiar el nombre aquí para ViewJur
import ViewObser from "./pages/ViewObser"; // Cambiar el nombre aquí para ViewJur
import Home from "./pages/Home";
import Login from "./pages/Login";
import Jude from "./pages/Jude";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/homestudent" element={<HomeStudent />} />
        <Route path="/list" element={<List />} />
        <Route path="/observation" element={<Observation />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/newUser" element={<NewUser />} /> {/* Mantener NewUser */}
        <Route path="/viewJur" element={<ViewJur />} /> {/* Usar ViewJur */}
        <Route path="/observation/:id" element={<ViewObser />} />{" "}
        {/* Ruta con ID para ViewObser */}
        <Route path="/testing1" element={<Testing1 />} />
        <Route path="/home" element={<Home />} />
        <Route path="/jude" element={<Jude />} />
      </Routes>
    </Router>
  );
}

export default App;

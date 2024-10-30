// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeStudent from './pages/HomeStudent';
import About from './pages/About';
import List from './pages/List';
import Observation from './pages/Observation';
import Testing1 from './pages/Testing1';
import Home from './pages/Home';  // Home for creating a new project
import Jude from './pages/Jude';
import Jurado from './pages/Jurado';
import EvalJurados from './pages/evalJurados';
import ProjectDetails from './pages/ProjectDetails';
import ProjectList from './pages/ProjectList'; // New component for project list
import ProjectCreation from './pages/ProjectCreation';  // Importar nueva página

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/homestudent" element={<HomeStudent />} />
        <Route path="/list" element={<List />} />
        <Route path="/observation" element={<Observation />} />
        <Route path="/about" element={<About />} />
        <Route path="/testing1" element={<Testing1 />} />
        <Route path="/home" element={<Home />} />  {/* This is where we create a project */}
        <Route path="/jude" element={<Jude />} />
        <Route path="/jurados" element={<Jurado />} />
        <Route path="/evaluaciones/:id" element={<EvalJurados />} />
        <Route path="/project-details/:id" element={<ProjectDetails />} />
        <Route path="/project-list" element={<ProjectList />} /> {/* Main project listing */}
        <Route path="/project-creation/:id" element={<ProjectCreation />} />  {/* Nueva ruta para editar */}
      </Routes>
    </Router>
  );
}

export default App;

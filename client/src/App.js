// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeStudent from './pages/HomeStudent';
import About from './pages/About';
import List from './pages/List';
import Observation from './pages/Observation';
import Home from './pages/Home';
import Jurado from './pages/Jurado';
import EvalJurados from './pages/evalJurados';
import ProjectDetails from './pages/ProjectDetails';
import ProjectList from './pages/ProjectList';
import ProjectCreation from './pages/ProjectCreation'; 
import NewUser from "./pages/NewUser";
import ViewJur from "./pages/ViewJur";
import Login from "./pages/Login";
import Layout_V2 from './components/Layout_V2';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/layoutv2" element={<Layout_V2 />} />
        <Route path="/homestudent" element={<HomeStudent />} />
        <Route path="/list" element={<List />} />
        <Route path="/observation/:id" element={<Observation />} />
        <Route path="/about" element={<About />} />      
        <Route path="/newUser" element={<NewUser />} />
        <Route path="/viewJur" element={<ViewJur />} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/jurados" element={<Jurado />} />
        <Route path="/evaluaciones/:id" element={<EvalJurados />} />
        <Route path="/project-details/:id" element={<ProjectDetails />} />
        <Route path="/project-list" element={<ProjectList />} />
        <Route path="/project-creation/:id" element={<ProjectCreation />} />  
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}
export default App;

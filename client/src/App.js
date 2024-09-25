// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeStudent from './pages/HomeStudent';
import About from './pages/About';
import List from './pages/List';
import Observation from './pages/Observation';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/homestudent" element={<HomeStudent />} />
        <Route path="/list" element={<List />} />
        <Route path="/observation" element={<Observation />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;

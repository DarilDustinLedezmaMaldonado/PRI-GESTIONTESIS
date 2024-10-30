// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeStudent from './pages/HomeStudent';
import About from './pages/About';
import List from './pages/List';
import Observation from './pages/Observation';
import Testing1 from './pages/Testing1';
import Home from './pages/Home';
import Jude from './pages/Jude';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/homestudent" element={<HomeStudent />} />
        <Route path="/list" element={<List />} />
        <Route path="/observation" element={<Observation />} />
        <Route path="/about" element={<About />} />
        <Route path="/testing1" element={<Testing1 />} />
        <Route path='/home' element={<Home />} />
        <Route path='/jude' element={<Jude />} />

      </Routes>
    </Router>
  );
}

export default App;

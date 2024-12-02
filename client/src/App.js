import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
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
    <Router> {/* Colocamos el Router alrededor de AuthProvider */}
      <AuthProvider> {/* AuthProvider ahora está dentro de Router */}
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<Login />} />

          {/* Rutas Privadas */}
          <Route path="/layoutv2" element={<PrivateRoute><Layout_V2 /></PrivateRoute>} />
          <Route path="/homestudent" element={<PrivateRoute><HomeStudent /></PrivateRoute>} />
          <Route path="/list" element={<PrivateRoute><List /></PrivateRoute>} />
          <Route path="/observation/:id" element={<PrivateRoute><Observation /></PrivateRoute>} />
          <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
          <Route path="/newUser" element={<PrivateRoute><NewUser /></PrivateRoute>} />
          <Route path="/viewJur" element={<PrivateRoute><ViewJur /></PrivateRoute>} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/jurados" element={<PrivateRoute><Jurado /></PrivateRoute>} />
          <Route path="/evaluaciones/:id" element={<PrivateRoute><EvalJurados /></PrivateRoute>} />
          <Route path="/project-details/:id" element={<PrivateRoute><ProjectDetails /></PrivateRoute>} />
          <Route path="/project-list" element={<PrivateRoute><ProjectList /></PrivateRoute>} />
          <Route path="/project-creation/:id" element={<PrivateRoute><ProjectCreation /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

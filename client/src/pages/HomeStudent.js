// src/pages/Home.js
import Layout from '../components/Layout';
import React from 'react';
import './HomeStudent.css';
import { useNavigate } from "react-router-dom";

const HomeStudent = () => {
  const navigate = useNavigate();
  const handleVerDetalleClick = () => {
    navigate('/observation'); 
  };

  return (
    <Layout>
      Barra de Progreso:
      <br />
      <div className="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
        <div className="progress-bar">25%</div>
      </div>
      <br />
      <div className="container_gridstudent">
        <div id="left_zone">
          <h2>• Etapa 1</h2>
          <button type="button" className="btn" onClick={handleVerDetalleClick}>VER DETALLE</button>
          <button type="button" className="btn">TEMA</button>
          <button type="button" className="btn">PERFIL</button>
          <button type="button" className="btn">PRIVADA</button>
          <button type="button" className="btn">PUBLICA</button>
        </div>
        <div id="center_zone">
          {/* Contenido del centro */}
        </div>
        <div id="right_zone">
          <div className="p-6 rounded-lg shadow-md">
            <ul className="list-disc pl-5">
              <li className="text-lg font-bold mb-4">Estado de la revisión:</li>
              <li className="flex items-center mb-2">
                <span className="w-32">Tutor</span>
                <span className="boxy">100%</span>
              </li>
              <li className="flex items-center mb-2">
                <span className="w-32">Dirección de carrera</span>
                <span className="boxy1">50%</span>
              </li>
              <li className="flex items-center mb-2">
                <span className="w-32">DAAP</span>
                <span className="boxy2">0%</span>
              </li>
              <li className="flex items-center mb-2">
                <span className="w-32">Tribunal</span>
                <span className="boxy3">0%</span>
              </li>
              <li className="flex items-center">
                <span className="w-32">Tribunal</span>
                <span className="boxy4">0%</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomeStudent;


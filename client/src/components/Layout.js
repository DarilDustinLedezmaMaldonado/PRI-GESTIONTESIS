import React from 'react';
import './Layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Layout = ({ children }) => {
  return (
    <div className="container_grid">
      <nav>
        <button className="image-button">
          <img src={`${process.env.PUBLIC_URL}/opciones.png`} alt="Imagen Botón" className="img-btn" />
        </button>
        <button className="image-button">
          <img src={`${process.env.PUBLIC_URL}/usuario.png`} alt="Imagen Botón" className="img-btn" />
        </button>
      </nav>
      <div id="sidebar">
        <img src={`${process.env.PUBLIC_URL}/ProjectGAAP.png`} alt="Imagen Logo" className="img_logo" />
        <div className="buttons">
          <div className="top-buttons">
            <a href="#">
              <img src={`${process.env.PUBLIC_URL}/home.png`} alt="Inicio Icon" className="icon" /> Inicio
            </a>
            <a href="#">
              <img src={`${process.env.PUBLIC_URL}/progreso.png`} alt="Revisión Icon" className="icon" /> Revisión
            </a>
            <a href="#">
              <img src={`${process.env.PUBLIC_URL}/revision.png`} alt="Proyectos Icon" className="icon" /> Proyectos
            </a>
          </div>
          <div className="bottom-buttons">
            <a href="#">
              <img src={`${process.env.PUBLIC_URL}/engranaje.png`} alt="Configuración Icon" className="icon" /> Configuración
            </a>
            <a href="#">
              <img src={`${process.env.PUBLIC_URL}/help.png`} alt="Ayuda Icon" className="icon" /> Ayuda
            </a>
          </div>
        </div>
      </div>
      <div id="content1">
        {children}
      </div>
    </div>
  );
};

export default Layout;

import React, { Children } from 'react';
import './Layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Layout = ({ children }) => {
  return (
    <div class="container_grid">
      <nav>
        <button className="image-button">
          <img src="opciones.png" alt="Imagen Botón" className="img-btn" />
        </button>
        <button className="image-button">
          <img src="usuario.png" alt="Imagen Botón" className="img-btn" />
        </button>
      </nav>
      <div id="sidebar">
        <img src="ProjectGAAP.png" alt="Imagen Botón" className="img_logo" />
        <div class="buttons">
          <div className="top-buttons">
            <a href="#">
              <img src="home.png" alt="Inicio Icon" className="icon" /> Inicio
            </a>
            <a href="#">
              <img src="progreso.png" alt="Revisión Icon" className="icon" /> Revisión
            </a>
            <a href="#">
              <img src="revision.png" alt="Proyectos Icon" className="icon" /> Proyectos
            </a>
          </div>
          <div className="bottom-buttons">
            <a href="#">
              <img src="engranaje.png" alt="Configuración Icon" className="icon" /> Configuración
            </a>
            <a href="#">
              <img src="help.png" alt="Ayuda Icon" className="icon" /> Ayuda
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


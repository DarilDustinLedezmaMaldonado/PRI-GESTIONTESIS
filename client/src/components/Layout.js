import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Importamos el contexto de autenticación
import "./Layout.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { role, logout } = useAuth(); // Obtenemos el rol y la función logout del contexto

  const handleLogout = () => {
    logout(); // Usamos el método logout del contexto
    navigate("/"); // Redirigimos al inicio de sesión
  };

  return (
    <div className="layout-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <img
            src={`${process.env.PUBLIC_URL}/ProjectGAAP.png`}
            alt="Logo"
            className="logo-image"
          />
        </div>

        <nav className="nav-links">
          {role === "Estudiante" && (
            <Link to="/homestudent" className="nav-link">
            <img
              src={`${process.env.PUBLIC_URL}/home.png`}
              alt="Inicio"
              className="nav-icon"
            />
            Inicio
          </Link>
          )}
          
          
          {(role === "Jurado" || role === "Tutor" || role === "Daap" || role === "Administrador") && (
            <>
              <Link to="/jurados" className="nav-link">
                <img
                  src={`${process.env.PUBLIC_URL}/renewal.png`}
                  alt="Revisión"
                  className="nav-icon"
                />
                Revisión
              </Link>
              <Link to="/project-list" className="nav-link">
                <img
                  src={`${process.env.PUBLIC_URL}/project.png`}
                  alt="Proyectos"
                  className="nav-icon"
                />
                Proyectos
              </Link>
            </>
          )}
 

          {role === "Administrador" && (
            <Link to="/newUser" className="nav-link">
              <img
                src={`${process.env.PUBLIC_URL}/newUser.png`}
                alt="Añadir Usuario"
                className="nav-icon"
              />
              Añadir Usuarios
            </Link>
          )}
        </nav>

        <div className="settings">
          <button className="settings-link" onClick={handleLogout}>
            <img
              src={`${process.env.PUBLIC_URL}/config.png`}
              alt="Cerrar Sesión"
              className="settings-icon"
            />
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default Layout;

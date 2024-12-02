import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Importamos el contexto
import Layout from "../components/Layout";
import axios from "axios";
import { FaSearch, FaPlus, FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";  // Añadimos iconos
import "./ProjectList.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";



function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const {userName, role, userId } = useAuth(); // Extraemos los datos del contexto
  const [users, setUsers] = useState([]); // Estado para almacenar los usuarios
  const [projectId] = useState(8); // ID del proyecto para la API
  const [projectUsers, setProjectUsers] = useState({}); // Almacena los usuarios por proyecto
  const sortedProjects = projects.sort((a, b) =>
    a.projectTittle.localeCompare(b.projectTittle)
  );
  

  useEffect(() => {
    if (!role) return; // Esperar a que se cargue el rol antes de ejecutar
    const fetchProjects = async () => {
      try{
        let response;
                console.log(role);
                if (role === "Tutor") 
                  {
                    // API específica para tutores
                    response = await axios.get(`https://localhost:7104/api/Projects/GetProjectsByUserID/${userId}`);
                  } else {
                    // API general para otros roles
                    response = await axios.get("https://localhost:7104/api/Projects/GetAllProyects");
                }
                setProjects(response.data); // Actualiza el estado con los datos obtenidos
            } catch (error) {
                alert("Hubo un error al cargar los proyectos");
                console.error(error);
            }
        };
    fetchProjects();
    sortedProjects.forEach((project) => {
      if (!projectUsers[project.id]) {
        fetchUsersByProject(project.id); // Llama la API para cada proyecto
      }
    });
  }, [sortedProjects]);

  const fetchUsersByProject = async (projectId) => {
    try {
      const response = await axios.get(`https://localhost:7104/api/Users/ByProject/${projectId}`);
      setProjectUsers((prev) => ({
        ...prev,
        [projectId]: response.data, // Almacena los usuarios para este proyecto
      }));
    } catch (error) {
      console.error(`Error al cargar usuarios para el proyecto ${projectId}:`, error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/project-creation/${id}`);
  };

  const handleNavigateToDelete = (id) => {
    navigate(`/project-details/${id}`);
  };

  const handleNavigateToObservation = (id) => {
    navigate(`/observation/${id}`);
  };

  // Ordenamos los proyectos por fecha de registro (de más reciente a más antiguo)
  
  const student = users.find((user) => user.userRol === "Estudiante");
  return (
    <Layout>
      <div className="project-list-container">
        <h2 className="page-title">Lista de Proyectos</h2>

        <div className="search-container">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar por nombre del proyecto"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control search-input"
            />
          </div>
          <button className="btn new-project-btn" onClick={() => navigate("/home")}>
            <FaPlus /> Nuevo Proyecto
          </button>
        </div>

        <div className="table-container">
  <table className="table table-danger table-striped">
    <thead>
      <tr>
        <th>Nombre del Proyecto</th>
        <th>Tipo</th>
        <th>Estudiante</th> {/* Nueva columna */}
        <th>Estado</th>
        <th>Fecha de Registro</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {sortedProjects
        .filter((project) =>
          project.projectTittle.toLowerCase().includes(search.toLowerCase())
        )
        .map((project) => {
          const users = projectUsers[project.id] || []; // Usuarios asociados al proyecto
          const student = users.find((user) => user.userRol === "Estudiante"); // Filtra al estudiante

          return (
            <tr key={project.id}>
              <td>{project.projectTittle || "--"}</td>
              <td>
                {project.projectModality === "T"
                  ? "Tesis"
                  : project.projectModality === "P"
                  ? "Proyecto de Grado"
                  : project.projectModality === "D"
                  ? "Trabajo Dirigido"
                  : project.projectModality}
              </td>
              <td>{student ? student.fullName : "No asignado"}</td> {/* Muestra al estudiante */}
              <td>{project.status === 1 ? "Activo" : "Inactivo"}</td>
              <td>{new Date(project.registerDate).toLocaleDateString()}</td>
              <td>
                <button
                  className="action-btn edit-btn"
                  onClick={() => handleEdit(project.id)}
                >
                  <FaEdit />
                </button>
                <button
                  className="action-btn delete-btn"
                  onClick={() => handleNavigateToDelete(project.id)}
                >
                  <FaTrashAlt />
                </button>
                <button
                  className="action-btn view-btn"
                  onClick={() => handleNavigateToObservation(project.id)}
                >
                  <FaEye />
                </button>
              </td>
            </tr>
          );
        })}
    </tbody>
  </table>
</div>

      </div>
    </Layout>
  );
}

export default ProjectList;

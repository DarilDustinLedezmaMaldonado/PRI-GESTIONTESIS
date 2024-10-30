import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import axios from 'axios';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://localhost:7104/api/Projects/GetAllProyects');
        setProjects(response.data);
      } catch (error) {
        alert('Hubo un error al cargar los proyectos');
      }
    };
    fetchProjects();
  }, []);

  const handleEdit = (id) => {
    navigate(`/project-creation/${id}`);
  };

  const handleNavigateToDelete = (id) => {
    navigate(`/project-details/${id}`);
  };

  return (
    <Layout>
      <div className="container mt-5">
        <h2 className="text-center mt-4">Lista de Proyectos</h2>
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-md-6 text-right">
            <button className="btn btn-primary" onClick={() => navigate('/home')}>Nuevo Proyecto</button>
          </div>
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th style={{ display: 'none' }}>ID</th>
              <th>Nombre del Proyecto</th>
              <th>Tipo</th>
              <th>Etapa</th>
              <th>Estado</th>
              <th>Fecha de Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {projects.filter((project) => project.projectTittle.includes(search)).map((project) => (
              <tr key={project.id}>
                <td style={{ display: 'none' }}>{project.id}</td>
                <td>{project.projectTittle || '--'}</td>
                <td>{project.projectModality}</td>
                <td>{project.projectStage || '--'}</td>
                <td>{project.status === 1 ? 'Activo' : 'Inactivo'}</td>
                <td>{new Date(project.registerDate).toLocaleDateString()}</td>
                <td>
                  <button className="btn btn-info" onClick={() => handleEdit(project.id)}>Editar</button>
                  <button
                    className="btn btn-danger ml-2"
                    onClick={() => handleNavigateToDelete(project.id)} // Navega a la página de detalles
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default ProjectList;

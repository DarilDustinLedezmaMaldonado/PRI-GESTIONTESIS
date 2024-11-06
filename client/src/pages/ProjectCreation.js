import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import axios from 'axios';

function ProjectCreation() {
  const { id } = useParams(); // Obtener el ID del proyecto desde la URL
  const navigate = useNavigate();

  // Estados para los campos del formulario
  const [projectName, setProjectName] = useState(''); 
  const [projectObjective, setProjectObjective] = useState(''); 
  const [projectSpecificObj, setProjectSpecificObj] = useState(''); 
  const [projectScope, setProjectScope] = useState(''); 
  const [projectModality, setProjectModality] = useState(''); 
  const [projectQueryDocument, setProjectQueryDocument] = useState(''); 

  // Cargar los datos del proyecto cuando se carga la página
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`https://localhost:7104/api/Projects/GetProyectByID/${id}`);
        const project = response.data;

        // Asignar los datos del proyecto a los estados
        setProjectName(project.projectTittle || '');
        setProjectModality(project.projectModality || ''); // Modalidad
        setProjectObjective(project.projectGeneralObjetive || '');
        setProjectSpecificObj(project.projectSpecificObjectives || '');
        setProjectScope(project.projectScope || '');
        setProjectQueryDocument(project.projectQueryDocument || ''); // Query Document
      } catch (error) {
        alert('Hubo un error al cargar los datos del proyecto');
      }
    };

    fetchProject();
  }, [id]);

  const handleUpdateClick = async () => {
  if (
    !projectName ||
    !projectModality ||
    !projectObjective ||
    !projectSpecificObj ||
    !projectScope ||
    !projectQueryDocument
  ) {
    alert('Por favor, completa todos los campos antes de confirmar.');
    return;
  }

  const projectData = {
    projectModality: projectModality,  // Modalidad del proyecto
    projectTittle: projectName,        // Nombre del proyecto (con doble "t")
    projectGeneralObjetive: projectObjective,  // Objetivo general (con "j" en vez de "c")
    projectSpecificObjectives: projectSpecificObj,  // Objetivos específicos
    projectScope: projectScope,  // Alcance del proyecto
    projectQueryDocument: projectQueryDocument  // Documento de consulta
  };

  try {
    // Ejecutar la solicitud PUT para actualizar el proyecto
    await axios.put(`https://localhost:7104/api/Projects/UpdateProjectByID/${id}`, projectData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    alert('Proyecto actualizado con éxito');
    navigate('/project-list'); // Redirigir a la lista de proyectos después de la actualización
  } catch (error) {
    if (error.response) {
      console.error('Error al actualizar el proyecto:', error.response.data);
      alert(`Error al actualizar el proyecto: ${error.response.data}`);
    } else {
      console.error('Error al actualizar el proyecto:', error.message);
      alert('Hubo un error al actualizar el proyecto');
    }
  }
};



  return (
    <Layout>
      <div className="table-container_2">
        <h2>Editar Proyecto</h2>
        <form>
          <div className="row mb-3">
            <div className="col-md-12">
              <label htmlFor="projectName" className="form-label">Nombre del Proyecto</label>
              <input
                type="text"
                id="projectName"
                className="form-control"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-12">
              <label htmlFor="projectModality" className="form-label">Modalidad del Proyecto</label>
              <input
                type="text"
                id="projectModality"
                className="form-control"
                value={projectModality}
                onChange={(e) => setProjectModality(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="row mb-3">
            <div className="col-md-12">
              <label htmlFor="projectObjective" className="form-label">Objetivo General</label>
              <input
                type="text"
                id="projectObjective"
                className="form-control"
                value={projectObjective}
                onChange={(e) => setProjectObjective(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-12">
              <label htmlFor="projectSpecificObj" className="form-label">Objetivos Específicos</label>
              <input
                type="text"
                id="projectSpecificObj"
                className="form-control"
                value={projectSpecificObj}
                onChange={(e) => setProjectSpecificObj(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-12">
              <label htmlFor="projectScope" className="form-label">Alcance del Proyecto</label>
              <input
                type="text"
                id="projectScope"
                className="form-control"
                value={projectScope}
                onChange={(e) => setProjectScope(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-12">
              <label htmlFor="projectQueryDocument" className="form-label">Documento de Consulta</label>
              <input
                type="text"
                id="projectQueryDocument"
                className="form-control"
                value={projectQueryDocument}
                onChange={(e) => setProjectQueryDocument(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Botón para confirmar el proyecto */}
          <button 
            type="button" 
            className="btn btn-primary" 
            onClick={handleUpdateClick} // Evento que invoca la API al hacer clic
          >
            Confirmar Proyecto
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default ProjectCreation;

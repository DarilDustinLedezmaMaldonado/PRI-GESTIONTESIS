import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import axios from 'axios';

function ProjectCreation() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState('');
  const [projectObjective, setProjectObjective] = useState('');
  const [projectSpecificObj, setProjectSpecificObj] = useState('');
  const [projectScope, setProjectScope] = useState('');
  const [projectModality, setProjectModality] = useState('');
  const [projectQueryDocument, setProjectQueryDocument] = useState('');
  const [isNameUnique, setIsNameUnique] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`https://localhost:7104/api/Projects/GetProyectByID/${id}`);
        const project = response.data;

        setProjectName(project.projectTittle || '');
        setProjectModality(project.projectModality || '');
        setProjectObjective(project.projectGeneralObjetive || '--');
        setProjectSpecificObj(project.projectSpecificObjectives || '--');
        setProjectScope(project.projectScope || '--');
        setProjectQueryDocument(project.projectQueryDocument || '');
      } catch (error) {
        alert('Hubo un error al cargar los datos del proyecto');
      }
    };
    fetchProject();
  }, [id]);

  useEffect(() => {
    const validateForm = () => {
      const isTitleValid = validateTitle(projectName);
      const isObjectiveValid = validateField(projectObjective);
      const isSpecificObjValid = validateField(projectSpecificObj);
      const isScopeValid = validateField(projectScope);
      setIsValid(isTitleValid && isObjectiveValid && isSpecificObjValid && isScopeValid && isNameUnique && projectName);
    };
    validateForm();
  }, [projectName, projectObjective, projectSpecificObj, projectScope, isNameUnique]);

  const validateTitle = (title) => {
    const trimmedTitle = title.trim();
    const regex = /^[A-Z][A-Za-z\s]{29,149}$/; // Requiere mayúscula inicial y de 30 a 150 caracteres
    return regex.test(trimmedTitle);
  };

  const validateField = (field) => {
    const trimmedField = field.trim();
    const regex = /^[A-Z][A-Za-z\s]{19,149}$/; // Requiere mayúscula inicial y de 20 a 150 caracteres
    return regex.test(trimmedField);
  };

  const handleNameChange = async (e) => {
    const name = e.target.value.trimStart();
    setProjectName(name);

    if (name) {
      try {
        const response = await axios.get('https://localhost:7104/api/Projects/GetAllProyects');
        const isUnique = !response.data.some(
          (project) => project.projectTittle.replace(/\s+/g, '').toLowerCase() === name.replace(/\s+/g, '').toLowerCase()
        );
        setIsNameUnique(isUnique);
      } catch (error) {
        console.error("Error al verificar el nombre del proyecto", error);
      }
    } else {
      setIsNameUnique(true);
    }
  };

  const handleObjectiveChange = (e) => {
    const input = e.target.value;
    setProjectObjective(input);
  };

  const handleSpecificObjChange = (e) => {
    const input = e.target.value;
    setProjectSpecificObj(input);
  };

  const handleScopeChange = (e) => {
    const input = e.target.value;
    setProjectScope(input);
  };

  const handleUpdateClick = async () => {
    if (!isValid) return;

    const projectData = {
      projectModality: projectModality,
      projectTittle: projectName,
      projectGeneralObjetive: projectObjective.trim(),
      projectSpecificObjectives: projectSpecificObj.trim(),
      projectScope: projectScope.trim(),
      projectQueryDocument: projectQueryDocument
    };

    try {
      await axios.put(`https://localhost:7104/api/Projects/UpdateProjectByID/${id}`, projectData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Proyecto actualizado con éxito');
      navigate('/project-list');
    } catch (error) {
      console.error('Error al actualizar el proyecto:', error.response?.data || error.message);
      alert(`Error al actualizar el proyecto: ${error.response?.data?.message || error.message}`);
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
                onChange={handleNameChange}
                required
              />
              {!isNameUnique && <small className="text-danger">El nombre del proyecto ya existe.</small>}
              {!validateTitle(projectName) && (
                <small className="text-danger">Debe tener entre 30 y 150 caracteres sin números y comenzar con letra mayúscula.</small>
              )}
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
                readOnly
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
                onChange={handleObjectiveChange}
                required
              />
              {!validateField(projectObjective) && (
                <small className="text-danger">Debe tener entre 20 y 150 caracteres sin números y comenzar con letra mayúscula.</small>
              )}
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
                onChange={handleSpecificObjChange}
                required
              />
              {!validateField(projectSpecificObj) && (
                <small className="text-danger">Debe tener entre 20 y 150 caracteres sin números y comenzar con letra mayúscula.</small>
              )}
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
                onChange={handleScopeChange}
                required
              />
              {!validateField(projectScope) && (
                <small className="text-danger">Debe tener entre 20 y 150 caracteres sin números y comenzar con letra mayúscula.</small>
              )}
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

          <button 
            type="button" 
            className="btn btn-primary" 
            onClick={handleUpdateClick}
            disabled={!isValid}
          >
            Confirmar Proyecto
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default ProjectCreation;

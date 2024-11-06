// src/pages/Home.js
import Layout from '../components/Layout';
import React, { useState, useEffect } from 'react';
import './Observation.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Observation = () => {
  const { id } = useParams(); // Obtener el ID del proyecto desde la URL
  const navigate = useNavigate(); // Hook para la navegación
  const [project, setProject] = useState(null); // Guardar los detalles del proyecto
  const [stages, setStages] = useState([]); // Guardar todos los stages
  const [substages, setSubstages] = useState([]); // Guardar los substages obtenidos
  const [observations, setObservations] = useState([]); // Guardar las observaciones obtenidas
  const [projectId, setProjectId] = useState(id || ''); // ID del proyecto seleccionado, por defecto será el ID de la URL
  const [stageId, setStageId] = useState(''); // ID de la etapa seleccionada
  const [stageNumber, setStageNumber] = useState(''); // Número del stage seleccionado
  const [substageId, setSubstageId] = useState(''); // ID del substage seleccionado

  useEffect(() => {
    const fetchProject = async () => {
      if (id) {
        try {
          const projectResponse = await axios.get(`https://localhost:7104/api/Projects/GetProyectByID/${id}`);
          setProject(projectResponse.data); // Guardar los detalles del proyecto

          // Luego de obtener el proyecto, cargar las etapas
          const stagesResponse = await axios.get(`https://localhost:7104/api/Projects/GetStageByProjectID/${id}`);
          setStages(stagesResponse.data); // Guardar las etapas obtenidas
        } catch (error) {
          console.error('Error al obtener el proyecto o las etapas:', error);
        }
      }
    };

    fetchProject();
  }, [id]);

  // Cargar los substages cuando se selecciona una etapa
  const handleStageChange = async (event) => {
    const selectedStageId = event.target.value;
    setStageId(selectedStageId); // Guardar el idStage
    setStageNumber(event.target.value); // Mostrar la etapa seleccionada
    setSubstageId(''); // Resetear el substageId al cambiar de etapa

    try {
      const response = await axios.get(`https://localhost:7104/api/Projects/GetSubstageOfStageID/${selectedStageId}`);
      setSubstages(response.data); // Guardar los substages obtenidos
    } catch (error) {
      console.error('Error al obtener las subetapas:', error);
    }
  };

  // Cargar las observaciones cuando se selecciona una subetapa
  useEffect(() => {
    const fetchObservations = async () => {
      if (projectId && stageId && substageId) {
        try {
          const response = await axios.get(`https://localhost:7104/api/Observations/project/PR002/stage/1/substage/2`);
          setObservations(response.data); // Guardar las observaciones obtenidas
        } catch (error) {
          console.error('Error al obtener las observaciones:', error);
        }
      }
    };

    fetchObservations();
  }, [projectId, stageId, substageId]);

  return (
    <Layout>
      {/* Select para elegir Etapa (Stage) */}
      <div className={`row mb-3 ${projectId ? '' : 'disabled-opacity'}`}>
        <div className="col-md-12">
          <label htmlFor="stageNumber" className="form-label">Etapa</label>
          <select
            className="form-control"
            value={stageNumber}
            onChange={handleStageChange}
            required
            disabled={!projectId}
          >
            <option value="" disabled hidden>Selecciona una Etapa</option>
            {stages.map((stage) => (
              <option key={stage.id} value={stage.id}>
                {stage.stageNumber}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Select para los Substages */}
      <div className={`row mb-3 ${stageId ? '' : 'disabled-opacity'}`}>
        <div className="col-md-12">
          <label htmlFor="substageNumber" className="form-label">Subetapa</label>
          <select
            className="form-control"
            value={substageId}
            onChange={(e) => setSubstageId(e.target.value)}
            required
            disabled={!stageId}
          >
            <option value="" disabled hidden>Selecciona una Subetapa</option>
            {substages.map((substage) => (
              <option key={substage.id} value={substage.id}>
                {substage.substageNumber}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mostrar Observaciones */}
      <div className="observation-section">
        {observations.map((observation) => (
          <div key={observation.id} className="card bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mb-4">
            <h1 className="text-xl font-bold mb-4">Observación</h1>
            <div className="sup_obs">
              <span className="status">Estado: {observation.status}</span>
              <span>Tipo: {observation.type}</span>
            </div>
            <p className="mb-4"><strong>Comentario:</strong> {observation.comentary}</p>
            <p className="mb-4"><strong>Fecha de Registro:</strong> {new Date(observation.registerDate).toLocaleString()}</p>
            <button className="btn rounded" onClick={() => navigate(-1)}>Retroceder</button>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Observation;

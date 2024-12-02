import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import axios from "axios";
import "./Observation.css";

const predefinedStages = [
  {
    id: 1,
    stageNumber: "Etapa 1",
    substages: [
      { id: 1, substageNumber: "Subetapa 1" },
      { id: 2, substageNumber: "Subetapa 2" },
      { id: 3, substageNumber: "Subetapa 3" },
      { id: 4, substageNumber: "Subetapa 4" },
    ],
  },
  {
    id: 2,
    stageNumber: "Etapa 2",
    substages: [
      { id: 1, substageNumber: "Subetapa 1" },
      { id: 2, substageNumber: "Subetapa 2" },
      { id: 3, substageNumber: "Subetapa 3" },
      { id: 4, substageNumber: "Subetapa 4" },
      { id: 5, substageNumber: "Subetapa 5" },
      { id: 6, substageNumber: "Subetapa 6" },
    ],
  },
  {
    id: 3,
    stageNumber: "Etapa 3",
    substages: [
      { id: 1, substageNumber: "Subetapa 1" },
      { id: 2, substageNumber: "Subetapa 2" },
      { id: 3, substageNumber: "Subetapa 3" },
      { id: 4, substageNumber: "Subetapa 4" },
      { id: 5, substageNumber: "Subetapa 5" },
      { id: 6, substageNumber: "Subetapa 6" },
    ],
  },
  {
    id: 4,
    stageNumber: "Etapa 4",
    substages: [
      { id: 1, substageNumber: "Subetapa 1" },
      { id: 2, substageNumber: "Subetapa 2" },
      { id: 3, substageNumber: "Subetapa 3" },
      { id: 4, substageNumber: "Subetapa 4" },
      { id: 5, substageNumber: "Subetapa 5" },
      { id: 6, substageNumber: "Subetapa 6" },
    ],
  },
];

const Observation = () => {
  const { id } = useParams(); // Obtener el ID del proyecto desde la URL
  const navigate = useNavigate(); // Hook para la navegación
  const [project, setProject] = useState(null); // Guardar los detalles del proyecto
  const [stageId, setStageId] = useState(""); // ID de la etapa seleccionada
  const [substages, setSubstages] = useState([]); // Guardar las subetapas obtenidas
  const [substageId, setSubstageId] = useState(""); // ID del substage seleccionado
  const [observations, setObservations] = useState([]); // Observaciones

  useEffect(() => {
    // Simula la obtención del proyecto
    setProject({ id, name: `Proyecto ${id}` });
  }, [id]);

  // Manejar el cambio de etapa
  const handleStageChange = (event) => {
    const selectedStageId = parseInt(event.target.value, 10);
    setStageId(selectedStageId);

    // Filtrar subetapas de la etapa seleccionada
    const stage = predefinedStages.find((stage) => stage.id === selectedStageId);
    if (stage) {
      setSubstages(stage.substages);
    } else {
      setSubstages([]);
    }

    // Resetear subetapa seleccionada
    setSubstageId("");
  };

  // Manejar el cambio de subetapa
  const handleSubstageChange = (event) => {
    const selectedSubstageId = parseInt(event.target.value, 10);
    setSubstageId(selectedSubstageId);
  };

  // Buscar observaciones al hacer clic en el botón
  const handleFetchObservations = async () => {
    console.log(id, stageId, substageId)
    if (id && stageId && substageId) {
      try {
        const response = await axios.get(
          `https://localhost:7104/api/Observations/project/${id}/stage/${stageId}/substage/${substageId}`
        );
        setObservations(response.data);
      } catch (error) {
        console.error("Error al obtener las observaciones:", error);
      }
    } else {
      alert("Por favor, selecciona una etapa y una subetapa.");
    }
  };

  return (
    <Layout>
      <h1>Observaciones del Proyecto</h1>

      {/* Select para elegir Etapa (Stage) */}
      <div className="row mb-3">
        <div className="col-md-12">
          <label htmlFor="stageNumber" className="form-label">
            Etapa
          </label>
          <select
            className="form-control"
            value={stageId}
            onChange={handleStageChange}
            required
          >
            <option value="" disabled hidden>
              Selecciona una Etapa
            </option>
            {predefinedStages.map((stage) => (
              <option key={stage.id} value={stage.id}>
                {stage.stageNumber}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Select para los Substages */}
      <div className="row mb-3">
        <div className="col-md-12">
          <label htmlFor="substageNumber" className="form-label">
            Subetapa
          </label>
          <select
            className="form-control"
            value={substageId}
            onChange={handleSubstageChange}
            required
            disabled={!stageId}
          >
            <option value="" disabled hidden>
              Selecciona una Subetapa
            </option>
            {substages.map((substage) => (
              <option key={substage.id} value={substage.id}>
                {substage.substageNumber}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Botón para buscar observaciones */}
      <div className="row mb-3">
        <div className="col-md-12">
          <button
            className="btn btn-primary w-100"
            onClick={handleFetchObservations}
            disabled={!stageId || !substageId}
          >
            Buscar Observaciones
          </button>
        </div>
      </div>

      {/* Mostrar Observaciones */}
      <div className="observation-section">
        {observations.length > 0 ? (
          observations.map((observation) => (
            <div
              key={observation.id}
              className="card bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mb-4"
            >
              <h1 className="text-xl font-bold mb-4">Observación</h1>
              <div className="sup_obs">
                <span className="status">Estado: {observation.status}</span>
                <span>Tipo: {observation.type}</span>
              </div>
              <p className="mb-4">
                <strong>Comentario:</strong> {observation.comentary}
              </p>
              <p className="mb-4">
                <strong>Fecha de Registro:</strong>{" "}
                {new Date(observation.registerDate).toLocaleString()}
              </p>
              <button
                className="btn rounded"
                onClick={() => navigate(-1)}
              >
                Retroceder
              </button>
            </div>
          ))
        ) : (
          <p>No hay observaciones. Selecciona una etapa y subetapa para buscarlas.</p>
        )}
      </div>
    </Layout>
  );
};

export default Observation;

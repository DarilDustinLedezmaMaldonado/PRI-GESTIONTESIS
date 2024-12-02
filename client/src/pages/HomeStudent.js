import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaSearch, FaPlus, FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import "./HomeStudent.css";

const HomeStudent = () => {
  const navigate = useNavigate();
  const { userName, role, userId } = useAuth();
  const [projects, setProjects] = useState([]);
  const [stages, setStages] = useState([]); // Etapas con subetapas
  const [expandedStage, setExpandedStage] = useState(null); // Manejar etapas expandidas
  const [showModal, setShowModal] = useState(false); // Controlar visibilidad del modal
  const [modalData, setModalData] = useState(null); // Datos de observaciones que se mostrarán en el modal

  const getTypeText = (type) => {
    switch (type) {
      case "T":
        return "Tesis";
      case "P":
        return "Proyecto";
      case "D":
        return "Dasis";
      default:
        return "Desconocido";
    }
  };
  const getStageText = (type) => {
    switch (type) {
      case 1:
        return "Tema";
      case 2:
        return "Perfil y Desarrollo";
      case 3:
        return "Rev Defensa Publica";
      case 4:
        return "Rev Defensa Privada";
    }
  };

  // Fetch projects from the API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7104/api/Projects/GetProjectsByUserID/${userId}`
        );
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [userId]);

  // Fetch stages and substages for a specific project
  const fetchStagesAndSubstages = async (projectId) => {
    try {
      const stagesResponse = await axios.get(
        `https://localhost:7104/api/Projects/GetStageByProjectID/${projectId}`
      );
      const stagesData = stagesResponse.data;

      const stagesWithSubstages = await Promise.all(
        stagesData.map(async (stage) => {
          const substagesResponse = await axios.get(
            `https://localhost:7104/api/Projects/GetSubstageOfStageID/${stage.id}`
          );
          const substagesData = substagesResponse.data;

          const allSubstagesCompleted = substagesData.every(
            (substage) => substage.status === 1
          );

          return {
            ...stage,
            substages: substagesData,
            isCompleted: allSubstagesCompleted,
          };
        })
      );

      setStages(stagesWithSubstages);
    } catch (error) {
      console.error("Error fetching stages and substages:", error);
    }
  };

  // Update the status of a substage
  const updateSubstageStatus = async (substageId, newStatus) => {
    try {
      await axios.put(
        `https://localhost:7104/api/Projects/UpdateSubstageStatus/${substageId}`,
        { status: newStatus }
      );

      // Refresh stages and substages after update
      const currentProjectId = projects[0]?.id; // Assume the first project is selected
      if (currentProjectId) {
        await fetchStagesAndSubstages(currentProjectId);
      }
    } catch (error) {
      console.error("Error updating substage status:", error);
    }
  };

  // Load stages when the first project is selected
  useEffect(() => {
    if (projects.length > 0) {
      fetchStagesAndSubstages(projects[0].id);
    }
  }, [projects]);

  const handleFetchObservations = async (projectId, stageId, substageId) => {
    try {
      const response = await axios.get(
        `https://localhost:7104/api/Observations/project/${projectId}/stage/${stageId}/substage/${substageId}`
      );
      setModalData(response.data); // Guardar los datos obtenidos en el estado del modal
      setShowModal(true); // Mostrar el modal
    } catch (error) {
      console.error("Error fetching observations:", error);
      setModalData({ error: "No se pudieron obtener las observaciones." });
      setShowModal(true); // Mostrar el modal con el error
    }
  };

  // Manejar el cierre del modal
  const closeModal = () => {
    setShowModal(false);
    setModalData(null);
  };
  return (
    <Layout>
      <div className="home-student-container project-card">
        {/* Header Section */}
        <header className="header">
          <h1>Bienvenido, {userName}!</h1>
        </header>
        {/* Projects Section */}
        <section className="projects-section">
          <h2>Proyecto</h2>
          {projects.length > 0 ? (
            <div className="projects-grid">
              {/* Mostrar solo el primer proyecto */}
              <div key={projects[0].id} className="project-card">
                <h3>{projects[0].projectTittle}</h3>
                <p>
                  <strong>Modalidad:</strong>{" "}
                  {getTypeText(projects[0].projectModality)}
                </p>
                <p>
                  <strong>Objetivo General:</strong>{" "}
                  {projects[0].projectGeneralObjetive}
                </p>
                <p>
                  <strong>Objetivos Específicos:</strong>{" "}
                  {projects[0].projectSpecificObjectives}
                </p>
                <p>
                  <strong>Alcance:</strong> {projects[0].projectScope}
                </p>
                <p>
                  <strong>Documento de Consulta:</strong>{" "}
                  {projects[0].projectQueryDocument}
                </p>
                <p>
                  <strong>Estado:</strong>{" "}
                  {projects[0].status === 1 ? "Activo" : "Inactivo"}
                </p>
                <p>
                  <strong>Fecha de Registro:</strong>{" "}
                  {new Date(projects[0].registerDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Última Actualización:</strong>{" "}
                  {new Date(projects[0].updateDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ) : (
            <p>No projects found.</p>
          )}
        </section>

        {/* Stages Section */}
        <section className="projects-section">
          <h2>Etapas del Proyecto</h2>
          {stages.length > 0 ? (
            stages.map((stage) => (
              <div key={stage.id} className="stage-card">
                <div
                  className={`${
                    stage.substages.every((substage) => substage.status === 1)
                      ? "stage-header project-card-green"
                      : "stage-header project-card-red"
                  }`}
                  onClick={() => setExpandedStage(stage)}
                >
                  <h3>Etapa: {getStageText(stage.stageNumber)}</h3>
                  <span className="toggle-icon">Ver Subetapas</span>
                </div>
              </div>
            ))
          ) : (
            <p>No se encontraron etapas para este proyecto.</p>
          )}

          {/* Modal para Subetapas */}
          {expandedStage && (
            <div
              className="modal-overlay"
              onClick={() => setExpandedStage(null)}
            >
              <div
                className="modal-content-subs"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="horizontal-scroll">
                  {expandedStage.substages.map((substage) => (
                    <div key={substage.id} className="substage">
                      <p>
                        <strong>Subetapa {substage.substageNumber}:</strong>
                      </p>
                      <p
                        className={`status-label ${
                          substage.status === 1 ? "status-green" : "status-red"
                        }`}
                      >
                        {substage.status === 1 ? "Completada" : "Pendiente"}
                      </p>
                      <button
                        className="action-btn view-btn"
                        onClick={() =>
                          handleFetchObservations(
                            projects[0]?.id,
                            expandedStage.stageNumber,
                            substage.substageNumber
                          )
                        }
                      >
                        Ver Observación <FaEye />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  className="btn-close1"
                  onClick={() => setExpandedStage(null)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </section>
        {/* Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div
              className="modal-content observation-section"
              onClick={(e) => e.stopPropagation()}
            >
              {modalData.length > 0 ? (
                modalData.map((observation) => (
                  <div
                    key={observation.id}
                    className="card bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mb-4"
                  >
                    <h1 className="text-xl font-bold mb-4">Observación</h1>
                    <div className="sup_obs">
                      <span>Tipo: {getTypeText(observation.type)}</span>
                    </div>
                    <p className="mb-4">
                      <strong>Comentario:</strong> {observation.comentary}
                    </p>
                    <p className="mb-4">
                      <strong>Fecha de Registro:</strong>{" "}
                      {new Date(observation.registerDate).toLocaleString()}
                    </p>
                  </div>
                ))
              ) : (
                <p>
                  No hay observaciones. Selecciona una etapa y subetapa para
                  buscarlas.
                </p>
              )}
              <button className="btn-close1" onClick={closeModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HomeStudent;

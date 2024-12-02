import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Jurado() {
  const [search, setSearch] = useState('');
  const [estado, setEstado] = useState('');
  const [tipo, setTipo] = useState('');
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Controla la visibilidad del modal
  const [selectedStage, setSelectedStage] = useState(''); // Etapa seleccionada
  const [selectedSubstage, setSelectedSubstage] = useState(''); // Subetapa seleccionada
  const [stages, setStages] = useState([]); // Lista de etapas
  const [substages, setSubstages] = useState([]); // Lista de subetapas
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://localhost:7104/api/Projects/GetAllProyects');
        setProjects(response.data);
        setFilteredProjects(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Obtener las etapas de un proyecto
  const fetchStages = async (projectId) => {
    try {
      const response = await axios.get(`https://localhost:7104/api/Projects/GetStageByProjectID/${projectId}`);
      setStages(response.data);
      setSubstages([]); // Limpiar las subetapas al cambiar la etapa
    } catch (err) {
      console.error("Error al cargar etapas:", err);
    }
  };

  // Obtener las subetapas de una etapa
  const fetchSubstages = async (stageId) => {
    try {
      const response = await axios.get(`https://localhost:7104/api/Projects/GetSubstageOfStageID/${stageId}`);
      setSubstages(response.data);
    } catch (err) {
      console.error("Error al cargar subetapas:", err);
    }
  };

  // Cambiar el estado de la subetapa
  const acceptSubstageStatus = async () => {
    try {
      const response = await axios.put(`https://localhost:7104/api/Projects/AcceptSubstage/${selectedStage}/${selectedSubstage}`);
      alert("Estado actualizado con éxito");
      setShowModal(false); // Cerrar el modal
    } catch (err) {
      console.error("Error al cambiar el estado de la subetapa:", err);
    }
  };
  const declineSubstageStatus = async () => {
    try {
      const response = await axios.put(`https://localhost:7104/api/Projects/DeclineSubstage/${selectedStage}/${selectedSubstage}`);
      alert("Estado actualizado con éxito");
      setShowModal(false); // Cerrar el modal
    } catch (err) {
      console.error("Error al cambiar el estado de la subetapa:", err);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Layout>
      <div>
        <h2 className="text-center mt-4">Lista de Revisión/Proyectos</h2>
        {/* Tabla de Proyectos */}
        <div className="table-container_">
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>Título</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Fecha de Registro</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => (
                <tr key={project.id}>
                  <td>{project.projectTittle || '--'}</td>
                  <td>
                    {project.projectModality === "T"
                      ? "Tesis"
                      : project.projectModality === "P"
                        ? "Proyecto de Grado"
                        : project.projectModality === "D"
                          ? "Trabajo Dirigido"
                          : project.projectModality}
                  </td>
                  <td>{project.status === 1 ? 'Activo' : 'Inactivo'}</td>
                  <td>
                    {new Date(project.registerDate).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => navigate(`/evaluaciones/${project.id}`)}
                    >
                      Evaluar
                    </button>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Cambiar Estado de Subetapa</h2>
              <div className="form-group">
                <label htmlFor="stage-select">Etapa:</label>
                <select
                  id="stage-select"
                  className="form-control"
                  value={selectedStage}
                  onChange={(e) => {
                    setSelectedStage(e.target.value);
                    fetchSubstages(e.target.value); // Cargar subetapas al seleccionar una etapa
                  }}
                >
                  <option value="">Seleccionar Etapa</option>
                  {stages.map((stage) => (
                    <option key={stage.id} value={stage.id}>
                      Etapa {stage.stageNumber}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="substage-select">Subetapa:</label>
                <select
                  id="substage-select"
                  className="form-control"
                  value={selectedSubstage}
                  onChange={(e) => setSelectedSubstage(e.target.value)}
                >
                  <option value="">Seleccionar Subetapa</option>
                  {substages.map((substage) => (
                    <option key={substage.id} value={substage.id}>
                      Subetapa {substage.substageNumber}
                    </option>
                  ))}
                </select>
              </div>
              <button className="btn btn-primary" onClick={acceptSubstageStatus}>
                Aprobar
              </button>
              <button className="btn btn-primary" onClick={declineSubstageStatus}>
                Rechazar
              </button>
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Jurado;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import axios from "axios";
import ReactModal from "react-modal"; // Modal importado
import { FaTrashAlt, FaArrowLeft } from "react-icons/fa"; // Iconos añadidos
import "./ProjectDetails.css";

ReactModal.setAppElement("#root"); // Necesario para accesibilidad del modal

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7104/api/Projects/GetProyectByID/${id}`
        );
        setProject(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.request({
        url: `https://localhost:7104/api/Projects/DeleteProjectByID/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsModalOpen(false); // Cierra el modal tras eliminar
      alert("Proyecto eliminado con éxito");
      navigate("/project-list"); // Redirige a la lista de proyectos después de eliminar
    } catch (error) {
      alert(
        `Error al eliminar el proyecto: ${
          error.response ? error.response.data : error.message
        }`
      );
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!project) return <div>No se encontró el proyecto</div>;

  return (
    <Layout>
      <div className="project-details-container">
        <h2 className="project-title text-center">Detalles del Proyecto</h2>
        <div className="project-details">
          <div className="project-info">
          
            <p><strong>Título:</strong> {project.projectTittle}</p>
            <p><strong>Modalidad:</strong> {project.projectModality}</p>
            <p><strong>Objetivo General:</strong> {project.projectGeneralObjetive}</p>
            <p><strong>Objetivos Específicos:</strong> {project.projectSpecificObjectives}</p>
            <p><strong>Alcance:</strong> {project.projectScope}</p>
            <p><strong>Documento de Consulta:</strong> {project.projectQueryDocument}</p>
            <p><strong>Estado:</strong> {project.status === 1 ? "Activo" : "Inactivo"}</p>
            <p><strong>Fecha de Registro:</strong> {new Date(project.registerDate).toLocaleDateString()}</p>
            <p><strong>Última Actualización:</strong> {new Date(project.updateDate).toLocaleDateString()}</p>
          </div>

          <div className="actions text-center">
            <button
              className="btn btn-danger"
              onClick={() => setIsModalOpen(true)} // Abre el modal
            >
              <FaTrashAlt /> Confirmar Eliminación
            </button>
            <button
              className="btn btn-secondary ml-3"
              onClick={() => navigate("/project-list")}
            >
              <FaArrowLeft /> Cancelar
            </button>
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)} // Cierra el modal
        contentLabel="Confirmar eliminación"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h3>¿Estás seguro de que deseas eliminar este proyecto?</h3>
        <p>Esta acción no se puede deshacer.</p>
        <div className="modal-actions">
          <button className="btn btn-danger" onClick={handleDelete}>
            Eliminar
          </button>
          <button
            className="btn btn-secondary ml-3"
            onClick={() => setIsModalOpen(false)}
          >
            Cancelar
          </button>
        </div>
      </ReactModal>
    </Layout>
  );
}

export default ProjectDetails;

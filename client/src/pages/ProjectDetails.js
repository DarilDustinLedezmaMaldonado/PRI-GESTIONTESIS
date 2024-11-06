import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout'; // Asegúrate de importar Layout correctamente
import axios from 'axios';
import './ProjectDetails.css';

function ProjectDetails() {
  const { id } = useParams(); // Obtener el ID del proyecto desde la URL
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`https://localhost:7104/api/Projects/GetProyectByID/${id}`);
        setProject(response.data); // Guardar los detalles del proyecto en el estado
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleDelete = async () => {
    console.log("ID que se va a eliminar:", id); // Confirmar el valor del ID
    try {
        await axios.request({
            url: `https://localhost:7104/api/Projects/DeleteProjectByID/${id}`,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        alert('Proyecto eliminado con éxito');
        navigate('/project-list'); // Redirige a la lista de proyectos después de eliminar
    } catch (error) {
        console.error('Error al eliminar el proyecto:', error);
        alert(`Error al eliminar el proyecto: ${error.response ? error.response.data : error.message}`);
    }
};

  

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!project) return <div>No se encontró el proyecto</div>;

  return (
    <Layout> 
      <div className='table-container_2'>
        <h2 className="text-center mt-4">Detalles del Proyecto</h2>
        <div className="project-details">
          <p><strong>Proyecto:</strong> {project.id}</p>
          <p><strong>Título:</strong> {project.projectTittle}</p>
          <p><strong>Modalidad:</strong> {project.projectModality}</p>
          <p><strong>Objetivo General:</strong> {project.projectGeneralObjetive}</p>
          <p><strong>Objetivos Específicos:</strong> {project.projectSpecificObjectives}</p>
          <p><strong>Alcance:</strong> {project.projectScope}</p>
          <p><strong>Documento de Consulta:</strong> {project.projectQueryDocument}</p>
          <p><strong>Estado:</strong> {project.status === 1 ? 'Activo' : 'Inactivo'}</p>
          <p><strong>Fecha de Registro:</strong> {project.registerDate}</p>
          <p><strong>Última Actualización:</strong> {project.updateDate}</p>
        </div>

        <div className="text-center mt-4">
          <button className="btn btn-danger" onClick={handleDelete}>
            Confirmar Eliminación
          </button>
          <button className="btn btn-secondary ml-3" onClick={() => navigate('/project-list')}>
            Cancelar
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default ProjectDetails;

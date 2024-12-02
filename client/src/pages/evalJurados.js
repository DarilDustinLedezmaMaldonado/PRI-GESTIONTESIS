import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Para recibir el id del proyecto desde la URL y navegar

const EvalJurados = () => {
  const { id } = useParams(); // Obtener el ID del proyecto desde la URL
  const navigate = useNavigate(); // Hook para la navegación
  const [project, setProject] = useState(null); // Guardar los detalles del proyecto
  const [stages, setStages] = useState([]); // Guardar todos los stages
  const [substages, setSubstages] = useState([]); // Guardar los substages obtenidos
  const [projectId, setProjectId] = useState(id || ''); // ID del proyecto seleccionado, por defecto será el ID de la URL
  const [stageId, setStageId] = useState(''); // ID de la etapa seleccionada
  const [stageNumber, setStageNumber] = useState(''); // Número del stage seleccionado
  const [substageId, setSubstageId] = useState(''); // ID del substage seleccionado
  const [commentary, setCommentary] = useState('');
  const [type, setType] = useState('T');
  const [selectedFile, setSelectedFile] = useState(null); // Para el PDF

  // Cargar el proyecto y los stages al montar el componente usando el id recibido desde la URL
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

  // Manejador para cargar el archivo PDF
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(URL.createObjectURL(file)); // Convertir el archivo seleccionado a una URL
  };

  // Manejador del submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newObservation = {
      idSubstage: Number(substageId),
      commentary,
      type,
      status: 1,
    };

    try {
      const response = await axios.post(
        'https://localhost:7104/api/Observations/InsertarObservation',
        newObservation,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      alert('Observación insertada con éxito');
      navigate('/jurados'); // Redirigir a la página "Jurado" después del éxito
    } catch (error) {
      console.error('Error al insertar la observación:', error);
      alert('Error al insertar la observación');
    }
  };

  return (
    <Layout>
      <div className="table-container_2">
        <h2>Insertar Observación</h2>

        {/* Visualizador de PDF */}
        <div className="row mb-3">
          <div className="col-md-12">
            <label htmlFor="formFile" className="form-label">Subir Documento de Tesis</label>
            <input type="file" className="form-control" onChange={handleFileChange} />
          </div>
        </div>

        {selectedFile && (
          <div className="document-viewer mb-3">
            <object data={selectedFile} type="application/pdf" width="100%" height="500px">
              <p>Vista previa no disponible</p>
            </object>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Mostrar el título del proyecto si está disponible */}
          <div className="row mb-3">
            <div className="col-md-12">
              <label htmlFor="projectTitle" className="form-label">Título del Proyecto</label>
              <input
                type="text"
                className="form-control"
                value={project ? project.projectTittle : ''}
                readOnly
              />
            </div>
          </div>

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

          {/* Campos adicionales para insertar observación */}
          <div className="row mb-3">
            <div className="col-md-12">
              <label htmlFor="commentary" className="form-label">Comentarios de Observación</label>
              <textarea
                className="form-control"
                rows={3}
                value={commentary}
                onChange={(e) => setCommentary(e.target.value)}
                required
              ></textarea>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-12">
              <label htmlFor="type" className="form-label">Tipo de Observación</label>
              <select className="form-control" value={type} onChange={(e) => setType(e.target.value)} required>
                <option value="T">Tesis</option>
                <option value="P">Proyecto de Grado</option>
                <option value="D">Trabajo Dirigido</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Crear Observación del Proyecto
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default EvalJurados;

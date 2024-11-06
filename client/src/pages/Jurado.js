import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Para la navegación

function Jurado() {
  const [search, setSearch] = useState(''); // Para buscar el proyecto
  const [estado, setEstado] = useState(''); // Para filtrar por estado
  const [tipo, setTipo] = useState(''); // Para filtrar por tipo
  const [projects, setProjects] = useState([]); // Arreglo de proyectos
  const [filteredProjects, setFilteredProjects] = useState([]); // Proyectos filtrados
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Para navegar a la página de evaluaciones

  // Cargar los proyectos desde la API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://localhost:7104/api/Projects/GetAllProyects');
        setProjects(response.data); // Guardar los proyectos obtenidos en el estado
        setFilteredProjects(response.data); // Inicialmente todos los proyectos estarán en el estado filtrado
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filtrar los proyectos según búsqueda y filtros
  const handleSearch = () => {
    let filtered = projects;

    // Filtrar por proyecto si hay algo en el campo de búsqueda
    if (search) {
      filtered = filtered.filter(project => 
        project.projectTittle.toLowerCase().includes(search.toLowerCase()) // Búsqueda por ID de proyecto
      );
    }

    // Filtrar por estado si se selecciona alguno
    if (estado) {
      filtered = filtered.filter(project => 
        project.status === (estado === 'activo' ? 1 : 0) // Comparar estado 1 (activo) o 0 (inactivo)
      );
    }

    // Filtrar por tipo si se selecciona alguno
    if (tipo) {
      filtered = filtered.filter(project => 
        project.projectModality.toLowerCase() === tipo.toLowerCase() // Comparar el tipo
      );
    }

    // Actualizar el estado de proyectos filtrados
    setFilteredProjects(filtered);
  };

  // Ejecutar la búsqueda y filtrado en tiempo real
  useEffect(() => {
    handleSearch();
  }, [search, estado, tipo]); // Actualizar automáticamente cuando cambian estos valores

  // Función para limpiar los filtros y mostrar todos los proyectos
  const clearFilters = () => {
    setSearch('');
    setEstado('');
    setTipo('');
    setFilteredProjects(projects); // Mostrar todos los proyectos
  };

  // Navegar a la página de evaluaciones y pasar el ID del proyecto seleccionado
  const handleViewProject = (id) => {
    navigate(`/evaluaciones/${id}`); // Redirigir a la página de evaluaciones con el ID del proyecto
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Layout> 
      <div>
        <h2 className="text-center mt-4">Lista de Revisión/Proyectos</h2>
        <form className="mb-3">
          <div className="row">
            {/* Campo de búsqueda por proyecto */}
            <div className="col-md-4">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
            {/* Filtro por estado */}
            <div className="col-md-2">
              <div className="form-group">
                <select
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  className="form-control"
                >
                  <option value="">Estado</option>
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                </select>
              </div>
            </div>
            {/* Filtro por tipo */}
            <div className="col-md-2">
              <div className="form-group">
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  className="form-control"
                >
                  <option value="">Tipo</option>
                  <option value="d">Trabajo Dirigido</option>
                  <option value="p">Proyecto de Grado</option>
                  <option value="t">Tesis</option>
                </select>
              </div>
            </div>
            {/* Botón para limpiar los filtros */}
            <div className="col-md-2">
              <button type="button" className="btn btn-secondary" onClick={clearFilters}>
                Limpiar Filtros
              </button>
            </div>
          </div>
        </form>

        {/* Tabla de resultados filtrados */}
        <div className='table-container_'>
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th style={{ display: 'none' }}>Proyecto</th> {/* Ocultar visualmente la columna ID */}
              <th>Título</th>
              <th>Tipo</th>
              <th>Etapa</th>
              <th>Estado</th>
              <th>Fecha de Registro</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((project) => (
              <tr key={project.id}>
                <td style={{ display: 'none' }}>{project.id}</td> {/* Ocultar visualmente el ID */}
                <td>{project.projectTittle || '--'}</td> {/* Muestra título si existe */}
                <td>{project.projectModality}</td>
                <td>{project.projectStage || '--'}</td> {/* Muestra etapa si existe */}
                <td>{project.status === 1 ? 'Activo' : 'Inactivo'}</td>
                <td>{project.registerDate}</td>
                <td>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => handleViewProject(project.id)} // Cambia la ruta a evaluations
                  >
                    Evaluar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        
      </div>
    </Layout>
  );
}

export default Jurado;

// src/pages/Home.js
import Layout from '../components/Layout';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './List.css';

const List = () => {
    const [proyectos, setProyectos] = useState([]);
    const [responsables, setResponsables] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Obtener proyectos
        axios.get('https://localhost:7104/api/Projects/GetAllProyects')
            .then(response => {
                setProyectos(response.data);
                // Obtener responsables para cada proyecto
                response.data.forEach(proyecto => {
                    obtenerResponsable(proyecto.id);
                });
            })
            .catch(error => {
                console.error('Error al obtener los proyectos:', error);
            });
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    // Función para obtener el responsable por proyecto
    const obtenerResponsable = (projectId) => {
        axios.get(`https://localhost:7104/api/Users/ByProject/${projectId}`)
            .then(response => {
                setResponsables(prevState => ({
                    ...prevState,
                    [projectId]: response.data.fullName
                }));
            })
            .catch(error => {
                console.error(`Error al obtener el responsable del proyecto ${projectId}:`, error);
            });
    };

    const proyectosFiltrados = proyectos.filter(proyecto =>
        proyecto.projectTittle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout>
            <div className="search-container">
                <form className="form-inline">
                    <input
                        className="form-control"
                        size="45"
                        type="search"
                        placeholder="Buscar por título del proyecto"
                        aria-label="Search"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </form>
                <div className="filters">
                    <select>
                        <option>ESTADO</option>
                    </select>
                    <select>
                        <option>TIPO</option>
                    </select>
                </div>
            </div>
            <div className="table-container_">
            <table>
                <thead>
                    <tr>
                        <th>NOMBRE DEL RESPONSABLE</th>
                        <th>TÍTULO DEL PROYECTO</th>
                        <th>MODALIDAD</th>
                        <th>ESTADO</th>
                        <th>Fecha de Registro</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {proyectosFiltrados.length > 0 ? (
                        proyectosFiltrados.map((proyecto, index) => (
                            <tr key={index}>
                                <td>{responsables[proyecto.id] || 'No Asignado'}</td>
                                <td>{proyecto.projectTittle}</td>
                                <td>{proyecto.projectModality}</td>
                                <td>{proyecto.status === 1 ? 'Activo' : 'Inactivo'}</td>
                                <td>{new Date(proyecto.registerDate).toLocaleDateString()}</td>
                                <td>
                                    <button className="details-button">Ver Detalles</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No se encontraron proyectos</td>
                        </tr>
                    )}
                </tbody>
            </table>
            </div>
            

        </Layout>
    );
};

export default List;

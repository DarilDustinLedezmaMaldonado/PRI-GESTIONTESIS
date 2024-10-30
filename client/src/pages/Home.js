import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import Layout from '../components/Layout';
import './evalJurados.css'; // Usamos el estilo de evalJurados.css
import axios from 'axios';

const Home = () => {
    const [projectID, setProjectID] = useState(''); 
    const [modality, setModality] = useState('T'); 
    const [registerUser, setRegisterUser] = useState(''); 
    const [esUser, setEsUser] = useState(''); 
    const [tuUser, setTuUser] = useState(''); 
    const [projects, setProjects] = useState([]); 
    const [users, setUsers] = useState([]);
    const navigate = useNavigate(); // Crear instancia de navigate

    // Cargar usuarios desde la API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://localhost:7104/api/Users/GetAllUsers');
                setUsers(response.data);
            } catch (error) {
                alert('Hubo un error al cargar los usuarios');
            }
        };
        fetchUsers();
    }, []);

    // Cargar proyectos y determinar el siguiente ID numérico
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('https://localhost:7104/api/Projects/GetAllProyects');
                setProjects(response.data);

                // Filtrar y obtener solo los IDs numéricos
                const numericProjects = response.data.filter(project => !isNaN(parseInt(project.id)));
                if (numericProjects.length > 0) {
                    // Obtener el mayor ID numérico
                    const lastProject = numericProjects.reduce((prev, current) => {
                        const prevNumber = parseInt(prev.id, 10);
                        const currentNumber = parseInt(current.id, 10);
                        return currentNumber > prevNumber ? current : prev;
                    }, { id: '0' });
                    // Asignar el próximo ID sumando 1 al último
                    const nextNumber = parseInt(lastProject.id, 10) + 1;
                    setProjectID(nextNumber.toString());
                } else {
                    // Si no hay IDs numéricos, iniciar con 1
                    setProjectID('1');
                }
            } catch (error) {
                alert('Hubo un error al cargar los proyectos');
            }
        };
        fetchProjects();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const projectData = {
            projectID, 
            modality, 
            registerUser: Number(registerUser), 
            esUser: Number(esUser), 
            tuUser: Number(tuUser), 
        };

        try {
            const response = await axios.post('https://localhost:7104/api/Projects/CreateAProjects', projectData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            alert('Proyecto creado con éxito');
            const nextID = parseInt(projectID, 10) + 1;
            setProjectID(nextID.toString());
            setModality('T');
            setRegisterUser('');
            setEsUser('');
            setTuUser('');

            const updatedProjects = await axios.get('https://localhost:7104/api/Projects/GetAllProyects');
            setProjects(updatedProjects.data);

            // Redirigir al usuario a la página de project-list después de la creación exitosa
            navigate('/project-list'); // Redirigir a project-list

        } catch (error) {
            alert('Hubo un error al crear el proyecto');
        }
    };

    return (
        <Layout>
            <div className="evaljurados-container container mt-5">
                <h2>Crear Proyecto</h2>

                <form onSubmit={handleSubmit}>
                    <div className="row mb-3" style={{ display: 'none' }}> {/* Oculta el campo y su etiqueta */}
                        <div className="col-md-12">
                            <label htmlFor="projectID" className="form-label">ID del Proyecto</label>
                            <input
                                type="text"
                                id="projectID"
                                className="form-control"
                                value={projectID} 
                                readOnly 
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-12">
                            <label htmlFor="modality" className="form-label">Modalidad de titulación</label>
                            <select
                                id="modality"
                                className="form-control"
                                value={modality}
                                onChange={(e) => setModality(e.target.value)}
                                required
                            >
                                <option value="T">Tesis</option>
                                <option value="P">Proyecto de Grado</option>
                                <option value="D">Trabajo Dirigido</option>
                            </select>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-12">
                            <label htmlFor="registerUser" className="form-label">Usuario que registra</label>
                            <select
                                id="registerUser"
                                className="form-control"
                                value={registerUser}
                                onChange={(e) => setRegisterUser(e.target.value)}
                                required
                            >
                                <option value="">Seleccionar usuario</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.fullName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-12">
                            <label htmlFor="esUser" className="form-label">Estudiante</label>
                            <select
                                id="esUser"
                                className="form-control"
                                value={esUser}
                                onChange={(e) => setEsUser(e.target.value)}
                                required
                            >
                                <option value="">Seleccionar opción</option>
                                {users
                                    .filter((user) => [2, 10, 11].includes(user.id))
                                    .map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.fullName}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-12">
                            <label htmlFor="tuUser" className="form-label">Tutor</label>
                            <select
                                id="tuUser"
                                className="form-control"
                                value={tuUser}
                                onChange={(e) => setTuUser(e.target.value)}
                                required
                            >
                                <option value="">Seleccionar opción</option>
                                {users
                                    .filter((user) => [4, 9, 10].includes(user.id))
                                    .map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.fullName}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Crear Proyecto
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default Home;

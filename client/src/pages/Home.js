import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "./Home.css"
const Home = () => {
  const [projectID, setProjectID] = useState("");
  const [modality, setModality] = useState("T");
  const [registerUser, setRegisterUser] = useState("");
  const [esUser, setEsUser] = useState("");
  const [tuUser, setTuUser] = useState("");
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const navigate = useNavigate();
  const [showErrorModal, setShowErrorModal] = useState(false); // Controla la visibilidad del modal de error
  const [errorMessage, setErrorMessage] = useState(""); // Almacena el mensaje de error


  // Cargar usuarios desde la API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7104/api/Users/GetAllUsers"
        );
        setUsers(response.data);
      } catch (error) {
        alert("Hubo un error al cargar los usuarios");
      }
    };
    fetchUsers();
  }, []);

  // Cargar todos los IDs de los proyectos y determinar el siguiente ID numérico
  useEffect(() => {
    const fetchProjectIDs = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7104/api/Projects/GetEveryProyect"
        );
        const projects = response.data;
        const numericIds = projects
          .map((project) => parseInt(project.id, 10))
          .filter((id) => !isNaN(id));
        const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0;
        setProjectID((maxId + 1).toString());
      } catch (error) {
        alert("Hubo un error al cargar los proyectos");
      }
    };
    fetchProjectIDs();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Llamar a la API para verificar si el estudiante ya tiene un proyecto
      const response = await axios.get(
        `https://localhost:7104/api/Projects/GetProjectsByUserID/${esUser}`
      );

      // Verificar si el usuario ya tiene un proyecto
      if (response.data && response.data.length > 0) {
        setErrorMessage("Este estudiante ya tiene un proyecto asignado.");
        setShowErrorModal(true); // Mostrar el modal de error
        return; // Detener la ejecución si ya existe un proyecto
      }

      // Continuar con la lógica de creación del proyecto si la validación pasa
      const selectedStudent = users.find((user) => user.id === esUser);
      const selectedTutor = users.find((user) => user.id === tuUser);
      const projectTittle = selectedStudent
        ? `Proyecto ${selectedStudent.fullName}`
        : "Proyecto Anónimo";

      const projectData = {
        projectID,
        modality,
        registerUser: Number(registerUser),
        esUser: Number(esUser),
        tuUser: Number(tuUser),
        projectTittle,
      };

      await axios.post(
        "https://localhost:7104/api/Projects/CreateAProjects",
        projectData,
        { headers: { "Content-Type": "application/json" } }
      );

      setModalData({
        studentName: selectedStudent?.fullName || "Desconocido",
        tutorName: selectedTutor?.fullName || "Desconocido",
        modality,
      });
      setShowModal(true);
    } catch (error) {
      console.error("Detalles del error:", error.response?.data || error.message);
      alert(
        `Error al crear el proyecto: ${error.response?.data?.message || error.message
        }`
      );
    }
  };



  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/project-list");
  };

  return (
    <Layout>
      <div className="form-container">
        <h2 className="form-title">Crear Proyecto</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="modality" className="form-label">
              Modalidad de titulación
            </label>
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

          <div className="form-group">
            <label htmlFor="registerUser" className="form-label">
              Usuario que registra
            </label>
            <select
              id="registerUser"
              className="form-control"
              value={registerUser}
              onChange={(e) => setRegisterUser(e.target.value)}
              required
            >
              <option value="">Seleccionar usuario</option>
              {users
                .filter((user) => user.userRol === "Administrador")
                .map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.fullName}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="esUser" className="form-label">
              Estudiante
            </label>
            <select
              id="esUser"
              className="form-control"
              value={esUser}
              onChange={(e) => setEsUser(e.target.value)}
              required
            >
              <option value="">Seleccionar opción</option>
              {users
                .filter((user) => user.userRol === "Estudiante")
                .map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.fullName}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="tuUser" className="form-label">
              Tutor
            </label>
            <select
              id="tuUser"
              className="form-control"
              value={tuUser}
              onChange={(e) => setTuUser(e.target.value)}
              required
            >
              <option value="">Seleccionar opción</option>
              {users
                .filter((user) => user.userRol === "Tutor")
                .map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.fullName}
                  </option>
                ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Crear Proyecto
          </button>
        </form>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Proyecto Registrado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Se registró el proyecto correctamente del estudiante
          </p>
          <p>Añada los detalles del proyecto en el listado de proyectos.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Ir al listado de proyectos
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal de Error */}
      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{errorMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

    </Layout>
  );
};

export default Home;

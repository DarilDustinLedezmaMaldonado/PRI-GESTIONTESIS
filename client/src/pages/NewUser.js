import Layout from "../components/Layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NewUser.css";
import { FaUserPlus, FaExclamationCircle, FaCheckCircle } from "react-icons/fa";

function NewUser() {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    fullName: "",
    userRol: "Estudiante",
    userSede: "",
  });
  const [users, setUsers] = useState([]);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (validationErrors.length > 0) setValidationErrors([]);
  };

  const validateForm = () => {
    const errors = [];
    if (
      !formData.userName.trim() || 
      !/^[^\s@]+@(univalle\.edu|est\.univalle\.edu)$/.test(formData.userName)
    ) {
      errors.push("El correo debe ser válido y terminar con '@univalle.edu' o '@est.univalle.edu'.");
    }
    if (!formData.password.trim() || formData.password.length < 6) {
      errors.push("La contraseña debe tener al menos 6 caracteres.");
    }
    if (!formData.fullName.trim()) {
      errors.push("El nombre completo es obligatorio.");
    }
    if (!formData.userSede.trim()) {
      errors.push("La sede del usuario es obligatoria.");
    }
    setValidationErrors(errors);
    return errors.length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const userResponse = await axios.post(
        "https://localhost:7104/api/Users/CreateUser",
        { ...formData, idRole: 1 }
      );
      setResponse("Usuario creado exitosamente.");
      setError(null);
      fetchUsers();
      setFormData({
        userName: "",
        password: "",
        fullName: "",
        userRol: "Estudiante",
        userSede: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Error al crear el usuario.");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      try {
        await axios.delete(
          `https://localhost:7104/api/Users/DeleteUser/${userId}`
        );
        setResponse("Usuario eliminado exitosamente.");
        fetchUsers();
      } catch (err) {
        setError(
          err.response?.data?.message || "Error al eliminar el usuario."
        );
      }
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7104/api/Users/GetAllUsers"
      );
      setUsers(response.data);
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout>
      <div className="NewUser">
        <form onSubmit={handleSubmit} className="form-container">
          <h2 className="title">Crear Nuevo Usuario</h2>
          <div className="form-group">
            <label htmlFor="userName">Correo:</label>
            <input
              type="email"
              id="userName"
              name="userName"
              className="userSelect"
              value={formData.userName}
              onChange={handleInputChange}
              placeholder="Correo electrónico"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              className="userSelect"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Contraseña"
            />
          </div>
          <div className="form-group">
            <label htmlFor="fullName">Nombre Completo:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Nombre completo"
            />
          </div>
          <div className="form-group">
            <label htmlFor="userRol">Rol:</label>
            <select
              id="userRol"
              name="userRol"
              value={formData.userRol}
              onChange={handleInputChange}
            >
              <option value="Estudiante">Estudiante</option>
              <option value="Tutor">Tutor</option>
              <option value="Administrador">Administrador</option>
              <option value="Jurado">Jurado</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="userSede">Sede:</label>
            <select
              id="userSede"
              name="userSede"
              value={formData.userSede}
              onChange={handleInputChange}
            >
              <option value="">Seleccionar sede</option>
              <option value="Cochabamba">Cochabamba</option>
              <option value="Santa Cruz">Santa Cruz</option>
              <option value="La Paz">La Paz</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            <FaUserPlus /> Crear Usuario
          </button>
        </form>
        {validationErrors.length > 0 && (
          <div className="validation-errors">
            <ul>
              {validationErrors.map((error, index) => (
                <li key={index}>
                  <FaExclamationCircle /> {error}
                </li>
              ))}
            </ul>
          </div>
        )}
        {response && <div className="success-message">{response}</div>}
        {error && <div className="error-message">{error}</div>}
        <div className="users-list">
          <h3>Lista de Usuarios</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Sede</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.fullName}</td>
                  <td>{user.userName}</td>
                  <td>{user.userRol}</td>
                  <td>{user.userSede}</td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Dar de baja
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

export default NewUser;

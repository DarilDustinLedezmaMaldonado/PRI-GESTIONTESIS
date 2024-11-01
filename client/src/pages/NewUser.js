import Layout from "../components/Layout";
import React, { useState } from "react";
import axios from "axios";
import "./NewUser.css";

function NewUser() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [userSede, setUserSede] = useState("");
  const [idRole, setIdRole] = useState(0);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);

  // Validar formato de correo electrónico
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Validaciones de formulario
  const validateForm = () => {
    const errors = [];

    if (!userName.trim()) {
      errors.push("El nombre de usuario es obligatorio.");
    } else if (!isValidEmail(userName)) {
      errors.push(
        "El nombre de usuario debe ser un correo electrónico válido."
      );
    }

    if (!password.trim()) {
      errors.push("La contraseña es obligatoria.");
    } else if (password.length < 6) {
      errors.push("La contraseña debe tener al menos 6 caracteres.");
    }

    if (!fullName.trim()) {
      errors.push("El nombre completo es obligatorio.");
    }

    if (!userSede.trim()) {
      errors.push("La sede del usuario es obligatoria.");
    }

    if (idRole === 0) {
      errors.push("Debes seleccionar un rol.");
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const userData = {
      userName,
      password,
      fullName,
      userSede,
      idRole: parseInt(idRole),
    };

    try {
      const res = await axios.post(
        "https://localhost:7104/api/Users/CreateUser",
        userData
      );
      setResponse(res.data);
      setError(null);
      setValidationErrors([]);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Error al crear el usuario. Por favor, inténtalo de nuevo."
      );
      console.error(err);
    }
  };

  // Limpiar errores de validación en los campos individuales
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  return (
    <Layout>
      <div className="NewUser">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="search-bar"
            placeholder="Buscar por apellido o nombre del responsable"
          />

          <div className="container">
            <div className="left-panel">
              <table>
                <thead>
                  <tr>
                    <th>NOMBRE</th>
                    <th>ROL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <label>
                        Nombre de usuario (correo):
                        <input
                          type="text"
                          value={userName}
                          onChange={handleInputChange(setUserName)}
                          placeholder="Nombre de usuario (correo)"
                        />
                      </label>
                    </td>
                    <td>
                      <label>
                        Rol:
                        <select
                          value={idRole}
                          onChange={handleInputChange(setIdRole)}
                        >
                          <option value={0}>Seleccionar Rol</option>
                          <option value={1}>Estudiante</option>
                          <option value={2}>Tutor</option>
                          <option value={3}>Tribunal</option>
                        </select>
                      </label>
                    </td>
                    <td>
                      <button type="submit" className="add-button">
                        AÑADIR
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>
                        Contraseña:
                        <input
                          type="password"
                          value={password}
                          onChange={handleInputChange(setPassword)}
                          placeholder="Contraseña"
                        />
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>
                        Nombre completo:
                        <input
                          type="text"
                          value={fullName}
                          onChange={handleInputChange(setFullName)}
                          placeholder="Nombre completo"
                        />
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>
                        Sede del usuario:
                        <input
                          type="text"
                          value={userSede}
                          onChange={handleInputChange(setUserSede)}
                          placeholder="Sede del usuario"
                        />
                      </label>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="right-panel">
              <table>
                <thead>
                  <tr>
                    <th>NOMBRE</th>
                    <th>ROL EN PROYECTO</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Aquí puedes mapear los usuarios creados o recibidos de la API */}
                </tbody>
              </table>
            </div>
          </div>
        </form>

        {/* Mensaje de errores en la parte inferior */}
        {validationErrors.length > 0 && (
          <div className="error">
            {validationErrors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        {response && (
          <div className="success">
            Usuario creado exitosamente: {JSON.stringify(response)}
          </div>
        )}
        {error && <div className="error">{error}</div>}
      </div>
    </Layout>
  );
}

export default NewUser;

import React, { useState, useContext } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Cookies from "js-cookie"; // Importamos js-cookie
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext"; // Importamos el contexto

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { userName, role, userId } = useAuth(); // Extraemos los datos del contexto

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = { userName: username, password };

    try {
      const res = await axios.post(
        "https://localhost:7104/api/Users/Login",
        loginData
      );

      if (res.status === 200 && res.data.token) {
        setError(null);

        // Guardar el token y el nombre del usuario en las cookies
        login(res.data.token);
        console.log(role)
        if(role === "Administrador"){
          navigate("/project-list");
        }
        if(role === "Jurado" || role === "Tutor"){
          navigate("/jurados");
        }
        if(role === "Estudiante"){
          navigate("/homestudent");
        }
      } else {
        setError("Credenciales inválidas.");
      }
    } catch (err) {
      setError("Usuario o contraseña no coinciden");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Bienvenido</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <input
              type="text"
              placeholder="Correo institucional"
              className="login-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              className="login-input password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
              title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            />
          </div>
          <button type="submit" className="login-button">
            Ingresar
          </button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}

export default Login;
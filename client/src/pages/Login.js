import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const userData = {message: username}
  const navigate = useNavigate(); // Hook para redirigir

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = { userName: username, password }; // Ajusta los nombres de los campos si es necesario

    try {
      const res = await axios.post(
        "https://localhost:7104/api/Users/Login",
        loginData
      );

      // Verifica si el login fue exitoso
      if (res.status === 200) {
        setError(null);
        if(username == "director@director.com"){
          
          navigate("/project-list",{state:userData});
        }
        if(username == "est@est.com"){
          navigate("/homestudent",{state:userData});
        }
        if(username == "tu@tu.com"){
          navigate("/jurados",{state:userData});
        }
        
      }
    } catch (err) {
      setError("Error en el login. Verifique sus credenciales.");
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}

export default Login;

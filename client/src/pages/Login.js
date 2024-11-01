import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = { username, password };

    try {
      const res = await axios.post(
        "https://localhost:7104/api/Users/Login",
        loginData
      );
      setResponse("Login exitoso");
      setError(null);
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
        {response && <div className="success">{response}</div>}
      </div>
    </div>
  );
}

export default Login;

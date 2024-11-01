import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewObser.css";
import { useParams, useNavigate } from "react-router-dom"; // Importa useNavigate para la navegación

function ViewObser() {
  const { id } = useParams(); // Obtener el ID de la URL
  const navigate = useNavigate(); // Hook para manejar la navegación
  const [observation, setObservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchObservation = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7104/api/Observations/ObtenerObservaciones/${id}`
        );
        setObservation(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err); // Loguea el error para obtener más detalles
        setError("Error al obtener la observación");
        setLoading(false);
      }
    };

    fetchObservation();
  }, [id]); // Ejecutar el efecto cuando el ID cambie

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="observation-card">
      <h2>Observación: {observation.comentary}</h2>
      <div className="observation-details">
        <div className="status-type">
          <div className="status">
            <span className="status-label">Estado</span>
            <div
              className="status-indicator"
              style={{
                backgroundColor: observation.status === 0 ? "green" : "red",
              }}
            ></div>
          </div>
          <div className="type">
            <span className="type-label">Tipo:</span>
            <span className="type-value">{observation.type}</span>
          </div>
        </div>
        <p className="responsible">
          Responsable: {observation.responsible || "Ing. Mario Moreno Morales"}
        </p>
        <p className="description">
          Descripción:{" "}
          {observation.description || "Sin descripción disponible."}
        </p>
        <button className="back-button" onClick={() => navigate("/viewjur")}>
          Retroceder
        </button>
      </div>
    </div>
  );
}

export default ViewObser;

import Layout from "../components/Layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importa el hook de navegación
import "./ViewJur.css";

function ViewJur() {
  const [observations, setObservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook para manejar la navegación

  // Función para obtener las observaciones de la API
  useEffect(() => {
    const fetchObservations = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7104/api/Observations/ObtenerObservaciones"
        );
        setObservations(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error al obtener los datos");
        setLoading(false);
      }
    };

    fetchObservations();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  const handleDetailsClick = (id) => {
    navigate(`/observation/${id}`); // Redirige a la vista de detalles con el ID
  };

  return (
    <Layout>
      <div className="ViewJur">
        {/* Barra de búsqueda */}
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Buscar por apellido o nombre del responsable"
          />
          <button className="search-button">🔍</button>
          <select className="filter">
            <option>ESTADO</option>
          </select>
          <select className="filter">
            <option>TIPO</option>
          </select>
        </div>

        {/* Tabla de observaciones */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>NOMBRE DEL RESPONSABLE</th>
                <th>TIPO</th>
                <th>ESTADO</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {observations.map((observation) => (
                <tr key={observation.id}>
                  <td>
                    <input type="text" value={observation.comentary} readOnly />
                  </td>
                  <td>
                    <input type="text" value={observation.type} readOnly />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={
                        observation.status === 0 ? "Pendiente" : "Completado"
                      }
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={new Date(
                        observation.registerDate
                      ).toLocaleDateString()}
                      readOnly
                    />
                  </td>
                  <td>
                    <button
                      className="details-button"
                      onClick={() => handleDetailsClick(observation.id)}
                    >
                      Ver Detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Manejo de errores o respuestas */}
        {error && <div className="error">{error}</div>}
      </div>
    </Layout>
  );
}

export default ViewJur;

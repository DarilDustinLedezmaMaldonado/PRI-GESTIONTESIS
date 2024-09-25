// src/pages/Home.js
import Layout from '../components/Layout';
import React, { useState, useEffect } from 'react';
import './List.css';

const List = () => {
    const [redesSalud, setRedesSalud] = useState([]);
    return (
        <Layout>

            <div class="search-container">
                <form class="form-inline">
                    <form class="form-inline">
                        <input class="form-control" size="45" type="search" placeholder="Buscar por apellido o nombre de responsable" aria-label="Search"/>
                    </form>
                </form>
                <div class="filters">
                    <select>
                        <option>ESTADO</option>
                    </select>
                    <select>
                        <option>TIPO</option>
                    </select>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>NOMBRE DEL RESPONSABLE</th>
                        <th>TIPO</th>
                        <th>ESTADO</th>
                        <th>Fecha</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Cristian Bueno</td>
                        <td>tipo</td>
                        <td>estado</td>
                        <td>17/08/2023</td>
                        <td><button class="details-button">Ver Detalles</button></td>
                    </tr>
                    <tr>
                        <td>Cristian Encinas</td>
                        <td>tipo</td>
                        <td>estado</td>
                        <td>17/08/2023</td>
                        <td><button class="details-button">Ver Detalles</button></td>
                    </tr>
                    <tr>
                        <td>Cristian Encinas</td>
                        <td>tipo</td>
                        <td>estado</td>
                        <td>17/08/2023</td>
                        <td><button class="details-button">Ver Detalles</button></td>
                    </tr>
                </tbody>
            </table>

        </Layout>
    );
};

export default List;
// src/pages/Home.js
import Layout from '../components/Layout';
import React, { useState, useEffect } from 'react';
import './Observation.css';

const Observation = () => {
  return (
    <Layout>
      <body>
        <body class="body_Observation">
          <div class="card bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h1 class="text-xl font-bold mb-4">Observación: Vericar el título</h1>
            <div class="sup_obs">
              <span class="status">Estado</span>
              <div class="status_box"></div>
              <span>Tipo: Forma</span>
            </div>
            <p class="mb-4"><strong>Responsable:</strong> Ing. Mario Moreno Morales</p>
            <p class="mb-4"><strong>Descripción:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <button class="btn rounded">Retroceder</button>
          </div>
        </body>
      </body>
    </Layout>
  );
};

export default Observation;
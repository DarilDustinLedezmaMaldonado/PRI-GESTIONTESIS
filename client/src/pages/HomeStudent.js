// src/pages/Home.js
import Layout from '../components/Layout';
import React, { useState, useEffect } from 'react';
import './HomeStudent.css';

const HomeStudent = () => {
  return (
    <Layout>
      Barrra de Progreso:
      <br />
      <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar">25%</div>
      </div>
      <br />
      <div class="container_gridstudent">
        <div id="left_zone">
          <h2>• Etapa 1</h2>
          <button type="button" class="btn">VER DETALLE</button>
          <button type="button" class="btn">TEMA</button>
          <button type="button" class="btn">PERFIL</button>
          <button type="button" class="btn">PRIVADA</button>
          <button type="button" class="btn">PUBLICA</button>
        </div>
        <div id="center_zone">

        </div>
        <div id="right_zone" >
          <div class="p-6 rounded-lg shadow-md">
            <ul class="list-disc pl-5">
              <li class="text-lg font-bold mb-4">Estado de la revisión:</li>
              <li class="flex items-center mb-2">
                <span class="w-32">Tutor</span>
                <span class="boxy">100%</span>
              </li>
              <li class="flex items-center mb-2">
                <span class="w-32">Dirección de carrera</span>
                <span class="boxy1">50%</span>
              </li>
              <li class="flex items-center mb-2">
                <span class="w-32">DAAP</span>
                <span class="boxy2">0%</span>
              </li>
              <li class="flex items-center mb-2">
                <span class="w-32">Tribunal</span>
                <span class="boxy3">0%</span>
              </li>
              <li class="flex items-center">
                <span class="w-32">Tribunal</span>
                <span class="boxy4">0%</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </Layout>
  );
};

export default HomeStudent;

// src/pages/Home.js
import React from 'react';
import Layout from '../components/Layout';
import './Home.css';

const Home = () => {
    return (
        <Layout>

            <h1 className="mb-4">Información Base de Proyecto</h1>
            <form>
                <div className="form-group row">
                    <label htmlFor="estudiante" className="col-sm-2 col-form-label">Estudiante</label>
                    <div className="col-sm-10">
                        <input type="text" id="estudiante" className="form-control" placeholder="Nombre completo" />
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">1. Modalidad de titulación por:</label>
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="form-check">
                                <input type="radio" name="modalidad" id="tesis" value="tesis" className="form-check-input" />
                                <label htmlFor="tesis" className="form-check-label">Tesis</label>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="form-check">
                                <input type="radio" name="modalidad" id="proyecto" value="proyecto" className="form-check-input" />
                                <label htmlFor="proyecto" className="form-check-label">Proyecto de Grado</label>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="form-check">
                                <input type="radio" name="modalidad" id="trabajo" value="trabajo" className="form-check-input" />
                                <label htmlFor="trabajo" className="form-check-label">Trabajo Dirigido</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="titulo" className="col-sm-2 col-form-label">Posible Título</label>
                    <div className="col-sm-10">
                        <input type="text" id="titulo" className="form-control" placeholder="Posible Título" />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="objetivoGeneral" className="col-sm-2 col-form-label">Objetivo General</label>
                    <div className="col-sm-10">
                        <input type="text" id="objetivoGeneral" className="form-control" placeholder="Objetivo General" />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="objetivosEspecificos" className="col-sm-2 col-form-label">Objetivos Específicos</label>
                    <div className="col-sm-10">
                        <input type="text" id="objetivosEspecificos" className="form-control" placeholder="Objetivos Específicos" />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="alcance" className="col-sm-2 col-form-label">Alcance</label>
                    <div className="col-sm-10">
                        <input type="text" id="alcance" className="form-control" placeholder="Alcance" />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="tutor" className="col-sm-2 col-form-label">Tutor</label>
                    <div className="col-sm-10">
                        <input type="text" id="tutor" className="form-control" placeholder="Tutor" />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="documento" className="col-sm-2 col-form-label">Cargar Documento (WORD)</label>
                    <div className="col-sm-10">
                        <input type="file" id="documento" className="form-control-file" />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-sm-10 offset-sm-2">
                        <button type="submit" className="btn btn-primary">NEXT</button>
                    </div>
                </div>
            </form>
        </Layout>
    );
};

export default Home;

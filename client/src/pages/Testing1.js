// src/pages/Home.js
import Layout from '../components/Layout';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Si decides usar axios


const Testing1 = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:7104/api/Phones/ObtenerPhones');
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error.message}</div>;
    
    return (

        <Layout>
            <div>
            <h1>Datos desde la API:</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
        </Layout>
    );
};

export default Testing1;
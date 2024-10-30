const sql = require('mssql');

const config = {
    user: 'GaapUser',
    password: 'Univalle/2024',
    server: 'GAAP-2024.mssql.somee.com', 
    database: 'GAAP-2024',
    options: {
        encrypt: true, // Usa true si tu base de datos lo requiere
        trustServerCertificate: true // Dependiendo de la configuración del servidor
    }
};

sql.connect(config)
   .then(pool => {
       console.log("Conectado a la base de datos");
       return pool;
   })
   .catch(err => console.log('Error de conexión: ', err));

import mysql from 'mysql2';
import dotenv from 'dotenv';


dotenv.config();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'patodonal26',
    database: 'bd_sistema_veterinario'
})

pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Error en la conexión a MySQL:', err);
        return;
    }

    connection.release();
});
/*
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 10000, // Ajusta el tiempo de espera de la conexión a 10 segundos
});


// Detectar errores en la conexión y reconectar automáticamente
pool.on('error', (err) => {
    console.error('❌ Error en la conexión MySQL:', err);

    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('🔄 Conexión perdida, intentando reconectar...');
    } else if (err.code === 'ECONNRESET') {
        console.error('🔄 Conexión reseteada, reintentando...');
    } else if (err.code === 'ETIMEDOUT') {
        console.error('⏳ Conexión expirada, intentando reconectar...');
    }
});

// Prueba la conexión
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Error en la conexión a MySQL:', err);
        return;
    }
    connection.release();
});

*/


 export default pool.promise();
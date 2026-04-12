const { Pool } = require('pg');
require('dotenv').config();


const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD, // ✅ fixed
    port: process.env.DB_PORT,
});

// Connection চেক করো
pool.connect((err) => {
    if (err) {
        console.log(' Database connect হয়নি:', err);
    } else {
        console.log(' PostgreSQL Connected!');
    }
});

module.exports = pool;
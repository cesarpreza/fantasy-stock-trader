const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    port: 5432,
    password: 'DB2021!',
    database: 'stock_db'
});

module.exports = pool;
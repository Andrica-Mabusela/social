const { Pool } = require('pg')

const pool = new Pool({
    user: "postgres",
    password: "Andrica1@postgres",
    host: "localhost",
    port: 5432,
    database: "mediaapp"
})

module.exports = pool
// const { Pool } = require('pg')

// const pool = new Pool({
//     user: "postgres",
//     password: "Andrica1@postgres",
//     host: "localhost",
//     port: 5432,
//     database: "mediaapp"
// })

// module.exports = pool

require('dotenv').config();

const { Sequelize } = require('sequelize');
const { DataTypes } = Sequelize;

const sequelize = new Sequelize('mediaapp', process.env.DB_USER, process.env.DB_PASSWORD,
{
    host: 'localhost',
    port: process.env.DB_PORT,
    dialect: 'postgres'
}
);

module.exports = sequelize;
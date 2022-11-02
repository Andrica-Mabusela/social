const sequelizeConnection = require('../config/db.config')
const { Sequelize } = require('sequelize')
const { DataTypes } = Sequelize // GETS THE DataTypes Object, used to set data types of fields


const User = sequelizeConnection.define('user', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        // allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        // allowNull: false
    },
    userName: {
        type: DataTypes.STRING,
        // allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        // allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        // allowNull: false
    }
});


module.exports = User

const sequelizeConnection = require('../config/db.config');
const { DataTypes } = require('sequelize').Sequelize;

const Like = sequelizeConnection.define('like', {

    likeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    userId: {
        type: DataTypes.INTEGER
    },

    postId: {
        type: DataTypes.INTEGER
    }
})
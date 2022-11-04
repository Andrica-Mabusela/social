const sequelizeConnection = require('../config/db.config');
const { DataTypes } = require('sequelize').Sequelize;

const Comment = sequelizeConnection.define('comment', {

    commentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    text: {
        type: DataTypes.STRING,
        allowNull: false
    },

    userId: {
        type: DataTypes.INTEGER
    },

    postId: {
        type: DataTypes.INTEGER
    }
})
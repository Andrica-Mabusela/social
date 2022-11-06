const sequelizeConnection = require('../config/db.config');
const { DataTypes } = require('sequelize').Sequelize;

const Comment = sequelizeConnection.define('comment', {

    commentid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    txt: {
        type: DataTypes.STRING,
        allowNull: false
    },

    userid: {
        type: DataTypes.INTEGER
    },

    postid: {
        type: DataTypes.INTEGER
    }
})

module.exports = Comment;
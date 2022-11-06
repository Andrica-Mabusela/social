const sequelizeConnection = require('../config/db.config');
const { DataTypes } = require('sequelize').Sequelize;

const Post = require('./Post.model');

const Like = sequelizeConnection.define('like', {

    likeid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    userid: {
        type: DataTypes.INTEGER
    },

    postid: {
        type: DataTypes.INTEGER,
        references:{
            model: { tableName: 'posts'},
            key: 'postId'
        }
    },

})


Post.hasMany(Like);
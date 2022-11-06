const sequelizeConnection = require('../config/db.config');
const { DataTypes } = require('sequelize').Sequelize;
const Comment  = require('./Comment.model');

const Post = sequelizeConnection.define('post', {
    postid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    caption: {
        type: DataTypes.STRING,
        allowNull: true
    },

    imgurl: {
        type: DataTypes.STRING,
        allowNull: true
    },

    likes: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL),
        allowNull: true
    },

    shares: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL),
        allowNull: true
    },

    commentid: {
        type: DataTypes.INTEGER,
        references: {
            model: { tableName: 'comments' },
            key: 'commentid'
        }
    }
})


Post.hasMany(Comment)

module.exports = Post;
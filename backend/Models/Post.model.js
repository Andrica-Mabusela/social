const sequelizeConnection = require('../config/db.config');
const { DataTypes } = require('sequelize').Sequelize;

const Post = sequelizeConnection.define('post', {
    postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    caption: {
        type: DataTypes.STRING
    },

    imgUrl: {
        type: DataTypes.STRING
    },

    likes: {
        type: DataTypes.INTEGER
    },

    shares: {
        type: DataTypes.INTEGER
    },

    commentId: {
        type: DataTypes.INTEGER,
        references: {
            model: { tableName: 'Comments' },
            key: 'commentId'
        }
    }
})


Post.hasMany(Comment)
const sequelizeConnection = require('../config/db.config');
const { DataTypes } = require('sequelize').Sequelize;

const User = require('./User.model');

const Story = sequelizeConnection.define('stories', {
    storyid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    caption: {
        type: DataTypes.STRING,
        allowNull: true
    },

    mediaurl: {
        type: DataTypes.STRING,
        allowNull: true
    },

    likes: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL),
        allowNull: true
    },

    userid: {
        type: DataTypes.INTEGER,
        references:{
            model: { tableName: 'users'},
            key: 'userId'
        }
    },

})

User.hasMany(Story);

module.exports = Story;
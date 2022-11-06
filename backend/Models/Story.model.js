const sequelizeConnection = require('../config/db.config');
const { DataTypes } = require('sequelize').Sequelize;

const User = require('./User.model');

const Story = sequelizeConnection.define('story', {
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
        type: DataTypes.INTEGER
    }

})

User.hasMany(Story);

module.exports = Story;
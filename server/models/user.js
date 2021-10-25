const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true
    },
    
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },

    password: {
        type:Sequelize.STRING,
        allowNull: false
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
    
});

module.exports = User;
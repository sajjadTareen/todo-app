const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Todo = sequelize.define('todo', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true
    },
    
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },

    desc: {
        type:Sequelize.TEXT,
        allowNull: false
    },

    status: {
        type:Sequelize.STRING,
        allowNull: true
    }
});

module.exports = Todo;
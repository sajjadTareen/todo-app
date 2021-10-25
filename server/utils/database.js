const Sequelize = require('sequelize');

const sequelize = new Sequelize('todo-app', 'root', 'toor', {
    dialect: 'mysql',
    host: '127.0.0.1'
});

module.exports = sequelize;
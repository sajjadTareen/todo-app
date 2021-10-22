const Sequelize = require('sequelize');

const sequelize = new Sequelize('new_todo', 'root', 'admin', {
    dialect: 'mysql',
    host: '127.0.0.1'
});

module.exports = sequelize;
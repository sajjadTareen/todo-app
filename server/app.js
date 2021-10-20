const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./utils/database');
const path = require('path');

const app = express();

const todoRoutes = require('./routes/todo');
const Todo = require('./models/todo');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '/public')));

app.use('/todo', todoRoutes);


sequelize.sync()
.then(result => app.listen(3000))
.catch(err => console.log(err));


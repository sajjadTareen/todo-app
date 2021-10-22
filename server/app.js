const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const sequelize = require('./utils/database');
const path = require('path');

const app = express();
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
        next();
  });

const todoRoutes = require('./routes/todo');
const Todo = require('./models/todo');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

app.use('/', todoRoutes);

sequelize.sync()
.then(result => app.listen(3000))
.catch(err => console.log(err));


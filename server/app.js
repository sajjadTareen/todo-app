const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const sequelize = require('./utils/database');
const path = require('path');

const app = express();
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
        next();
  });

const routes = require('./routes/todo');
const Todo = require('./models/todo');
const User = require('./models/user');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

app.use('/', routes);



Todo.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Todo);

sequelize.sync()
.then(result => {
 return User.findByPk(1)
})
.then(user => {
  if(!user){
    return User.create({username: 'sajjadTareen', password: 'sajjad', name: 'Sajjad Tareen'});
  }
})
.then(result => app.listen(3000))
.catch(err => console.log(err));


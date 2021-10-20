const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const todoRoutes = require('./routes/todo');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '/public')));

app.use('/todo', todoRoutes);

app.listen(3000);
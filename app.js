var express = require('express');
var path = require('path');
var logger = require('morgan');
//importanto a conexão
require('./config/database')



var usersRouter = require('./app/routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


//Rotas
app.use('/users', usersRouter);



module.exports = app;

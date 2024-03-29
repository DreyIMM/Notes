var express = require('express');
var path = require('path');
var logger = require('morgan');
//importanto a conexão
require('./config/database')
var cors = require('cors');

//importando as rotas
var usersRouter = require('./app/routes/users');
var notesRouter = require('./app/routes/notes');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


// utilizando as Rotas na navegação
app.use('/users', usersRouter);
app.use('/notes', notesRouter);


module.exports = app;

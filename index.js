const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapi', {
        useNewUrlParser: true
});

// Crear el servidor
const app = express();
// Habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// rutas de la app
app.use('/', routes());

// Puerto
app.listen(5000);


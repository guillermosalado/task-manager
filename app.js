const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();

// Middlewares básicos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SESSION
app.use(session({
    secret: 'mi_clave_secreta',
    resave: false,
    saveUninitialized: false
}));

// archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// rutas
const routes = require('./src/routes/index');
app.use('/', routes);

module.exports = app;
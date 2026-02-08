const express = require('express');
const router = express.Router();

// Importar todas las rutas
const authRoutes = require('./authRoutes');
const kanbanRoutes = require('./kanbanRoutes');
const viewRoutes = require('./viewRoutes');

// Usar las rutas
router.use('/', authRoutes);    // /login, /registro, /logout, /session
router.use('/', kanbanRoutes);  // /kanban
router.use('/', viewRoutes);    // /, /contacto

module.exports = router;
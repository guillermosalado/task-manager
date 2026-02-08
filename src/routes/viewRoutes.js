const express = require('express');
const router = express.Router();
const path = require('path');
const ContactModel = require('../models/contactModel');


// Home
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// GET - Página de contacto
router.get('/contacto', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/views/contacto.html'));
});

// POST - Guardar mensaje
router.post('/contacto', (req, res) => {
    const { nombre, email, telefono, mensaje } = req.body;
    
    if (!nombre || !email || !mensaje) {
        return res.status(400).json({ error: 'Faltan datos' });
    }
    
    ContactModel.crear(nombre, email, telefono, mensaje, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al guardar' });
        }
        res.json({ success: true });
    });
});

module.exports = router;
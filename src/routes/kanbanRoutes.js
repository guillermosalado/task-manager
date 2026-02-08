const express = require('express');
const router = express.Router();
const path = require('path');
const taskModel = require('../models/taskModel');

// Middleware para proteger rutas
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

// Mostrar página Kanban
router.get('/kanban', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/views/kanban.html'));
});

// Obtener tareas del usuario
router.get('/tasks', isAuthenticated, (req, res) => {
    taskModel.findByUser(req.session.user.id, (err, tasks) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al obtener tareas' });
        }
        res.json(tasks);
    });
});

// Crear tarea
router.post('/tasks', isAuthenticated, (req, res) => {
    const task = {
        user_id: req.session.user.id,
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        due_date: req.body.due_date
    };

    taskModel.create(task, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al crear tarea' });
        }
        res.json({ success: true, id: result.insertId });
    });
});

// Actualizar tarea
router.put('/tasks/:id', isAuthenticated, (req, res) => {
    const taskId = req.params.id;
    const updates = {
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        due_date: req.body.due_date
    };

    taskModel.update(taskId, req.session.user.id, updates, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al actualizar tarea' });
        }
        res.json({ success: true });
    });
});

// Marcar como completada
router.put('/tasks/:id/complete', isAuthenticated, (req, res) => {
    taskModel.markAsCompleted(req.params.id, req.session.user.id, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al completar tarea' });
        }
        res.json({ success: true });
    });
});

// Eliminar tarea
router.delete('/tasks/:id', isAuthenticated, (req, res) => {
    taskModel.delete(req.params.id, req.session.user.id, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al eliminar tarea' });
        }
        res.json({ success: true });
    });
});

module.exports = router;
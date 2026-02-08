const connection = require('../config/connection');

const taskModel = {

    // Crear tarea
    create(taskData, callback) {
        const sql = `
            INSERT INTO tasks 
            (user_id, title, description, priority, status, due_date)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        const values = [
            taskData.user_id,
            taskData.title,
            taskData.description || null,
            taskData.priority,
            taskData.status || 'pendiente',
            taskData.due_date || null
        ];

        connection.query(sql, values, callback);
    },

    // Obtener todas las tareas de un usuario
    findByUser(userId, callback) {
        const sql = `
            SELECT *
            FROM tasks
            WHERE user_id = ?
            ORDER BY created_at DESC
        `;

        connection.query(sql, [userId], callback);
    },

    // Actualizar tarea
    update(taskId, userId, updates, callback) {
        const sql = `
            UPDATE tasks
            SET title = ?, description = ?, priority = ?, due_date = ?
            WHERE id = ? AND user_id = ?
        `;

        connection.query(sql, [
            updates.title,
            updates.description,
            updates.priority,
            updates.due_date,
            taskId,
            userId
        ], callback);
    },

    // Marcar tarea como completada
    markAsCompleted(taskId, userId, callback) {
        const sql = `
            UPDATE tasks
            SET status = 'completada', priority = 'baja'
            WHERE id = ? AND user_id = ?
        `;

        connection.query(sql, [taskId, userId], callback);
    },

    // Eliminar tarea
    delete(taskId, userId, callback) {
        const sql = `
            DELETE FROM tasks
            WHERE id = ? AND user_id = ?
        `;

        connection.query(sql, [taskId, userId], callback);
    }
};

module.exports = taskModel;
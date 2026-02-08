const db = require('../config/connection');

const ContactModel = {
    crear: (nombre, email, telefono, mensaje, callback) => {
        const query = 'INSERT INTO contacto (nombre, email, telefono, mensaje) VALUES (?, ?, ?, ?)';
        db.query(query, [nombre, email, telefono, mensaje], callback);
    }
};

module.exports = ContactModel;
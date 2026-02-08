const connection = require('../config/connection');

const UserModel = {

    // Buscar usuario por email
    findByEmail(email, callback) {
        const query = 'SELECT id, email, password FROM users WHERE email = ?';
        connection.query(query, [email], callback);
    },

    // Crear usuario
    create(email, password, callback) {
        const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
        connection.query(query, [email, password], callback);
    }

};

module.exports = UserModel;
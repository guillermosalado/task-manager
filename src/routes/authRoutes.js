const express = require('express');
const router = express.Router();
const path = require('path');
const UserModel = require('../models/userModel');

// Login GET/POST
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/views/login.html'));
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) 
        return res.redirect('/login');
    
    UserModel.findByEmail(email, (err, results) => {
        if (err) {
            console.error(err);
            return res.redirect('/login');
        }
        
        if (results.length === 0) 
            return res.redirect('/login');
        
        const user = results[0];
        
        if (user.password !== password) 
            return res.redirect('/login');
    
        req.session.user = {
            id: user.id,
            email: user.email
        };
        
        res.redirect('/');
    });
});

// Registro GET/POST
router.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/views/registro.html'));
});

router.post('/registro', (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password || password.length < 6) 
        return res.redirect('/registro');
    
    UserModel.findByEmail(email, (err, results) => {
        if (err) {
            console.error(err);
            return res.redirect('/registro');
        }
        
        if (results.length > 0) 
            return res.redirect('/login');
        
        UserModel.create(email, password, (err, result) => {
            if (err) {
                console.error(err);
                return res.redirect('/registro');
            }
            
            req.session.user = {
                id: result.insertId,
                email
            };
            
            res.redirect('/');
        });
    });
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

// Session info
router.get('/session', (req, res) => {
    if (req.session.user) {
        res.json({
            logged: true,
            email: req.session.user.email
        });
    } else {
        res.json({ logged: false });
    }
});

module.exports = router;
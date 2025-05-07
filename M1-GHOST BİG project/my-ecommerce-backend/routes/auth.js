const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// User login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user._id }, 'YOUR_JWT_SECRET', { expiresIn: '1h' });
            res.json({ success: true, token });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update user password
router.put('/update-password', async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(oldPassword, user.password)) {
            user.password = newPassword;
            await user.save();
            res.json({ success: true, message: 'Password updated successfully' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

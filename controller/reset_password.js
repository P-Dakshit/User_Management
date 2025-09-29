const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
//exported
const logger = require('../logger/logger');
const User_Data = require('../model/user_data');

const route = express.Router();

route.post('/reset_password/:token', async (req, res) => {
    const token = req.params.token;
    const { new_password } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const user = await User_Data.findOne({ where: { email: decoded.email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.password = new_password;

        await user.save();

        logger.info(`User with ${user.email} has created new password`);
        res.status(200).redirect('/login');
    }
    catch (err) {
        logger.error('Reset password error:', err.message);
        if (err.name === 'TokenExpiredError') {
            return res.status(400).json({ message: 'Reset token has expired. Please try again.' });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = route;
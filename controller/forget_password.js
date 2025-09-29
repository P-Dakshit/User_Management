const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//exported
const User_Data = require('../model/user_data');
const logger = require('../logger/logger');
const sendEmailForForgotPassword = require('../utils/mailer');

const route = express.Router();

route.post('/forget_password', async (req, res) => {
    const { email } = req.body;

    const user = await User_Data.findOne({ where: { email } });
    if (!user) {
        logger.warn(`User doesn't Exist`);
        return res.status(404).json({ message : `User Not Found!` });
    }
    try {
        const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: '15m' });
        const resetLink = `http://localhost:8000/reset_password/${token}`;

        const subject = `Reseting Password`;
        const text = `
    Hello ${user.first_name} ${user.last_name}!
    You requested a password reset.

    Click this link to reset your password:
    ${resetLink}

    This link will expire in 15 minutes.`;

        await sendEmailForForgotPassword(email, subject, text);
        res.status(200).json({ message: 'Password reset link sent to your email.' });

    } catch (err) {
        console.error('Forgot password error:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = route;
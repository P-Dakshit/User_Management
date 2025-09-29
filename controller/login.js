const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//imported
const logger = require('../logger/logger');
const User_Data = require('../model/user_data');

const route = express.Router();

route.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const User = await User_Data.findOne({ where: { email, password } });

        if (!User) {
            logger.warn(`Invalid Email or Password!`);
            // return res.status(400).render('login');
            return res.status(400).json(`Invalid Email or Password`);
        }
        const SECRET_KEY = process.env.SECRET_KEY;

        const token = jwt.sign({ email: User.email, password: User.password, role: User.role }, SECRET_KEY);
        res.cookie("uid", token);
        res.redirect('/');
    }
    catch (err) {
        logger.warn(`Unable to login: ${err}`);
        // res.status(500).redirect('login');
        res.status(500).json(err);
    }
});

module.exports = route;
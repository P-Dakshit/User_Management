const express = require('express');
const path = require('path');

//imported
const photo = require('../middleware/upload');
const User_Data = require('../model/user_data');
const logger = require('../logger/logger');

const route = express.Router();

route.post('/usercreate', photo.single('photo'), async (req, res) => {
    const { first_name, last_name, email, phone, address, role, password } = req.body;
    const photoPath = req.file?.filename;
    try {
        const data = await User_Data.create({
            first_name, last_name, photo: photoPath, phone, email, address, role, password
        });

        res.status(201).redirect('/login');
        logger.info(`data has been enterd to the database \n ${data}`);
    }
    catch (err) {
        logger.warn(`Unable to create User/Admin error: ${err}`);
        res.status(500).json({ msg: `Unable to create user` });
    }
});

module.exports = route;